import {useQuery} from "react-query";
import {Link, useParams} from 'react-router-dom'
import {grapqlFetcher, QueryKeys} from "../../queryClient";
import ProductDetail from "../../components/product/detail";
import {GET_PRODUCT, Product} from "../../graphql/products";

const ProductDetailPage = () => {
    const { id } = useParams()
    const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
        grapqlFetcher(GET_PRODUCT, { id }))

    if (!data) return null

    return (
        <div>
            <h2>product detail...</h2>
            <ProductDetail item={data} />
        </div>
    )
}

export default ProductDetailPage