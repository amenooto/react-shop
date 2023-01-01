import {Product} from "../../graphql/products";

const ProductDetail = ({
    item: {
        title,
        imageUrl,
        description,
        price,
    }
}: {
    item: Product
}) => (
    <div className="product-detail">
        <p className="product-detail__title">{title}</p>
        <img src={imageUrl} alt="" className="product-detail__image"/>
        <span className="product-detail__description">{description}</span>
        <span className="product-detail__price">${price}</span>
    </div>
)

export default ProductDetail