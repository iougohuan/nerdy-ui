import type { MultiSelectOption } from "@/components/ui/multi-select";

export const formOptions = {
  gradeLevels: [
    { value: "k", label: "Kindergarten" },
    { value: "1", label: "1st Grade" },
    { value: "2", label: "2nd Grade" },
    { value: "3", label: "3rd Grade" },
    { value: "4", label: "4th Grade" },
    { value: "5", label: "5th Grade" },
    { value: "6", label: "6th Grade" },
    { value: "7", label: "7th Grade" },
    { value: "8", label: "8th Grade" },
    { value: "9", label: "9th Grade" },
    { value: "10", label: "10th Grade" },
    { value: "11", label: "11th Grade" },
    { value: "12", label: "12th Grade" }
  ],
  disabilityCategories: [
    { value: "autism", label: "Autism Spectrum Disorder (ASD)" },
    { value: "deaf-blindness", label: "Deaf-Blindness (DB)" },
    { value: "deafness", label: "Deafness (D)" },
    { value: "emotional", label: "Emotional Disturbance (ED)" },
    { value: "hearing", label: "Hearing Impairment (HI)" },
    { value: "intellectual", label: "Intellectual Disability (ID)" },
    { value: "multiple", label: "Multiple Disabilities (MD)" },
    { value: "orthopedic", label: "Orthopedic Impairment (OI)" },
    { value: "other-health", label: "Other Health Impairment (OHI)" },
    { value: "learning", label: "Specific Learning Disability (SLD)" },
    { value: "speech", label: "Speech or Language Impairment (SLI)" },
    { value: "traumatic", label: "Traumatic Brain Injury (TBI)" },
    { value: "visual", label: "Visual Impairment including Blindness (VI)" },
    { value: "other", label: "Other" }
  ],
  areasOfConcern: [
    { value: "academic", label: "Academic (e.g., reading, writing, math)" },
    { value: "behavioral", label: "Behavioral (e.g., self-regulation, impulse control)" },
    { value: "social-emotional", label: "Social/Emotional (e.g., peer relationships, confidence)" },
    { value: "functional", label: "Functional (e.g., motor skills, independence)" },
    { value: "sensory", label: "Sensory or Physical (e.g., sensory processing, accessibility)" },
    { value: "speech", label: "Speech and Language (e.g., articulation, fluency, vocabulary)" },
    { value: "transition", label: "Transition Readiness (e.g., vocational skills, planning)" }
  ],
  priorityGoalAreas: [
    { value: "reading", label: "Reading Comprehension" },
    { value: "writing", label: "Written Expression" },
    { value: "math", label: "Math Problem Solving" },
    { value: "attention", label: "Attention & Focus" },
    { value: "organization", label: "Organization & Task Completion" },
    { value: "self-regulation", label: "Self-Regulation & Behavior" },
    { value: "social-skills", label: "Social Skills & Peer Interaction" },
    { value: "functional", label: "Functional Independence (e.g., classroom routines)" },
    { value: "communication", label: "Communication & Language Development" },
    { value: "transition", label: "Transition & Study Skills" }
  ],
  evaluationSchedule: [
    { value: "weekly", label: "Weekly" },
    { value: "bi-weekly", label: "Bi-weekly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "annually", label: "Annually" },
    { value: "triennially", label: "Triennially" }
  ],
  languages: [
    { value: "english", label: "English" },
    { value: "mandarin", label: "Mandarin Chinese" },
    { value: "hindi", label: "Hindi" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "arabic", label: "Arabic" },
    { value: "bengali", label: "Bengali" },
    { value: "portuguese", label: "Portuguese" },
    { value: "russian", label: "Russian" },
    { value: "urdu", label: "Urdu" },
    { value: "indonesian", label: "Indonesian" },
    { value: "german", label: "German" },
    { value: "japanese", label: "Japanese" },
    { value: "swahili", label: "Swahili" },
    { value: "marathi", label: "Marathi" },
    { value: "telugu", label: "Telugu" },
    { value: "turkish", label: "Turkish" },
    { value: "tamil", label: "Tamil" },
    { value: "vietnamese", label: "Vietnamese" },
    { value: "korean", label: "Korean" }
  ],
  iepComponents: [
    { value: "student-info", label: "Student Information" },
    { value: "plaafp", label: "Present Levels of Academic Achievement and Functional Performance (PLAAFP)" },
    { value: "disability-categories", label: "Disability Categories" },
    { value: "areas-concern", label: "Areas of Concern" },
    { value: "priority-goals", label: "Priority Goal Areas" },
    { value: "goals", label: "Goals and Objectives" },
    { value: "accommodations-mods", label: "Accommodations and Modifications" },
    { value: "progress", label: "Progress Monitoring" },
    { value: "gen-ed", label: "Participation in General Education Curriculum" },
    { value: "services", label: "Services and Supports" },
    { value: "team", label: "Team Members" }
  ],
  existingServices: [
    { value: "special-ed", label: "Special Education Teacher Support" },
    { value: "speech", label: "Speech Therapy" },
    { value: "occupational", label: "Occupational Therapy" },
    { value: "counseling", label: "Counseling Services" },
    { value: "behavioral", label: "Behavioral Therapy / Behavioral Support" },
    { value: "paraprofessional", label: "Paraprofessional / Classroom Aide Support" },
    { value: "other", label: "Other" }
  ],
  accommodations: [
    { value: "preferential-seating", label: "Preferential seating" },
    { value: "extended-time", label: "Extended time" },
    { value: "assistive-tech", label: "Assistive technology" },
    { value: "modified-workload", label: "Modified workload" },
    { value: "visual-aids", label: "Visual aids and graphic organizers" },
    { value: "teacher-check", label: "Frequent teacher check-ins / redirection" },
    { value: "breaks", label: "Breaks during tasks or tests" },
    { value: "alternative-testing", label: "Alternative testing environment (quiet space, small group)" },
    { value: "other", label: "Other" }
  ]
} satisfies {
  gradeLevels: MultiSelectOption[];
  disabilityCategories: MultiSelectOption[];
  areasOfConcern: MultiSelectOption[];
  priorityGoalAreas: MultiSelectOption[];
  evaluationSchedule: MultiSelectOption[];
  languages: MultiSelectOption[];
  iepComponents: MultiSelectOption[];
  existingServices: MultiSelectOption[];
  accommodations: MultiSelectOption[];
};
