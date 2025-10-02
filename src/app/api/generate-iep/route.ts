import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { formOptions } from "@/app/ai-tools/form-options";
import { 
  isLangfuseEnabled, 
  getLangfusePrompt, 
  compilePromptTemplate, 
  createLangfuseTrace, 
  flushLangfuse 
} from "@/lib/langfuse";

// Schema para validar a requisição
const RequestSchema = z.object({
  studentPerformance: z.string(),
  gradeLevel: z.string(),
  disabilityCategories: z.array(z.string()),
  areasOfConcern: z.array(z.string()),
  priorityGoalAreas: z.array(z.string()),
  evaluationSchedule: z.string(),
  language: z.string(),
  iepComponents: z.array(z.string()),
  existingServices: z.array(z.string()),
  accommodations: z.array(z.string()),
  customDisabilityOptions: z.record(z.string(), z.string()).optional(),
  customServicesOptions: z.record(z.string(), z.string()).optional(),
  customAccommodationsOptions: z.record(z.string(), z.string()).optional(),
});

// Schema para a estrutura do IEP
const IEPSectionSchema = z.object({
  title: z.string().describe("Section title WITH emoji at the start (e.g., '👦 Student Information')"),
  content: z.string().describe("HTML formatted content for the section"),
});

const IEPDocumentSchema = z.object({
  sections: z.array(IEPSectionSchema),
});

// Mapeamento de componentes para seções
const componentSectionMap: Record<string, string> = {
  "student-info": "Student Information",
  "plaafp": "Present Levels of Academic Achievement and Functional Performance (PLAAFP)",
  "disability-categories": "Disability Categories",
  "areas-concern": "Areas of Concern",
  "priority-goals": "Priority Goal Areas",
  "goals": "Annual Goals",
  "accommodations-mods": "Accommodations & Supports",
  "progress": "Progress Monitoring",
  "gen-ed": "Participation in General Education Curriculum",
  "services": "Special Education Services",
  "team": "Team Members",
};

function getLabelForValue(options: typeof formOptions.gradeLevels, value: string, customMap?: Record<string, string>): string {
  if (customMap && customMap[value]) {
    return customMap[value];
  }
  const option = options.find((opt) => opt.value === value);
  return option?.label || value;
}

