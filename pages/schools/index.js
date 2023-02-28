import Sidebar from "../../components/sidebar"
import Wrapper from "../../components/wrapper"
import Header from "../../components/header"
import Footer from "../../components/footer"
import Body from "../../components/body/schools"
import { useState } from "react";
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Default() {
    const router = useRouter();
    const [showSidebar, SetshowSidebar] = useState(false);
    const handlerSide  = () => {
        SetshowSidebar(!showSidebar)
    }
    return (
        <>
        <Head>
            <title>School</title>
        </Head>
        <Sidebar showSidebar={showSidebar} />
        <Wrapper>
            <Header
                showSidebar={showSidebar}
                SetshowSidebar={SetshowSidebar}
                handler={handlerSide} 
                pathname={router.pathname}
                />
            <Body />
            <Footer />
        </Wrapper>
        </>
    )
}