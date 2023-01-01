import {CartType} from "../../graphql/cart";

export const ItemData = ({ imageUrl, price, title}: Pick<CartType, 'imageUrl' | 'price' | 'title'>) => {
    return (
        <>
            <img className="cart-item__image" src={imageUrl} alt=""/>
            <p className="cart-item__title">{title}</p>
            <p className="cart-item__price">{price}</p>
        </>
    )
}