function buildPrompt(data: z.infer<typeof RequestSchema>): string {
  const gradeLevelLabel = getLabelForValue(formOptions.gradeLevels, data.gradeLevel);
  const languageLabel = getLabelForValue(formOptions.languages, data.language);
  const evaluationLabel = getLabelForValue(formOptions.evaluationSchedule, data.evaluationSchedule);

  const disabilityLabels = data.disabilityCategories.map((cat) =>
    getLabelForValue(formOptions.disabilityCategories, cat, data.customDisabilityOptions)
  );

  const areasLabels = data.areasOfConcern.map((area) =>
    getLabelForValue(formOptions.areasOfConcern, area)
  );

  const goalLabels = data.priorityGoalAreas.map((goal) =>
    getLabelForValue(formOptions.priorityGoalAreas, goal)
  );

  const servicesLabels = data.existingServices.map((service) =>
    getLabelForValue(formOptions.existingServices, service, data.customServicesOptions)
  );

  const accommodationsLabels = data.accommodations.map((acc) =>
    getLabelForValue(formOptions.accommodations, acc, data.customAccommodationsOptions)
  );

  // Determinar quais seções gerar
  const selectedSections = data.iepComponents.map((comp) => componentSectionMap[comp]).filter(Boolean);

  return `You are an expert IEP (Individualized Education Program) writer with deep knowledge of special education best practices.

**CRITICAL INSTRUCTIONS:**
This IEP must be PERSONALIZED and SPECIFIC to this individual student. Do NOT generate generic, template-like content. Every section must:
- Reference the specific student context and performance data provided
- Connect logically to other sections (PLAAFP → Goals → Services → Accommodations)
- Use concrete, measurable language based on the student's actual needs
- Sound like it was written by a team who knows this specific student well

**CRITICAL FORMATTING REQUIREMENTS:**
- Use HTML formatting ONLY (headings, paragraphs, lists, tables)
- Return each section with a title that INCLUDES the emoji at the start
- Section titles should be returned WITHOUT <h3> tags (just plain text with emoji)
- Use <strong> for bold text and emphasis
- Use <ul> and <li> for unordered lists
- Use <ol> and <li> for ordered lists
- For tables, ALWAYS use: <table class="iep-table"> with <thead>, <tbody>, <tr>, <th>, <td>
- ALL tables MUST have class="iep-table" for proper styling
- Use proper paragraph tags <p> for all text content
- DO NOT use Markdown syntax
- DO NOT include <hr> tags (separators will be added automatically)

**Student Context:**
- Grade Level: ${gradeLevelLabel}
- Language: ${languageLabel}
- Evaluation Schedule: ${evaluationLabel}

**Teacher's Brief Description of Student Performance:**
${data.studentPerformance}

NOTE: This is a BRIEF teacher note (1 paragraph). You MUST expand this significantly into a comprehensive PLAAFP.

**Disability Categories:**
${disabilityLabels.map((label) => `- ${label}`).join("\n")}

**Areas of Concern:**
${areasLabels.map((label) => `- ${label}`).join("\n")}

**Priority Goal Areas:**
${goalLabels.map((label) => `- ${label}`).join("\n")}

**Existing Services:**
${servicesLabels.map((label) => `- ${label}`).join("\n")}

**Accommodations:**
${accommodationsLabels.map((label) => `- ${label}`).join("\n")}

**SECTIONS TO INCLUDE:**
Generate ONLY the following sections (in this order):
${selectedSections.map((section, i) => `${i + 1}. ${section}`).join("\n")}

**SECTION-SPECIFIC INSTRUCTIONS:**
For each section, return a JSON object with:
- "title": The section name WITH emoji (e.g., "👦 Student Information")
- "content": HTML content for that section

**EMOJI MAPPING FOR SECTIONS:**
- Student Information: 👦
- PLAAFP: 🔍
- Disability Categories: 📋
- Areas of Concern: ⚠️
- Priority Goal Areas: 🎯
- Annual Goals: 🏁 (IMPORTANT: Title MUST be exactly "🏁 ${evaluationLabel} Goals", e.g., "🏁 Quarterly Goals", "🏁 Annually Goals", "🏁 Weekly Goals")
- Accommodations & Supports: 🧰
- Progress Monitoring: 📊
- Participation in General Education: 🧑‍🏫
- Special Education Services: 👥
- Team Members: 🤝

1. **👦 Student Information** - Include:
   - 👦 Student Name: [Student name]
   - 🏫 Grade Level: ${gradeLevelLabel}
   - 🗣️ Language: ${languageLabel}
   - 📆 Evaluation Schedule: ${evaluationLabel}

2. **🔍 Present Levels of Academic Achievement and Functional Performance (PLAAFP)** - CRITICAL EXPANSION REQUIRED:
   - The teacher provided a BRIEF 1-paragraph description - you MUST transform this into a comprehensive 3-4 paragraph PLAAFP
   - INFER and ADD realistic details based on:
     * The grade level: ${gradeLevelLabel}
     * Disability categories: ${disabilityLabels.join(", ")}
     * Areas of concern: ${areasLabels.join(", ")}
     * Priority goals: ${goalLabels.join(", ")}
   - Structure (3-4 detailed paragraphs):
     * Paragraph 1: Academic Performance - Expand on reading/writing/math abilities with grade-level benchmarks and specific examples (e.g., "reads at X grade level", "scores Y% on assessments")
     * Paragraph 2: Functional Performance - How challenges manifest daily in classroom, learning behaviors, attention span, task completion patterns
     * Paragraph 3: Strengths & Effective Strategies - What works for this student, engagement triggers, successful interventions already in use
     * Paragraph 4: Impact on General Education - Specific ways disability affects curriculum access, peer interactions, and learning opportunities
   - Add REALISTIC DETAILS that align with the disability and grade level
   - Use professional language: "demonstrates", "exhibits", "requires", "benefits from"
   - Include measurable observations: percentages, grade levels, frequency descriptors
   - Reference specific academic subjects and activities relevant to ${gradeLevelLabel}
   - Make it sound like a team of educators who have observed this student for months

3. **📋 Disability Categories** - Simple bulleted list of categories

4. **⚠️ Areas of Concern** - Simple bulleted list

5. **🎯 Priority Goal Areas** - Simple bulleted list

6. **🏁 ${evaluationLabel} Goals** - CRITICAL: Use SMART methodology (Specific, Measurable, Achievable, Relevant, Time-bound):
   - Create ONE goal for EACH priority goal area selected: ${goalLabels.join(", ")}
   - Each goal MUST follow SMART criteria:
     * **S**pecific - Clearly defined, addressing exact challenges from PLAAFP (not vague like "improve reading")
     * **M**easurable - Include concrete metrics: percentages, grade levels, frequency (e.g., "80% accuracy", "4 out of 5 trials")
     * **A**chievable - Realistic given student's CURRENT level in PLAAFP and ${gradeLevelLabel} expectations
     * **R**elevant - Directly addresses student's documented needs and areas of concern: ${areasLabels.join(", ")}
     * **T**ime-bound - Clear deadline: "By end of ${evaluationLabel.toLowerCase()} period" or "Within one school year"
   - Goal title with number and area (e.g., "Goal 1: Reading Comprehension", "Goal 2: Written Expression")
   - Write objectives starting from CURRENT performance level and targeting realistic improvement
   - Create 3-4 SMART short-term benchmarks that are ALIGNED WITH THE EVALUATION SCHEDULE (${evaluationLabel}):
     * Each benchmark MUST also be SMART:
       - Specific: Exact skill/behavior to demonstrate
       - Measurable: Include percentage or frequency (60%, 70%, 80%, 4 out of 5, etc.)
       - Achievable: Realistic steps from current level
       - Relevant: Supports main goal and uses selected accommodations
       - Time-bound: Match evaluation schedule
     * Timeframe alignment:
       - If "Annually": Use "By Fall semester (Sept-Dec)", "By Winter break (Jan-Mar)", "By Spring semester (Apr-Jun)", "By end of school year"
       - If "Quarterly": Use "By end of Q1 (Sept-Nov)", "By end of Q2 (Dec-Feb)", "By end of Q3 (Mar-May)", "By end of Q4 (Jun)"
       - If "Weekly": Use "Week 1-4", "Week 5-8", "Week 9-12", "Week 13-16"
       - If "Bi-weekly": Use "Weeks 1-2", "Weeks 3-4", "Weeks 5-6", "Weeks 7-8"
     * Build progressively: Start at 60-70% accuracy → End at 80-90%
     * Reference accommodations: ${accommodationsLabels.join(", ")}
     * Include success criteria: "with teacher support", "independently", "using graphic organizers"
     * Connect to areas of concern: ${areasLabels.join(", ")}
   - Use [Student name] throughout objectives and benchmarks
   - Ensure goals are NOT generic templates - specific to THIS student's needs
   - Benchmarks must logically build toward the main objective (progressive difficulty)

7. **🧰 Accommodations & Supports** - Create an HTML table with class="iep-table" and columns "Category" and "Accommodation"
   - IMPORTANT: Use <table class="iep-table"> for proper styling
   - Categories: 📘 Reading, ✍️ Writing, 🧠 General, 📝 Assessments
   - PERSONALIZE accommodations based on:
     * Specific challenges mentioned in PLAAFP
     * Selected accommodations from form: ${accommodationsLabels.join(", ")}
     * Student's learning style and needs described in performance data
     * Grade level appropriateness (${gradeLevelLabel})
   - Make accommodations SPECIFIC and ACTIONABLE, not generic
   - Connect directly to the student's documented needs
   - Example format: <table class="iep-table"><thead><tr><th>Category</th><th>Accommodation</th></tr></thead><tbody>...</tbody></table>

8. **📊 Progress Monitoring** - PERSONALIZE based on goals and student needs:
   - Explicitly state: "Progress will be monitored ${evaluationLabel.toLowerCase()} through:"
   - List SPECIFIC monitoring methods that align with each goal created
   - Include grade-appropriate assessment tools for ${gradeLevelLabel}
   - Reference specific benchmarks from the goals (e.g., "Reading comprehension rubrics", "Writing samples scored on 4-point scale")
   - Mention data collection methods that match the student's accommodations
   - Be specific about WHO will monitor (teacher, aide, specialist)
   - Connect monitoring methods to the evaluation schedule: ${evaluationLabel}

9. **🧑‍🏫 Participation in General Education Curriculum** - PERSONALIZE based on student context:
   - Describe specifically how THIS student will participate in ${gradeLevelLabel} general education
   - Reference the accommodations and modifications needed for success
   - Specify percentage of time in general education vs. specialized instruction
   - Mention specific subjects/activities where student excels vs. needs support
   - Connect to areas of concern: ${areasLabels.join(", ")}
   - Describe pull-out services that align with the goals and services listed
   - Be realistic about inclusion opportunities given the student's needs

10. **👥 Special Education Services** - Create an HTML table with class="iep-table" and columns "Service", "Frequency", "Provider"
    - IMPORTANT: Use <table class="iep-table"> for proper styling
    - PERSONALIZE services based on:
      * Selected existing services: ${servicesLabels.join(", ")}
      * Specific goals created for this student (${goalLabels.join(", ")})
      * Intensity of support needed based on PLAAFP
    - CRITICAL: Each service must DIRECTLY support at least one goal:
      * For Reading Comprehension goal → Reading Intervention/Literacy Support
      * For Written Expression goal → Writing Support/Resource Room
      * For Math goal → Math Intervention
      * For Self-Regulation goal → Counseling/Behavioral Support
      * For Social Skills goal → Social Skills Group/Counseling
      * For Communication goal → Speech Therapy
    - ONLY include services that match the priority goal areas: ${goalLabels.join(", ")}
    - DO NOT include services not connected to the goals (e.g., don't add Speech Therapy if no communication goals)
    - Be SPECIFIC about frequency based on need level: 
      * Intensive support (addressing significant gaps): "3-5x per week, 30-45 min"
      * Moderate support (addressing specific skills): "2-3x per week, 30 min"
      * Maintenance/monitoring: "1x per week" or "2x per month"
    - Name services to clearly show connection to goals (e.g., "Reading Comprehension Intervention" not just "Special Ed Support")
    - Example format: <table class="iep-table"><thead><tr><th>Service</th><th>Frequency</th><th>Provider</th></tr></thead><tbody>...</tbody></table>

11. **🤝 Team Members** - List team members with roles:
    - General Education Teacher: [name]
    - Special Education Teacher: [name]
    - Parent/Guardian: [name]
    - School Psychologist: [name]
    - IEP Coordinator: [name]

**IMPORTANT STYLE NOTES:**
- Use placeholder "[Student name]" throughout (do not invent a name)
- Be specific and measurable in all goals and objectives
- Use professional, encouraging language
- Include concrete percentages and timeframes
- Make accommodations practical and implementable
- Ensure consistency with the student's grade level and needs

**CRITICAL: ENSURE COHERENCE ACROSS ALL SECTIONS:**
- Goals must directly address challenges described in PLAAFP
- Accommodations must support the specific goals created
- Services must align with the intensity and type of goals
- Progress monitoring must measure the specific benchmarks in goals
- Every section should reference and connect to the student's documented needs
- The entire IEP should tell a cohesive story about THIS specific student

Generate each section with proper HTML formatting and appropriate emojis as shown in the examples.`;
}

