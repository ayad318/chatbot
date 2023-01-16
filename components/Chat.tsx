import { useEffect, useState } from 'react'
import { type Message, ChatLine, LoadingChatLine } from './ChatLine'
import { useCookies } from 'react-cookie'
import { Card, Container, Grid, Input, Textarea } from '@nextui-org/react'
import { SendButton } from './Button/SendButton'
import { SendIcon } from './icons/SendIcon'


const COOKIE_NAME = 'nextjs-example-ai-chat-gpt3'

// default first message to display in UI (not necessary to define the prompt)
export const initialMessages: Message[] = [
    {
        who: 'bot',
        message: 'Hi! I’m A friendly AI assistant. Ask me anything!',
    },
]
// TODO: fix sanitize
const InputMessage = ({ input, setInput, sendMessage }: any) => (
    // <div className="mt-6 flex clear-both">
    <Input
        required
        fullWidth
        clearable
        bordered
        contentRightStyling={false}
        placeholder="Type your message..."
        contentRight={
            <SendButton
                type="submit"
                onClick={() => {
                    sendMessage(input)
                    setInput('')
                }}>
                <SendIcon />
            </SendButton>
        }
        value={input}
        onKeyDown={(e: { key: string }) => {
            if (e.key === 'Enter') {
                sendMessage(input)
                setInput('')
            }
        }}
        onChange={(e: { target: { value: any } }) => {
            setInput(e.target.value)
        }}
    />


    // </div >
)

export function Chat() {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [cookie, setCookie] = useCookies([COOKIE_NAME])

    useEffect(() => {
        if (!cookie[COOKIE_NAME]) {
            // generate a semi random short id
            const randomId = Math.random().toString(36).substring(7)
            setCookie(COOKIE_NAME, randomId)
        }
    }, [cookie, setCookie])

    // send message to API /api/chat endpoint
    const sendMessage = async (message: string) => {
        setLoading(true)
        const newMessages = [
            ...messages,
            { message: message, who: 'user' } as Message,
        ]
        setMessages(newMessages)
        const last10mesages = newMessages.slice(-10)

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: last10mesages,
                user: cookie[COOKIE_NAME],
            }),
        })
        const data = await response.json()

        // strip out white spaces from the bot message
        const botNewMessage = data.text.trim()

        setMessages([
            ...newMessages,
            { message: botNewMessage, who: 'bot' } as Message,
        ])
        setLoading(false)
    }

    return (
        <Container alignContent='center' justify='center' xl >
            <Card >
                <Card.Body css={{ flexDirection: "column-reverse", h: "73vh" }}>
                    {loading && <LoadingChatLine />}
                    {messages.slice(0).reverse().map(({ message, who }, index) => (
                        <ChatLine key={index} who={who} message={message} />
                    ))}


                </Card.Body>

                <Card.Footer >

                    <InputMessage
                        input={input}
                        setInput={setInput}
                        sendMessage={sendMessage}
                    />

                </Card.Footer>
            </Card >

        </Container >

    )
}