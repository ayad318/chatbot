import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { MainLogo } from './icons/MainLogo';
import ColourSwitch from './ColourSwitch';

export function Header() {

    return (
        <Navbar shouldHideOnScroll isBordered variant="sticky" >
            <Navbar.Brand>
                <MainLogo />
                <Text b color="inherit" hideIn="xs">
                    ChatBot
                </Text>
            </Navbar.Brand>
            <Navbar.Content hideIn="xs" variant="underline" activeColor="secondary">
                <Navbar.Link href="#">Home</Navbar.Link>
                <Navbar.Link isActive href="#">Pricing</Navbar.Link>
                <Navbar.Link href="#">Blog</Navbar.Link>
                <Navbar.Link href="#">About</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
                <Navbar.Item>
                    <ColourSwitch />
                </Navbar.Item>
                <Navbar.Link color="inherit" href="#">
                    Login
                </Navbar.Link>
                <Navbar.Item >
                    <Button auto flat as={Link} href="#" color="secondary">
                        Sign Up
                    </Button>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>)
}