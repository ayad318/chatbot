import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { MainLogo } from './icons/MainLogo';
import ColourSwitch from './ColourSwitch';

import { useUser } from "../utils/useUser";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../types_db";


export function Header() {
    const supabaseClient = useSupabaseClient<Database>();
    const user = useUser();

    const collapseItems = [
        "Home",
        "Pricing",
        "Blog",
        "About",
    ];
    const collapselinks = [
        "/",
        "/pricing",
        "/blog",
        "/about",
    ];





    return (
        <Navbar shouldHideOnScroll isBordered variant="sticky" >
            <Navbar.Toggle showIn="xs" />
            <Navbar.Brand>
                <MainLogo />
                <Text b color="inherit" hideIn='xs'>
                    ChatBot
                </Text>
            </Navbar.Brand>
            <Navbar.Content hideIn="xs" variant="underline-rounded" activeColor="error">
                <Navbar.Link href="/">Home</Navbar.Link>
                <Navbar.Link isActive href="/pricing">Pricing</Navbar.Link>
                <Navbar.Link href="/blog">Blog</Navbar.Link>
                <Navbar.Link href="/about">About</Navbar.Link>
            </Navbar.Content>

            <Navbar.Content >
                <Navbar.Item hideIn="xs">
                    <ColourSwitch />
                </Navbar.Item>
                {!user.user && <Navbar.Link href="/account/signin">Sign In</Navbar.Link>}
                {!user.user && <Navbar.Item >
                    <Button auto rounded as={Link} href="/account/signup" color="error">
                        Sign Up
                    </Button>
                </Navbar.Item>}
                {user.user && <Navbar.Item >
                    <Button auto rounded color="error" onPress={() => supabaseClient.auth.signOut()}>
                        Sign Out
                    </Button>
                </Navbar.Item>}
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
                            href={collapselinks[index]}
                        >
                            {item}
                        </Link>
                    </Navbar.CollapseItem>
                ))}
            </Navbar.Collapse>
        </Navbar >)
}