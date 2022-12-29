import { Link } from 'react-router-dom'
import {Product} from "../../graphql/products";
import {cartItemSelector} from "../../recoils/cart";
import {useRecoilState} from "recoil";
import {useMutation} from "react-query";
import {grapqlFetcher, QueryKeys} from "../../queryClient";
import {ADD_TO_CART} from "../../graphql/cart";

const ProductItem = ({
    id,
    imageUrl,
    price,
    title,
    description,
    createdAt
} : Product) => {
    const {mutate: addToCart} = useMutation((id: string) => grapqlFetcher(ADD_TO_CART, { id }))
    return (
        <li className="product-item">
            <Link to={`/products/${id}`}>
                <p className="product-item__title">{title}</p>
                <img src={imageUrl} alt="" className="product-item__image"/>
                <span className="product-item__price">${price}</span>
            </Link>
            <button className="product-item__add-cart" onClick={() => addToCart(id)}>add Cart</button>
        </li>
    )
}

export default ProductItem