import ReactStars from 'react-rating-stars-component';
import Link from 'next/link';

import Header from '../../components/Header';
import Menu from '../../components/Menu';

import data from '../../data/data.json';

export default function About() {
    const { skills } = data;

    return (
        <>
            <Header />
            <Menu page="about" />
            <content id="content-about">
                <div id="card">
                    <img
                        src="https://avatars3.githubusercontent.com/u/26190703?v=4"
                        alt="photo_url"
                    />

                    <div className="about-text">
                        Bacharel em Ciência da Computação, atuo como programador desde 2019.
                        <br />
                        Apaixonado por tecnologia, sou um desenvolvedor full-stack web e mobile
                        sempre interessado em aprender, compartilhar e ajudar a construir
                        algo incrível.
                        <br />
                        Tem uma ideia legal? <Link href="/Contact"><strong> Me chama </strong></Link>
                        e vamos fazer acontecer juntos.
                    </div>
                </div>

                <div id="card">
                    {
                        skills.map((el, index) => {
                            return (
                                <div className="about-skill" key={index}>
                                    <strong>{el.name}</strong>
                                    <ReactStars
                                        count={5}
                                        size={36}
                                        value={el.rating}
                                        isHalf={true}
                                        edit={false}
                                        activeColor="#0094A8"
                                        color="#293749"
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </content>
        </>
    )
}