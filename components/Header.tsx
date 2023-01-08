import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { MainLogo } from './icons/MainLogo';
import ColourSwitch from './ColourSwitch';

export function Header() {
    const collapseItems = [
        "Home",
        "Pricing",
        "Blog",
        "About",
        "Login",
        "Sign Up",
    ];

    return (
        <Navbar shouldHideOnScroll isBordered variant="sticky" >
            <Navbar.Toggle showIn="xs" />
            <Navbar.Brand>
                <MainLogo />
                <Text b color="inherit">
                    ChatBot
                </Text>
            </Navbar.Brand>
            <Navbar.Content hideIn="xs" variant="underline-rounded" activeColor="error">
                <Navbar.Link href="#">Home</Navbar.Link>
                <Navbar.Link isActive href="#">Pricing</Navbar.Link>
                <Navbar.Link href="#">Blog</Navbar.Link>
                <Navbar.Link href="#">About</Navbar.Link>
            </Navbar.Content>

            <Navbar.Content hideIn="xs">
                <Navbar.Item>
                    <ColourSwitch />
                </Navbar.Item>
                <Navbar.Link color="inherit" href="#">
                    Login
                </Navbar.Link>
                <Navbar.Item >
                    <Button auto flat as={Link} href="#" color="error">
                        Sign Up
                    </Button>
                </Navbar.Item>
            </Navbar.Content >
            <Navbar.Collapse>
                <Navbar.CollapseItem>
                    <ColourSwitch />
                </Navbar.CollapseItem>
                {collapseItems.map((item, index) => (
                    <Navbar.CollapseItem key={item}>

                        <Link
                            color="inherit"
                            css={{
                                minWidth: "100%",
                            }}
                            href="#"
                        >
                            {item}
                        </Link>
                    </Navbar.CollapseItem>
                ))}
            </Navbar.Collapse>
        </Navbar >)
}