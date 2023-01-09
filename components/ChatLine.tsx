import { Avatar, Badge, Card, Container, Row, Spacer, Text } from '@nextui-org/react'
import clsx from 'clsx'
import Balancer from 'react-wrap-balancer'


export type Message = {
    who: 'bot' | 'user' | undefined
    message?: string
}

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (

    <Badge color="error" variant="points" />
)

// util helper to convert new lines to <br /> tags
// const convertNewLines = (text: string) =>
//     text.split('\n').map((line, i) => (
//         <span key={i}>
//             {line}
//             <br />
//         </span>
//     ))

export function ChatLine({ who = 'bot', message }: Message) {
    if (!message) {
        return null
    }
    // const formatteMessage = convertNewLines(message)

    return (
        <Container
        // direction={
        //     who != 'bot' ? 'row' : 'row-reverse'
        // }
        // alignItems='flex-end'
        >
            {/* <Balancer> */}

            {who == 'bot' && <Avatar size='sm' text='Ai' color={who == 'bot' ? 'error' : 'default'} css={who == 'bot' ? {
            } : { float: "right", position: "relative" }} />}
            <Spacer y={0.5} x={0} />
            <Card isHoverable isPressable css={who == 'bot' ? {
                mw: "350px"
            } : { mw: "350px", float: 'right', position: "relative" }} variant="bordered" onPress={() => { navigator.clipboard.writeText(message) }}
            >
                <Card.Body >
                    <Row>

                        <Text >{message}</Text>
                        {who == 'bot' && <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>}
                    </Row>
                </Card.Body>
            </Card>
            {/* </Balancer > */}
        </Container >
    )
}