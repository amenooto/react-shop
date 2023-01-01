import {CartType} from "../../graphql/cart";
import CartItem from "./item";
import {createRef, SyntheticEvent, useEffect, useRef, useState} from "react";
import {useRecoilState} from "recoil";
import {checkedCartState} from "../../recoils/cart";
import {WillPay} from "../willPay/willPay";
import {useNavigate} from "react-router-dom";

const CartList = ({ items }: { items: CartType[] }) => {
    const navigate = useNavigate()
    const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState)
    const formRef = useRef<HTMLFormElement>(null)
    const checkboxRefs = items.map(() => createRef<HTMLInputElement>())
    const [formData, setFormData] = useState<FormData>()

    const setAllCheckedFromItems = () => {
        if (!formRef.current) return
        const data = new FormData(formRef.current)
        const selectedCount = data.getAll('select-item').length
        const allChecked = selectedCount === items.length
        formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = allChecked
    }

    const setItemsCheckedFormAll = (targetInput: HTMLInputElement) => {
        const allChecked = targetInput.checked
        checkboxRefs.forEach(inputElem => {
            inputElem.current!.checked = allChecked
        })
    }

    const handleCheckboxChanged = (e?: SyntheticEvent) => {
        if (!formRef.current) return
        const targetInput = e?.target as HTMLInputElement
        if (targetInput && targetInput.classList.contains('select-all')) {
            setItemsCheckedFormAll(targetInput)
        } else {
            setAllCheckedFromItems()
        }
        const data = new FormData(formRef.current)
        setFormData(data)
    }

    useEffect(() => {
        checkedCartData.forEach(item => {
            const itemRef = checkboxRefs.find(ref => ref.current!.dataset.id === item.id)
            if (itemRef) itemRef.current!.checked = true
        })
        setAllCheckedFromItems()
    }, [])

    useEffect(() => {
        const checkedItems = checkboxRefs.reduce<CartType[]>((res, ref, i) => {
            console.log(ref.current!.checked)
            if (ref.current!.checked) res.push(items[i])
            return res
        }, [])
        setCheckedCartData(checkedItems)
    }, [items, formData])

    const handleSubmit = () => {
        if (checkedCartData.length) {
            navigate('/payment')
        } else {
            alert('empty')
        }
    }

    return (
        <div>
            <form ref={formRef} onChange={handleCheckboxChanged}>
                <label><input type="checkbox" className="select-all" name="select-all"/>all check</label>
                <ul className="cart">
                    {items.map((item, i) => <CartItem {...item} key={item.id} ref={checkboxRefs[i]} />)}
                </ul>
            </form>
            <WillPay handleSubmit={handleSubmit} submitTitle="go to payment" />
        </div>
    )
}

export default CartList