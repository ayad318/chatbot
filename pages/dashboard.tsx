import { Container, Spacer, Button, Text, Loading } from "@nextui-org/react";
import { Chat } from "../components/Chat";
import { useUser } from "../utils/useUser";
import { useRouter } from "next/router";

const Dashboard = () => {
    const user = useUser();
    const router = useRouter();
    const handleRoutes = (path: string) => {
        router.push(path)
    }
    if (user.user)
        return (
            <div>

                <Container >
                    <Spacer y={2} />
                    < Chat />

                </Container >
            </div >
        )
    else if (user.isLoading) {
        <div>

            <Spacer y={5} />
            <Loading size="xl" as={'center'}></Loading>
        </div>
    }
    else {
        return (

            <Container >
                <Spacer y={2} />
                <Text size={60}
                    css={{
                        textGradient: "45deg, $blue600 -20%, $pink600 50%",
                    }}
                    weight="bold"
                    as={'center'}> Start Now</Text>
                <Spacer y={20} />
                <Button css={{ w: '50%', h: 'stretch', margin: 'auto' }} shadow ripple bordered color={'gradient'} onPress={() => { handleRoutes("account/signin") }}>Sign In</Button>
                <Spacer y={2} />
                <Button css={{ w: '70%', h: 'stretch', margin: 'auto' }} shadow ripple color={'gradient'} onPress={() => { handleRoutes("account/signup") }}>Get Started</Button>
                <Spacer />
            </Container >

        )
    }
};

export default Dashboard;