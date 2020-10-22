import { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Menu from '../../components/MenuAdmin';
import Button from '../../components/ButtonPrimary';
import ButtonSecondary from '../../components/ButtonSecondary';
import Alert from '../../components/Alert';
import Select from '../../components/Select';
import Modal from '../../components/Modal';


export default function Login() {
    const [loading, setLoading] = useState(false);
    const [skills, setSkills] = useState([]);
    const [alertState, setAlertState] = useState({});
    const [modalState, setModalState] = useState({});
    const [formData, setFormaData] = useState({});
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

            console.log('RETORNO', data);
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

    const handleOpenModal = () => {
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
            setFormaData({
                ...formData,
                category: formData.category || category[0].value,
                rating: formData.rating || 0
            });

            const { data } = await axios.post(
                '../api/createSkill', formData,
                { headers: { authorization: store.authorization } }
            );

            const { ok } = data;
            if (ok) {
                handleCloseModal();

                setAlertState({
                    text: 'Sua habilidade foi salva com sucesso!',
                    severity: 'success',
                    open: true,
                    close: setAlertState
                });
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

    const handleInputChange = (name, value) => {
        setFormaData({ ...formData, [name]: value });
    }

    return (
        <>
            <Header />
            <Menu validateToken={true} loading={loading} />
            <content id="content-skills">
                <Alert
                    state={alertState}
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
                            defaultValue={category[0]}
                            onChange={e => handleInputChange('category', e.value)}
                        />

                        <Input
                            label="Nome"
                            name="name"
                            required
                            onChange={e => handleInputChange('name', e.target.value)}
                            required
                        />

                        <div className="skill-modal-new-rating">
                            <span>Seu nível nesta habilidade</span>
                            <ReactStars
                                count={5}
                                size={40}
                                value={formData.rating || 0}
                                isHalf={true}
                                onChange={e => handleInputChange('rating', e)}
                                activeColor="#0094A8"
                                color="#293749"
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
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
                    <div className="skills-button-new" onClick={handleOpenModal}>
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
                                <h1>temos skills</h1>
                            </div>
                    }
                </div>
            </content>
        </>
    )
}