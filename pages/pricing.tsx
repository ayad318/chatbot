import { GetStaticPropsResult } from "next";
import Pricing from "../components/Pricing";
import { Product } from "../types";
import { getActiveProductsWithPrices } from "../utils/supabase-client";


interface Props {
    products: Product[];
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
    const products = await getActiveProductsWithPrices();

    return {
        props: {
            products
        },
        revalidate: 60
    };
}
const pricePage = ({ products }: Props) => {
    return (<Pricing products={products}></Pricing>)
}

export default pricePage;