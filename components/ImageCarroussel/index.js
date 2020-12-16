import { Image } from '@material-ui/icons';
import AwesomeSlider from 'react-awesome-slider';

export default function InputComponent({ images = [], ...rest }) {
    return (
        <div className="image-carrousel-block">
            {
                images.length
                    ? <AwesomeSlider>
                        {
                            images.map((item, index) => {
                                return (
                                    <div className="" key={index}>
                                        <img src={item} alt="Project image" />
                                    </div>
                                )
                            })
                        }
                    </AwesomeSlider>
                    : <Image />
            }
        </div>
    )
}