import React from 'react';
import UserProvider from '../context/user';

// Custom App to wrap it with context provider
export default ({ Component, pageProps, }) => {

    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    )
}