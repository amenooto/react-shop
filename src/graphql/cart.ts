import {gql} from "graphql-tag";

export type CartType = {
    id: string
    imageUrl: string,
    price: number,
    title: string,
    amount: number
}

export const ADD_TO_CART = gql`
    mutation ADD_TO_CART($id: string) {
        cartType {
            id
            imageUrl
            price
            title
            amount
        }
    }
`

export const GET_CART = gql`
    query GET_CART {
        cartType {
            id
            imageUrl
            price
            title
            amount
        }
    }
`