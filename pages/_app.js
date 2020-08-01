import './styles/global.scss';
import './styles/home.scss';
import './styles/menu.scss';
import './styles/about.scss';
import './styles/contact.scss';
import './styles/portfolio.scss';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}