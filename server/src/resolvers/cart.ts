import {Cart, Resolver} from "./types";
import {DBField, writeDB} from "../dbController";

const setJson = (data: Cart) => writeDB(DBField.CART, data);

const cartResolver: Resolver = {
    Query: {
        cart: (parent, args, { db }, info) => {
            return db.cart
        },
    },
    Mutation: {
        addCart: (parent, { id }, { db }, info) => {
            if (!id) throw Error('no id')
            const targetProd = db.products.find(item => item.id === id)
            if (!targetProd) { throw new Error('no product')}

            const existCartIndex = db.cart.findIndex(item => item.id === id)
            if (existCartIndex > -1) {
                const newCartItem = {
                    id,
                    amount: db.cart[existCartIndex].amount + 1
                }
                db.cart.splice(existCartIndex, 1, newCartItem)
                setJson(db.cart)
                return newCartItem
            }

            const newItem = {
                id,
                amount: 1,
            }
            db.cart.push(newItem)
            setJson(db.cart)
            return newItem
        },
        updateCart: (parent, { id, amount }, { db }, info) => {
            const existCartIndex = db.cart.findIndex(item => item.id === id)
            if(existCartIndex < 0) { throw new Error('not data')}
            const newCartItem = {
                id,
                amount
            }
            db.cart.splice(existCartIndex,1, newCartItem)
            setJson(db.cart)
            return newCartItem
        },
        deleteCart: (parent, { id }, { db }, info) => {
            const existCartIndex = db.cart.findIndex(item => item.id === id)
            if(existCartIndex < 0) { throw new Error('not data')}
            db.cart.splice(existCartIndex, 1)
            setJson(db.cart)
            return id
        },
        executePay: (parent, { ids }, { db }, info) => {
            const newCartData = db.cart.filter(cartItem => !ids.includes(cartItem.id))
            db.cart = newCartData
            setJson(db.cart)
            return ids
        },
    },
    CartItem: {
        product: (cartItem, args, { db }) => db.products.find((product: any) =>
            product.id === cartItem.id)
    }
}

export default cartResolver