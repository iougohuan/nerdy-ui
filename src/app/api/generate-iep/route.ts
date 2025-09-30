import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { formOptions } from "@/app/ai-tools/form-options";

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
  customDisabilityOptions: z.record(z.string()).optional(),
  customServicesOptions: z.record(z.string()).optional(),
  customAccommodationsOptions: z.record(z.string()).optional(),
});

// Schema para a estrutura do IEP
const IEPSectionSchema = z.object({
  title: z.string(),
  content: z.string(),
  emoji: z.string().optional(),
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

  return `You are an expert IEP (Individualized Education Program) writer. Generate a comprehensive, professional, and detailed IEP document based on the following information.

**CRITICAL FORMATTING REQUIREMENTS:**
- Use HTML formatting ONLY (headings, paragraphs, lists, tables, hr)
- Each section must start with an emoji followed by the section title in <h3> tags
- Use <hr> tags to separate sections
- Use <strong> for bold text and emphasis
- Use <ul> and <li> for unordered lists
- Use <ol> and <li> for ordered lists
- Use <table>, <thead>, <tbody>, <tr>, <th>, <td> for tables
- Use proper paragraph tags <p> for all text content
- DO NOT use Markdown syntax

**Student Context:**
- Grade Level: ${gradeLevelLabel}
- Language: ${languageLabel}
- Evaluation Schedule: ${evaluationLabel}

**Present Level of Academic Achievement and Functional Performance (PLAAFP):**
${data.studentPerformance}

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

1. **Student Information** - Include:
   - 👦 Student Name: [Student name]
   - 🏫 Grade Level: ${gradeLevelLabel}
   - 🗣️ Language: ${languageLabel}
   - 📆 Evaluation Schedule: ${evaluationLabel}

2. **PLAAFP** - Expand on the provided performance data with:
   - Current academic and functional performance
   - Specific strengths and challenges
   - How disability affects participation in general education
   - Use multiple paragraphs for clarity

3. **Disability Categories** - Simple bulleted list of categories

4. **Areas of Concern** - Simple bulleted list

5. **Priority Goal Areas** - Simple bulleted list

6. **Annual Goals** - For each priority area, create:
   - Goal title with emoji (e.g., "Goal 1: Reading Comprehension")
   - Specific measurable objective
   - 3-4 short-term benchmarks with clear success criteria
   - Use concrete percentages (e.g., "80% accuracy", "4 out of 5 opportunities")

7. **Accommodations & Supports** - Create an HTML table with columns "Category" and "Accommodation"
   - Categories: 📘 Reading, ✍️ Writing, 🧠 General, 📝 Assessments
   - Provide specific, actionable accommodations for each category

8. **Progress Monitoring** - Include:
   - How progress will be measured
   - Frequency of monitoring
   - Tools/methods (work samples, observations, assessments, rubrics)

9. **Participation in General Education Curriculum** - Describe:
   - How student will participate in general education
   - Support needed
   - Any pull-out services

10. **Special Education Services** - Create an HTML table with columns "Service", "Frequency", "Provider"
    - Include 2-3 services based on goals
    - Be specific about frequency (e.g., "3x per week, 30 min")
    - List appropriate providers (Special Education Teacher, Resource Room Support, etc.)

11. **Team Members** - List team members with roles:
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

Generate each section with proper HTML formatting and appropriate emojis as shown in the examples.`;
}

function formatIEPToHTML(sections: Array<{ title: string; content: string; emoji?: string }>): string {
  let html = "";

  sections.forEach((section, index) => {
    // Add separator before each section (except first)
    if (index > 0) {
      html += "<hr>\n";
    }

    // Add section title with emoji
    const emoji = section.emoji || "";
    html += `<h3>${emoji} ${section.title}</h3>\n`;

    // Add section content (already in HTML format from AI)
    html += section.content + "\n";
  });

  return html;
}

export async function POST(request: NextRequest) {
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

    // Construir o prompt
    const prompt = buildPrompt(data);

    // Gerar o IEP usando OpenAI com structured output
    const { object } = await generateObject({
      model: openai("gpt-4o-2024-08-06"),
      schema: IEPDocumentSchema,
      prompt,
      temperature: 0.7,
    });

    // Formatar para HTML
    const html = formatIEPToHTML(object.sections);

    return NextResponse.json({ 
      success: true, 
      html,
      sectionsCount: object.sections.length 
    });
  } catch (error) {
    console.error("Error generating IEP:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate IEP", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
