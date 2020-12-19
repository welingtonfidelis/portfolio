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
import Modal from '../../components/Modal';
import ImageCarroussel from '../../components/ImageCarroussel';

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
    const [removeImages, setRemoveImages] = useState([]);

    const store = useSelector(state => state);

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
                    images: [],
                    removeImages
                }
                for(const image of images) {
                    if(typeof image !== 'string') {
                        body.images.push(await utils.fileToBase64(image));
                    }
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

    const handleDeleteProject = async (_id) => {
        setLoading(true);

        try {
            const { data } = await axios.delete(
                '../api/project/delete',
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
                clearFormData();

                setAlertState({
                    text: 'Seu projeto foi excluido com sucesso!',
                    severity: 'success',
                    open: true,
                    close: setAlertState
                });
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

    const handleDeleteProjectConfirm = (_id) => {
        setAlertStateConfirm({
            title: 'Deletar um projeto',
            text: 'Deseja realmente deletar este projeto?',
            open: true,
            close: setAlertStateConfirm,
            confirm: handleDeleteProject,
            id: _id
        });
    }

    const clearFormData = () => {
        setFormData({});
        setImages([]);
        setRemoveImages([]);
        setProjectEdit(false);
    }

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    }

    const handleEditProject = (item) => {
        setFormData({ ...item });
        setImages(item.imagesUrl);
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
                            onChangeAddFiles={setImages}
                            onChangeRmFiles={setRemoveImages}
                            rmFiles={removeImages}
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
                                        <div className="project-item" key={item._id}>
                                            <strong>{item.name}</strong>

                                            <ImageCarroussel images={item.imagesUrl}/>

                                            <div className="skill-item-footer">
                                                <div className="item-left">
                                                    <span>Última atualização</span>
                                                    <b>
                                                        {utils.maskDate(new Date(item.updatedAt))}
                                                    </b>
                                                </div>

                                                <div className="item-right">
                                                    <Delete onClick={() => handleDeleteProjectConfirm(item._id)} />
                                                    <Edit onClick={() => handleEditProject(item)} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                    }
                </div>
            </content>
        </>
    )
}