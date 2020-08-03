import { useState } from 'react';
import { GitHub, Language } from '@material-ui/icons';

import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Modal from '../../components/Modal';

import data from '../../data/data.json';

export default function About() {
    const { repositories } = data;

    const [urlTmp, setUrlTmp] = useState('');
    const [showModal, setShowModal] = useState(false);

    const showDetail = (url) => {
        setUrlTmp(url);
        setShowModal(true);
    }

    return (
        <>
            <Header />
            <Menu page="portfolio" />

            <div className="portfolio-separator"></div>

            <content id="content-portfolio">
                {
                    repositories.map((el, index) => {
                        return (
                            <div key={index} className="card-repository">
                                <strong>{el.name}</strong>
                                <img 
                                    src={el.image_url} 
                                    alt={`${el.name}_image`} 
                                    onClick={() => showDetail(el.image_url)}
                                />

                                <span>{el.description}</span>

                                <div className="icon-repository">
                                    <a
                                        title="Repositório no Github"
                                        href={el.html_url}
                                        target="__blank"
                                    >
                                        <GitHub />
                                    </a>

                                    {
                                        el.deploy
                                            ?
                                            <a title="Sistema publicado" href={el.deploy} target="__blank">
                                                <Language />
                                            </a>
                                            :
                                            null
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </content>

            <div className="portfolio-separator"></div>

            <Modal open={showModal} close={setShowModal}>
                <div className="portfolio-modal">
                    <img src={urlTmp} alt="url_app"/>
                </div>
            </Modal>
        </>
    )
}