import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Header } from '../components/Header'
import { Chat } from '../components/Chat'
import { Container, Row, Spacer, Text } from '@nextui-org/react'
import Pricing from '../components/Pricing'
import { getActiveProductsWithPrices } from '../utils/supabase-client'
import { GetStaticPropsResult } from 'next'
import { Product } from '../types'

interface Props {
  products: Product[];
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const products = await getActiveProductsWithPrices();

  return {
    props: {
      products
    },
    revalidate: 60
  };
}
export default function Home({ products }: Props) {
  return (
    <div>

      <Head>
        <title>ChatBot</title>
      </Head>
      <Container>
        <Spacer y={3} />

        <Text h1
          size={60}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold"
          as={'center'}>Home Page</Text>
        <Spacer y={15} />
        <Pricing products={products}></Pricing>

      </Container >
    </div>

  )
}
