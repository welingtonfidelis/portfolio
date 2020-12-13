import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Delete, Edit } from '@material-ui/icons';
import axios from 'axios';

import Header from '../../components/Header';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import InputFile from '../../components/InputFile';
import Menu from '../../components/MenuAdmin';
import Button from '../../components/ButtonPrimary';
import ButtonSecondary from '../../components/ButtonSecondary';
import Alert from '../../components/Alert';
import AlertConfirm from '../../components/AlertConfirm';
import Select from '../../components/Select';
import Modal from '../../components/Modal';
import Rating from '../../components/Rating';

import utils from '../../services/utils';

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [alertState, setAlertState] = useState({});
    const [alertStateConfirm, setAlertStateConfirm] = useState({});
    const [modalState, setModalState] = useState({});
    const [formData, setFormData] = useState({});
    const [projectEdit, setProjectEdit] = useState(false);
    const [images, setImages] = useState([]);

    const store = useSelector(state => state);
    const category = [
        { label: 'Front-End', value: 'front' },
        { label: 'Back-End', value: 'back' },
        { label: 'Mobile', value: 'mobile' }
    ]

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get('../api/project/get');

            const { ok, projects } = data;

            console.log('Projects', projects);
            if (ok) setProjects(projects);
        }
        catch (error) {
            console.log(error);

            setAlertState({
                text: 'Houve um problema ao trazer seus projetos. Por favor, tente novamente.',
                severity: 'error',
                open: true,
                close: setAlertState
            });
        }

        setLoading(false);
    }

    const handleOpenModal = (clear) => {
        if (clear) clearFormData();

        setModalState({
            open: true,
            close: setModalState
        });
    }

    const handleCloseModal = () => {
        setModalState({
            ...modalState,
            open: false
        });
    }

    const validateInput = () => {
        let isValid = true, text = '';
        if (!formData.name || formData.name === '') text = 'Escolha um nome para seu projeto.';
        else if (!formData.description || formData.description === '') text = 'Fale um pouco sobre seu projeto.';
        else if (!images.length) text = 'Escolha ao menos uma imagem para seu projeto.';

        if (text !== '') {
            isValid = false;

            setAlertState({
                text,
                severity: 'error',
                open: true,
                close: setAlertState
            });
        }

        return isValid;
    }

    const handleSaveProject = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            if (validateInput()) {
                const body = {
                    name: formData.name || '',
                    description: formData.description || '',
                    repository: formData.repository || '',
                    publishedIn: formData.publishedIn || '',
                    images: []
                }
                for(const image of images) {
                    body.images.push(await utils.fileToBase64(image));
                }

                const { data } = formData._id
                    ? await axios.put(
                        '../api/project/update', body,
                        {
                            headers: {
                                authorization: store.authorization
                            },
                            params: { _id: formData._id }
                        }
                    )
                    : await axios.post(
                        '../api/project/create', body,
                        {
                            headers: {
                                authorization: store.authorization
                            }
                        }
                    )

                const { ok } = data;
                if (ok) {
                    handleCloseModal();

                    setAlertState({
                        text: 'Seu projeto foi salvo com sucesso!',
                        severity: 'success',
                        open: true,
                        close: setAlertState
                    });

                    clearFormData();
                    getProjects();
                }
            }
        }
        catch (error) {
            console.log(error);
            setAlertState({
                text: 'Houve um problema ao salvar seu projeto. Por favor, tente novamente.',
                severity: 'error',
                open: true,
                close: setAlertState
            });
        }

        setLoading(false);
    }

    const handleDeleteSkill = async (_id) => {
        setLoading(true);

        try {
            const { data } = await axios.delete(
                '../api/skill/delete',
                {
                    headers: { authorization: store.authorization },
                    params: { _id }
                }
            );

            const { ok } = data;
            if (ok) {
                setAlertStateConfirm({
                    ...alertStateConfirm,
                    open: false
                });

                getProjects();

                setAlertState({
                    text: 'seu projeto foi excluida com sucesso!',
                    severity: 'success',
                    open: true,
                    close: setAlertState
                });

                clearFormData();
                getProjects();
            }
        }
        catch (error) {
            console.log(error);
            setAlertState({
                text: 'Houve um problema ao deletar seu projeto. Por favor, tente novamente.',
                severity: 'error',
                open: true,
                close: setAlertState
            });
        }

        setLoading(false);
    }

    const handleDeleteSkillConfirm = (_id) => {
        setAlertStateConfirm({
            title: 'Deletar uma projeto',
            text: 'Deseja realmente deletar esta projeto?',
            open: true,
            close: setAlertStateConfirm,
            confirm: handleDeleteSkill,
            id: _id
        });
    }

    const clearFormData = () => {
        setFormData({});
        setImages([]);
        setProjectEdit(false);
    }

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    }

    const handleEditSkill = (item) => {
        const cat = category.find(el => el.value === item.category);

        setFormData({ ...item, category: cat });
        setProjectEdit(true);
        handleOpenModal();
    }

    return (
        <>
            <Header />
            <Menu validateToken={true} loading={loading} />
            <content id="content-skills">
                <Alert
                    state={alertState}
                />
                <AlertConfirm
                    state={alertStateConfirm}
                />

                <Modal state={modalState}>
                    <div className="skill-modal-new">
                        {
                            projectEdit
                                ? <h1>Editar projeto</h1>
                                : <h1>Novo projeto</h1>
                        }

                        <Input
                            label="Nome"
                            name="name"
                            placeholder="Nome do seu projeto"
                            value={formData.name || ''}
                            onChange={e => handleInputChange('name', e.target.value)}
                            required
                        />

                        <Input
                            label="Repositório"
                            name="repository"
                            placeholder="https://github.com/seuProjeto"
                            value={formData.repository || ''}
                            onChange={e => handleInputChange('repository', e.target.value)}
                        />

                        <Input
                            label="Endereço da publicação"
                            name="publishedIn"
                            placeholder="www.seuProjetoPublicado.com.br"
                            value={formData.publishedIn || ''}
                            onChange={e => handleInputChange('publishedIn', e.target.value)}
                        />

                        <TextArea
                            label="Descrição"
                            name="description"
                            placeholder="Descrição do seu projeto"
                            value={formData.description || ''}
                            onChange={e => handleInputChange('description', e.target.value)}
                            required
                        />

                        <InputFile
                            label="Imagens"
                            name="image"
                            accept="image/x-png,image/gif,image/jpeg"
                            files={images}
                            changeFiles={setImages}
                        />

                        <div className="skill-modal-new-buttons">
                            <div className="skill-modal-button" onClick={handleCloseModal}>
                                <ButtonSecondary label="Cancelar" />
                            </div>

                            <div className="skill-modal-button">
                                <Button label="Salvar" loading={loading} onClick={handleSaveProject} />
                            </div>
                        </div>
                    </div>
                </Modal>

                <div className="container">
                    <div className="skills-button-new" onClick={() => handleOpenModal(true)}>
                        <Button label="Novo" loading={loading} />
                    </div>

                    {
                        !projects.length
                            ? <div className="empty-skills-text">
                                <strong>
                                    Nenhum projeto encontrado. Por favor, cadastre alguns.
                            </strong>
                            </div>
                            : <div className="skills-content">
                                {projects.map(item => {
                                    return (
                                        <h3>projeto aqui</h3>
                                        // <div className="skill-item" key={item._id}>
                                        //     <strong>{item.name}</strong>

                                        //     <Rating
                                        //         size={40}
                                        //         value={item.rating}
                                        //         edit={false}
                                        //     />

                                        //     <div className="skill-item-footer">
                                        //         <div className="item-left">
                                        //             <span>Última atualização</span>
                                        //             <b>
                                        //                 {utils.maskDate(new Date(item.updatedAt))}
                                        //             </b>
                                        //         </div>

                                        //         <div className="item-right">
                                        //             <Delete onClick={() => handleDeleteSkillConfirm(item._id)} />
                                        //             <Edit onClick={() => handleEditSkill(item)} />
                                        //         </div>
                                        //     </div>
                                        // </div>
                                    )
                                })}
                            </div>
                    }
                </div>
            </content>
        </>
    )
}