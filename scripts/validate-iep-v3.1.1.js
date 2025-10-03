#!/usr/bin/env node

/**
 * IEP v3.1.1 ULTRA-CONSERVATIVE Validation Script
 * 
 * Validates that generated IEP documents follow v3.1.1 rules:
 * 1. NO data invention (no comprehension %, focus time, independence %)
 * 2. NO functional paragraph without trigger words
 * 3. Areas of Concern LITERAL (no "(e.g., ...)" expansions)
 * 4. NO categories in tables for areas not mentioned in PLAAFP
 * 
 * Usage:
 *   node scripts/validate-iep-v3.1.1.js
 * 
 * Or import and use programmatically:
 *   import { validateIEP } from './scripts/validate-iep-v3.1.1.js'
 */

// ============================================================================
// VALIDATION RULES v3.1.1
// ============================================================================

const TRIGGER_WORDS = {
  attention: ['attention', 'focus', 'concentrat', 'distract'],
  taskCompletion: ['task completion', 'finishing', 'completes', 'complete assignments'],
  organization: ['organiz', 'materials', 'supplies'],
  behavior: ['behavior', 'self-regulation', 'impulse'],
  prompts: ['requires reminders', 'needs prompts', 'stays on task']
};

const INVENTED_DATA_PATTERNS = [
  // Comprehension percentages
  /(\d+)%\s+(accuracy|comprehension|correct)/i,
  
  // Time on task
  /(\d+-\d+|\d+)\s+minutes?\s+(on[-\s]task|focus|attention|before)/i,
  
  // Independence percentages
  /(\d+)%\s+(of the time|independent|completion)/i,
  
  // Prompts per hour/time
  /(\d+)\s+prompts?\s+(per|every)/i,
  
  // Out of X opportunities
  /(\d+)\s+out of\s+(\d+)\s+(opportunities|trials|times)/i
];

const AREAS_EXPANSION_PATTERN = /\(e\.g\.,\s*[^)]+\)/i;

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Check if student performance description contains trigger words
 */
function hasTriggerWords(studentPerformance) {
  const lowerText = studentPerformance.toLowerCase();
  
  for (const [category, words] of Object.entries(TRIGGER_WORDS)) {
    for (const word of words) {
      if (lowerText.includes(word.toLowerCase())) {
        return { found: true, category, word };
      }
    }
  }
  
  return { found: false };
}

/**
 * Extract data metrics mentioned in input
 */
function extractProvidedMetrics(studentPerformance) {
  const metrics = {
    wpm: null,
    errors: null,
    percentile: null,
    gradeLevel: null,
    other: []
  };
  
  // Words per minute
  const wpmMatch = studentPerformance.match(/(\d+)\s+words?\s+per\s+minute/i);
  if (wpmMatch) metrics.wpm = parseInt(wpmMatch[1]);
  
  // Errors
  const errorsMatch = studentPerformance.match(/(\d+)\s+errors?/i);
  if (errorsMatch) metrics.errors = parseInt(errorsMatch[1]);
  
  // Percentile
  const percentileMatch = studentPerformance.match(/(\d+)(?:st|nd|rd|th)?\s+percentile/i);
  if (percentileMatch) metrics.percentile = parseInt(percentileMatch[1]);
  
  // Grade level
  const gradeLevelMatch = studentPerformance.match(/(\d+)(?:st|nd|rd|th)[-\s]grade/i);
  if (gradeLevelMatch) metrics.gradeLevel = parseInt(gradeLevelMatch[1]);
  
  return metrics;
}

/**
 * Find invented data in PLAAFP
 */
function findInventedData(plaafpText, providedMetrics, studentPerformance) {
  const inventedData = [];
  
  // Check for each invented data pattern
  for (const pattern of INVENTED_DATA_PATTERNS) {
    const matches = plaafpText.matchAll(new RegExp(pattern.source, 'gi'));
    
    for (const match of matches) {
      const fullMatch = match[0];
      
      // Check if this data was actually provided in input
      const isProvided = studentPerformance.includes(fullMatch) ||
                        studentPerformance.toLowerCase().includes(fullMatch.toLowerCase());
      
      if (!isProvided) {
        inventedData.push({
          text: fullMatch,
          type: getInventionType(fullMatch),
          context: getContext(plaafpText, match.index, 100)
        });
      }
    }
  }
  
  return inventedData;
}

/**
 * Get type of invented data
 */
function getInventionType(text) {
  if (text.includes('comprehension') || text.includes('accuracy')) return 'comprehension_percentage';
  if (text.includes('minutes') && (text.includes('task') || text.includes('focus'))) return 'time_on_task';
  if (text.includes('%') && text.includes('independent')) return 'independence_percentage';
  if (text.includes('prompts')) return 'prompts_frequency';
  if (text.includes('out of')) return 'opportunities_metric';
  return 'unknown_metric';
}

/**
 * Get context around matched text
 */
function getContext(text, index, length = 100) {
  const start = Math.max(0, index - length);
  const end = Math.min(text.length, index + length);
  return '...' + text.slice(start, end) + '...';
}

