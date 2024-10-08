import Head from "next/head";
import React from "react";


type Props = {
    children?: React.ReactNode,
    title?: string
}

const HomePageLayout: React.FC<Props> = ({
    children,
    title = "Home",
}) => {
    return (
        <div>
            <Head>
              <title>{title}</title>
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <main>{children}</main>
        </div>
    )
}

export default HomePageLayout