# 🎓 IEP Generator - AI-Powered Documentation

## 📋 Visão Geral

O IEP Generator é uma ferramenta avançada que usa IA (OpenAI GPT-4) para gerar documentos IEP (Individualized Education Program) personalizados e profissionais com base nos dados do estudante.

## 🚀 Configuração

### 1. Configurar Chave da API OpenAI

Crie um arquivo `.env.local` na raiz do projeto (`nerdy-ui/`) com o seguinte conteúdo:

```bash
OPENAI_API_KEY=your-openai-api-key-here
```

> ⚠️ **IMPORTANTE**: Nunca commite este arquivo no Git! Ele já está no `.gitignore`.

### 2. Instalar Dependências

As dependências já foram instaladas, mas caso precise reinstalar:

```bash
npm install
```

### 3. Executar o Projeto

```bash
npm run dev
```

Acesse: `http://localhost:3000/ai-tools`

## 🎯 Como Usar

### Step 1: Student Context

1. **Descreva a Performance do Estudante** (campo obrigatório)
   - Digite ou grave áudio descrevendo a performance acadêmica e funcional atual
   - Pode anexar arquivos de texto para preencher automaticamente

2. **Preencha os Campos Obrigatórios:**
   - **Grade Level**: Série escolar (Kindergarten - 12th Grade)
   - **Disability Categories**: Categorias de deficiência (pode adicionar customizadas)
   - **Areas of Concern**: Áreas de preocupação
   - **Priority Goal Areas**: Áreas de objetivo prioritário

### Step 2: IEP Setting

1. **IEP Components Sections** (campo CRÍTICO! ⚠️)
   - Selecione QUAIS seções você quer que sejam geradas no documento
   - Seções disponíveis:
     - ✅ Student Information
     - ✅ PLAAFP (Present Levels)
     - ✅ Disability Categories
     - ✅ Areas of Concern
     - ✅ Priority Goal Areas
     - ✅ Goals and Objectives
     - ✅ Accommodations and Modifications
     - ✅ Progress Monitoring
     - ✅ Participation in General Education
     - ✅ Services and Supports
     - ✅ Team Members

2. **Configurações Adicionais:**
   - **Evaluation Schedule**: Frequência de avaliação
   - **Language**: Idioma do documento
   - **Existing Services**: Serviços já em vigor
   - **Accommodations**: Acomodações necessárias

3. **Clique em "Generate"** para criar o IEP usando IA

## 🤖 Como Funciona a IA

### Fluxo de Geração

```
[Formulário] → [API Route] → [OpenAI GPT-4] → [HTML Formatado] → [TipTap Editor]
```

### 1. Coleta de Dados
O sistema coleta todos os dados do formulário, incluindo:
- Performance do estudante
- Categorias de deficiência
- Áreas de preocupação
- Objetivos prioritários
- Seções selecionadas em IEP Components

### 2. Construção do Prompt
A API constrói um prompt detalhado que instrui o GPT-4 a:
- Gerar APENAS as seções selecionadas
- Usar formatação HTML específica
- Incluir emojis apropriados
- Criar tabelas para Accommodations e Services
- Usar métricas específicas e mensuráveis
- Manter tom profissional e encorajador

### 3. Geração com IA
Utiliza `generateObject` do Vercel AI SDK com:
- **Model**: `gpt-4o-2024-08-06` (modelo mais recente)
- **Temperature**: 0.7 (criatividade controlada)
- **Structured Output**: Schema Zod para garantir formato consistente

### 4. Formatação
O HTML gerado é estruturado com:
- Títulos com emojis (`<h3>`)
- Separadores (`<hr>`)
- Listas (`<ul>`, `<ol>`)
- Tabelas (`<table>`)
- Texto formatado (`<strong>`, `<p>`)

### 5. Renderização
O HTML é carregado no TipTap Editor, permitindo:
- ✏️ Edição completa
- 📥 Export para diferentes formatos
- 🎨 Formatação rica

## 📊 Seções Geradas

Baseado no design do Figma, cada seção inclui:

### 👦 Student Information
- Nome, série, idioma, cronograma de avaliação

### 🔍 PLAAFP
- Performance atual expandida
- Forças e desafios específicos
- Impacto da deficiência na educação

### 📋 Disability Categories
- Lista de categorias selecionadas

### ⚠️ Areas of Concern
- Áreas identificadas de preocupação

### 🎯 Priority Goal Areas
- Áreas prioritárias para desenvolvimento

### 🏁 Annual Goals
- Objetivos mensuráveis com benchmarks
- Percentagens específicas
- Timeframes claros
- 3-4 short-term benchmarks por objetivo

### 🧰 Accommodations & Supports
Tabela organizada por categoria:
- 📘 Reading
- ✍️ Writing
- 🧠 General
- 📝 Assessments

