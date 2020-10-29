import { useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import Link from 'next/link';
import axios from 'axios';

import Header from '../../components/Header';
import Menu from '../../components/Menu';

export default function About() {
    const [loading, setLoading] = useState(false);
    const [skillCategory, setSkillCategory] = useState([]);

    useEffect(() => {
        getSkills();
    }, []);

    const getSkills = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get('../api/getSkill', { params: { order: 'category' } });

            const { ok, skills } = data;
            if (ok) {
                const categories = [], categoryControl = { i: 0, name: skills[0].category };

                for (const skill of skills) {
                    if (skill.category !== categoryControl.name) {
                        categoryControl.i = categoryControl.i + 1;
                        categoryControl.name = skill.category;
                    }

                    categories[categoryControl.i]
                        ? categories[categoryControl.i].push(skill)
                        : categories[categoryControl.i] = [skill]
                }

                setSkillCategory(categories);
            }
        }
        catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

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
                    {skillCategory.map((category, index) => (
                        <fieldset className="float-card" key={index}>
                            {category.map((skill, index) => (
                                <div key={index} className="float-card-content">
                                    <strong>{skill.name}</strong>
                                    <ReactStars
                                        count={5}
                                        size={32}
                                        value={skill.rating}
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
                    ))}
                </div>
            </content>
        </>
    )
}