import { Link } from 'react-router-dom'
import {Product} from "../../graphql/products";
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
    /*const [cartAmount, setCartAmount] = useRecoilState(cartItemSelector(id))
    const addToCart = () => setCartAmount(prev => (prev || 0) + 1)*/
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