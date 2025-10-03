/**
 * IEP v3.1.1 ULTRA-CONSERVATIVE Validation Library
 * 
 * Validates that generated IEP documents follow v3.1.1 rules:
 * 1. NO data invention (no comprehension %, focus time, independence %)
 * 2. NO functional paragraph without trigger words
 * 3. Areas of Concern LITERAL (no "(e.g., ...)" expansions)
 * 4. NO categories in tables for areas not mentioned in PLAAFP
 * 
 * Usage:
 *   import { validateIEP, ValidationResult } from '@/lib/iep-validator'
 *   const result = validateIEP(input, generatedHTML)
 */

// ============================================================================
// TYPES
// ============================================================================

export type ViolationSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface InventedDataViolation {
  text: string;
  type: 'comprehension_percentage' | 'time_on_task' | 'independence_percentage' | 'prompts_frequency' | 'opportunities_metric' | 'unknown_metric';
  context: string;
}

export interface Violation {
  rule: string;
  severity: ViolationSeverity;
  message: string;
  count?: number;
  details?: any;
}

export interface ValidationResult {
  version: string;
  timestamp: string;
  overallCompliant: boolean;
  violations: Violation[];
  warnings: string[];
  summary: {
    totalViolations: number;
    criticalViolations: number;
    highViolations: number;
    compliant: boolean;
    version: string;
  };
}

export interface IEPInput {
  student_performance: string;
  grade_level: string;
  areas_of_concern: string;
  priority_goal_areas: string;
  accommodations: string;
}

// ============================================================================
// VALIDATION RULES
// ============================================================================

const TRIGGER_WORDS = {
  attention: ['attention', 'focus', 'concentrat', 'distract'],
  taskCompletion: ['task completion', 'finishing', 'completes', 'complete assignments'],
  organization: ['organiz', 'materials', 'supplies'],
  behavior: ['behavior', 'self-regulation', 'impulse'],
  prompts: ['requires reminders', 'needs prompts', 'stays on task']
};

const INVENTED_DATA_PATTERNS = [
  // Comprehension percentages (not WPM or percentile)
  { pattern: /(\d+)%\s+(accuracy|comprehension|correct|on\s+comprehension)/i, type: 'comprehension_percentage' },
  
  // Time on task
  { pattern: /(\d+-\d+|\d+)\s+minutes?\s+(on[-\s]task|focus|attention|before|engaged)/i, type: 'time_on_task' },
  
  // Independence percentages
  { pattern: /(\d+)%\s+of the time/i, type: 'independence_percentage' },
  { pattern: /independently\s+(about\s+)?(\d+)%/i, type: 'independence_percentage' },
  
  // Prompts frequency
  { pattern: /(\d+)\s+prompts?\s+(per|every|approximately)/i, type: 'prompts_frequency' },
  
  // Out of X opportunities (materials organization)
  { pattern: /(\d+)\s+out of\s+(\d+)\s+(opportunities|trials)/i, type: 'opportunities_metric' }
];

const AREAS_EXPANSION_PATTERN = /\(e\.g\.,\s*[^)]+\)/i;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if student performance contains functional trigger words
 */
function hasTriggerWords(studentPerformance: string): { found: boolean; category?: string; word?: string } {
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
 * Extract section from HTML
 */
function extractSection(html: string, sectionTitle: string): string {
  const escapedTitle = sectionTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`<h3>${escapedTitle}[^]*?</h3>([^]*?)(?=<h3>|<hr>|$)`, 'i');
  const match = html.match(regex);
  return match ? match[1] : '';
}

/**
 * Extract provided metrics from input
 */
function extractProvidedMetrics(studentPerformance: string) {
  return {
    hasWPM: /\d+\s+words?\s+per\s+minute/i.test(studentPerformance),
    hasErrors: /\d+\s+errors?/i.test(studentPerformance),
    hasPercentile: /\d+(?:st|nd|rd|th)?\s+percentile/i.test(studentPerformance),
    hasGradeLevel: /\d+(?:st|nd|rd|th)[-\s]grade/i.test(studentPerformance)
  };
}

/**
 * Find invented data in PLAAFP
 */
