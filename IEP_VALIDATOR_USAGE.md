# IEP v3.1.1 Validator - Usage Guide

**Created:** October 3, 2025  
**Version:** 3.1.1  
**Purpose:** Validate generated IEP documents against ULTRA-CONSERVATIVE rules

---

## 🎯 What Does the Validator Check?

The validator ensures generated IEPs follow v3.1.1 ULTRA-CONSERVATIVE rules:

### 1. ❌ **NO Data Invention**
Detects if PLAAFP contains metrics NOT provided in input:
- Comprehension percentages (e.g., "50% accuracy on comprehension")
- Time on-task (e.g., "8-10 minutes before redirection")
- Independence percentages (e.g., "completes 40% independently")
- Prompts frequency (e.g., "requires 4 prompts per hour")
- Organization metrics (e.g., "organizes in 2 out of 5 opportunities")

### 2. ❌ **NO Functional Paragraph Without Trigger Words**
Detects if PLAAFP has "Functional Performance" paragraph when input lacks:
- Trigger words: "attention", "focus", "task completion", "organization", "behavior"
- Phrases: "requires reminders", "needs prompts", "stays on task"

### 3. ❌ **NO Areas of Concern Expansion**
Detects prohibited expansions like:
- Input: "Academic (reading)"
- ❌ Bad: "Academic (e.g., reading, writing, math)"
- ✅ Good: "Academic (reading)"

### 4. ⚠️ **NO Unauthorized Table Categories**
Detects categories in Accommodations table not mentioned in PLAAFP:
- Writing category when PLAAFP doesn't mention writing
- Math category when PLAAFP doesn't mention math

---

## 🚀 Usage

### Option 1: Web UI (Easiest)

1. Open: `http://localhost:3000/validate-iep`
2. Fill in original input (or use pre-filled Todd example)
3. Paste generated IEP HTML
4. Click "🔍 Validate IEP"
5. Review violations report

### Option 2: Programmatic (TypeScript)

```typescript
import { validateIEP, formatValidationReport } from '@/lib/iep-validator';

const input = {
  studentPerformance: "Todd reads 85 WPM with 5 errors... 5th percentile",
  gradeLevel: "4th Grade",
  areasOfConcern: "Academic (reading)",
  priorityGoalAreas: "Reading Comprehension",
  accommodations: "Extended time, Visual aids/graphic organizers"
};

const generatedHTML = `<h3>🔍 Present Levels...`; // Full IEP HTML

const result = validateIEP(input, generatedHTML);

if (!result.overallCompliant) {
  console.log(formatValidationReport(result));
}
```

### Option 3: CLI Script (Node.js)

```bash
node scripts/validate-iep-v3.1.1.js
```

---

## 📊 Example Validation Report

```
================================================================================
IEP v3.1.1 ULTRA-CONSERVATIVE VALIDATION REPORT
================================================================================
Timestamp: 2025-10-03T14:30:00.000Z
Version: 3.1.1
Overall Compliant: ❌ NO
Total Violations: 3
  - Critical: 3
  - High: 0
================================================================================

❌ VIOLATIONS FOUND:

[1] NO_DATA_INVENTION (CRITICAL)
    ❌ CRITICAL: Found 3 invented data point(s) in PLAAFP that were NOT in input
    Count: 3
    1. "50% accuracy on comprehension assessments" (comprehension_percentage)
       Context: ...Todd struggles with comprehension, achieving 50% accuracy on comprehension assessments...
    2. "8-10 minutes before requiring redirection" (time_on_task)
       Context: ...maintains focus during tasks, remaining on task for 8-10 minutes before requiring redirection...
    3. "independently about 50% of the time" (independence_percentage)
       Context: ...completes assignments independently about 50% of the time, indicating...

[2] NO_FUNCTIONAL_WITHOUT_TRIGGERS (CRITICAL)
    ❌ CRITICAL: PLAAFP contains Functional Performance paragraph but input has NO trigger words
    Details: {
      "hasFunctionalContent": true,
      "triggerWordsFound": false
    }

[3] LITERAL_AREAS_OF_CONCERN (CRITICAL)
    ❌ CRITICAL: Areas of Concern has prohibited expansion
    Expected: "Academic (reading)"
    Got: "Academic (e.g., reading, writing, math)"

================================================================================
RECOMMENDATIONS:
================================================================================
1. Verify prompt version in Langfuse is v3.1.1 (not v3.1 or v3.0)
2. Check that "production" label is on v3.1.1
3. Re-copy prompt from LANGFUSE_COPY_PASTE.txt
4. Clear Langfuse cache and regenerate IEP
5. System Message should include: "NO DATA INVENTION"
6. User Message should have: "CRITICAL RULE v3.1.1: NEVER INVENT MEASURABLE DATA"
================================================================================
```

---

## 🔍 Common Violations & Fixes

