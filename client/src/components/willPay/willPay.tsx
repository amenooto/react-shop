import {useRecoilValue} from "recoil";
import {ItemData} from "../cart/itemData";
import { useNavigate } from 'react-router-dom'
import {checkedCartState} from "../../recoils/cart";
import {Link} from "react-router-dom";
import {SyntheticEvent} from "react";

export const WillPay = ({handleSubmit, submitTitle} :
                            {handleSubmit: (e: SyntheticEvent) => void, submitTitle: string}) => {
    const checkedItems = useRecoilValue(checkedCartState)
    const navigate = useNavigate()
    console.log(checkedItems)
    const totalPrice = checkedItems.reduce((res, { price, amount }) => {
        res += price * amount;
        return res
    }, 0)

    return (
        <div className="cart-willpay">
            <ul>
                {checkedItems.map(({ imageUrl, price, title, id, amount}) => (
                    <li key={id}>
                        <ItemData imageUrl={imageUrl} price={price} title={title} />
                        <p>amount: {amount}</p>
                        <p>price: {price * amount}</p>
                    </li>
                ))}
            </ul>
            <p>total price: {totalPrice}</p>
            <button onClick={handleSubmit}>{submitTitle}</button>
        </div>
    )
}