# Nerdy UI

Um projeto [Next.js](https://nextjs.org) com componentes de UI personalizados e integração com [Tiptap Editor](https://tiptap.dev).

## 🚀 Getting Started

Execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado.

## 📝 Tiptap Editor

Este projeto usa o **Tiptap Simple Editor Template** (licença MIT) com componentes personalizados.

### Recursos do Editor:
- ✅ **Formatação de texto**: Negrito, Itálico, Sublinhado, Tachado, Código
- ✅ **Cabeçalhos**: 6 níveis via dropdown
- ✅ **Listas**: Marcadores, Numeradas, Tarefas (checkboxes)
- ✅ **Alinhamento**: Esquerda, Centro, Direita, Justificado
- ✅ **Links**: Editor de links com preview
- ✅ **Imagens**: Upload e inserção de imagens
- ✅ **Highlight**: Destaque de texto com cores
- ✅ **Subscrito/Sobrescrito**: Para fórmulas e notações
- ✅ **Desfazer/Refazer**: Histórico completo de edições
- ✅ **Modo Claro/Escuro**: Suporte nativo
- ✅ **Responsivo**: Otimizado para mobile

### Usando o Editor:

#### Simple Editor (template básico):
```tsx
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

export default function Page() {
  return <SimpleEditor />
}
```

#### IEP Editor (versão customizada para IEP):
```tsx
import { IEPEditor } from '@/components/iep-editor'

export default function IEPPage() {
  return (
    <IEPEditor
      content="<h1>IEP Document</h1><p>Start writing...</p>"
      studentName="John Doe"
      gradeLevel="4th grade"
      onBack={() => console.log('Back clicked')}
      onExport={() => console.log('Export clicked')}
      onEdit={() => console.log('Edit title clicked')}
    />
  )
}
```

### Componentes Disponíveis:

```tsx
// Botões de formatação
import { MarkButton } from '@/components/tiptap-ui/mark-button'
import { HeadingButton } from '@/components/tiptap-ui/heading-button'
import { ListButton } from '@/components/tiptap-ui/list-button'

// Dropdowns
import { HeadingDropdownMenu } from '@/components/tiptap-ui/heading-dropdown-menu'
import { ListDropdownMenu } from '@/components/tiptap-ui/list-dropdown-menu'

// Popovers
import { ColorHighlightPopover } from '@/components/tiptap-ui/color-highlight-popover'
import { LinkPopover } from '@/components/tiptap-ui/link-popover'

// Primitivos
import { Toolbar } from '@/components/tiptap-ui-primitive/toolbar'
import { Button } from '@/components/tiptap-ui-primitive/button'
```

### Customização:

Os estilos podem ser customizados em:
- `/src/styles/_variables.scss` - Variáveis CSS globais
- `/src/components/tiptap-ui-primitive/*/*.scss` - Estilos dos componentes

## 🎨 Design Tokens

O projeto usa design tokens para consistência visual:

```bash
npm run tokens
```

Este comando gera as variáveis CSS a partir dos tokens em `/tokens`.

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

Os componentes Tiptap também são licenciados sob MIT - veja [TIPTAP_LICENSE.md](TIPTAP_LICENSE.md).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
