import {useRecoilState, useSetRecoilState} from "recoil";
import {checkedCartState} from "../../recoils/cart";
import {WillPay} from "../willPay/willPay";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {PaymentModal} from "./modal";
import {useMutation} from "react-query";
import {grapqlFetcher} from "../../queryClient";
import {EXECUTE_PAY} from "../../graphql/payment";

type PaymentInfos = string[]

export const Payment = () => {
    const navigate = useNavigate()
    const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState)
    const [modalShow, setModalShow] = useState(false)

    const { mutate: executePay } = useMutation((payInfos: PaymentInfos) =>
        grapqlFetcher(EXECUTE_PAY, payInfos),
    )

    const showModal = () => {
        setModalShow(true)
    }

    const proceed = () => {
        const payInfos = checkedCartData.map(({ id}) => id)
        executePay(payInfos)
        setCheckedCartData([])
        alert('success')
        navigate('/products', {replace: true})
    }

    const cancel = () => {
        setModalShow(false)
    }
    return (
        <div>
            <WillPay handleSubmit={showModal} submitTitle="payment" />
            <PaymentModal show={modalShow} proceed={proceed} cancel={cancel} />
        </div>
    )
}