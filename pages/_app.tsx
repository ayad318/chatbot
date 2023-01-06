// 1. import `NextUIProvider` component
import { createTheme, NextUIProvider } from '@nextui-org/react'
import { AppProps } from 'next/app'
import { ThemeProvider as NextThemesProvider } from 'next-themes';


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
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className
      }}
    >

      <NextUIProvider>
        < Component {...pageProps} />
      </NextUIProvider>
    </NextThemesProvider >
  )
}

export default App