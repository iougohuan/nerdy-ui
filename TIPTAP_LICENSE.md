# Tiptap UI Components - Licença MIT

## Como usar o Template Tiptap com Licença MIT

O Tiptap oferece templates e componentes de UI sob a **Licença MIT**, o que significa:

### ✅ Você pode:
- ✅ **Usar comercialmente** - Sem restrições para projetos comerciais
- ✅ **Modificar** - Alterar e personalizar conforme necessário
- ✅ **Distribuir** - Compartilhar com outros
- ✅ **Usar em projetos privados** - Não precisa tornar seu código público
- ✅ **Sublicenciar** - Incluir em produtos seus

### 📋 Requisitos:
- Manter o aviso de copyright original nos arquivos do Tiptap
- Incluir uma cópia da licença MIT

## Componentes já instalados no projeto

Este projeto já possui o **Simple Editor Template** do Tiptap instalado e configurado em:

```
/src/components/tiptap-templates/simple/
/src/components/tiptap-ui/
/src/components/tiptap-ui-primitive/
/src/components/tiptap-icons/
/src/components/tiptap-node/
```

## Como usar no projeto

### Importação básica:
```tsx
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

export default function Page() {
  return <SimpleEditor />
}
```

### Usando componentes individuais:
```tsx
import { MarkButton } from '@/components/tiptap-ui/mark-button'
import { HeadingDropdownMenu } from '@/components/tiptap-ui/heading-dropdown-menu'
import { Toolbar } from '@/components/tiptap-ui-primitive/toolbar'

// Use os componentes conforme necessário
```

## Extensões do Tiptap incluídas

O projeto usa as seguintes extensões do Tiptap (todas sob MIT):

- `@tiptap/extension-highlight` - Destacar texto
- `@tiptap/extension-image` - Imagens
- `@tiptap/extension-link` - Links
- `@tiptap/extension-list` - Listas
- `@tiptap/extension-subscript` - Subscrito
- `@tiptap/extension-superscript` - Sobrescrito
- `@tiptap/extension-task-item` - Itens de tarefa
- `@tiptap/extension-task-list` - Lista de tarefas
- `@tiptap/extension-text-align` - Alinhamento de texto
- `@tiptap/extension-typography` - Tipografia
- `@tiptap/extension-underline` - Sublinhado
- `@tiptap/starter-kit` - Kit inicial

## Customização

Você pode customizar livremente:

1. **Estilos** - Todos os arquivos `.scss` em `/src/components/tiptap-*`
2. **Componentes** - Modificar comportamentos em qualquer componente
3. **Variáveis CSS** - Em `/src/styles/_variables.scss`
4. **Extensões** - Adicionar ou remover extensões conforme necessário

## Referências

- 📚 [Documentação Tiptap](https://tiptap.dev/docs)
- 🎨 [UI Components](https://tiptap.dev/docs/ui-components)
- 📝 [Template Simple Editor](https://tiptap.dev/docs/ui-components/templates/simple-editor)
- ⚖️ [Licença MIT](https://opensource.org/licenses/MIT)

## Créditos

Este projeto utiliza o Tiptap UI Components Template:
- **Autor**: Tiptap Team
- **Licença**: MIT
- **Website**: https://tiptap.dev
