import fs from 'fs';
import { resolve} from "path";

export enum DBField {
    CART = 'cart',
    PRODUCTS = 'products'
}

const basePath = resolve()

const filename = {
    [DBField.CART]: resolve(basePath, 'src/db/cart.json'),
    [DBField.PRODUCTS]: resolve(basePath, 'src/db/products.json'),
}

export const readDb = (target: DBField) => {
    try {
        return JSON.parse(fs.readFileSync(filename[target], 'utf-8'))
    } catch (e) {
        console.error(e)
    }
}

export const writeDB = (target: DBField, data: any) => {
    try {
        fs.writeFileSync(filename[target], JSON.stringify(data, null ,' '))
    } catch (e) {
        console.error(e)
    }
}