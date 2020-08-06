import Link from 'next/link';

import Header from '../components/Header';

export default function Home() {
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
