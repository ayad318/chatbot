import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Header } from '../components/Header'
import { Chat } from '../components/Chat'
import { Container, Row, Spacer } from '@nextui-org/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>

      <Head>
        <title>ChatBot</title>
      </Head>
      <Container>
        <Spacer y={3} />

        < Chat />

      </Container >
    </div>

  )
}
