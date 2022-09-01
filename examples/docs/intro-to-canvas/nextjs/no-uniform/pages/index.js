import { CanvasClient } from "@uniformdev/canvas";
import { Composition } from "@uniformdev/canvas-react";
import LayoutCanvas from "../components/LayoutCanvas";
import HomeLayout from "../components/HomeLayout";
import content from "../content/content.json";
import doEnhance from "../lib/enhancer";
import resolveRenderer from "../lib/resolveRenderer";
async function getComposition(slug) {
  const client = new CanvasClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
  });
  const { composition } = await client.getCompositionBySlug({
    slug,
  });
  return composition;
}
export async function getStaticProps() {
  const slug = "/";
  const topic = content.find((e) => e.url == slug);
  const composition = await getComposition(slug);

  await doEnhance(composition);

  console.log("composition", JSON.stringify(composition, null, 2));

  //Return props for the home page that
  //include the composition and content
  //required by the page components.

  return {
    props: {
      composition,
    },
  };
}
export default function Home({ composition }) {
  // console.log(composition);
  // console.log(fields);
  return <HomeLayout composition={composition} />;
}
