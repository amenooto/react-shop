import { graphql} from "msw";
import {QueryKeys} from "../queryClient";
import { v4 as uuid} from 'uuid'
import {GET_PRODUCTS, GET_PRODUCT} from "../graphql/products";
import {ADD_TO_CART, CartType, GET_CART} from "../graphql/cart";

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
        const newData = {...cartData}
        const id = req.variables.id
        if(newData[id]) {
            newData[id] = {
                ...newData[id],
                amount: (newData[id].amount || 0) + 1
            }
        } else {
            const found = mockProducts.find(item => item.id === req .variables.id)
            if (found) {
                newData[id] = {
                    ...found,
                    amount: 1
                }
            }
        }
        cartData = newData
        console.log('cart', cartData)
        return res(ctx.data(newData))
    })
]