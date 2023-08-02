import {NextSeo} from "next-seo";

export default function Layout({children}) {
    return (
        <>
            <NextSeo
                title="VTU Marksh"
                description="a Ayush Kumar Production"
                canonical="https://vtumarksh.vercel.app/"
                openGraph={{
                    url: "https://vtumarksh.vercel.app/",
                    title: "VTU Marksh",
                    description: "Get your VTU marksheets in a jiffy. a Ayush Kumar Production",
                    type: "website",
                    site_name: "VTU Marksh",
                    images: [
                        // {
                        //     url: "https://pysphere.vercel.app/assets/seo/pysphere.png",
                        //     width: 800,
                        //     height: 600,
                        //     alt: "PySphere Technologies",
                        //     type: "image/png",
                        // },
                    ],
                }}
            />
            {/* <ThemeProvider attribute="class" defaultTheme="dark"> */}
            {/* <Navbar /> */}
            <main>{children}</main>
            {/* <Footer /> */}
            {/* </ThemeProvider> */}
        </>
    );
}
