# 🚀 Guia de Configuração do Prompt no Langfuse

Este guia explica como configurar o prompt de geração de IEP na plataforma Langfuse usando o arquivo `LANGFUSE_IEP_PROMPT.json`.

## 📋 Pré-requisitos

- Conta ativa no Langfuse
- Acesso ao arquivo `LANGFUSE_IEP_PROMPT.json`
- Modelo OpenAI GPT-4o configurado

## 🎯 Passos para Configuração

### 1. Name (Nome do Prompt)

**Campo:** Name  
**Valor:** `IEP/Generator`

- Use o caractere `/` para organizar em pastas
- Isso criará uma pasta "IEP" com o prompt "Generator" dentro

### 2. Prompt (Template do Prompt)

Selecione a aba **"Chat"** (não "Text")

#### System Message (Mensagem do Sistema)

```
You are an expert IEP (Individualized Education Program) writer with deep knowledge of special education best practices. Your role is to generate personalized, professional, and comprehensive IEP documents that comply with educational standards.

CRITICAL RULES:
- This IEP must be PERSONALIZED and SPECIFIC to the individual student
- Do NOT generate generic, template-like content
- Reference the specific student context and performance data provided
- Connect logically across all sections (PLAAFP → Goals → Services → Accommodations)
- Use concrete, measurable language based on the student's actual needs
- Sound like it was written by a team who knows this specific student well
```

#### User Message (Mensagem do Usuário)

Cole o conteúdo completo do campo `userMessage` do arquivo JSON. O prompt já está formatado com todas as variáveis necessárias:

**Variáveis incluídas:**
- `{{studentPerformance}}`
- `{{gradeLevel}}`
- `{{language}}`
- `{{evaluationSchedule}}`
- `{{disabilityCategories}}`
- `{{areasOfConcern}}`
- `{{priorityGoalAreas}}`
- `{{existingServices}}`
- `{{accommodations}}`
- `{{iepComponents}}`

### 3. Config (Configuração)

No campo **Config**, cole o seguinte JSON:

```json
{
  "model": "gpt-4o-2024-08-06",
  "temperature": 0.7,
  "max_tokens": 4000,
  "top_p": 1,
  "frequency_penalty": 0,
  "presence_penalty": 0,
  "response_format": {
    "type": "json_object"
  }
}
```

**Explicação dos parâmetros:**
- **model**: `gpt-4o-2024-08-06` - Modelo mais recente do GPT-4o da OpenAI
- **temperature**: `0.7` - Equilíbrio entre criatividade e consistência
- **max_tokens**: `4000` - Limite de tokens para a resposta
- **response_format**: `json_object` - Força saída em formato JSON estruturado

### 4. Labels (Etiquetas)

☑️ **Set the "production" label**

- Marque esta opção se quiser que esta versão seja a versão de produção
- Você pode criar múltiplas versões para testes antes de marcar como produção

### 5. Commit Message (Mensagem de Commit)

**Sugestão para primeira versão:**

```
Initial IEP Generator prompt setup

- Added SMART methodology for goals and benchmarks
- Implemented personalization requirements
- Configured HTML formatting for TipTap editor
- Added comprehensive section instructions
- Set up 10 variables for student data input
- Configured GPT-4o-2024-08-06 with temperature 0.7
```

**Para atualizações futuras, use mensagens descritivas como:**
```
Updated PLAAFP expansion instructions

- Enhanced 4-paragraph structure requirements
- Added more specific language guidelines
- Improved measurable data examples
```

## 📊 Variáveis do Prompt

### Variáveis Obrigatórias (Required)

| Variável | Tipo | Descrição | Exemplo |
|----------|------|-----------|---------|
| `studentPerformance` | string | Descrição breve do desempenho do aluno | "Emma struggles with reading fluency..." |
| `gradeLevel` | string | Série escolar | "4th Grade" |
| `language` | string | Idioma do documento | "English" |
| `evaluationSchedule` | string | Frequência de avaliação | "Quarterly" |
| `disabilityCategories` | string | Categorias de deficiência (separadas por vírgula) | "Specific Learning Disability (SLD)" |
| `areasOfConcern` | string | Áreas de preocupação (separadas por vírgula) | "Academic, Behavioral" |
| `priorityGoalAreas` | string | Áreas prioritárias de objetivos (separadas por vírgula) | "Reading Comprehension, Written Expression" |
| `iepComponents` | string | Seções a serem geradas (separadas por vírgula) | "student-info, plaafp, goals, services" |

### Variáveis Opcionais

| Variável | Tipo | Descrição | Exemplo |
|----------|------|-----------|---------|
| `existingServices` | string | Serviços já em vigor | "Special Education Teacher Support, Speech Therapy" |
| `accommodations` | string | Acomodações necessárias | "Extended time, Visual aids, Breaks" |

## 🧪 Testando o Prompt

Após configurar o prompt, use o exemplo de teste incluído no arquivo JSON:

