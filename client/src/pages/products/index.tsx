import {useQuery} from "react-query";
import {grapqlFetcher, QueryKeys} from "../../queryClient";
import ProductItem from "../../components/product/item";
import {GET_PRODUCTS, Products} from "../../graphql/products";
import ProductList from "../../components/product/list";

const ProductListPage = () => {
    const { data } = useQuery<Products>(QueryKeys.PRODUCTS, () => grapqlFetcher(GET_PRODUCTS))

    return (
        <div>
            <h2>item list</h2>
            <ProductList list={data?.products || []} />
        </div>
    )
}
export default ProductListPage;