/**
 * Check if PLAAFP has functional paragraph when it shouldn't
 */
function hasUnauthorizedFunctionalParagraph(plaafpText, triggerWordsResult) {
  // Look for functional paragraph indicators
  const functionalIndicators = [
    'Functional Performance:',
    'focus during',
    'maintaining attention',
    'task completion',
    'organizing materials',
    'completes assignments',
    'independently about',
    'prompts approximately'
  ];
  
  const hasFunctionalContent = functionalIndicators.some(indicator => 
    plaafpText.includes(indicator)
  );
  
  return {
    hasContent: hasFunctionalContent,
    shouldHave: triggerWordsResult.found,
    violation: hasFunctionalContent && !triggerWordsResult.found
  };
}

/**
 * Check if Areas of Concern has prohibited expansions
 */
function hasAreasExpansion(areasOfConcernHTML, originalAreasInput) {
  const hasExpansion = AREAS_EXPANSION_PATTERN.test(areasOfConcernHTML);
  
  const expansions = [];
  if (hasExpansion) {
    const matches = areasOfConcernHTML.matchAll(new RegExp(AREAS_EXPANSION_PATTERN.source, 'gi'));
    for (const match of matches) {
      expansions.push(match[0]);
    }
  }
  
  return {
    hasExpansion,
    expansions,
    expected: originalAreasInput,
    actual: areasOfConcernHTML.replace(/<[^>]+>/g, '').trim()
  };
}

/**
 * Check for unauthorized categories in accommodation table
 */
function hasUnauthorizedCategories(accommodationsHTML, plaafpText) {
  const categories = {
    reading: /📘\s*Reading/i.test(accommodationsHTML),
    writing: /✍️\s*Writing/i.test(accommodationsHTML),
    math: /🔢\s*Math/i.test(accommodationsHTML),
    general: /🧠\s*General/i.test(accommodationsHTML)
  };
  
  const plaafpLower = plaafpText.toLowerCase();
  const violations = [];
  
  if (categories.writing && !plaafpLower.includes('writing') && !plaafpLower.includes('written')) {
    violations.push({
      category: 'Writing',
      reason: 'Writing category present but not mentioned in PLAAFP'
    });
  }
  
  if (categories.math && !plaafpLower.includes('math')) {
    violations.push({
      category: 'Math',
      reason: 'Math category present but not mentioned in PLAAFP'
    });
  }
  
  return violations;
}

// ============================================================================
// MAIN VALIDATION FUNCTION
// ============================================================================

/**
 * Validate IEP document against v3.1.1 rules
 */
export function validateIEP(input, generatedIEP) {
  const results = {
    version: '3.1.1',
    timestamp: new Date().toISOString(),
    overallCompliant: true,
    violations: [],
    warnings: [],
    summary: {}
  };
  
  // Extract sections from generated IEP
  const plaafp = extractSection(generatedIEP, '🔍 Present Levels');
  const areasOfConcern = extractSection(generatedIEP, '⚠️ Areas of Concern');
  const accommodations = extractSection(generatedIEP, '🧰 Accommodations & Supports');
  
  // ========================================
  // VALIDATION #1: Data Invention
  // ========================================
  const providedMetrics = extractProvidedMetrics(input.studentPerformance);
  const inventedData = findInventedData(plaafp, providedMetrics, input.studentPerformance);
  
  if (inventedData.length > 0) {
    results.overallCompliant = false;
    results.violations.push({
      rule: 'NO_DATA_INVENTION',
      severity: 'CRITICAL',
      count: inventedData.length,
      details: inventedData,
      message: `Found ${inventedData.length} invented data point(s) in PLAAFP that were NOT in input`
    });
  }
  
  // ========================================
  // VALIDATION #2: Functional Paragraph
  // ========================================
  const triggerWordsResult = hasTriggerWords(input.studentPerformance);
  const functionalParagraphCheck = hasUnauthorizedFunctionalParagraph(plaafp, triggerWordsResult);
  
  if (functionalParagraphCheck.violation) {
    results.overallCompliant = false;
    results.violations.push({
      rule: 'NO_FUNCTIONAL_WITHOUT_TRIGGERS',
      severity: 'CRITICAL',
      details: {
        hasFunctionalContent: true,
        triggerWordsFound: false,
        inputText: input.studentPerformance
      },
      message: 'PLAAFP contains functional paragraph but input has NO trigger words (attention, focus, task completion, etc.)'
    });
  }
  
  // ========================================
  // VALIDATION #3: Areas of Concern
  // ========================================
  const areasExpansionCheck = hasAreasExpansion(areasOfConcern, input.areasOfConcern);
  
  if (areasExpansionCheck.hasExpansion) {
    results.overallCompliant = false;
    results.violations.push({
      rule: 'LITERAL_AREAS_OF_CONCERN',
      severity: 'CRITICAL',
      details: areasExpansionCheck,
      message: `Areas of Concern has prohibited expansion: ${areasExpansionCheck.expansions.join(', ')}`
    });
  }
  
  // ========================================
  // VALIDATION #4: Unauthorized Categories
  // ========================================
  const categoryViolations = hasUnauthorizedCategories(accommodations, plaafp);
  
  if (categoryViolations.length > 0) {
    results.overallCompliant = false;
    results.violations.push({
      rule: 'NO_UNAUTHORIZED_CATEGORIES',
      severity: 'HIGH',
      count: categoryViolations.length,
      details: categoryViolations,
      message: `Found ${categoryViolations.length} unauthorized categor(ies) in Accommodations table`
    });
  }
  
  // ========================================
  // SUMMARY
  // ========================================
  results.summary = {
    totalViolations: results.violations.length,
    criticalViolations: results.violations.filter(v => v.severity === 'CRITICAL').length,
    highViolations: results.violations.filter(v => v.severity === 'HIGH').length,
    compliant: results.overallCompliant,
    version: '3.1.1'
  };
  
  return results;
}

