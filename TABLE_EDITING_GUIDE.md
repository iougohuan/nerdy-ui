# 📊 Guia de Edição de Tabelas - IEP Editor

## 🎯 Funcionalidades de Tabela

O editor IEP agora suporta edição completa de tabelas com controles visuais e atalhos de teclado.

---

## 🖱️ Menu Visual de Tabela

Quando você clica em uma célula de tabela, um botão **"Table"** aparece na toolbar com as seguintes opções:

### ➕ Adicionar Linhas/Colunas
- **Add Row Above** - Adiciona linha acima da atual
- **Add Row Below** - Adiciona linha abaixo da atual
- **Add Column Before** - Adiciona coluna à esquerda
- **Add Column After** - Adiciona coluna à direita

### 🗑️ Remover Linhas/Colunas
- **Delete Row** - Remove a linha atual
- **Delete Column** - Remove a coluna atual
- **Delete Table** - Remove a tabela inteira

---

## ⌨️ Atalhos de Teclado

### Navegação
- **Tab** - Próxima célula (cria nova linha se estiver na última célula)
- **Shift + Tab** - Célula anterior
- **Arrow Keys** - Navegar entre células

### Edição Rápida
- **Backspace/Delete** em célula vazia - Remove conteúdo
- Para remover linha/coluna, use o menu "Table"

---

## 🎨 Como Usar

### 1. Adicionar Nova Linha
```
1. Clique em qualquer célula da tabela
2. Clique no botão "Table" na toolbar
3. Selecione "Add Row Below" ou "Add Row Above"
```

### 2. Adicionar Nova Coluna
```
1. Clique em qualquer célula da tabela
2. Clique no botão "Table" na toolbar
3. Selecione "Add Column Before" ou "Add Column After"
```

### 3. Remover Linha/Coluna
```
1. Clique na linha/coluna que deseja remover
2. Clique no botão "Table" na toolbar
3. Selecione "Delete Row" ou "Delete Column"
```

### 4. Remover Conteúdo e Linha
```
Opção 1 - Manual:
  1. Selecione o conteúdo da linha
  2. Delete o conteúdo
  3. Use "Delete Row" no menu Table

Opção 2 - Rápida:
  1. Clique na célula
  2. Menu Table > Delete Row
```

---

## 📋 Exemplo de Uso Comum

### Cenário: Adicionar mais acomodações à tabela

**Tabela Original:**
```
Category          | Accommodation
------------------|----------------------------------
📘 Reading        | Use of visual aids
✍️ Writing        | Extended time
```

**Passos para adicionar nova linha:**
1. Clique na linha "Writing"
2. Botão "Table" > "Add Row Below"
3. Digite o novo conteúdo:
   - Category: `🧠 General`
   - Accommodation: `Preferential seating`

**Resultado:**
```
Category          | Accommodation
------------------|----------------------------------
📘 Reading        | Use of visual aids
✍️ Writing        | Extended time
🧠 General        | Preferential seating
```

---

## 🚀 Recursos Avançados

### Redimensionar Colunas
- As tabelas são **resizable** por padrão
- Arraste a borda da coluna para ajustar a largura

### Seleção de Tabela
- Clique fora e dentro da tabela para selecioná-la inteiramente
- Use Delete para remover a tabela completa

### Formatação Automática
- Tabelas têm **alinhamento à esquerda** automático
- **Border-bottom** em cada linha
- **Padding adequado** entre colunas
- **Background alternado** (zebra striping)
- **Hover effect** ao passar o mouse

---

## 💡 Dicas e Boas Práticas

### ✅ Fazer
- Use Tab para navegar rapidamente entre células
- Use o menu Table para operações estruturais
- Adicione linhas quando precisar de mais acomodações
- Mantenha a consistência de formatação (emojis, estrutura)

### ❌ Evitar
- Não delete linhas manualmente (use menu Table)
- Não crie tabelas muito largas (máx 3-4 colunas)
- Não misture estilos de formatação

---

## 🔧 Solução de Problemas

### Problema: Menu "Table" não aparece
**Solução**: Certifique-se de clicar dentro de uma célula da tabela

### Problema: Não consigo adicionar linha
**Solução**: Clique em uma célula existente antes de usar o menu

### Problema: Tabela sem estilos
**Solução**: As tabelas devem ter `class="iep-table"` ou serem descendentes de `.simple-editor`

---

## 📚 Estrutura HTML Gerada

```html
<table class="iep-table">
  <thead>
    <tr>
      <th>Category</th>
      <th>Accommodation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>📘 Reading</td>
      <td>Use of visual aids and graphic organizers</td>
    </tr>
    <!-- Mais linhas podem ser adicionadas -->
  </tbody>
</table>
```

---

## 🎉 Pronto para Usar!

Agora você tem controle total sobre as tabelas do IEP:
- ✅ Adicionar linhas/colunas dinamicamente
- ✅ Remover linhas/colunas vazias
- ✅ Navegação rápida com teclado
- ✅ Menu visual intuitivo

**Experimente agora no editor IEP!** 🚀
