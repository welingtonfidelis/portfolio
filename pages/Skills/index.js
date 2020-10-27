import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Delete, Edit } from '@material-ui/icons';
import axios from 'axios';

import Header from '../../components/Header';
import Input from '../../components/Input';
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
    const [skills, setSkills] = useState([]);
    const [alertState, setAlertState] = useState({});
    const [alertStateConfirm, setAlertStateConfirm] = useState({});
    const [modalState, setModalState] = useState({});
    const [formData, setFormData] = useState({});
    const [skillEdit, setSkillEdit] = useState();

    const store = useSelector(state => state);
    const category = [
        { label: 'Front-End', value: 'front' },
        { label: 'Back-End', value: 'back' },
        { label: 'Mobile', value: 'mobile' }
    ]

    useEffect(() => {
        getSkills();
    }, []);

    const getSkills = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get(
                '../api/getSkill',
                { headers: { authorization: store.authorization } }
            );

            const { ok, skills } = data;
            if (ok) setSkills(skills);
        }
        catch (error) {
            console.log(error);
            setAlertState({
                text: 'Houve um problema ao trazer suas habilidades. Por favor, tente novamente.',
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

    const handleSaveSkill = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const body = {
                category: formData.category
                    ? (formData.category.value || formData.category)
                    : category[0].value,
                rating: formData.rating || 0,
                name: formData.name || ''
            };

            const { data } = formData._id
                ? await axios.put(
                    '../api/updateSkill', body,
                    {
                        headers: { authorization: store.authorization },
                        params: { _id: formData._id }
                    }
                )
                : await axios.post(
                    '../api/createSkill', body,
                    { headers: { authorization: store.authorization } }
                )

            const { ok } = data;
            if (ok) {
                handleCloseModal();

                setAlertState({
                    text: 'Sua habilidade foi salva com sucesso!',
                    severity: 'success',
                    open: true,
                    close: setAlertState
                });

                clearFormData();
                getSkills();
            }
        }
        catch (error) {
            console.log(error);
            setAlertState({
                text: 'Houve um problema ao salvar sua habilidade. Por favor, tente novamente.',
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
                '../api/deleteSkill',
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

                getSkills();

                setAlertState({
                    text: 'Sua habilidade foi excluida com sucesso!',
                    severity: 'success',
                    open: true,
                    close: setAlertState
                });

                clearFormData();
                getSkills();
            }
        }
        catch (error) {
            console.log(error);
            setAlertState({
                text: 'Houve um problema ao deletar sua habilidade. Por favor, tente novamente.',
                severity: 'error',
                open: true,
                close: setAlertState
            });
        }

        setLoading(false);
    }

    const handleDeleteSkillConfirm = (_id) => {
        setAlertStateConfirm({
            title: 'Deletar uma habilidade',
            text: 'Deseja realmente deletar esta habilidade?',
            open: true,
            close: setAlertStateConfirm,
            confirm: handleDeleteSkill,
            id: _id
        });
    }

    const clearFormData = () => {
        setFormData({});
    }

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    }

    const handleEditSkill = (item) => {
        const cat = category.find(el => el.value === item.category);

        setFormData({ ...item, category: cat });
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
                    <form className="skill-modal-new" onSubmit={handleSaveSkill}>
                        {
                            skillEdit
                                ? <h1>Editar habilidade</h1>
                                : <h1>Nova habilidade</h1>
                        }

                        <Select
                            placeholder="Escolha uma categoria"
                            label="Categoria"
                            options={category}
                            value={formData.category || category[0]}
                            onChange={e => handleInputChange('category', e.value)}
                        />

                        <Input
                            label="Nome"
                            name="name"
                            required
                            value={formData.name || ''}
                            onChange={e => handleInputChange('name', e.target.value)}
                            required
                        />

                        <div className="skill-modal-new-rating">
                            <span>Seu nível nesta habilidade</span>
                            <Rating
                                size={40}
                                value={formData.rating || 0}
                                onChange={e => handleInputChange('rating', e)}
                            />
                        </div>

                        <div className="skill-modal-new-buttons">
                            <div className="skill-modal-button" onClick={handleCloseModal}>
                                <ButtonSecondary label="Cancelar" />
                            </div>

                            <div className="skill-modal-button">
                                <Button label="Salvar" loading={loading} />
                            </div>
                        </div>
                    </form>
                </Modal>

                <div className="container">
                    <div className="skills-button-new" onClick={() => handleOpenModal(true)}>
                        <Button label="Novo" loading={loading} />
                    </div>

                    {
                        !skills.length
                            ? <div className="empty-skills-text">
                                <strong>
                                    Nenhuma habilidade encontrada. Por favor, cadastre algumas.
                            </strong>
                            </div>
                            : <div className="skills-content">
                                {skills.map(item => {
                                    return (
                                        <div className="skill-item" key={item._id}>
                                            <strong>{item.name}</strong>

                                            <Rating
                                                size={40}
                                                value={item.rating}
                                                edit={false}
                                            />

                                            <div className="skill-item-footer">
                                                <div className="item-left">
                                                    <span>Última atualização</span>
                                                    <b>
                                                        {utils.maskDate(new Date(item.updatedAt))}
                                                    </b>
                                                </div>

                                                <div className="item-right">
                                                    <Delete onClick={() => handleDeleteSkillConfirm(item._id)} />
                                                    <Edit onClick={() => handleEditSkill(item)} />
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