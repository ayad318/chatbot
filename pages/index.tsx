import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { Header } from "../components/Header";
import { Chat } from "../components/Chat";
import {
    Button,
    Card,
    Container,
    Link,
    Row,
    Spacer,
    Table,
    Text,
} from "@nextui-org/react";
import Pricing from "../components/Pricing";
import { getActiveProductsWithPrices } from "../utils/supabase-client";
import { GetStaticPropsResult } from "next";
import { Product } from "../types";

interface Props {
    products: Product[];
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
    const products = await getActiveProductsWithPrices();

    return {
        props: {
            products,
        },
        revalidate: 60,
    };
}
export default function Home({ products }: Props) {
    return (
        <div>
            <Container>
                <Spacer y={3} />
                <Text
                    h1
                    size={60}
                    css={{
                        textGradient: "45deg, $blue600 -20%, $pink600 50%",
                    }}
                    weight="bold"
                    as={"center"}
                >
                    Get Expert Dating Advice 24/7 with Your24 Wingman
                </Text>
                <Spacer></Spacer>
                <Button
                    shadow
                    color="gradient"
                    css={{ margin: "auto", width: "50%" }}
                >
                    <Link
                        href="https://discord.gg/SMjEDbFH"
                        isExternal
                        css={{ color: "White", fontSiz: "100" }}
                    >
                        Join Discord
                    </Link>
                </Button>
                <Spacer y={3} />
                <Text size={"xx-large"}>
                    Welcome to Your24 Wingman, the ultimate dating support
                    service for single men. We understand that dating can be
                    challenging, and that&apos;s why we&apos;re here to provide
                    you with the guidance and support you need, whenever you
                    need it. Our team of dating experts is available around the
                    clock to help you navigate the world of online dating,
                    answer your questions, and offer personalized advice to help
                    you find success. With Your24 Wingman by your side,
                    you&apos;ll never have to navigate the dating world alone
                    again.
                </Text>
                <Spacer y={3} />
            </Container>
        </div>
    );
}
