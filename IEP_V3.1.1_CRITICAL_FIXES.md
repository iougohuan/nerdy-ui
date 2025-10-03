# IEP Generator v3.1.1 - CRITICAL FIXES

**Data:** 03 de Outubro, 2025  
**Versão:** 3.1.1  
**Status:** Implementado ✅

---

## 🚨 Problemas Críticos Identificados em v3.1

### Teste Realizado:
**Input Todd (minimalista):**
```
Performance: "Todd reads 85 WPM with 5 errors... 5th percentile"
Areas of Concern: "Academic (reading)"
Priority Goals: "Reading Comprehension"
Accommodations: "Extended time, Visual aids/graphic organizers"
```

### ❌ Problemas Encontrados:

1. **PLAAFP inventando dados:**
   - Gerou: "50% accuracy on comprehension" ← NÃO estava no input
   - Gerou: "8-10 minutes on task" ← NÃO estava no input
   - Gerou: "40% independence" ← NÃO estava no input

2. **Parágrafo funcional criado sem base:**
   - Input: NÃO menciona atenção/foco
   - Gerado: Parágrafo completo sobre "maintaining focus", "on task", etc

3. **Areas of Concern expandindo:**
   - Input: "Academic (reading)"
   - Gerado: "Academic (e.g., reading, writing, math)"

---

## ✅ Correções Implementadas v3.1.1

### Fix #1: PROIBIR Invenção de Dados no PLAAFP

**Nova Regra Adicionada:**
```
CRITICAL PLAAFP DATA RULE (v3.1.1):
NEVER INVENT MEASURABLE DATA NOT PROVIDED BY TEACHER

ONLY use data explicitly provided in {{studentPerformance}}:
✅ If teacher says "85 WPM, 5 errors" → use ONLY that
✅ If teacher says "struggles with fluency" → can elaborate impact
❌ If teacher says "85 WPM" → CANNOT add "50% comprehension"
❌ If teacher does NOT mention focus → CANNOT add "on-task 8-10 min"
❌ If teacher does NOT mention independence → CANNOT add "40% independent"

ALLOWED EXPANSIONS:
✅ Context: "85 WPM (2nd grade level)" + "below 4th grade expectations"
✅ Impact: "reading challenges affect access to grade-level content"
✅ Professional language: "demonstrates difficulty with fluency"

PROHIBITED INVENTIONS:
❌ Comprehension percentages (unless provided)
❌ Time on-task metrics (unless provided)
❌ Independence percentages (unless provided)
❌ Prompts per hour (unless provided)
❌ ANY metric not in {{studentPerformance}}

RULE: If teacher didn't measure it → don't include it
```

---

### Fix #2: REMOVER Parágrafo Funcional Se Não Mencionado

**Nova Regra Adicionada:**
```
FUNCTIONAL PERFORMANCE PARAGRAPH RULE (v3.1.1):
ONLY create Functional Performance paragraph if {{studentPerformance}}
contains EXPLICIT mentions:

TRIGGER WORDS (must be present):
- "attention", "focus", "concentrat"
- "task completion", "finishing", "completes"
- "organiz", "materials"
- "behavior", "self-regulation"
- "requires reminders", "needs prompts"

IF NO TRIGGER WORDS FOUND → SKIP FUNCTIONAL PARAGRAPH ENTIRELY

PLAAFP STRUCTURE WHEN NO FUNCTIONAL ISSUES:
Paragraph 1: Academic Performance (areas mentioned)
Paragraph 2: Strengths & Effective Strategies
Paragraph 3: Impact on General Education
[NO Functional Performance paragraph]

EXAMPLE:
Input: "Todd reads 85 WPM with 5 errors"
✅ CORRECT: 3 paragraphs (Academic, Strengths, Impact)
❌ WRONG: 4 paragraphs with invented Functional paragraph
```

---

### Fix #3: Areas of Concern LITERAL (Sem Expansão)

**Nova Regra Adicionada:**
```
AREAS OF CONCERN LITERAL RULE (v3.1.1):
Copy EXACTLY from {{areasOfConcern}} - NO expansions, NO examples

DO NOT:
❌ Add "(e.g., reading, writing, math)"
❌ Add examples not in input
❌ Expand "Academic" to "Academic (reading, writing, math)"

DO:
✅ Copy exact text from {{areasOfConcern}}
✅ If input has "(reading)" → keep "(reading)"
✅ If input has no parentheses → don't add them

EXAMPLES:
Input: "Academic (reading)"
✅ Output: <li>Academic (reading)</li>
❌ Output: <li>Academic (e.g., reading, writing, math)</li>

Input: "Academic"
✅ Output: <li>Academic</li>
❌ Output: <li>Academic (e.g., reading, writing, math)</li>

Input: "Behavioral, Academic (reading)"
✅ Output:
    <li>Behavioral</li>
    <li>Academic (reading)</li>
```

