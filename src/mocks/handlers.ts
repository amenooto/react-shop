import { graphql} from "msw";
import {QueryKeys} from "../queryClient";
import { v4 as uuid} from 'uuid'
import {GET_PRODUCTS, GET_PRODUCT} from "../graphql/products";
import {ADD_TO_CART, CartType, DELETE_TO_CART, GET_CART, UPDATE_TO_CART} from "../graphql/cart";

const mockProducts = Array.from({ length: 20}).map((_, i) => ({
    id: i + 1 + '',
    imageUrl: `https://placeimg.com/200/150/${i+1}`,
    price: 50000,
    title: `product${i+1}`,
    description: `productDesc${i+1}`,
    createAt: new Date(123456789123+(i*1000*60*60*24)).toString()
}))

let cartData: { [key: string]: CartType} = {}

export const handlers = [
    graphql.query(GET_PRODUCTS, (req, res, ctx) => {
        return res (
            ctx.data({
                products: mockProducts
            })
        )
    }),
    graphql.query(GET_PRODUCT, (req, res, ctx) => {
        const found = mockProducts.find(item => item.id === req .variables.id)
        if (found) return res(ctx.data(found))
        return res()
    }),
    graphql.query(GET_CART, (req, res, ctx) => {
        console.log('get',cartData)
        return res(ctx.data(cartData))
    }),
    graphql.mutation(ADD_TO_CART, (req, res, ctx) => {
        const newCartData = {...cartData}
        const id = req.variables.id
        console.log('here')
        const targetProd = mockProducts.find(item => item.id === req .variables.id)
        if (!targetProd) { throw new Error('no product')}

        const newItem = {
            ...targetProd,
            amount: (newCartData[id]?.amount || 0) + 1
        }
        newCartData[id] = newItem
        cartData = newCartData
        return res(ctx.data(newItem))
    }),
    graphql.mutation(UPDATE_TO_CART, (req, res, ctx) => {
        const newData = {...cartData}
        const { id, amount } = req.variables
        console.log(id, amount)
        if(!newData[id]) { throw new Error('not data')}
        const newItem = {
            ...newData[id],
            amount,
        }
        newData[id] = newItem
        cartData = newData
        return res(ctx.data(newItem))
    }),
    graphql.mutation(DELETE_TO_CART, ({ variables: { id }}, res, ctx) => {
        const newData = { ...cartData }
        delete newData[id]
        cartData = newData
        return res(ctx.data(id))
    })
]