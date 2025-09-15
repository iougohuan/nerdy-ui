import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Foundation/Largura da Borda',
} satisfies Meta

export default meta
type Story = StoryObj

type WidthToken = {
  name: string
  cssVar: string
}

const widthTokens: WidthToken[] = [
  { name: 'border-width-thin', cssVar: 'var(--border-width-thin)' },
  { name: 'border-width-medium', cssVar: 'var(--border-width-medium)' },
  { name: 'border-width-thick', cssVar: 'var(--border-width-thick)' },
]

function BorderWidthCard({ token }: { token: WidthToken }) {
  return (
    <div className="rounded-md overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
      <div className="h-20 w-full bg-background flex items-center justify-center">
        <div
          className="w-16 h-10 bg-muted"
          style={{ border: `${token.cssVar} solid var(--border)`, boxSizing: 'border-box' }}
        />
      </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {widthTokens.map((t) => (
          <BorderWidthCard key={t.name} token={t} />
        ))}
      </div>
    </div>
  ),
}



