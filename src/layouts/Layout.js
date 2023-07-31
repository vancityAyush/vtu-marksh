import {NextSeo} from "next-seo";

export default function Layout({children}) {
    return (
        <>
            <NextSeo
                title="PySphere"
                description="PySphere revolutionizes digital transformation for startups and established businesses, empowering growth through innovative solutions and expert guidance."
                canonical="https://www.pyshere.in/"
                openGraph={{
                    url: "https://www.pyshere.in/",
                    title: "PySphere",
                    description:
                        "PySphere revolutionizes digital transformation for startups and established businesses, empowering growth through innovative solutions and expert guidance.",
                    type: "website",
                    site_name: "PySphere",
                    images: [
                        {
                            url: "https://pysphere.vercel.app/assets/seo/pysphere.png",
                            width: 800,
                            height: 600,
                            alt: "PySphere Technologies",
                            type: "image/png",
                        },
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
