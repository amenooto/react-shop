import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import {request, RequestDocument} from 'graphql-request'

type AnyOBJ = { [key: string]: any}

export const getClient = (() => {
   let client: QueryClient | null = null;
   return () => {
       if (!client) client = new QueryClient({
           defaultOptions: {
               queries: {
                   // 캐시 처리
                   cacheTime: Infinity,
                   staleTime: Infinity,
                   refetchOnMount: false,
                   refetchOnReconnect: false,
                   refetchOnWindowFocus: false
               }
           }
       })
       return client
   }
})()

const BASE_URL = 'http://localhost:8000/graphql'

export const restFetcher = async ({
    method,
    path,
    body,
    params
} : {
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH';
    path: string;
    body?: AnyOBJ;
    params?: AnyOBJ;
}) => {
    try {
        let url = `${BASE_URL}${path}`
        const fetchOptions:RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Access-control-Allow-Origin': BASE_URL
            }
        }

        if (params) {
            const searchParams = new URLSearchParams(params)
            url += '?' + searchParams.toString()
        }

        if (body) fetchOptions.body = JSON.stringify(body)

        const res = await fetch(url, fetchOptions)
        const json = await res.json()
        return json
    } catch (error) {
        console.error(error)
    }
}

export const grapqlFetcher = (query: RequestDocument, variables = {}) => request(
    BASE_URL, query, variables
)

export const QueryKeys = {
    PRODUCTS: 'PRODUCTS',
    CART: 'CART'
}