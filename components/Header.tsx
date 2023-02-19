import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { MainLogo } from "./icons/MainLogo";
import ColourSwitch from "./ColourSwitch";

import { useUser } from "../utils/useUser";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../types_db";
import { useRouter } from "next/router";

export function Header() {
    const supabaseClient = useSupabaseClient<Database>();
    const user = useUser();
    const router = useRouter();

    const collapseItems = [
        "Home",
        // "Pricing",
        // "Blog",
    ];
    const collapselinks = [
        "/",
        // "/pricing",
        // "/blog",
    ];
    const collapseItems2 = [
        "Dashboad",
        // "Blog",
    ];
    const collapselinks2 = [
        "/Dashboard",
        // "/blog",
    ];

    return (
        <Navbar shouldHideOnScroll isBordered variant="sticky">
            <Navbar.Toggle showIn="xs" />
            <Navbar.Brand>
                <MainLogo />
            </Navbar.Brand>
            <Navbar.Content
                hideIn="xs"
                variant="underline-rounded"
                activeColor="error"
            >
                {!user.user && (
                    <Navbar.Link
                        onPress={() => {
                            router.push("/");
                        }}
                    >
                        Home
                    </Navbar.Link>
                )}
                {/* {!user.user && (
                    <Navbar.Link
                        isActive
                        onPress={() => {
                            router.push("/pricing");
                        }}
                    >
                        Pricing
                    </Navbar.Link>
                )} */}
                {user.user && (
                    <Navbar.Link
                        onPress={() => {
                            router.push("/dashboard");
                        }}
                    >
                        dashboard
                    </Navbar.Link>
                )}
                {/* <Navbar.Link
                    onPress={() => {
                        router.push("/blog");
                    }}
                >
                    Blog
                </Navbar.Link> */}
            </Navbar.Content>

            <Navbar.Content>
                <Navbar.Item hideIn="xs">
                    <ColourSwitch />
                </Navbar.Item>
                {!user.user && (
                    <Navbar.Link
                        onPress={() => {
                            router.push("/account/signin");
                        }}
                    >
                        Sign In
                    </Navbar.Link>
                )}
                {!user.user && (
                    <Navbar.Item>
                        <Button
                            auto
                            rounded
                            as={Link}
                            onPress={() => {
                                router.push("/account/signup");
                            }}
                            color="error"
                        >
                            Sign Up
                        </Button>
                    </Navbar.Item>
                )}
                {user.user && (
                    <Navbar.Item>
                        <Button
                            auto
                            rounded
                            color="error"
                            onPress={() => {
                                supabaseClient.auth.signOut();
                                router.push("/");
                            }}
                        >
                            Sign Out
                        </Button>
                    </Navbar.Item>
                )}
            </Navbar.Content>
            <Navbar.Collapse>
                <Navbar.CollapseItem>
                    <ColourSwitch />
                </Navbar.CollapseItem>
                {!user.user &&
                    collapseItems.map((item, index) => (
                        <Navbar.CollapseItem key={item}>
                            <Link
                                color="inherit"
                                css={{
                                    minWidth: "100%",
                                }}
                                onPress={() => {
                                    router.push(collapselinks[index]);
                                }}
                            >
                                {item}
                            </Link>
                        </Navbar.CollapseItem>
                    ))}
                {user.user &&
                    collapseItems2.map((item, index) => (
                        <Navbar.CollapseItem key={item}>
                            <Link
                                color="inherit"
                                css={{
                                    minWidth: "100%",
                                }}
                                onPress={() => {
                                    router.push(collapselinks2[index]);
                                }}
                            >
                                {item}
                            </Link>
                        </Navbar.CollapseItem>
                    ))}
            </Navbar.Collapse>
        </Navbar>
    );
}
