import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Foundation/Typografia',
} satisfies Meta

export default meta
type Story = StoryObj

export const Overview: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <section className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">H1 Título (Poppins)</h1>
        <p className="text-muted-foreground">Headings usam var(--font-poppins)</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">H2 Título (Poppins)</h2>
        <p className="text-muted-foreground">Classe: text-3xl font-semibold tracking-tight</p>
      </section>
      <section className="space-y-2">
        <h3 className="text-2xl font-semibold tracking-tight">H3 Título (Poppins)</h3>
        <p className="text-muted-foreground">Classe: text-2xl font-semibold tracking-tight</p>
      </section>
      <section className="space-y-2">
        <h4 className="text-xl font-semibold tracking-tight">H4 Título (Poppins)</h4>
        <p className="text-muted-foreground">Classe: text-xl font-semibold tracking-tight</p>
      </section>
      <section className="space-y-2">
        <p className="text-base">Body base (Karla)</p>
        <p className="text-sm">Body sm (Karla)</p>
        <p className="text-xs">Body xs (Karla)</p>
      </section>
      <section className="space-y-2">
        <p className="font-sans">Fonte Body: Karla (var: --font-karla)</p>
        <p className="font-mono">Fonte Mono (var: --font-geist-mono)</p>
      </section>
    </div>
  ),
}


