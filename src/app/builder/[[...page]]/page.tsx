import { fetchOneEntry } from "@builder.io/sdk-react";
import { BuilderRenderContent } from "@/components/builder-render-content";

export const revalidate = 0;

type PageProps = {
  params?: { page?: string[] };
};

export default async function BuilderCatchAllPage({ params }: PageProps) {
  const pathSegments = params?.page ?? [];
  const urlPath = "/" + pathSegments.join("/");

  // Builder contents should be published with URLs starting with "/builder"
  const builderUrlPath = "/builder" + urlPath;

  const content = await fetchOneEntry({
    model: "page",
    apiKey: process.env.NEXT_PUBLIC_BUILDER_API_KEY!,
    userAttributes: { urlPath: builderUrlPath },
  });

  if (!content) {
    return <div style={{ padding: 24 }}>No Builder content found for {builderUrlPath}</div>;
  }

  return <BuilderRenderContent model="page" apiKey={process.env.NEXT_PUBLIC_BUILDER_API_KEY!} content={content} />;
}


