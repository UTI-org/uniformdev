import React from "react";
import Stack from "../sdk-plugin/index";
import Layout from "../components/layout";
import RenderComponents from "../components/render-components";
import PersonalizedHero from "../components/personalized-hero";

export default function Home(props) {
  const { header, footer, result } = props;
  const { personalized_hero } = result;
  return (
    <Layout header={header} footer={footer} page={result}>
      {personalized_hero && <PersonalizedHero variations={personalized_hero} />}
      {result.page_components && (
        <RenderComponents
          pageComponents={result.page_components}
          contentTypeUid="page"
          entryUid={result.uid}
          locale={result.locale}
        />
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    const result = await Stack.getEntryByUrl({
      contentTypeUid: "page",
      entryUrl: context.resolvedUrl,
      referenceFieldPath: [
        "page_components.from_blog.featured_blogs",
        "personalized_hero",
      ],
      jsonRtePath: [
        "page_components.from_blog.featured_blogs.body",
        "page_components.section_with_buckets.buckets.description",
      ],
    });
    const header = await Stack.getEntry({
      contentTypeUid: "header",
      referenceFieldPath: ["navigation_menu.page_reference"],
      jsonRtePath: ["notification_bar.announcement_text"],
    });
    const footer = await Stack.getEntry({
      contentTypeUid: "footer",
      jsonRtePath: ["copyright"],
    });
    return {
      props: {
        header: header[0][0],
        footer: footer[0][0],
        result: result[0],
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
