import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import forEach from 'lodash/forEach';
import { ClientApp, ServerApp } from './app';
import configureStore from './store';

const render = (url, context) => {
  const store = configureStore();
  const body = ReactDOMServer.renderToString(
    <ServerApp url={url} context={context} store={store} />
  );
  const head = Helmet.peek();
  return { head, body };
};

const jsdomScroll = window.scroll;
beforeAll(() => {
  // Mock window.scroll - otherwise, Jest/JSDOM will print a not-implemented error.
  window.scroll = () => {};
});

afterAll(() => {
  window.scroll = jsdomScroll;
});

describe('Application', () => {
  it('renders in the client without crashing', () => {
    window.google = { maps: {} };
    const store = configureStore();
    const div = document.createElement('div');
    ReactDOM.render(<ClientApp store={store} />, div);
    delete window.google;
  });

  it('renders in the server without crashing', () => {
    render('/', {});
  });

  it('renders the styleguide without crashing', () => {
    render('/styleguide', {});
  });

  it('server renders pages that do not require authentication', () => {
    const urlTitles = {
      '/': 'LandingPage.schemaTitle',
      '/s': 'SearchPage.schemaTitle',
      '/l/listing-title-slug/1234': 'ListingPage.loadingListingTitle',
      '/l/1234': 'ListingPage.loadingListingTitle',
      '/u/1234': 'ProfilePage.schemaTitle',
      '/login': 'AuthenticationPage.schemaTitleLogin',
      '/signup': 'AuthenticationPage.schemaTitleSignup',
      '/recover-password': 'PasswordRecoveryPage.title',
      '/this-url-should-not-be-found': 'NotFoundPage.title',
      '/reset-password?t=token&e=email': 'PasswordResetPage.title',
    };
    forEach(urlTitles, (title, url) => {
      const context = {};
      const { head, body } = render(url, context);

      expect(head.title).toContain(title);

      // context.url will contain the URL to redirect to if a <Redirect> was used
      expect(context.url).not.toBeDefined();
    });
  });

  it('server renders redirects for pages that require authentication', () => {
    const loginPath = '/login';
    const signupPath = '/signup';
    const urlRedirects = {
      '/l/new': signupPath,
      '/l/listing-title-slug/1234/new/description': signupPath,
      '/l/listing-title-slug/1234/checkout': signupPath,
      '/profile-settings': loginPath,
      '/inbox': loginPath,
      '/inbox/orders': loginPath,
      '/inbox/sales': loginPath,
      '/order/1234': loginPath,
      '/order/1234/details': loginPath,
      '/sale/1234': loginPath,
      '/sale/1234/details': loginPath,
      '/listings': loginPath,
      '/account': loginPath,
      '/account/contact-details': loginPath,
      '/account/change-password': loginPath,
      '/account/payments': loginPath,
      '/verify-email': loginPath,
    };
    forEach(urlRedirects, (redirectPath, url) => {
      const context = {};
      const { body } = render(url, context);
      expect(context.url).toEqual(redirectPath);
    });
  });

  it('redirects to correct URLs', () => {
    const urlRedirects = { '/l': '/', '/u': '/' };
    forEach(urlRedirects, (redirectPath, url) => {
      const context = {};
      const { body } = render(url, context);
      expect(context.url).toEqual(redirectPath);
    });
  });
});
