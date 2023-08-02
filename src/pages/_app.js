import "@/styles/globals.css";
import Layout from "@/layouts/Layout";
import {Analytics} from "@vercel/analytics/react";


export default function App({Component, pageProps}) {
    return (
        <>
            <Layout>
                <Component {...pageProps} />
            </Layout>
            <Analytics/>
        </>
    );
}