function formatIEPToHTML(sections: Array<{ title: string; content: string }>): string {
  let html = "";

  sections.forEach((section, index) => {
    // Add separator before each section (except first)
    if (index > 0) {
      html += "<hr>\n";
    }

    // Add section title (already includes emoji from AI)
    html += `<h3>${section.title}</h3>\n`;

    // Add section content (already in HTML format from AI)
    html += section.content + "\n";
  });

  return html;
}

/**
 * Função para construir o prompt usando Langfuse
 */
async function buildPromptWithLangfuse(data: z.infer<typeof RequestSchema>): Promise<string> {
  // Buscar o prompt do Langfuse
  const { userMessageTemplate } = await getLangfusePrompt();

  // Preparar labels para as variáveis
  const gradeLevelLabel = getLabelForValue(formOptions.gradeLevels, data.gradeLevel);
  const languageLabel = getLabelForValue(formOptions.languages, data.language);
  const evaluationLabel = getLabelForValue(formOptions.evaluationSchedule, data.evaluationSchedule);

  const disabilityLabels = data.disabilityCategories.map((cat) =>
    getLabelForValue(formOptions.disabilityCategories, cat, data.customDisabilityOptions)
  );

  const areasLabels = data.areasOfConcern.map((area) =>
    getLabelForValue(formOptions.areasOfConcern, area)
  );

  const goalLabels = data.priorityGoalAreas.map((goal) =>
    getLabelForValue(formOptions.priorityGoalAreas, goal)
  );

  const servicesLabels = data.existingServices.map((service) =>
    getLabelForValue(formOptions.existingServices, service, data.customServicesOptions)
  );

  const accommodationsLabels = data.accommodations.map((acc) =>
    getLabelForValue(formOptions.accommodations, acc, data.customAccommodationsOptions)
  );

  // Preparar variáveis para o template do Langfuse
  const variables = {
    studentPerformance: data.studentPerformance,
    gradeLevel: gradeLevelLabel,
    language: languageLabel,
    evaluationSchedule: evaluationLabel,
    disabilityCategories: disabilityLabels.map(label => `- ${label}`).join('\n'),
    areasOfConcern: areasLabels.map(label => `- ${label}`).join('\n'),
    priorityGoalAreas: goalLabels.map(label => `- ${label}`).join('\n'),
    existingServices: servicesLabels.map(label => `- ${label}`).join('\n'),
    accommodations: accommodationsLabels.map(label => `- ${label}`).join('\n'),
    iepComponents: data.iepComponents.map((comp) => componentSectionMap[comp]).filter(Boolean).join(', '),
  };

  // Compilar o template com as variáveis
  return compilePromptTemplate(userMessageTemplate, variables);
}

