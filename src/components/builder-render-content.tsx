"use client";

type BuilderContent = { id?: string } | null | undefined;
type Props = { content: BuilderContent; apiKey: string; model: string };

export function BuilderRenderContent({ content }: Props) {
  // Temporary stub to unblock build. Replace with real Builder.io renderer later.
  return (
    <div style={{ padding: 24 }}>
      Builder rendering is temporarily disabled in this build. Content id: {content && "id" in content ? content.id : "n/a"}
    </div>
  );
}