```json
{
  "studentPerformance": "Emma struggles with reading fluency and comprehension, often reading below grade level. She has difficulty decoding multi-syllabic words and loses track when reading longer passages. Emma works well in small groups with visual supports and benefits from extra time on assignments.",
  "gradeLevel": "4th Grade",
  "language": "English",
  "evaluationSchedule": "Quarterly",
  "disabilityCategories": "Specific Learning Disability (SLD)",
  "areasOfConcern": "Academic (reading, writing, math)",
  "priorityGoalAreas": "Reading Comprehension, Attention & Focus",
  "existingServices": "Special Education Teacher Support, Reading Intervention",
  "accommodations": "Extended time, Visual aids, Graphic organizers, Preferential seating",
  "iepComponents": "student-info, plaafp, disability-categories, areas-concern, priority-goals, goals, accommodations-mods, progress, gen-ed, services, team"
}
```

## 🔍 Estrutura de Saída Esperada

O prompt está configurado para retornar um JSON estruturado:

```json
{
  "sections": [
    {
      "title": "👦 Student Information",
      "content": "<p>👦 Student Name: [Student name]</p>..."
    },
    {
      "title": "🔍 Present Levels of Academic Achievement and Functional Performance (PLAAFP)",
      "content": "<p>Detailed PLAAFP paragraphs...</p>"
    }
    // ... outras seções
  ]
}
```

## 📝 Seções do IEP Geradas

Baseado no valor de `iepComponents`, as seguintes seções podem ser geradas:

| Código | Seção | Emoji |
|--------|-------|-------|
| `student-info` | Student Information | 👦 |
| `plaafp` | Present Levels (PLAAFP) | 🔍 |
| `disability-categories` | Disability Categories | 📋 |
| `areas-concern` | Areas of Concern | ⚠️ |
| `priority-goals` | Priority Goal Areas | 🎯 |
| `goals` | Goals and Objectives | 🏁 |
| `accommodations-mods` | Accommodations & Supports | 🧰 |
| `progress` | Progress Monitoring | 📊 |
| `gen-ed` | Participation in General Education | 🧑‍🏫 |
| `services` | Special Education Services | 👥 |
| `team` | Team Members | 🤝 |

## 🎨 Formatação HTML

O prompt está configurado para gerar HTML formatado para o editor TipTap:

### Elementos Permitidos

- **Títulos**: Texto plano com emoji (SEM tags `<h3>`)
- **Negrito**: `<strong>text</strong>`
- **Listas**: `<ul><li>item</li></ul>` ou `<ol><li>item</li></ol>`
- **Tabelas**: `<table class='iep-table'>...</table>`
- **Parágrafos**: `<p>text</p>`
- **Separadores**: Não incluir `<hr>` (adicionados automaticamente)

### Exemplo de Tabela

```html
<table class='iep-table'>
  <thead>
    <tr>
      <th>Service</th>
      <th>Frequency</th>
      <th>Provider</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Reading Comprehension Intervention</td>
      <td>3x per week, 45 min</td>
      <td>Special Education Teacher</td>
    </tr>
  </tbody>
</table>
```

## 🔐 Integração com API

Para usar este prompt via API Langfuse:

```typescript
import { Langfuse } from 'langfuse';

const langfuse = new Langfuse({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  secretKey: process.env.LANGFUSE_SECRET_KEY,
});

// Buscar o prompt
const prompt = await langfuse.getPrompt('IEP/Generator');

// Compilar com variáveis
const compiledPrompt = prompt.compile({
  studentPerformance: "Student data...",
  gradeLevel: "4th Grade",
  // ... outras variáveis
});

// Usar com OpenAI
const response = await openai.chat.completions.create({
  model: compiledPrompt.config.model,
  messages: compiledPrompt.messages,
  temperature: compiledPrompt.config.temperature,
  // ... outros parâmetros
});
```

## 📊 Monitoramento e Analytics

No Langfuse, você pode:

- **Versionar prompts**: Manter histórico de mudanças
- **A/B Testing**: Testar diferentes versões do prompt
- **Analytics**: Monitorar performance, latência, custos
- **Tracing**: Rastrear cada geração de IEP
- **Feedback**: Coletar feedback sobre qualidade das gerações

## 🔧 Troubleshooting

### Erro: "Variable not found"
**Solução**: Certifique-se de que todas as variáveis obrigatórias estão sendo enviadas.

### Erro: "Invalid JSON response"
**Solução**: Verifique se `response_format` está configurado como `json_object` no Config.

### Saída genérica / não personalizada
**Solução**: 
1. Aumente o detalhe em `studentPerformance`
2. Verifique se a temperatura está em 0.7
3. Revise as instruções de personalização no prompt

### Tabelas sem formatação
**Solução**: Certifique-se de que o CSS para `.iep-table` está disponível no frontend.

## 📈 Otimizações Futuras

- [ ] Adicionar suporte para múltiplos idiomas de geração
- [ ] Implementar cache de prompts para reduzir latência
- [ ] Criar variantes do prompt para diferentes tipos de deficiências
- [ ] Adicionar exemplos de output no prompt para few-shot learning
- [ ] Configurar fallbacks para modelos alternativos

## 📞 Suporte

Para questões sobre Langfuse:
- Documentação: https://langfuse.com/docs
- Discord: https://discord.gg/langfuse

Para questões sobre o IEP Generator:
- Consulte: `IEP_GENERATOR_README.md`
- Estrutura do prompt: `IEP_PROMPT_STRUCTURE.json`

---

**Desenvolvido com ❤️ para educação especial**

