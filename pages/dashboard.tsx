import { Container, Spacer, Button, Text, Loading } from "@nextui-org/react";
import { Chat } from "../components/Chat";


const Dashboard = () => {


    return (
        <Container >
            <Spacer y={2} />
            < Chat />
        </Container >

    )
};

export default Dashboard;