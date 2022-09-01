import Head from "next/head";

import Footer from "./Footer";

import { Slot, Composition } from "@uniformdev/canvas-react";
import resolveRenderer from "../lib/resolveRenderer";

export default function HomeLayout({ composition }) {
  return (
    <div className="container">
      <Head>
        <title>Testing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Composition data={composition} resolverenderer={resolveRenderer}>
        <Slot name="body" />
        <Slot name="hero" />
      </Composition>
      <Footer />
    </div>
  );
}
