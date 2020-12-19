import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { Provider } from 'react-redux';

import 'react-awesome-slider/dist/styles.css';
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
import './styles/dashboard.scss';
import './styles/skills.scss';
import './styles/select.scss';
import './styles/input-file.scss';
import './styles/image-carroussel.scss';
import './styles/projects.scss';

import store from '../store';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}