### Violation 1: Invented Comprehension %
```
❌ BAD (v3.1):
"achieving 50% accuracy on comprehension assessments"

✅ GOOD (v3.1.1):
"reads 85 WPM with 5 errors, placing at 5th percentile. 
His reading fluency is below grade level."
```
**Fix:** Remove invented percentages. Use only data from input.

---

### Violation 2: Invented Time On-Task
```
❌ BAD (v3.1):
"remains on task for 8-10 minutes before requiring redirection"

✅ GOOD (v3.1.1):
[NO functional paragraph if input doesn't mention attention/focus]
```
**Fix:** Remove entire Functional Performance paragraph if no trigger words.

---

### Violation 3: Areas Expansion
```
❌ BAD (v3.1):
<li>Academic (e.g., reading, writing, math)</li>

✅ GOOD (v3.1.1):
<li>Academic (reading)</li>
```
**Fix:** Copy Areas of Concern EXACTLY from input.

---

### Violation 4: Unauthorized Categories
```
❌ BAD (v3.1):
| Category | Accommodation |
|----------|---------------|
| 📘 Reading | Extended time |
| ✍️ Writing | N/A |  ← NOT mentioned in PLAAFP

✅ GOOD (v3.1.1):
| Category | Accommodation |
|----------|---------------|
| 📘 Reading | Extended time, Visual aids |
| 📝 Assessments | Extended time |
```
**Fix:** Remove table rows for areas not in PLAAFP.

---

## ✅ Expected Results (Todd Case)

**Input:**
```
Performance: "Todd reads 85 WPM with 5 errors... 5th percentile"
Areas: "Academic (reading)"
Accommodations: "Extended time, Visual aids/graphic organizers"
```

**v3.1.1 Compliant Output:**
```
✅ PLAAFP has ONLY:
   - "85 WPM, 5 errors, 5th percentile" (exact data from input)
   - "below grade level expectations" (context, not data)
   - "reading fluency challenges" (description, not metric)
   - NO functional paragraph
   - NO invented percentages

✅ Areas of Concern:
   - <li>Academic (reading)</li>  (exact copy)

✅ Accommodations:
   - Reading: Extended time, Visual aids, Graphic organizers
   - Assessments: Extended time, Visual aids
   - NO Writing row
   - NO Math row

✅ 1 Goal: Reading Comprehension
✅ 1 Service: Reading Comprehension Intervention
```

---

## 🛠️ Troubleshooting

### Problem: "All validations fail"
**Cause:** Langfuse still using old prompt (v3.1 or v3.0)  
**Solution:** 
1. Check Langfuse prompt version
2. Verify "production" label on v3.1.1
3. Re-copy from LANGFUSE_COPY_PASTE.txt

### Problem: "Data invention violations"
**Cause:** Prompt missing "CRITICAL RULE v3.1.1: NEVER INVENT MEASURABLE DATA"  
**Solution:** 
1. Verify System Message has "NO DATA INVENTION" in IDEA COMPLIANCE
2. Verify User Message PLAAFP section has invention prohibition rules

### Problem: "Functional paragraph violation"
**Cause:** Prompt missing trigger words rule  
**Solution:**
1. Check User Message has: "ONLY create this paragraph if {{studentPerformance}} contains..."
2. Verify trigger words list is present

---

## 📁 Files

- `/src/lib/iep-validator.ts` - Validation library (TypeScript)
- `/src/app/validate-iep/page.tsx` - Web UI for validation
- `/scripts/validate-iep-v3.1.1.js` - CLI validation script
- `LANGFUSE_COPY_PASTE.txt` - Copy-paste instructions for Langfuse
- `IEP_V3.1.1_CRITICAL_FIXES.md` - Documentation of fixes

---

## 🧪 Testing

### Test Case 1: Todd (Minimalist - Only Reading)
**Expected:** ✅ Compliant (if v3.1.1 prompt active)
- 3 paragraphs in PLAAFP (no functional)
- 1 goal (Reading)
- Areas: "Academic (reading)" literal
- No invented data

### Test Case 2: Emma (With Functional Mentions)
**Input:** "Emma reads 75 WPM... She requires frequent reminders to stay on task"
**Expected:** ✅ Compliant
- 4 paragraphs in PLAAFP (including functional - has trigger words)
- 2 goals (Reading + Attention)

### Test Case 3: Marcus (Multiple Areas)
**Input:** "Marcus reads at 3rd grade... writes at 2nd grade... solves 60% of math problems"
**Expected:** ✅ Compliant
- All 3 areas with data from input
- 3 goals (Reading, Writing, Math)
- No invented percentages beyond what was stated

---

## 🚨 Critical Reminders

1. **Validator is NOT a replacement for human review** - it catches common violations but may miss edge cases
2. **Run validation EVERY time** you update the Langfuse prompt
3. **Test with Todd case first** (minimalist input) - it should pass all validations
4. **If violations persist** after updating to v3.1.1, the Langfuse prompt wasn't updated correctly

---

**Created by:** Nerdy UI Team  
**Version:** 3.1.1  
**Last Updated:** October 3, 2025

