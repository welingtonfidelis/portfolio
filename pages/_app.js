import './styles/animation.scss';
import './styles/modal.scss';
import './styles/global.scss';
import './styles/home.scss';
import './styles/menu.scss';
import './styles/about.scss';
import './styles/contact.scss';
import './styles/portfolio.scss';
import 'react-awesome-slider/dist/styles.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}