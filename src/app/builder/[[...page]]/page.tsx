import { RenderContent, fetchOneEntry } from "@builder.io/sdk-react";

export const revalidate = 0;

type PageProps = {
  params?: { page?: string[] };
};

export default async function BuilderCatchAllPage({ params }: PageProps) {
  const pathSegments = params?.page ?? [];
  const urlPath = "/" + pathSegments.join("/");

  // Conteúdos do Builder devem ser publicados com URLs começando por "/builder"
  const builderUrlPath = "/builder" + urlPath;

  const content = await fetchOneEntry({
    model: "page",
    apiKey: process.env.NEXT_PUBLIC_BUILDER_API_KEY!,
    userAttributes: { urlPath: builderUrlPath },
  });

  if (!content) {
    return (
      <div style={{ padding: 24 }}>
        Nenhum conteúdo do Builder encontrado para {builderUrlPath}
      </div>
    );
  }

  return (
    <RenderContent
      model="page"
      apiKey={process.env.NEXT_PUBLIC_BUILDER_API_KEY!}
      content={content}
    />
  );
}


