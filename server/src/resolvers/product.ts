import {Resolver} from "./types";

const mockProducts = Array.from({ length: 20}).map((_, i) => ({
    id: i + 1 + '',
    imageUrl: `https://picsum.photos/id/${i+20}/200/150`,
    price: 50000,
    title: `product${i+1}`,
    description: `productDesc${i+1}`,
    createAt: new Date(123456789123+(i*1000*60*60*24)).toString()
}))
const productResolver: Resolver = {
    Query: {
        products: (parent, args, context, info) => {
            return mockProducts
        },
        product: (parent, { id }, context, info) => {
            const found =mockProducts.find(item => item.id === id)
            if (found) return found
            return null
        }
    }
}

export default productResolver