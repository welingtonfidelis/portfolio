import { route } from 'next/dist/next-server/server/router';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import Menu from '../../components/MenuAdmin';

export default function Login() {
    const store = useSelector(state => state);
    const router = useRouter();

    const optionItems = [
        { name: 'Habilidades', code: 'skill' }, { name: 'Projetos', code: 'project' }
    ]

    console.log('chegando ---->', store);

    const handleSelectOption = (option) => {
        switch (option) {
            case 'skill':
                console.log(1);
                router.push('/Skills');
                break;

            case 'project':
                console.log(2);
                break;

            default:
                break;
        }
    }

    return (
        <>
            <Header />
            <Menu showName={true} validateToken={true} />
            <content id="content-dashboard">
                <div className="container">
                    {
                        optionItems.map(item => (
                            <div 
                                className="option-card" 
                                key={item.code} 
                                onClick={() => handleSelectOption(item.code)}
                            >
                                {item.name}
                            </div>
                        ))
                    }
                </div>
            </content>
        </>
    )
}