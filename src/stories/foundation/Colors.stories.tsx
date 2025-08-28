import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import colors from 'tailwindcss/colors'
import { useEffect, useMemo, useRef, useState } from 'react'

const meta = {
  title: 'Foundation/Cores',
} satisfies Meta

export default meta
type Story = StoryObj

const cssVars = [
  '--background',
  '--foreground',
  '--background-gradient',
  '--primary',
  '--primary-foreground',
  '--secondary',
  '--secondary-foreground',
  '--muted',
  '--muted-foreground',
  '--accent',
  '--accent-foreground',
  '--destructive',
  '--border',
  '--input',
  '--ring',
  '--chart-1',
  '--chart-2',
  '--chart-3',
  '--chart-4',
  '--chart-5',
  '--sidebar',
  '--sidebar-foreground',
  '--sidebar-primary',
  '--sidebar-primary-foreground',
  '--sidebar-accent',
  '--sidebar-accent-foreground',
  '--sidebar-border',
  '--sidebar-ring',
]

function TokenSwatch({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hex, setHex] = useState<string>("")
  const style: React.CSSProperties = {
    background: `var(${name})`,
    border: '1px solid var(--border)',
  }
  const textStyle: React.CSSProperties = {
    color: 'var(--foreground)',
  }
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const bg = getComputedStyle(el).backgroundColor
    const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i)
    if (match) {
      const r = Number(match[1])
      const g = Number(match[2])
      const b = Number(match[3])
      const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase()
      setHex(`#${toHex(r)}${toHex(g)}${toHex(b)}`)
    } else {
      setHex('')
    }
  }, [])

  return (
    <div className="rounded-md overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
      <div ref={ref} className="h-12 w-full" style={style} />
      <div className="p-2 text-[11px] leading-4 flex items-center justify-between" style={textStyle}>
        <code>{name}</code>
        <div className="flex items-center gap-2 text-muted-foreground">
          <code>{hex}</code>
        </div>
      </div>
    </div>
  )
}

export const Tokens: Story = {
  render: () => (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cssVars.map((name) => (
          <TokenSwatch key={name} name={name} />
        ))}
      </div>
    </div>
  ),
}

const families = [
  'neutral',
  'stone',
  'zinc',
  'slate',
  'gray',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

type Family = typeof families[number]
type TailwindPalette = Record<string, string>
const colorFamilies = colors as unknown as Record<string, TailwindPalette>

function ScaleSwatch({ family, shade, value }: { family: string; shade: number; value: string }) {
  const blockRef = useRef<HTMLDivElement>(null)
  const [computedHex, setComputedHex] = useState<string>("")
  const [copiedHex, setCopiedHex] = useState(false)

  const knownHex = useMemo(() => (value?.startsWith('#') ? value : ''), [value])

  useEffect(() => {
    if (knownHex) {
      setComputedHex(knownHex.toUpperCase())
      return
    }
    const el = blockRef.current
    if (!el) return
    const bg = getComputedStyle(el).backgroundColor
    // bg like: rgb(255, 0, 0) or rgba(255, 0, 0, 1)
    const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i)
    if (match) {
      const r = Number(match[1])
      const g = Number(match[2])
      const b = Number(match[3])
      const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase()
      setComputedHex(`#${toHex(r)}${toHex(g)}${toHex(b)}`)
    } else {
      setComputedHex('')
    }
  }, [knownHex, value])

  // highlight shades for specific families
  const highlightShadesByFamily: Record<string, ReadonlyArray<number>> = {
    brand: [500],
    'brand-soft': [500],
    'vibrant-yellow': [500],
    'vibrant-pink': [500],
    'vibrant-purple': [500],
    'vibrant-cyan': [500],
  }
  const isHighlighted = (highlightShadesByFamily[family] || []).includes(shade)

  return (
    <div className="flex flex-col">
      <div
        ref={blockRef}
        className={`h-10 rounded border ${isHighlighted ? 'ring-2 ring-[var(--ring)] border-primary' : ''}`}
        style={{ backgroundColor: value, borderColor: 'var(--border)' }}
      />
      <div className="mt-1 text-[11px] leading-4">
        <code>
          {family}-{shade}
        </code>
      </div>
      <div className="text-[11px] leading-4 flex items-center justify-between text-muted-foreground">
        <code>{computedHex}</code>
        <button
          className="rounded border px-1 text-[10px] hover:bg-accent"
          style={{ borderColor: 'var(--border)' }}
          onClick={() => {
            if (computedHex) {
              void navigator.clipboard.writeText(computedHex)
              setCopiedHex(true)
              setTimeout(() => setCopiedHex(false), 900)
            }
          }}
        >
          {copiedHex ? 'Copiado' : 'Copiar HEX'}
        </button>
      </div>
    </div>
  )
}

export const Escala: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      {families.map((family) => {
        const palette: TailwindPalette = colorFamilies[family] ?? {}
        return (
          <section key={family}>
            <h3 className="text-sm font-medium mb-3">{family}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-3">
              {shades.map((shade) => {
                const value = palette[String(shade)]
                if (!value) return null
                return <ScaleSwatch key={shade} family={family} shade={shade} value={value} />
              })}
            </div>
          </section>
        )
      })}

      {/* Custom brand scales */}
      <section>
        <h3 className="text-sm font-medium mb-3">brand</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-3">
          {[50,100,200,300,400,500,600,700,800,900,950].map((shade) => (
            <ScaleSwatch key={shade} family="brand" shade={shade} value={`var(--brand-${shade})`} />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-medium mb-3">brand-soft</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-3">
          {[50,100,200,300,400,500,600,700,800,900,950].map((shade) => (
            <ScaleSwatch key={shade} family="brand-soft" shade={shade} value={`var(--brand-soft-${shade})`} />
          ))}
        </div>
      </section>

      {/* Vibrant scales */}
      {[
        'vibrant-yellow',
        'vibrant-pink',
        'vibrant-purple',
        'vibrant-cyan',
      ].map((vibrant) => (
        <section key={vibrant}>
          <h3 className="text-sm font-medium mb-3">{vibrant}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-3">
            {[50,100,200,300,400,500,600,700,800,900,950].map((shade) => (
              <ScaleSwatch key={shade} family={vibrant} shade={shade} value={`var(--${vibrant}-${shade})`} />
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
}