/**
 * Extract section from IEP HTML
 */
function extractSection(html, sectionTitle) {
  const regex = new RegExp(`${sectionTitle}[^]*?(?=(<h3>|$))`, 'i');
  const match = html.match(regex);
  return match ? match[0] : '';
}

// ============================================================================
// CLI INTERFACE
// ============================================================================

function printReport(results) {
  console.log('\n' + '='.repeat(80));
  console.log('IEP v3.1.1 ULTRA-CONSERVATIVE VALIDATION REPORT');
  console.log('='.repeat(80));
  console.log(`Timestamp: ${results.timestamp}`);
  console.log(`Version: ${results.version}`);
  console.log(`Overall Compliant: ${results.overallCompliant ? '✅ YES' : '❌ NO'}`);
  console.log(`Total Violations: ${results.summary.totalViolations}`);
  console.log(`  - Critical: ${results.summary.criticalViolations}`);
  console.log(`  - High: ${results.summary.highViolations}`);
  console.log('='.repeat(80));
  
  if (results.violations.length === 0) {
    console.log('\n✅ NO VIOLATIONS FOUND - IEP is v3.1.1 compliant!');
    return;
  }
  
  console.log('\n❌ VIOLATIONS FOUND:\n');
  
  results.violations.forEach((violation, index) => {
    console.log(`\n[${index + 1}] ${violation.rule} (${violation.severity})`);
    console.log(`    ${violation.message}`);
    
    if (violation.count) {
      console.log(`    Count: ${violation.count}`);
    }
    
    if (violation.details) {
      if (Array.isArray(violation.details)) {
        violation.details.forEach((detail, i) => {
          if (detail.text) {
            console.log(`    ${i + 1}. "${detail.text}" (${detail.type})`);
            console.log(`       Context: ${detail.context}`);
          } else {
            console.log(`    ${i + 1}. ${JSON.stringify(detail)}`);
          }
        });
      } else {
        console.log(`    Details: ${JSON.stringify(violation.details, null, 2)}`);
      }
    }
  });
  
  console.log('\n' + '='.repeat(80));
  console.log('RECOMMENDATIONS:');
  console.log('='.repeat(80));
  console.log('1. Verify prompt version in Langfuse is v3.1.1');
  console.log('2. Check that "production" label is on v3.1.1');
  console.log('3. Re-copy prompt from LANGFUSE_COPY_PASTE.txt');
  console.log('4. Clear cache and regenerate IEP');
  console.log('='.repeat(80) + '\n');
}

// ============================================================================
// EXAMPLE USAGE (for testing)
// ============================================================================

if (import.meta.url === `file://${process.argv[1]}`) {
  // Example test case - Todd
  const testInput = {
    studentPerformance: "Todd, a fourth grader, currently reads 85 words per minute with 5 errors when given a first semester, second grade-level passage. According to district norms, Todd is reading at the 5th percentile for fourth graders in the fall.",
    gradeLevel: "4th Grade",
    areasOfConcern: "Academic (reading)",
    priorityGoalAreas: "Reading Comprehension",
    accommodations: "Extended time, Visual aids/graphic organizers"
  };
  
  const testIEP = `
    <h3>🔍 Present Levels of Academic Achievement and Functional Performance (PLAAFP)</h3>
    <p>Academic Performance: Todd reads 85 words per minute with 5 errors at 2nd-grade level, 5th percentile.</p>
    <p>Functional Performance: Todd requires prompts every 8-10 minutes and completes assignments independently 50% of the time.</p>
    <p>Strengths: Todd responds well to visual aids.</p>
    
    <h3>⚠️ Areas of Concern</h3>
    <ul><li>Academic (e.g., reading, writing, math)</li></ul>
    
    <h3>🧰 Accommodations & Supports</h3>
    <table class='iep-table'>
      <tr><td>📘 Reading</td><td>Extended time</td></tr>
      <tr><td>✍️ Writing</td><td>N/A</td></tr>
    </table>
  `;
  
  const results = validateIEP(testInput, testIEP);
  printReport(results);
}

export default validateIEP;

