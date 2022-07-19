import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface SeoProps {
    type?: 'item' | 'order',
    name?: string
}

const Seo: React.FC<SeoProps> = (props: SeoProps) => {
    const router = useRouter();

    if (router.pathname == '/') {
        return (
            <Head>
                <title>Welcome to AvCommerce! From Grocery Items to Electronics to Basically Everything</title>
            </Head>
        )
    }

    if (props.type == 'item' || props.type == 'order') {
        return (
            <Head>
                <title>{props.type == 'item' ? props.name : "Order - Ecommerce"}</title>
            </Head>
        )
    }

    return (
        <Head>
            <title>AvCommerce</title>
        </Head>
    )
}

export default Seo