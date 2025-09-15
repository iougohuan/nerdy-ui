import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Foundation/Raio de Borda',
} satisfies Meta

export default meta
type Story = StoryObj

type RadiusToken = {
  name: string
  cssVar: string
}

const radiusTokens: RadiusToken[] = [
  { name: 'radius-sm', cssVar: 'var(--radius-sm)' },
  { name: 'radius-md', cssVar: 'var(--radius-md)' },
  { name: 'radius-lg', cssVar: 'var(--radius-lg)' },
  { name: 'radius-xl', cssVar: 'var(--radius-xl)' },
]

function RadiusCard({ token }: { token: RadiusToken }) {
  return (
    <div className="rounded-md overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
      <div className="h-20 w-full bg-muted" style={{ borderRadius: token.cssVar }} />
      <div className="p-2 text-[11px] leading-4 flex items-center justify-between">
        <code>--{token.name}</code>
        <div className="flex items-center gap-2 text-muted-foreground">
          <code>{token.cssVar}</code>
        </div>
      </div>
    </div>
  )
}

export const Tokens: Story = {
  render: () => (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {radiusTokens.map((t) => (
          <RadiusCard key={t.name} token={t} />
        ))}
      </div>
    </div>
  ),
}