### 📊 Progress Monitoring
- Métodos de monitoramento
- Frequência
- Ferramentas (work samples, observations, rubrics)

### 🧑‍🏫 Participation in General Education
- Como o estudante participará
- Suportes necessários
- Serviços pull-out

### 👥 Special Education Services
Tabela com:
- Serviço
- Frequência (ex: "3x per week, 30 min")
- Provedor

### 🤝 Team Members
- General Education Teacher
- Special Education Teacher
- Parent/Guardian
- School Psychologist
- IEP Coordinator

## 🔧 Arquitetura Técnica

### Arquivos Principais

```
nerdy-ui/
├── src/
│   ├── app/
│   │   ├── ai-tools/
│   │   │   ├── page.tsx           # Interface principal
│   │   │   └── form-options.ts    # Opções dos formulários
│   │   └── api/
│   │       └── generate-iep/
│   │           └── route.ts       # API route (server-side)
│   └── components/
│       ├── iep-editor.tsx         # Editor TipTap
│       └── iep-result.tsx         # Wrapper do resultado
└── .env.local                     # Chave da API (criar manualmente)
```

### API Route (`/api/generate-iep`)

**Endpoint**: `POST /api/generate-iep`

**Request Body**:
```typescript
{
  studentPerformance: string;
  gradeLevel: string;
  disabilityCategories: string[];
  areasOfConcern: string[];
  priorityGoalAreas: string[];
  evaluationSchedule: string;
  language: string;
  iepComponents: string[];        // Define quais seções gerar
  existingServices: string[];
  accommodations: string[];
  customDisabilityOptions?: Record<string, string>;
  customServicesOptions?: Record<string, string>;
  customAccommodationsOptions?: Record<string, string>;
}
```

**Response**:
```typescript
{
  success: true;
  html: string;              // HTML formatado para TipTap
  sectionsCount: number;     // Número de seções geradas
}
```

### Validação de Dados

Usa **Zod** para validar:
- Entrada da requisição
- Estrutura do documento gerado
- Schema das seções

## ⚡ Performance

- ⏱️ Tempo médio de geração: 10-20 segundos
- 🔄 Loading state visual durante processamento
- ❌ Tratamento de erros com mensagens amigáveis
- ✅ Validação client-side antes de enviar

## 🎨 Formatação Visual

O documento gerado segue o design do Figma:
- Tipografia consistente (Poppins para títulos, Karla para corpo)
- Emojis contextuais para cada seção
- Tabelas bem formatadas
- Separadores visuais entre seções
- Hierarquia clara de informação

## 🔒 Segurança

- ✅ Chave da API armazenada server-side (`.env.local`)
- ✅ Nunca exposta no client
- ✅ API route protegida
- ✅ Validação de entrada com Zod
- ✅ Tratamento de erros seguro

## 🐛 Troubleshooting

### Erro: "OpenAI API key not configured"
**Solução**: Certifique-se de criar o arquivo `.env.local` com a chave correta.

### Erro: "Please select at least one IEP Component section"
**Solução**: No Step 2, selecione pelo menos uma seção em "IEP Components sections".

### Erro: "Failed to generate IEP"
**Possíveis causas**:
- Chave da API inválida ou expirada
- Problema de conexão com OpenAI
- Limite de rate da API atingido

**Solução**: Verifique o console do navegador e os logs do servidor para mais detalhes.

## 📝 Exemplo de Uso

1. **Preencher Step 1:**
   ```
   Performance: "Student demonstrates strong verbal skills but struggles 
   with written expression and reading comprehension."
   
   Grade Level: 4th Grade
   Disability: Specific Learning Disability (SLD)
   Areas: Academic (reading, writing)
   Goals: Reading Comprehension, Written Expression
   ```

2. **Configurar Step 2:**
   ```
   IEP Components: Selecionar todas as seções
   Evaluation: Quarterly
   Language: English
   Services: Special Education Teacher Support, Speech Therapy
   Accommodations: Extended time, Visual aids
   ```

3. **Clicar "Generate"**
   - Sistema envia dados para `/api/generate-iep`
   - OpenAI gera documento estruturado
   - Editor TipTap carrega o HTML
   - Usuário pode editar e exportar

## 🚀 Próximos Passos

- [ ] Adicionar suporte para múltiplos idiomas na geração
- [ ] Implementar templates personalizados
- [ ] Adicionar export para PDF com formatação preservada
- [ ] Cache de respostas para evitar regeração
- [ ] Histórico de versões do documento

## 📞 Suporte

Para questões ou problemas, verifique:
1. Logs do console do navegador (F12)
2. Logs do servidor Next.js
3. Documentação da OpenAI: https://platform.openai.com/docs

---

**Desenvolvido com ❤️ usando Next.js, Vercel AI SDK e OpenAI GPT-4**
