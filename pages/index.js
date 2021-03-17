import { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

import Header from '../components/Header';

export default function Home() {
  useEffect(() => {
    getIp();
  }, []);

  const getIp = async () => {
    const { data } = await axios.get(
      `https://geolocation-db.com/json/${process.env.NEXT_GEOLOCATION_KEY}`
    );

    if(data) axios.post('../api/saveVisit', data);
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
