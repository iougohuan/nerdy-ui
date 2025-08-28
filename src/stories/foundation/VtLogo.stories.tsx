import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { VtLogo } from '@/components/vt-logo'

const meta = {
  title: 'Foundation/VtLogo',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Colorida: Story = {
  render: () => (
    <div className="p-6">
      <VtLogo variant="color" width={592} height={98} aria-label="Vt Logo colorida" />
    </div>
  ),
}

export const Branca: Story = {
  render: () => (
    <div className="p-6 bg-black">
      <VtLogo variant="white" width={592} height={100} aria-label="Vt Logo branca" />
    </div>
  ),
}

export const Preta: Story = {
  render: () => (
    <div className="p-6 bg-white">
      <VtLogo variant="black" width={592} height={99} aria-label="Vt Logo preta" />
    </div>
  ),
}