function findInventedData(
  plaafpText: string, 
  studentPerformance: string
): InventedDataViolation[] {
  const inventedData: InventedDataViolation[] = [];
  const studentLower = studentPerformance.toLowerCase();
  
  for (const { pattern, type } of INVENTED_DATA_PATTERNS) {
    const matches = Array.from(plaafpText.matchAll(new RegExp(pattern.source, 'gi')));
    
    for (const match of matches) {
      const fullMatch = match[0];
      const matchLower = fullMatch.toLowerCase();
      
      // Check if this exact data was provided in input
      const isProvided = studentLower.includes(matchLower);
      
      // Special handling: percentile is allowed, but not comprehension %
      if (type === 'comprehension_percentage' && matchLower.includes('percentile')) {
        continue;
      }
      
      if (!isProvided) {
        inventedData.push({
          text: fullMatch,
          type: type as InventedDataViolation['type'],
          context: getContext(plaafpText, match.index || 0, 80)
        });
      }
    }
  }
  
  return inventedData;
}

/**
 * Get context around text
 */
function getContext(text: string, index: number, length = 80): string {
  const start = Math.max(0, index - length);
  const end = Math.min(text.length, index + length);
  return '...' + text.slice(start, end).trim() + '...';
}

/**
 * Check for unauthorized functional paragraph
 */
function hasUnauthorizedFunctionalParagraph(
  plaafpText: string, 
  triggerWordsFound: boolean
): { violation: boolean; hasFunctionalContent: boolean } {
  // Look for functional paragraph indicators
  const functionalIndicators = [
    'Functional Performance:',
    'maintaining focus',
    'maintaining attention',
    'task completion',
    'organizing materials',
    'completes assignments',
    'independently about',
    'independently approximately',
    'prompts approximately',
    'prompts every',
    'on task for'
  ];
  
  const hasFunctionalContent = functionalIndicators.some(indicator => 
    plaafpText.toLowerCase().includes(indicator.toLowerCase())
  );
  
  return {
    hasFunctionalContent,
    violation: hasFunctionalContent && !triggerWordsFound
  };
}

/**
 * Check Areas of Concern for expansions
 */
function checkAreasOfConcern(
  areasHTML: string, 
  originalInput: string
): { hasExpansion: boolean; expansions: string[]; expected: string; actual: string } {
  const hasExpansion = AREAS_EXPANSION_PATTERN.test(areasHTML);
  
  const expansions: string[] = [];
  if (hasExpansion) {
    const matches = Array.from(areasHTML.matchAll(new RegExp(AREAS_EXPANSION_PATTERN.source, 'gi')));
    expansions.push(...matches.map(m => m[0]));
  }
  
  return {
    hasExpansion,
    expansions,
    expected: originalInput,
    actual: areasHTML.replace(/<[^>]+>/g, '').trim()
  };
}

/**
 * Check for unauthorized table categories
 */
function checkUnauthorizedCategories(
  accommodationsHTML: string, 
  plaafpText: string
): Array<{ category: string; reason: string }> {
  const categories = {
    writing: /📘\s*Writing|✍️\s*Writing/i.test(accommodationsHTML),
    math: /🔢\s*Math|➗\s*Math/i.test(accommodationsHTML)
  };
  
  const plaafpLower = plaafpText.toLowerCase();
  const violations: Array<{ category: string; reason: string }> = [];
  
  if (categories.writing && !plaafpLower.includes('writing') && !plaafpLower.includes('written')) {
    violations.push({
      category: 'Writing',
      reason: 'Writing category in table but NOT mentioned in PLAAFP'
    });
  }
  
  if (categories.math && !plaafpLower.includes('math')) {
    violations.push({
      category: 'Math',
      reason: 'Math category in table but NOT mentioned in PLAAFP'
    });
  }
  
  return violations;
}

// ============================================================================
// MAIN VALIDATION FUNCTION
// ============================================================================

/**
 * Validate IEP document against v3.1.1 ULTRA-CONSERVATIVE rules
 */
