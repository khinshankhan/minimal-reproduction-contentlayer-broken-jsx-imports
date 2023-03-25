import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { allWritings as pages, type Writing } from "contentlayer/generated";
import { useLiveReload, useMDXComponent } from "next-contentlayer/hooks";

export const getStaticPaths = () => {
  const paths = pages.map((p) => ({
    params: { slug: [p.slug] },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  page: Writing;
}> = async ({ params }) => {
  // unknown case
  if (!params?.slug) {
    return {
      notFound: true,
    };
  }

  let slug = !Array.isArray(params.slug) ? params.slug : params.slug.join(`/`);
  const page = pages.find((doc) => doc!.slug === slug);

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page,
    },
  };
};

export default function PageView({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  useLiveReload();
  const MDXContent = useMDXComponent(page?.body?.code || "");

  return (
    <>
      <h1>{page.title}</h1>
      {MDXContent && <MDXContent components={{}} />}
    </>
  );
}