---

## 📊 Comparação: v3.1 vs v3.1.1

| Aspecto | v3.1 | v3.1.1 (Fixed) |
|---------|------|----------------|
| **Dados no PLAAFP** | Inferia métricas (50% comp., 8-10min focus) | USA APENAS dados fornecidos |
| **Parágrafo Funcional** | Criava se "parecia necessário" | Cria APENAS se palavras-chave explícitas |
| **Areas of Concern** | Expandia com exemplos | LITERAL - copia exato |
| **Invenção de dados** | Permitia se "plausível" | PROIBIDA completamente |

---

## 🧪 Teste Esperado v3.1.1 (Caso Todd):

**Input:**
```
studentPerformance: "Todd reads 85 WPM with 5 errors... 5th percentile"
areasOfConcern: "Academic (reading)"
priorityGoalAreas: "Reading Comprehension"
accommodations: "Extended time, Visual aids/graphic organizers"
```

**PLAAFP Esperado:**
```html
<p>Academic Performance: Todd reads at 85 words per minute with 5 errors 
when given second-grade passages, placing him at the 5th percentile for 
fourth graders. His reading fluency is significantly below grade level, 
impacting his ability to access fourth-grade texts independently.</p>

[NO Functional Performance paragraph - not mentioned in input]

<p>Strengths & Effective Strategies: Todd responds well to visual aids and 
graphic organizers, which help him organize information during reading tasks. 
Extended time allows him to process text more effectively.</p>

<p>Impact on General Education: Todd's reading challenges affect his ability 
to access grade-level content in reading-intensive subjects such as language 
arts and social studies. He requires moderate support with accommodations to 
participate in the general education curriculum.</p>
```

**Areas of Concern Esperado:**
```html
⚠️ Areas of Concern
<ul>
  <li>Academic (reading)</li>
</ul>
```
(SEM expansão para "reading, writing, math")

---

## 🎯 Regras de Ouro v3.1.1:

1. **Se o professor não disse → não invente**
2. **Se não tem palavra-chave funcional → sem parágrafo funcional**
3. **Areas of Concern = cópia literal exata**
4. **Dados mensuráveis = apenas os fornecidos**

---

## 📝 System Message Atualizado v3.1.1:

```
IDEA COMPLIANCE REQUIREMENTS:
- COMPLETE COVERAGE: Every challenge/need mentioned in PLAAFP MUST have a corresponding goal
- MEASURABLE DATA: Use ONLY data explicitly provided - NEVER invent metrics
- COHERENCE: Goals → Services → Accommodations must all align logically
- CONSERVATIVE EXPANSION: Only discuss areas EXPLICITLY mentioned in {{studentPerformance}}
- STRICT ALIGNMENT: Do NOT infer or add challenges not stated by the teacher
- NO DATA INVENTION: Do NOT create comprehension %, focus time, independence % not provided
- LITERAL COPYING: Areas of Concern must match {{areasOfConcern}} exactly (no expansions)
```

---

## ✅ Checklist de Validação v3.1.1:

Ao gerar IEP, verificar:

**PLAAFP:**
- [ ] Usa APENAS dados de {{studentPerformance}}
- [ ] NÃO tem "50% comprehension" se não fornecido
- [ ] NÃO tem "8-10 minutes focus" se não fornecido
- [ ] NÃO tem "40% independence" se não fornecido
- [ ] Parágrafo funcional APENAS se palavras-chave presentes

**Areas of Concern:**
- [ ] Texto EXATO de {{areasOfConcern}}
- [ ] SEM "(e.g., ...)" adicionado
- [ ] SEM expansão de áreas

**Geral:**
- [ ] NADA mencionado que não esteja no input original
- [ ] Expansões são apenas de CONTEXTO (não dados)
- [ ] Professional language mantido

---

**Implementado em:**
- `LANGFUSE_IEP_PROMPT.json` (v3.1.1)
- `LANGFUSE_COPY_PASTE.txt` (atualização pendente)

**Status:** ✅ Pronto para teste com caso Todd

