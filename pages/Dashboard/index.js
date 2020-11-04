import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Menu from '../../components/MenuAdmin';

export default function Login() {
    const router = useRouter();

    const optionItems = [
        { name: 'Habilidades', code: 'skill' }, { name: 'Projetos', code: 'project' }
    ]

    const handleSelectOption = (option) => {
        switch (option) {
            case 'skill':
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