import {CartType, DELETE_TO_CART, UPDATE_TO_CART} from "../../graphql/cart";
import {useMutation} from "react-query";
import {getClient, grapqlFetcher, QueryKeys} from "../../queryClient";
import {ForwardedRef, forwardRef, SyntheticEvent} from "react";
import {ItemData} from "./itemData";

const CartItem = ({
    id,
    amount,
    product: {
        imageUrl,
        price,
        title,
    }
} : CartType, ref: ForwardedRef<HTMLInputElement>) => {
    const queryClient = getClient();

    const { mutate: updateCart } = useMutation(
        ({ id, amount }: { id: string; amount: number }) => grapqlFetcher(UPDATE_TO_CART, { id, amount }),
        {
            onMutate: async ({ id, amount }) => {
                await queryClient.cancelQueries(QueryKeys.CART)
                const { cart: prevCart } = queryClient.getQueryData<{ cart: CartType[] }>(
                    QueryKeys.CART,
                ) || { cart: [] }
                if (!prevCart) return null

                const targetIndex = prevCart.findIndex(cartItem => cartItem.id === id)
                if (targetIndex === undefined || targetIndex < 0) return prevCart

                const newCart = [...prevCart]
                newCart.splice(targetIndex, 1, { ...newCart[targetIndex], amount })
                queryClient.setQueryData(QueryKeys.CART, { cart: newCart })
                return prevCart
            },
            onSuccess: ({ updateCart }) => {
                const { cart: prevCart } = queryClient.getQueryData<{ cart: CartType[] }>(
                    QueryKeys.CART,
                ) || { cart: [] }
                const targetIndex = prevCart?.findIndex(cartItem => cartItem.id === updateCart.id)
                if (!prevCart || targetIndex === undefined || targetIndex < 0) return

                const newCart = [...prevCart]
                newCart.splice(targetIndex, 1, updateCart)
                queryClient.setQueryData(QueryKeys.CART, { cart: newCart })
            },
        },
    )

    const handleUpdateAmount = (e: SyntheticEvent) => {
        const amount = Number((e.target as HTMLInputElement).value)
        if (amount < 1) return
        updateCart({id, amount})
    }

    const { mutate: deleteCart } = useMutation(({ id }: { id: string }) =>
            grapqlFetcher(DELETE_TO_CART, { id }),
        {
            // 낙관적 업데이트로 수정하기
            onSuccess: () => {
                queryClient.invalidateQueries(QueryKeys.CART)
            }
        }
    )

    const handleDeleteItem = () => {
        deleteCart({id})
    }

    return (
        <li className="cart-item">
            <input className="cart-item__checkbox" type="checkbox" name="select-item" ref={ref} data-id={id} />
            <ItemData imageUrl={imageUrl} price={price} title={title} />
            <input type="number" min={1} className="cart-item__amount" value={amount} onChange={handleUpdateAmount}/>
            <button type="button" className="cart-item__button" onClick={handleDeleteItem}>delete</button>
        </li>
    )
}

export default forwardRef(CartItem)