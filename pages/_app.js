import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { Provider } from 'react-redux';
import { useRouter } from 'next/router';

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
import './styles/chat.scss';

import store from '../store';
import Chat from '../components/Chat';
import pagesWithoutChat from './enum/pagesWithoutChat';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Provider store={store}>
      { !pagesWithoutChat.includes(router.pathname) && <Chat /> }
      <Component {...pageProps} />
    </Provider>
  )
}