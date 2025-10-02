# 🔗 Guia de Integração Langfuse

Este guia explica como integrar e usar o Langfuse no projeto Nerdy UI para gerenciar prompts de IA de forma centralizada e com monitoramento.

## 📋 Índice

1. [O que é Langfuse?](#o-que-é-langfuse)
2. [Vantagens da Integração](#vantagens-da-integração)
3. [Configuração Inicial](#configuração-inicial)
4. [Como Funciona](#como-funciona)
5. [Modo Híbrido](#modo-híbrido)
6. [Monitoramento e Analytics](#monitoramento-e-analytics)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 O que é Langfuse?

Langfuse é uma plataforma de observabilidade e gerenciamento de prompts para aplicações de IA que permite:

- 📝 **Versionamento de prompts** - Gerenciar diferentes versões
- 📊 **Analytics e Tracing** - Monitorar performance e custos
- 🧪 **A/B Testing** - Testar diferentes versões de prompts
- 👥 **Colaboração** - Equipe pode editar prompts sem deploy
- 🔍 **Debugging** - Rastrear cada geração de IEP

---

## ✨ Vantagens da Integração

### Sem Langfuse (Prompt Hardcoded)
```typescript
// Prompt está no código
const prompt = `You are an expert IEP writer...
  Long prompt text here...
  ${variable1}
  ${variable2}
`;

// Para alterar o prompt: precisa editar código + deploy
```

**Problemas:**
- ❌ Mudanças exigem deploy
- ❌ Difícil testar variações
- ❌ Sem histórico de versões
- ❌ Sem analytics

### Com Langfuse (Prompt Centralizado)
```typescript
// Busca prompt do Langfuse
const { prompt } = await getLangfusePrompt('IEP/Generator');
const compiled = compilePromptTemplate(prompt, variables);

// Para alterar: edita no Langfuse UI (sem deploy!)
```

**Vantagens:**
- ✅ Mudanças sem deploy
- ✅ A/B testing fácil
- ✅ Versionamento automático
- ✅ Analytics detalhados
- ✅ Colaboração da equipe

---

## 🚀 Configuração Inicial

### 1. Criar Conta no Langfuse

Acesse: https://cloud.langfuse.com

1. Crie uma conta gratuita
2. Crie um novo projeto
3. Acesse **Settings** → **API Keys**
4. Copie suas chaves:
   - `LANGFUSE_PUBLIC_KEY` (começa com `pk-lf-`)
   - `LANGFUSE_SECRET_KEY` (começa com `sk-lf-`)

### 2. Configurar Prompt no Langfuse

Siga o guia completo em: `LANGFUSE_QUICK_SETUP.md`

**Resumo:**
1. Clique em **"Create new prompt"**
2. **Name**: `IEP/Generator`
3. **Prompt Type**: `Chat`
4. Cole os textos de `LANGFUSE_COPY_PASTE.txt`:
   - System message
   - User message (com variáveis `{{studentPerformance}}`, etc.)
5. **Config**: Cole o JSON com configurações do modelo
6. **Labels**: Marque "production"
7. Clique em **"Create prompt"**

### 3. Configurar Variáveis de Ambiente

Crie/edite o arquivo `.env.local` na raiz do projeto:

```bash
# OpenAI API Key (obrigatória)
OPENAI_API_KEY=sk-...

# Langfuse Configuration
LANGFUSE_SECRET_KEY=sk-lf-...
LANGFUSE_PUBLIC_KEY=pk-lf-...
LANGFUSE_HOST=https://cloud.langfuse.com

# Nome do prompt no Langfuse
LANGFUSE_PROMPT_NAME=IEP/Generator

# Ativar Langfuse
USE_LANGFUSE=true
```

### 4. Reiniciar o Servidor

```bash
npm run dev
```

---

## ⚙️ Como Funciona

### Fluxo de Execução

```
[Formulário Frontend]
        ↓
[POST /api/generate-iep]
        ↓
[Verificar USE_LANGFUSE]
        ↓
   ┌────┴────┐
   ↓         ↓
[Langfuse]  [Hardcoded]
   ↓         ↓
   └────┬────┘
        ↓
[Compilar Template]
        ↓
[OpenAI GPT-4o]
        ↓
[Gerar IEP]
        ↓
[Langfuse Trace 📊]
        ↓
[Retornar HTML]
```

### Arquivos da Integração

```
nerdy-ui/
├── .env.local                          # Configurações
├── src/
│   ├── lib/
│   │   └── langfuse.ts                 # Cliente Langfuse
│   └── app/
│       └── api/
│           └── generate-iep/
│               └── route.ts            # API com integração
└── LANGFUSE_*.md                       # Documentação
```

### Código da Integração

#### 1. Cliente Langfuse (`src/lib/langfuse.ts`)

```typescript
import { Langfuse } from 'langfuse';

// Verifica se está habilitado
export function isLangfuseEnabled(): boolean {
  return process.env.USE_LANGFUSE === 'true';
}

// Busca prompt do Langfuse
export async function getLangfusePrompt(name: string) {
  const client = getLangfuseClient();
  const prompt = await client.getPrompt(name);
  return prompt;
}

// Compila template com variáveis
export function compilePromptTemplate(
  template: string, 
  variables: Record<string, string>
): string {
  // Substitui {{variable}} pelos valores
  // ...
}
```

#### 2. API Route (`src/app/api/generate-iep/route.ts`)

```typescript
export async function POST(request: NextRequest) {
  // Criar trace para monitoramento
  const trace = createLangfuseTrace('generate-iep');
  
  try {
    // Verificar se deve usar Langfuse
    const useLangfuse = isLangfuseEnabled();
    
    let prompt: string;
    
    if (useLangfuse) {
      // Buscar prompt do Langfuse
      prompt = await buildPromptWithLangfuse(data);
    } else {
      // Usar prompt hardcoded
      prompt = buildPrompt(data);
    }
    
    // Gerar IEP com OpenAI
    const { object } = await generateObject({
      model: openai("gpt-4o-2024-08-06"),
      prompt,
      // ...
    });
    
    // Registrar no trace
    trace.update({ output: object });
    
    return NextResponse.json({ 
      success: true, 
      html,
      promptSource: useLangfuse ? 'langfuse' : 'hardcoded'
    });
  } catch (error) {
    // Registrar erro no trace
    trace.update({ error });
    // ...
  }
}
```

---

## 🔀 Modo Híbrido

O sistema funciona em **modo híbrido**: pode usar Langfuse ou o prompt hardcoded, sem quebrar nada!

### Cenário 1: Langfuse Habilitado

```bash
# .env.local
USE_LANGFUSE=true
LANGFUSE_SECRET_KEY=sk-lf-...
LANGFUSE_PUBLIC_KEY=pk-lf-...
```

**Comportamento:**
- ✅ Busca prompt do Langfuse
- ✅ Registra traces e analytics
- ✅ Usa versão "production" do prompt
- ✅ Mudanças no Langfuse = efeito imediato

**Console:**
```
[Langfuse] Client initialized successfully
[IEP Generator] Using Langfuse prompt
[Langfuse] Successfully fetched prompt: IEP/Generator (version: 1)
```

### Cenário 2: Langfuse Desabilitado

```bash
# .env.local
USE_LANGFUSE=false
# OU simplesmente não definir as chaves
```

**Comportamento:**
- ✅ Usa prompt hardcoded no código
- ✅ Funciona normalmente sem Langfuse
- ❌ Sem traces/analytics

**Console:**
```
[Langfuse] Not enabled or not configured. Using hardcoded prompt.
[IEP Generator] Using hardcoded prompt
```

### Cenário 3: Erro no Langfuse

Se Langfuse falhar (API offline, chave inválida, etc.), o sistema:
1. Registra o erro no console
2. Retorna erro explicativo ao frontend
3. **Não usa fallback** (para garantir que você saiba que algo está errado)

---

## 📊 Monitoramento e Analytics

### 1. Acessar Traces

No Langfuse dashboard:
1. Vá para **Traces**
2. Veja lista de todas as gerações de IEP
3. Clique em um trace para detalhes:
   - Input (dados do estudante)
   - Output (seções geradas)
   - Tempo de execução
   - Custo estimado
   - Metadados (grade level, seções solicitadas, etc.)

### 2. Métricas Disponíveis

**Por Trace:**
- ⏱️ **Latency** - Tempo total de geração
- 💰 **Cost** - Custo em tokens OpenAI
- 📝 **Input/Output Tokens** - Quantidade usada
- ✅ **Status** - Success ou Error
- 📋 **Metadata** - Grade level, seções, etc.

**Agregadas:**
- 📈 **Volume** - Quantidade de gerações por dia/hora
- 💸 **Total Cost** - Custo acumulado
- ⚡ **Avg Latency** - Tempo médio
- ❌ **Error Rate** - Taxa de falhas

### 3. Filtros e Busca

```
# Exemplos de filtros:
- Grade Level = "4th Grade"
- Sections Requested = 11
- Status = "Error"
- Date Range = Última semana
```

### 4. Exportar Dados

Langfuse permite exportar traces para:
- CSV
- JSON
- Integração com ferramentas de BI

---

## 🧪 Workflow de Desenvolvimento

### Desenvolvimento Local

```bash
# .env.local
USE_LANGFUSE=false  # Usa prompt hardcoded para dev rápido
```

**Vantagens:**
- ⚡ Mais rápido (sem chamada ao Langfuse)
- 🔧 Fácil debug
- 💻 Funciona offline

### Staging/Produção

```bash
# .env.local
USE_LANGFUSE=true
LANGFUSE_SECRET_KEY=sk-lf-...
```

**Vantagens:**
- 📊 Analytics reais
- 🧪 Testar mudanças no prompt
- 👥 Colaboração da equipe

---

## 🔄 Versionamento de Prompts

### Criar Nova Versão

No Langfuse:
1. Vá para **Prompts** → `IEP/Generator`
2. Clique em **"Create new version"**
3. Edite o prompt
4. **Labels**: Marque como "development" ou "staging"
5. Teste a nova versão

### Promover para Produção

Quando a versão estiver pronta:
1. Remova label "production" da versão antiga
2. Adicione label "production" na nova versão
3. **Efeito imediato** (próxima geração usa nova versão!)

### Rollback Rápido

Se algo der errado:
1. Remova label "production" da versão com problema
2. Adicione label "production" na versão anterior
3. Rollback instantâneo! 🚀

---

## 🧪 A/B Testing

### Setup

```typescript
// API route pode usar versão específica
const version = Math.random() < 0.5 ? 1 : 2;
const { prompt } = await getLangfusePrompt('IEP/Generator', version);
```

### Análise

No Langfuse:
1. Compare traces das duas versões
2. Analise métricas:
   - Qualidade do output
   - Latência
   - Custo
3. Escolha a melhor versão

---

## 🐛 Troubleshooting

### Erro: "Langfuse is not enabled"

**Causa:** `USE_LANGFUSE=false` ou chaves não configuradas

**Solução:**
```bash
# .env.local
USE_LANGFUSE=true
LANGFUSE_SECRET_KEY=sk-lf-...
LANGFUSE_PUBLIC_KEY=pk-lf-...
```

### Erro: "Failed to fetch prompt from Langfuse"

**Possíveis causas:**
1. Chaves inválidas → Verifique no dashboard do Langfuse
2. Nome do prompt errado → Deve ser exatamente `IEP/Generator`
3. Prompt não tem label "production" → Adicione no Langfuse
4. API do Langfuse offline → Verifique status em status.langfuse.com

**Debug:**
```bash
# Verificar logs no console
[Langfuse] Error fetching prompt: ...
```

### Erro: "Variable {{studentPerformance}} not found"

**Causa:** Template do Langfuse não tem a variável

**Solução:**
1. Verifique se o User message no Langfuse tem `{{studentPerformance}}`
2. Copie novamente de `LANGFUSE_COPY_PASTE.txt`

### Prompt Retorna Texto Genérico

**Causa:** Instruções de personalização não estão no prompt

**Solução:**
1. Verifique se o System message tem "CRITICAL RULES"
2. Verifique se o User message tem seções detalhadas
3. Compare com `LANGFUSE_COPY_PASTE.txt`

### Traces Não Aparecem no Langfuse

**Causa:** `flushLangfuse()` pode não estar executando

**Solução:**
```typescript
// API route
await flushLangfuse(); // Use await para garantir flush
```

### Performance Lenta

**Causa:** Duas chamadas de rede (Langfuse + OpenAI)

**Soluções:**
1. **Cache local:**
```typescript
// Implementar cache simples
const cachedPrompt = await redis.get('langfuse:IEP/Generator:v1');
```

2. **Usar hardcoded em dev:**
```bash
USE_LANGFUSE=false  # Desenvolvimento local
```

---

## 📊 Comparação: Antes vs Depois

### Antes (Prompt Hardcoded)

```typescript
// route.ts - 290 linhas de prompt hardcoded
const prompt = `You are an expert IEP writer...
  [280 linhas de instruções]
  ${variable1}
  ${variable2}
`;

// Para mudar: editar código + git + deploy
// Tempo para mudança: ~30-60 minutos
```

**Problemas:**
- 📝 Arquivo muito grande (500+ linhas)
- 🔄 Deploy para cada mudança
- ❌ Sem histórico de versões
- 👀 Difícil revisar mudanças
- 🧪 A/B testing complexo

### Depois (Prompt no Langfuse)

```typescript
// route.ts - apenas busca o prompt
const { prompt } = await getLangfusePrompt('IEP/Generator');
const compiled = compilePromptTemplate(prompt, variables);

// Para mudar: editar no Langfuse UI
// Tempo para mudança: ~2-5 minutos
```

**Vantagens:**
- ✅ Código limpo (menos 200 linhas)
- ⚡ Mudanças instantâneas
- 📚 Histórico completo
- 👥 Equipe pode colaborar
- 📊 Analytics incluídos
- 🧪 A/B testing fácil

---

## 🎯 Próximos Passos

### 1. Configurar Alertas

Configure alertas no Langfuse para:
- ❌ Taxa de erro > 5%
- 💰 Custo diário > $X
- ⏱️ Latência > 30s

### 2. Criar Variantes de Prompts

Crie prompts especializados:
- `IEP/Generator/Elementary` - Para ensino fundamental
- `IEP/Generator/HighSchool` - Para ensino médio
- `IEP/Generator/Bilingual` - Para alunos bilíngues

### 3. Implementar Feedback Loop

```typescript
// Permitir usuários avaliarem IEPs gerados
langfuse.score({
  traceId: trace.id,
  name: 'quality',
  value: userRating, // 1-5 stars
});
```

### 4. Otimizar Custos

Use analytics para:
- Identificar seções com maior custo
- Otimizar prompts para reduzir tokens
- Comparar custos entre versões

---

## 📚 Recursos Adicionais

### Documentação Langfuse

- **Docs oficiais:** https://langfuse.com/docs
- **API Reference:** https://langfuse.com/docs/api
- **SDKs:** https://langfuse.com/docs/sdk/typescript
- **Discord:** https://discord.gg/langfuse

### Arquivos do Projeto

- `LANGFUSE_IEP_PROMPT.json` - Estrutura completa do prompt
- `LANGFUSE_SETUP_GUIDE.md` - Guia detalhado de setup
- `LANGFUSE_QUICK_SETUP.md` - Guia rápido visual
- `LANGFUSE_COPY_PASTE.txt` - Textos prontos para copiar
- `IEP_PROMPT_STRUCTURE.json` - Especificação técnica

### Suporte

Para dúvidas:
1. Consulte este guia
2. Verifique logs do console
3. Acesse dashboard do Langfuse
4. Contate a equipe de desenvolvimento

---

## ✅ Checklist de Integração

Use este checklist para garantir que tudo está configurado:

### Langfuse Platform
- [ ] Conta criada em cloud.langfuse.com
- [ ] Projeto criado
- [ ] API Keys copiadas
- [ ] Prompt `IEP/Generator` criado
- [ ] Prompt marcado como "production"
- [ ] Testado com variáveis de exemplo

### Código
- [ ] Pacote `langfuse` instalado
- [ ] Arquivo `src/lib/langfuse.ts` criado
- [ ] API route atualizada
- [ ] Imports adicionados

### Configuração
- [ ] `.env.local` criado
- [ ] `OPENAI_API_KEY` configurada
- [ ] `LANGFUSE_SECRET_KEY` configurada
- [ ] `LANGFUSE_PUBLIC_KEY` configurada
- [ ] `USE_LANGFUSE=true` definido

### Testes
- [ ] Servidor reiniciado
- [ ] Geração de IEP testada
- [ ] Console mostra `[Langfuse] Client initialized`
- [ ] Trace aparece no dashboard Langfuse
- [ ] HTML gerado está correto

---

**🎉 Pronto! Você agora tem gerenciamento profissional de prompts com Langfuse!**

