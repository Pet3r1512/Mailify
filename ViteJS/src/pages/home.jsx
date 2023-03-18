import React from "react";
import {Helmet} from "react-helmet";

export default function Home() {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Mailify | Home</title>
            </Helmet>
            <h1>This is homepage</h1>
        </>
    )
}