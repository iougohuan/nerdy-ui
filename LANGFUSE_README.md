# 🚀 Langfuse - Quick Reference

Guia rápido para usar o Langfuse no projeto Nerdy UI.

---

## ⚡ Setup Rápido (5 minutos)

### 1. Instalar Dependências ✅
```bash
npm install langfuse langfuse-node
```

### 2. Configurar Langfuse Platform

1. Crie conta: https://cloud.langfuse.com
2. Copie API keys de **Settings → API Keys**
3. Crie prompt `IEP/Generator` seguindo: `LANGFUSE_QUICK_SETUP.md`

### 3. Configurar .env.local

```bash
# OpenAI
OPENAI_API_KEY=sk-...

# Langfuse
LANGFUSE_SECRET_KEY=sk-lf-...
LANGFUSE_PUBLIC_KEY=pk-lf-...
LANGFUSE_HOST=https://cloud.langfuse.com
LANGFUSE_PROMPT_NAME=IEP/Generator

# Ativar Langfuse
USE_LANGFUSE=true
```

### 4. Testar

```bash
npm run dev
```

Gere um IEP e verifique:
- ✅ Console mostra: `[Langfuse] Client initialized`
- ✅ Dashboard Langfuse tem novo trace

---

## 🔀 Modos de Operação

### Com Langfuse (Recomendado para Produção)
```bash
USE_LANGFUSE=true
```
- ✅ Prompt vem do Langfuse
- ✅ Analytics e traces habilitados
- ✅ Mudanças sem deploy

### Sem Langfuse (Desenvolvimento Local)
```bash
USE_LANGFUSE=false
```
- ✅ Prompt hardcoded no código
- ✅ Mais rápido para dev
- ❌ Sem analytics

---

## 📂 Arquivos da Integração

```
nerdy-ui/
├── .env.local.example              # Template de configuração
├── src/
│   ├── lib/
│   │   └── langfuse.ts            # ✨ Cliente Langfuse
│   └── app/
│       └── api/
│           └── generate-iep/
│               └── route.ts       # ✨ API atualizada
└── Guias:
    ├── LANGFUSE_INTEGRATION_GUIDE.md   # 📚 Guia completo
    ├── LANGFUSE_SETUP_GUIDE.md         # 📖 Setup detalhado
    ├── LANGFUSE_QUICK_SETUP.md         # ⚡ Setup rápido
    ├── LANGFUSE_COPY_PASTE.txt         # 📋 Textos prontos
    └── LANGFUSE_IEP_PROMPT.json        # 📝 Estrutura do prompt
```

---

## 🔧 Como Funciona

```typescript
// 1. Frontend envia dados do estudante
POST /api/generate-iep

// 2. API verifica configuração
const useLangfuse = isLangfuseEnabled();

// 3. Busca prompt apropriado
if (useLangfuse) {
  prompt = await getLangfusePrompt('IEP/Generator');
} else {
  prompt = buildPrompt(data); // Hardcoded
}

// 4. Gera IEP com OpenAI
const iep = await generateObject({ prompt });

// 5. Registra trace no Langfuse (se habilitado)
trace.update({ output: iep });

// 6. Retorna HTML formatado
return { html, promptSource: 'langfuse' }
```

---

## 📊 Monitoramento

### Dashboard Langfuse

Acesse: https://cloud.langfuse.com

**Traces:**
- Ver todas as gerações de IEP
- Tempo de execução
- Custo em tokens
- Input/Output completos
- Metadados (grade level, seções, etc.)

**Métricas:**
- Volume de gerações por dia
- Custo total acumulado
- Taxa de erro
- Latência média

---

## 🐛 Troubleshooting

### ❌ Erro: "Langfuse is not enabled"
```bash
# Verifique .env.local:
USE_LANGFUSE=true
LANGFUSE_SECRET_KEY=sk-lf-...
LANGFUSE_PUBLIC_KEY=pk-lf-...
```

### ❌ Erro: "Failed to fetch prompt"
1. Verifique nome do prompt: `IEP/Generator`
2. Certifique-se que tem label "production"
3. Teste API keys no dashboard

### ❌ Traces não aparecem
```typescript
// Use await para garantir flush
await flushLangfuse();
```

### ⚠️ Performance lenta
```bash
# Use modo hardcoded em desenvolvimento
USE_LANGFUSE=false
```

---

## 🎯 Principais Vantagens

| Recurso | Sem Langfuse | Com Langfuse |
|---------|--------------|--------------|
| **Mudanças no prompt** | Deploy necessário | Instantâneo ⚡ |
| **Versionamento** | Git manual | Automático 📚 |
| **Analytics** | Nenhum | Completo 📊 |
| **A/B Testing** | Complexo | Fácil 🧪 |
| **Colaboração** | Via Git | UI visual 👥 |
| **Rollback** | Deploy anterior | 1 clique 🔄 |
| **Custo tracking** | Manual | Automático 💰 |

---

## 📖 Leia Mais

- **Setup completo:** `LANGFUSE_INTEGRATION_GUIDE.md`
- **Criar prompt:** `LANGFUSE_QUICK_SETUP.md`
- **Textos prontos:** `LANGFUSE_COPY_PASTE.txt`
- **Estrutura:** `LANGFUSE_IEP_PROMPT.json`

---

## ✅ Checklist Rápido

- [ ] Langfuse instalado (`npm install langfuse`)
- [ ] Conta criada em cloud.langfuse.com
- [ ] Prompt `IEP/Generator` configurado
- [ ] `.env.local` com chaves corretas
- [ ] `USE_LANGFUSE=true` definido
- [ ] Servidor reiniciado (`npm run dev`)
- [ ] Teste executado com sucesso
- [ ] Trace visível no dashboard

---

**🎉 Pronto para usar! Qualquer dúvida, consulte `LANGFUSE_INTEGRATION_GUIDE.md`**

