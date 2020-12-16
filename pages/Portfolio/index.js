import { useState, useEffect } from 'react';
import { GitHub, Language } from '@material-ui/icons';
import AwesomeSlider from 'react-awesome-slider';
import axios from 'axios'

import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Modal from '../../components/Modal';

export default function About() {
    const [urlTmp, setUrlTmp] = useState([]);
    const [modalState, setModalState] = useState({});
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get('../api/project/get');

            const { ok, projects } = data;

            if (ok) setProjects(projects);
        }
        catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

    const showDetail = (url) => {
        setUrlTmp(url);

        setModalState({
            open: true,
            close: setModalState
        });
    }

    return (
        <>
            <Header />
            <Menu page="portfolio" loading={loading} />

            <div className="portfolio-separator"></div>

            <content id="content-portfolio">
                {
                    projects.map((item, index) => {
                        return (
                            <div key={index} className="card-repository">
                                <strong>{item.name}</strong>
                                <img
                                    src={item.imagesUrl[0]}
                                    alt={`${item.name}_image`}
                                    onClick={() => showDetail(item.imagesUrl)}
                                />

                                <span>{item.description}</span>

                                <div className="icon-repository">
                                    <a
                                        title="Repositório no Github"
                                        href={item.repository}
                                        target="__blank"
                                    >
                                        <GitHub />
                                    </a>

                                    {
                                        item.publishedIn &&
                                        <a title="Sistema publicado" href={item.publishedIn} target="__blank">
                                            <Language />
                                        </a>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </content>

            <div className="portfolio-separator"></div>

            <Modal state={modalState}>
                <div className="portfolio-content-carousel ">
                    <AwesomeSlider>
                        {
                            urlTmp.map((el, index) => {
                                return (
                                    <div className="portfolio-modal" key={index}>
                                        <img src={el} alt="url_app" />
                                    </div>
                                )
                            })
                        }
                    </AwesomeSlider>
                </div>
            </Modal>
        </>
    )
}