// 1. import `NextUIProvider` component
import { createTheme, NextUIProvider } from '@nextui-org/react'
import { AppProps } from 'next/app'
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Head from 'next/head';
import { Header } from '../components/Header';



const lightTheme = createTheme({
  type: "light", // it could be "light" or "dark"

})

const darkTheme = createTheme({
  type: "dark", // it could be "light" or "dark"

})



function App({ Component, pageProps }: AppProps) {
  // 2. Use at the root of your app
  return (




    < NextThemesProvider
      defaultTheme='dark'
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className
      }}
    >

      <NextUIProvider>
        <Head>
          <title>Ai chatbot</title>
        </Head>
        <Header></Header>
        < Component {...pageProps} />
      </NextUIProvider>
    </NextThemesProvider >
  )
}

export default App