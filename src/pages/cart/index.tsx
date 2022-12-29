import {useQuery} from "react-query";
import {grapqlFetcher, QueryKeys} from "../../queryClient";
import {GET_CART} from "../../graphql/cart";
import CartList from "../../components/cart";
import {CartType} from "../../graphql/cart";

const Cart = () => {
    const {data} = useQuery(QueryKeys.CART, () => grapqlFetcher(GET_CART), {
        // 이유는?
        staleTime: 0,
        cacheTime: 1000,
    })
    console.log(data)

    const cartItems = Object.values(data || {}) as CartType[]

    if (!cartItems.length) return <div>empty</div>
    return <CartList items={cartItems} />
}

export default Cart