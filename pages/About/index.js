import ReactStars from 'react-rating-stars-component';
import Link from 'next/link';
import { Smartphone, DesktopWindows, CloudQueue } from '@material-ui/icons';

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
                <div id="about-card-left">
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

                <div id="about-card-right">
                    <fieldset className="float-card">
                        {skills.front.map((el, index) => (
                            <div key={index} className="float-card-content">
                                <strong>{el.name}</strong>
                                <ReactStars
                                    count={5}
                                    size={32}
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
                        ))}
                    </fieldset>

                    <fieldset className="float-card">
                        {skills.mobile.map((el, index) => (
                            <div key={index}  className="float-card-content">
                                <strong>{el.name}</strong>
                                <ReactStars
                                    count={5}
                                    size={32}
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
                        ))}
                    </fieldset>

                    <fieldset className="float-card">
                        {skills.back.map((el, index) => (
                            <div key={index}  className="float-card-content">
                                <strong>{el.name}</strong>
                                <ReactStars
                                    count={5}
                                    size={32}
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
                        ))}
                    </fieldset>
                </div>
            </content>
        </>
    )
}