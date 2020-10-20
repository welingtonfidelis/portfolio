import { Provider } from 'react-redux';

import './styles/animation.scss';
import './styles/modal.scss';
import './styles/global.scss';
import './styles/home.scss';
import './styles/menu.scss';
import './styles/menu-admin.scss';
import './styles/about.scss';
import './styles/contact.scss';
import './styles/portfolio.scss';
import './styles/login.scss';
import './styles/input.scss';
import './styles/button.scss';
import 'react-awesome-slider/dist/styles.css';

import store from '../store';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}