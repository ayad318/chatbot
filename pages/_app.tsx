// 1. import `NextUIProvider` component
import { createTheme, NextUIProvider } from '@nextui-org/react'
import { AppProps } from 'next/app'
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Head from 'next/head';
import { Header } from '../components/Header';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react';
import { Database } from '../types_db';
import { MyUserContextProvider } from '../utils/useUser';
import { SessionContextProvider } from '@supabase/auth-helpers-react';



const lightTheme = createTheme({
  type: "light", // it could be "light" or "dark"

})

const darkTheme = createTheme({
  type: "dark", // it could be "light" or "dark"

})



function App({ Component, pageProps }: AppProps) {
  // 2. Use at the root of your app
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);
  return (




    < NextThemesProvider
      defaultTheme='dark'
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className
      }}
    >
      <SessionContextProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider>

          <NextUIProvider>
            <Head>
              <title>Ai chatbot</title>
            </Head>
            <Header></Header>
            < Component {...pageProps} />
          </NextUIProvider>
        </MyUserContextProvider>
      </SessionContextProvider>
    </NextThemesProvider >
  )
}

export default App