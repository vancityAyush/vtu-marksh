import {NextSeo} from "next-seo";

export default function Layout({children}) {
    return (
        <>
            <NextSeo
                title="VTU Marksh"
                description="PySphere revolutionizes digital transformation for startups and established businesses, empowering growth through innovative solutions and expert guidance."
                canonical="https://vtumarksh.vercel.app/"
                openGraph={{
                    url: "https://vtumarksh.vercel.app/",
                    title: "VTU Marksh",
                    description: "Get your Marks Card here",
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
