import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Axios from 'axios';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import PropTypes from 'prop-types';
import React from 'react';
import Navbar from '../components/Navbar';
import { UserProvider } from '../context/context/userContext';
import theme from '../src/theme';
function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Social</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <UserProvider>
          <Navbar {...pageProps} />
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const { ctx } = appContext;
  // console.log(ctx);
  const appProps = await App.getInitialProps(appContext);

  const { token } = parseCookies(ctx);

  const redirectUser = (ctx, location) => {
    if (ctx.req) {
      ctx.res.writeHead(302, { Location: location });
      ctx.res.end();
    } else {
      Router.push(location);
    }
  };

  if (!token) {
    const protectRoute = ctx.pathname === '/user';
    if (protectRoute) {
      redirectUser(ctx, '/login');
    }
  } else {
    try {
      const { data } = await Axios.get('http://localhost:3000/api/v1/user', {
        headers: { Authorization: token },
      });
      appProps.pageProps.user = data;
    } catch (error) {
      console.error(error);
      // throw out invalid token
      destroyCookie(ctx, token);

      // redirect to login
      redirectUser(ctx, '/login');
    }
  }

  return { ...appProps };
};

export default MyApp;
