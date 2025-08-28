import type { Preview } from '@storybook/nextjs-vite'
import '../src/app/globals.css'

// Aplica a classe 'dark' no html quando o toolbar estiver em tema escuro
export const decorators = [
  (Story, context) => {
    const isDark = context.globals.theme === 'dark'
    if (typeof document !== 'undefined') {
      const html = document.documentElement
      html.classList.toggle('dark', Boolean(isDark))
    }
    return Story()
  },
]

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  globalTypes: {
    theme: {
      description: 'Tema global',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        showName: true,
      },
    },
  },
};

export default preview;