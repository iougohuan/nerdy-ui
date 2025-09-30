# 🚀 Instruções de Configuração - IEP Generator

## ⚡ Quick Start (3 passos)

### 1️⃣ Criar arquivo `.env.local`

Na raiz do projeto (`nerdy-ui/`), crie um arquivo chamado `.env.local` com o seguinte conteúdo:

```bash
OPENAI_API_KEY=your-openai-api-key-here
```

### 2️⃣ Rodar o projeto

```bash
npm run dev
```

### 3️⃣ Acessar a ferramenta

Abra no navegador: **http://localhost:3000/ai-tools**

---

## ✅ Está Funcionando?

Você saberá que está tudo certo quando:
1. ✅ O servidor Next.js inicia sem erros
2. ✅ A página `/ai-tools` carrega normalmente
3. ✅ Ao clicar em "Generate" (após preencher o formulário), o IEP é gerado em ~10-20 segundos

---

## 📋 Como Usar

### Step 1: Student Context
1. Descreva a performance do estudante (obrigatório)
2. Selecione Grade Level
3. Selecione Disability Categories
4. Selecione Areas of Concern
5. Selecione Priority Goal Areas
6. Clique "Next"

### Step 2: IEP Setting
1. **IMPORTANTE**: Selecione pelo menos uma seção em "IEP Components sections"
   - Estas são as seções que serão geradas no documento
2. Configure Evaluation Schedule e Language
3. Selecione Existing Services e Accommodations
4. Clique "Generate"

### Resultado
- O sistema vai gerar um IEP completo usando IA
- Você pode editar o documento no editor TipTap
- Pode exportar o documento

---

## 🔍 Seções Disponíveis para Geração

Ao selecionar "IEP Components sections", você determina quais partes do documento serão geradas:

- ✅ **Student Information**: Dados básicos do estudante
- ✅ **PLAAFP**: Present Levels of Academic Achievement and Functional Performance
- ✅ **Disability Categories**: Categorias de deficiência
- ✅ **Areas of Concern**: Áreas de preocupação
- ✅ **Priority Goal Areas**: Áreas de objetivo prioritário
- ✅ **Goals and Objectives**: Objetivos anuais com benchmarks detalhados
- ✅ **Accommodations and Modifications**: Tabela de acomodações
- ✅ **Progress Monitoring**: Métodos de acompanhamento
- ✅ **Participation in General Education Curriculum**: Participação no currículo geral
- ✅ **Services and Supports**: Tabela de serviços especializados
- ✅ **Team Members**: Membros da equipe IEP

**💡 Dica**: Selecione todas as seções para gerar um IEP completo!

---

## 🎯 Exemplo Completo

### Dados de Entrada:
```
Performance:
"Student is currently in 4th grade and demonstrates the ability to identify 
explicit information in short texts. However, has difficulty making inferences 
and identifying main ideas in longer texts."

Grade Level: 4th Grade
Disability: Specific Learning Disability (SLD)
Areas: Academic (reading, writing)
Goals: Reading Comprehension, Written Expression
IEP Components: [Selecionar todas]
Evaluation: Quarterly
Language: English
Services: Special Education Teacher Support
Accommodations: Extended time, Visual aids
```

### Resultado Gerado:
Um documento IEP profissional com:
- Informações do estudante
- PLAAFP expandido e detalhado
- Objetivos mensuráveis com percentagens específicas
- Tabelas de acomodações e serviços
- Benchmarks de curto prazo
- Métodos de monitoramento
- Lista de membros da equipe

---

## 🐛 Problemas Comuns

### ❌ "OpenAI API key not configured"
**Causa**: Arquivo `.env.local` não foi criado ou está no lugar errado  
**Solução**: Criar o arquivo na raiz de `nerdy-ui/` com a chave da API

### ❌ "Please select at least one IEP Component section"
**Causa**: Nenhuma seção foi selecionada no Step 2  
**Solução**: Selecionar pelo menos uma seção em "IEP Components sections"

### ❌ Geração demora muito ou falha
**Causa**: Problema de conexão com OpenAI ou limite de rate  
**Solução**: 
1. Verificar logs do console do navegador (F12)
2. Verificar se a chave da API é válida
3. Aguardar alguns minutos se atingiu o rate limit

---

## 📚 Documentação Completa

Para mais detalhes sobre arquitetura, fluxo de dados e troubleshooting, veja:
👉 **[IEP_GENERATOR_README.md](./IEP_GENERATOR_README.md)**

---

## ✨ Pronto!

Agora você tem um gerador de IEP funcional usando IA! 🎉

O sistema vai:
- ✅ Gerar apenas as seções que você selecionou
- ✅ Usar os dados do formulário como base
- ✅ Criar conteúdo personalizado e profissional
- ✅ Formatar com tabelas, listas e emojis
- ✅ Permitir edição completa no TipTap
- ✅ Possibilitar exportação do documento
