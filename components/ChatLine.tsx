import { Avatar, Badge, Card, Container, Spacer, Text } from '@nextui-org/react'
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
        <Container direction='row'
        // direction={
        //     who != 'bot' ? 'row' : 'row-reverse'
        // }
        // alignItems='flex-end'
        >
            {/* <Balancer> */}

            <Avatar size='sm' text={who == 'bot' ? 'Ai' : 'You'} color={who == 'bot' ? 'error' : 'default'} css={who == 'bot' ? {
            } : { float: "right", position: "relative" }} />
            <Spacer y={0.5} x={0} />
            <Card isHoverable isPressable css={who == 'bot' ? {
                mw: "350px",
            } : { mw: "350px", float: 'right', position: "relative" }} variant="bordered">

                <Card.Body>
                    <Text>{message}</Text>
                </Card.Body>
            </Card>
            {/* </Balancer > */}
        </Container >
    )
}