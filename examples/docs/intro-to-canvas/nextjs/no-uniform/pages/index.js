import {
  CanvasClient,
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
} from "@uniformdev/canvas";
import HomeLayout from "../components/HomeLayout";
import doEnhance from "../lib/enhancer";
import { useLivePreviewNextStaticProps } from "../hooks/useLivePreviewNextStaticProps";
import getConfig from "next/config";

async function getComposition(slug, preview) {
  const client = new CanvasClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
  });
  const { composition } = await client.getCompositionBySlug({
    slug,
    state: preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
  });
  return composition;
}
export async function getStaticProps({ preview }) {
  const slug = "/";
  const composition = await getComposition(slug, preview);

  await doEnhance(composition);

  return {
    props: {
      composition,
    },
  };
}
const { publicRuntimeConfig } = getConfig();
const { uniform } = publicRuntimeConfig;

export default function Home({ composition }) {
  useLivePreviewNextStaticProps({
    compositionId: composition?._id,
    projectId: uniform.projectId,
  });
  return <HomeLayout composition={composition} />;
}
