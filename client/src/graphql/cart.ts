import {gql} from "graphql-tag";
import {Product} from "./products";

export type CartType = {
    id: string
    amount: number
    product: Product
}

export const GET_CART = gql`
    query GET_CART {
        cart {
            id
            amount
            product {
                id
                imageUrl
                price
                title
                description
                createdAt
            }
        }
    }
`

export const ADD_TO_CART = gql`
    mutation ADD_TO_CART($id: ID!) {
        addCart(id: $id) {
            id
            amount
            product {
                id
                imageUrl
                price
                title
                description
                createdAt
            }
        }
    }
`

export const UPDATE_TO_CART = gql`
    mutation UPDATE_TO_CART($id: ID!, $amount: Int!) {
        updateCart(id: $id, amount: $amount) {
            id
            amount
            product {
                id
                imageUrl
                price
                title
                description
                createdAt
            }
        }
    }
`

export const DELETE_TO_CART = gql`
    mutation DELETE_TO_CART($id: ID!){
        deleteCart {
            id
        }
    }
`
