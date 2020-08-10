import { useEffect } from 'react';
import Link from 'next/link';
import api from '../services/api';

import Header from '../components/Header';

export default function Home() {
  useEffect(() => {
    getIp();
  }, []);

  const getIp = async () => {
    const { data } = await api.get('https://cors-anywhere.herokuapp.com/http://api.ipify.org/?format=json');
    console.log('!!!=>',  data.ip );
  }

  return (
    <div className="home">
      <Header />

      <main>
        <div>
          Olá, eu sou <strong>Welington Fidelis</strong>. <br />
          Sou desenvolvedor Full-stack <strong>Web</strong> e <strong>Mobile</strong>.
        </div>

        <Link href="/About">
          <div className="button-home">
            Venha me conhecer
        </div>
        </Link>
      </main>
    </div>
  )
}
