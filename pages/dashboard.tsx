import { Container, Spacer, Row } from "@nextui-org/react";
import { Chat } from "../components/Chat";

const Dashboard = () => {
    return (
        <Container display="flex"
            alignItems="center"
            justify="center">
            {/* <Spacer y={3} /> */}
            {/* <Row> */}
            < Chat />
            {/* </Row> */}
        </Container >)
};

export default Dashboard;