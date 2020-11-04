import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AccountCircle } from '@material-ui/icons';

export default function Menu({ page }) {
    const [arrayColor, setArrayColor] = useState({});

    useEffect(() => {
        const tmp = {};
        tmp[page] = '#0094A8';
        setArrayColor(tmp);
    }, []);

    return (
        <nav id="menu">
            <ul>
                <div className="option-list">
                    <li>
                        <Link href="/">
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/About">
                            <span style={{ color: arrayColor['about'] }}>Sobre</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/Portfolio">
                            <span style={{ color: arrayColor['portfolio'] }}>Portfólio</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/Contact">
                            <span style={{ color: arrayColor['contact'] }}>Contato</span>
                        </Link>
                    </li>
                </div>

                <div className="login-icon">
                    <Link href="/Login">
                        <AccountCircle />
                    </Link>
                </div>
            </ul>
        </nav>
    )
}