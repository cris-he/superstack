import UserProvider from '../context/user'

// Custom App to wrap it with context provider
export default ({ Component, pageProps }) => (
    <UserProvider>
        <Component {...pageProps} />
    </UserProvider>
)