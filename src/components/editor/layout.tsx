import Head from "next/head";
import React from "react";
import '../../app/globals.css'

type Props = {
    children?: React.ReactNode,
    title?: string
}

const EditorLayout: React.FC<Props> = ({
    children,
    title = "Demo",
}) => {
    return (
        <div>
            <Head>
                <title>
                    {title}
                </title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <main>
                {children}
            </main>
        </div>
    )
}

export default EditorLayout