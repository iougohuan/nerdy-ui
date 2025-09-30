# 🚀 Guia de Deploy - IEP Generator

## 📋 Pré-requisitos

Antes de fazer o deploy, certifique-se de que:

- ✅ Todos os commits estão no GitHub (branch main)
- ✅ Build local funciona sem erros (`npm run build`)
- ✅ Chave da API OpenAI está configurada

---

## 🌐 Deploy na Vercel (Recomendado)

### Passo 1: Instalar Vercel CLI (se necessário)

```bash
npm install -g vercel
```

### Passo 2: Login na Vercel

```bash
vercel login
```

### Passo 3: Deploy do Projeto

**Opção A - Deploy Rápido:**
```bash
cd /Users/iougohuan/Nerdy/Nerdy\ UI/nerdy-ui
vercel
```

**Opção B - Deploy para Produção:**
```bash
cd /Users/iougohuan/Nerdy/Nerdy\ UI/nerdy-ui
vercel --prod
```

### Passo 4: Configurar Variáveis de Ambiente

Depois do deploy, você precisa adicionar a chave da API OpenAI:

1. Acesse o dashboard do projeto na Vercel
2. Vá em **Settings** → **Environment Variables**
3. Adicione:
   ```
   Name: OPENAI_API_KEY
   Value: your-openai-api-key-here
   ```
4. Selecione environments: **Production**, **Preview**, **Development**
5. Clique em **Save**

### Passo 5: Redesploy (se necessário)

Se adicionou a variável depois do deploy:
```bash
vercel --prod
```

---

## 🔗 Deploy Automático via GitHub

### Configuração (Uma Vez)

1. **Acesse**: https://vercel.com
2. **Clique**: "Import Project"
3. **Conecte**: Seu repositório GitHub (iougohuan/nerdy-ui)
4. **Configure**:
   - Framework Preset: **Next.js**
   - Root Directory: `nerdy-ui/`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. **Adicione Environment Variables**:
   ```
   OPENAI_API_KEY=sk-proj-3KOvRpEZ7ng0gMh...
   ```
6. **Deploy**!

### Deploy Automático

Depois da configuração inicial:
- ✅ Cada `git push` para `main` → Deploy automático em produção
- ✅ Cada Pull Request → Preview deployment
- ✅ Rollback automático se falhar

---

## ⚙️ Configurações do Projeto

### Build Settings

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm ci"
}
```

### Environment Variables Necessárias

```bash
OPENAI_API_KEY=your-api-key-here
```

---

## 🧪 Testar Build Local (Antes do Deploy)

```bash
# Limpar cache
rm -rf .next

# Build de produção
npm run build

# Testar build localmente
npm start
```

Se o build funcionar sem erros, está pronto para deploy! ✅

---

## 📊 Checklist de Deploy

Antes de fazer deploy, verifique:

- [ ] ✅ Build local funciona (`npm run build`)
- [ ] ✅ Todos os commits estão no GitHub
- [ ] ✅ `.env.local` NÃO está no repositório
- [ ] ✅ Chave da API OpenAI pronta para adicionar na Vercel
- [ ] ✅ Sem erros de lint/TypeScript
- [ ] ✅ Funcionalidades testadas localmente

---

## 🚨 Problemas Comuns

### Erro: "OPENAI_API_KEY not configured"
**Solução**: Adicionar variável de ambiente na Vercel

### Erro: Build Failed
**Solução**: Rodar `npm run build` localmente para identificar o erro

### Erro: Module not found
**Solução**: Verificar se todas as dependências estão no `package.json`

---

## 📱 Após o Deploy

### URLs Geradas:

- **Production**: `https://your-project.vercel.app`
- **Preview**: `https://your-project-git-branch.vercel.app`

### Funcionalidades Disponíveis:

- ✅ IEP Generator: `/ai-tools`
- ✅ Dashboard: `/dashboard`
- ✅ Builder: `/builder`
- ✅ Home: `/`

### Monitoramento:

- Dashboard Vercel: Analytics, logs, performance
- Edge Functions: Logs da API route `/api/generate-iep`
- Environment Variables: Gerenciar chaves de API

---

## 🎉 Pronto!

Seu IEP Generator estará disponível globalmente após o deploy! 🌍

**URL**: https://seu-projeto.vercel.app/ai-tools

---

## 📚 Documentação Adicional

- [Vercel Deploy Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables](https://vercel.com/docs/environment-variables)