export function validateIEP(input: IEPInput, generatedHTML: string): ValidationResult {
  const results: ValidationResult = {
    version: '3.1.1',
    timestamp: new Date().toISOString(),
    overallCompliant: true,
    violations: [],
    warnings: [],
    summary: {
      totalViolations: 0,
      criticalViolations: 0,
      highViolations: 0,
      compliant: true,
      version: '3.1.1'
    }
  };
  
  // Extract sections
  const plaafp = extractSection(generatedHTML, '🔍 Present Levels');
  const areasOfConcern = extractSection(generatedHTML, '⚠️ Areas of Concern');
  const accommodations = extractSection(generatedHTML, '🧰 Accommodations');
  
  // ========================================
  // VALIDATION #1: Data Invention in PLAAFP
  // ========================================
  const inventedData = findInventedData(plaafp, input.student_performance);
  
  if (inventedData.length > 0) {
    results.overallCompliant = false;
    results.violations.push({
      rule: 'NO_DATA_INVENTION',
      severity: 'CRITICAL',
      count: inventedData.length,
      details: inventedData,
      message: `❌ CRITICAL: Found ${inventedData.length} invented data point(s) in PLAAFP that were NOT in input`
    });
  }
  
  // ========================================
  // VALIDATION #2: Functional Paragraph
  // ========================================
  const triggerWordsResult = hasTriggerWords(input.student_performance);
  const functionalCheck = hasUnauthorizedFunctionalParagraph(plaafp, triggerWordsResult.found);
  
  if (functionalCheck.violation) {
    results.overallCompliant = false;
    results.violations.push({
      rule: 'NO_FUNCTIONAL_WITHOUT_TRIGGERS',
      severity: 'CRITICAL',
      details: {
        hasFunctionalContent: functionalCheck.hasFunctionalContent,
        triggerWordsFound: triggerWordsResult.found,
        inputLength: input.student_performance.length
      },
      message: '❌ CRITICAL: PLAAFP contains Functional Performance paragraph but input has NO trigger words (attention, focus, task completion, organization, behavior)'
    });
  }
  
  // ========================================
  // VALIDATION #3: Areas of Concern Expansion
  // ========================================
  const areasCheck = checkAreasOfConcern(areasOfConcern, input.areas_of_concern);
  
  if (areasCheck.hasExpansion) {
    results.overallCompliant = false;
    results.violations.push({
      rule: 'LITERAL_AREAS_OF_CONCERN',
      severity: 'CRITICAL',
      details: areasCheck,
      message: `❌ CRITICAL: Areas of Concern has prohibited expansion. Expected: "${areasCheck.expected}", Got: "${areasCheck.actual}"`
    });
  }
  
  // ========================================
  // VALIDATION #4: Unauthorized Categories
  // ========================================
  const categoryViolations = checkUnauthorizedCategories(accommodations, plaafp);
  
  if (categoryViolations.length > 0) {
    results.overallCompliant = false;
    results.violations.push({
      rule: 'NO_UNAUTHORIZED_CATEGORIES',
      severity: 'HIGH',
      count: categoryViolations.length,
      details: categoryViolations,
      message: `⚠️ HIGH: Found ${categoryViolations.length} unauthorized categor(ies) in Accommodations table not mentioned in PLAAFP`
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
 * Format validation result as console output
 */
export function formatValidationReport(results: ValidationResult): string {
  const lines: string[] = [];
  
  lines.push('='.repeat(80));
  lines.push('IEP v3.1.1 ULTRA-CONSERVATIVE VALIDATION REPORT');
  lines.push('='.repeat(80));
  lines.push(`Timestamp: ${results.timestamp}`);
  lines.push(`Version: ${results.version}`);
  lines.push(`Overall Compliant: ${results.overallCompliant ? '✅ YES' : '❌ NO'}`);
  lines.push(`Total Violations: ${results.summary.totalViolations}`);
  lines.push(`  - Critical: ${results.summary.criticalViolations}`);
  lines.push(`  - High: ${results.summary.highViolations}`);
  lines.push('='.repeat(80));
  
  if (results.violations.length === 0) {
    lines.push('\n✅ NO VIOLATIONS FOUND - IEP is v3.1.1 compliant!\n');
    return lines.join('\n');
  }
  
  lines.push('\n❌ VIOLATIONS FOUND:\n');
  
  results.violations.forEach((violation, index) => {
    lines.push(`\n[${index + 1}] ${violation.rule} (${violation.severity})`);
    lines.push(`    ${violation.message}`);
    
    if (violation.count) {
      lines.push(`    Count: ${violation.count}`);
    }
    
    if (violation.details) {
      if (Array.isArray(violation.details)) {
        violation.details.forEach((detail: any, i: number) => {
          if (detail.text) {
            lines.push(`    ${i + 1}. "${detail.text}" (${detail.type})`);
            lines.push(`       Context: ${detail.context}`);
          } else if (detail.category) {
            lines.push(`    ${i + 1}. ${detail.category}: ${detail.reason}`);
          }
        });
      } else {
        lines.push(`    Details: ${JSON.stringify(violation.details, null, 2)}`);
      }
    }
  });
  
  lines.push('\n' + '='.repeat(80));
  lines.push('RECOMMENDATIONS:');
  lines.push('='.repeat(80));
  lines.push('1. Verify prompt version in Langfuse is v3.1.1 (not v3.1 or v3.0)');
  lines.push('2. Check that "production" label is on v3.1.1');
  lines.push('3. Re-copy prompt from LANGFUSE_COPY_PASTE.txt');
  lines.push('4. Clear Langfuse cache and regenerate IEP');
  lines.push('5. System Message should include: "NO DATA INVENTION"');
  lines.push('6. User Message should have: "CRITICAL RULE v3.1.1: NEVER INVENT MEASURABLE DATA"');
  lines.push('='.repeat(80) + '\n');
  
  return lines.join('\n');
}

/**
 * Format as HTML for display in UI
 */
export function formatValidationHTML(results: ValidationResult): string {
  const status = results.overallCompliant 
    ? '<span style="color: green;">✅ COMPLIANT</span>' 
    : '<span style="color: red;">❌ NOT COMPLIANT</span>';
  
  let html = `
    <div class="validation-report" style="font-family: monospace; padding: 20px; background: #f5f5f5; border-radius: 8px;">
      <h3>IEP v3.1.1 Validation Report</h3>
      <p><strong>Status:</strong> ${status}</p>
      <p><strong>Total Violations:</strong> ${results.summary.totalViolations}</p>
      <p><strong>Critical:</strong> ${results.summary.criticalViolations}</p>
      <p><strong>High:</strong> ${results.summary.highViolations}</p>
  `;
  
  if (results.violations.length > 0) {
    html += '<hr><h4>Violations:</h4><ul>';
    
    results.violations.forEach(violation => {
      html += `<li style="margin-bottom: 15px;">
        <strong>[${violation.severity}] ${violation.rule}</strong><br>
        ${violation.message}
      `;
      
      if (violation.details && Array.isArray(violation.details)) {
        html += '<ul style="margin-top: 8px;">';
        violation.details.forEach((detail: any) => {
          if (detail.text) {
            html += `<li>"${detail.text}" <em>(${detail.type})</em></li>`;
          } else if (detail.category) {
            html += `<li>${detail.category}: ${detail.reason}</li>`;
          }
        });
        html += '</ul>';
      }
      
      html += '</li>';
    });
    
    html += '</ul>';
    
    html += `
      <hr>
      <h4>Recommendations:</h4>
      <ol>
        <li>Verify Langfuse prompt version is v3.1.1</li>
        <li>Check "production" label is on v3.1.1</li>
        <li>Re-copy prompt from LANGFUSE_COPY_PASTE.txt</li>
        <li>Clear cache and regenerate</li>
      </ol>
    `;
  }
  
  html += '</div>';
  return html;
}

/**
 * Quick validation check - returns true if compliant
 */
export function isIEPCompliant(input: IEPInput, generatedHTML: string): boolean {
  const result = validateIEP(input, generatedHTML);
  return result.overallCompliant;
}

/**
 * Get list of specific violations
 */
export function getViolationsList(input: IEPInput, generatedHTML: string): string[] {
  const result = validateIEP(input, generatedHTML);
  return result.violations.map(v => `[${v.severity}] ${v.rule}: ${v.message}`);
}

