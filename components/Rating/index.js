import ReactStars from 'react-rating-stars-component';

export default function Rating ({ name, ...rest }) {
    return (
        <ReactStars
            id={name}
            count={5}
            isHalf={true}
            activeColor="#0094A8"
            color="#293749"
            {...rest}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
        />
    )
}