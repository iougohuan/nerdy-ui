# ⚡ Langfuse - Configuração Rápida do Prompt IEP

Guia visual para preencher o formulário "Create new prompt" no Langfuse.

---

## 📝 CAMPO 1: Name

```
IEP/Generator
```

✅ Use `/` para organizar em pastas  
✅ Isso cria: Pasta "IEP" → Prompt "Generator"

---

## 💬 CAMPO 2: Prompt

### Selecione a aba: **Chat** (não Text)

### ⚙️ **System** (Primeira caixa)

Cole este texto:

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

### 👤 **User** (Segunda caixa)

Cole o conteúdo do campo `userMessage` do arquivo `LANGFUSE_IEP_PROMPT.json` (são ~400 linhas com todas as instruções detalhadas).

O prompt do User começa com:
```
Generate a personalized IEP document based on the following student information:

## STUDENT CONTEXT
**Student Performance Description:**
{{studentPerformance}}
...
```

E inclui todas estas variáveis:
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

---

## ⚙️ CAMPO 3: Config

Cole este JSON:

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

**Por quê esses valores?**
- `model`: Modelo mais recente e poderoso do GPT-4o
- `temperature: 0.7`: Equilíbrio perfeito entre criatividade e consistência
- `max_tokens: 4000`: Espaço suficiente para IEP completo
- `response_format: json_object`: Garante saída estruturada em JSON

---

## 🏷️ CAMPO 4: Labels

☑️ **Marque:** "Set the 'production' label"

Isso marca esta versão como a versão de produção ativa.

---

## 💾 CAMPO 5: Commit message (optional)

**Para primeira versão, cole:**

```
Initial IEP Generator prompt setup

- Added SMART methodology for goals and benchmarks
- Implemented personalization requirements
- Configured HTML formatting for TipTap editor
- Added comprehensive section instructions
- Set up 10 variables for student data input
- Configured GPT-4o-2024-08-06 with temperature 0.7
```

---

## 🎯 Clique em: **"Create prompt"**

---

## ✅ Checklist Antes de Criar

Certifique-se de que:

- [ ] Nome está em formato `IEP/Generator`
- [ ] Aba "Chat" está selecionada (não "Text")
- [ ] System message está preenchida
- [ ] User message tem todas as 10 variáveis `{{variable}}`
- [ ] Config tem o JSON com `response_format`
- [ ] Label "production" está marcada
- [ ] Commit message está preenchida

---

## 🧪 Testar o Prompt

Após criar, teste com estes valores:

### Variáveis de Teste

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

### Resultado Esperado

Você deve receber um JSON com estrutura:

```json
{
  "sections": [
    {
      "title": "👦 Student Information",
      "content": "<p>👦 Student Name: [Student name]<br>🏫 Grade Level: 4th Grade<br>🗣️ Language: English<br>📆 Evaluation Schedule: Quarterly</p>"
    },
    {
      "title": "🔍 Present Levels of Academic Achievement and Functional Performance (PLAAFP)",
      "content": "<p>[3-4 parágrafos expandidos e detalhados]</p>"
    }
    // ... outras seções
  ]
}
```

---

## 🔗 Próximos Passos

Após criar o prompt no Langfuse:

1. **Copie o Prompt ID** que o Langfuse gera
2. **Configure suas variáveis de ambiente:**
   ```bash
   LANGFUSE_PUBLIC_KEY=pk-lf-...
   LANGFUSE_SECRET_KEY=sk-lf-...
   LANGFUSE_PROMPT_NAME=IEP/Generator
   ```
3. **Use no código:**
   ```typescript
   const prompt = await langfuse.getPrompt('IEP/Generator');
   ```

---

## 📚 Documentação Completa

Para instruções detalhadas, veja:
- `LANGFUSE_SETUP_GUIDE.md` - Guia completo com explicações
- `LANGFUSE_IEP_PROMPT.json` - Arquivo fonte com toda a estrutura
- `IEP_PROMPT_STRUCTURE.json` - Especificação técnica detalhada

---

## 🆘 Problemas Comuns

### ❌ "Variable {{studentPerformance}} not found"
**Solução:** Verifique se você colou o User message completo com todas as variáveis.

### ❌ "Invalid JSON in config"
**Solução:** Copie novamente o JSON do Config, certifique-se de não ter caracteres extras.

### ❌ Output não está em JSON
**Solução:** Certifique-se de que `response_format: { "type": "json_object" }` está no Config.

### ❌ Prompt muito genérico
**Solução:** Aumente os detalhes em `studentPerformance` ao testar.

---

**✨ Pronto! Seu prompt está configurado e pronto para uso!**