export async function POST(request: NextRequest) {
  // Criar trace no Langfuse para monitoramento
  const trace = createLangfuseTrace('generate-iep', {
    timestamp: new Date().toISOString(),
  });

  try {
    const body = await request.json();
    const data = RequestSchema.parse(body);

    // Verificar se a chave da API está configurada
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured. Please set OPENAI_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    // Verificar se deve usar Langfuse
    const useLangfuse = isLangfuseEnabled();
    
    // Construir o prompt (Langfuse ou hardcoded)
    let prompt: string;
    let promptSource: string;

    if (useLangfuse) {
      console.log('[IEP Generator] Using Langfuse prompt');
      prompt = await buildPromptWithLangfuse(data);
      promptSource = 'langfuse';
    } else {
      console.log('[IEP Generator] Using hardcoded prompt');
      prompt = buildPrompt(data);
      promptSource = 'hardcoded';
    }

    // Criar generation span no Langfuse
    const generation = trace.generation({
      name: 'openai-generate-iep',
      model: 'gpt-4o-2024-08-06',
      input: { prompt, data },
      metadata: {
        promptSource,
        gradeLevel: data.gradeLevel,
        sectionsRequested: data.iepComponents.length,
      },
    });

    // Gerar o IEP usando OpenAI com structured output
    const { object } = await generateObject({
      model: openai("gpt-4o-2024-08-06"),
      schema: IEPDocumentSchema,
      prompt,
      temperature: 0.7,
    });

    // Atualizar generation com resultado
    generation.update({
      output: object,
      metadata: {
        sectionsGenerated: object.sections.length,
      },
    });
    generation.end();

    // Formatar para HTML
    const html = formatIEPToHTML(object.sections);

    // Atualizar trace com sucesso
    trace.update({
      output: { 
        success: true, 
        sectionsCount: object.sections.length 
      },
    });

    // Flush eventos do Langfuse (não-bloqueante)
    if (useLangfuse) {
      flushLangfuse().catch(console.error);
    }

    return NextResponse.json({ 
      success: true, 
      html,
      sectionsCount: object.sections.length,
      promptSource, // Informar qual fonte foi usada
    });
  } catch (error) {
    console.error("Error generating IEP:", error);

    // Atualizar trace com erro
    trace.update({
      output: { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate IEP", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
