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
        cartType(id: $id) {
            id
            imageUrl
            price
            title
            amount
        }
    }
`

export const UPDATE_TO_CART = gql`
    mutation UPDATE_TO_CART($id: string, $amount: number) {
        cartType(id: $id, amount: $amount) {
            id
            imageUrl
            price
            title
            amount
        }
    }
`

export const DELETE_TO_CART = gql`
    mutation DELETE_TO_CART($id: string){
        id
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