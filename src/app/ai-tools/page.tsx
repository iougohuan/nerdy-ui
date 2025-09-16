"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { Mic, FilePlus } from "lucide-react";

export default function AIToolsPage() {
  const [studentPerformance, setStudentPerformance] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [disabilityCategories, setDisabilityCategories] = useState<string[]>([]);
  const [areasOfConcern, setAreasOfConcern] = useState<string[]>([]);
  const [priorityGoalAreas, setPriorityGoalAreas] = useState<string[]>([]);
  const [evaluationSchedule, setEvaluationSchedule] = useState("quarterly");
  const [language, setLanguage] = useState("english");

  const handleGenerate = () => {
    // Handle form submission
    console.log("Generating IEP...");
  };

  return (
    <SidebarProvider
      className="bg-transparent text-sidebar-foreground"
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col relative">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="flex flex-col items-center gap-6 mb-8">
                  <div className="flex flex-col items-center gap-4 max-w-lg">
                    <div className="w-12 h-12 rounded-[13.714px] bg-gradient-to-b from-orange-600 to-yellow-400 flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white"
                      >
                        <path
                          d="M19.5008 18.9998C19.7557 19 20.0008 19.0976 20.1862 19.2726C20.3715 19.4476 20.483 19.6867 20.498 19.9412C20.5129 20.1956 20.4301 20.4461 20.2665 20.6416C20.1029 20.837 19.8709 20.9627 19.6178 20.9928L19.5008 20.9998H12.5008C12.2459 20.9995 12.0008 20.9019 11.8154 20.7269C11.6301 20.5519 11.5186 20.3128 11.5036 20.0584C11.4887 19.8039 11.5715 19.5534 11.7351 19.3579C11.8986 19.1625 12.1307 19.0369 12.3838 19.0068L12.5008 18.9998H19.5008ZM20.1318 4.36776C20.364 4.59991 20.5482 4.87554 20.6739 5.17889C20.7996 5.48225 20.8643 5.8074 20.8643 6.13576C20.8643 6.46412 20.7996 6.78926 20.6739 7.09262C20.5482 7.39597 20.364 7.6716 20.1318 7.90376L9.23579 18.7998C9.1086 18.927 8.95956 19.0303 8.79579 19.1048L4.99179 20.8338C4.14979 21.2168 3.28379 20.3498 3.66679 19.5078L5.39679 15.7038C5.47094 15.5401 5.57391 15.391 5.70079 15.2638L16.5968 4.36776C17.0656 3.89908 17.7014 3.63579 18.3643 3.63579C19.0272 3.63579 19.663 3.89908 20.1318 4.36776Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col items-center gap-4 text-center">
                      <h1 className="text-2xl font-medium">IEP Generator</h1>
                      <p className="text-base text-muted-foreground leading-normal">
                        Create comprehensive Individualized Education Program (IEP) goals and documents in minutes with our advanced AI technology.
                      </p>
                    </div>
                  </div>
                </div>

                <Card className="p-6" style={{ borderRadius: "var(--radius-card)", background: "var(--surface-card)", border: "none" }}>
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="min-h-[148px] p-4 rounded-xl relative surface-input">
                        <div className="flex items-start justify-between h-full">
                          <div className="flex-1">
                            <textarea
                              value={studentPerformance}
                              onChange={(e) => setStudentPerformance(e.target.value)}
                              placeholder=""
                              className="w-full h-full bg-transparent text-foreground placeholder-muted-foreground border-none outline-none resize-none text-sm leading-5"
                              rows={6}
                            />
                            {!studentPerformance && (
                              <div className="absolute top-4 left-4 text-sm leading-5 pointer-events-none">
                                <span className="text-muted-foreground">Describe student's current academic and functional performance </span>
                                <span className="text-destructive">*</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-end gap-3 ml-3">
                            <Button variant="outline" size="sm">
                              <FilePlus className="w-4 h-4 mr-2" />
                              Add file
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Mic className="w-[19px] h-[19px]" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-label">
                            Grade Level <span className="text-destructive">*</span>
                          </label>
                          <Select value={gradeLevel} onValueChange={setGradeLevel}>
                            <SelectTrigger tone="surface">
                              <SelectValue placeholder="Select a grade" />
                            </SelectTrigger>
                            <SelectContent tone="surface">
                              <SelectItem value="k">Kindergarten</SelectItem>
                              <SelectItem value="1">1st Grade</SelectItem>
                              <SelectItem value="2">2nd Grade</SelectItem>
                              <SelectItem value="3">3rd Grade</SelectItem>
                              <SelectItem value="4">4th Grade</SelectItem>
                              <SelectItem value="5">5th Grade</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-label">
                            Disability categories <span className="text-destructive">*</span>
                          </label>
                          <MultiSelect
                            options={[
                              { value: "autism", label: "Autism" },
                              { value: "intellectual", label: "Intellectual Disability" },
                              { value: "learning", label: "Learning Disability" },
                              { value: "emotional", label: "Emotional Disturbance" },
                            ]}
                            value={disabilityCategories}
                            onChange={setDisabilityCategories}
                            placeholder="Select types"
                            summaryFormatter={(n) => `${n} types selected`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-label">
                            Areas of concern <span className="text-destructive">*</span>
                          </label>
                          <MultiSelect
                            options={[
                              { value: "reading", label: "Reading" },
                              { value: "math", label: "Mathematics" },
                              { value: "writing", label: "Writing" },
                              { value: "behavior", label: "Behavior" },
                              { value: "social", label: "Social Skills" },
                            ]}
                            value={areasOfConcern}
                            onChange={setAreasOfConcern}
                            placeholder="Select a category"
                            summaryFormatter={(n) => `${n} categories selected`}
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-label">
                            Priority Goal Areas <span className="text-destructive">*</span>
                          </label>
                          <MultiSelect
                            options={[
                              { value: "academic", label: "Academic Skills" },
                              { value: "functional", label: "Functional Skills" },
                              { value: "communication", label: "Communication" },
                              { value: "social-emotional", label: "Social-Emotional" },
                            ]}
                            value={priorityGoalAreas}
                            onChange={setPriorityGoalAreas}
                            placeholder="Select a category"
                            summaryFormatter={(n) => `${n} categories selected`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-label">
                            Evaluation Schedule <span className="text-destructive">*</span>
                          </label>
                          <Select value={evaluationSchedule} onValueChange={setEvaluationSchedule}>
                            <SelectTrigger tone="surface">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent tone="surface">
                              <SelectItem value="quarterly">Quarterly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="annually">Annually</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-label">
                            Language <span className="text-destructive">*</span>
                          </label>
                          <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger tone="surface">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent tone="surface">
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="spanish">Spanish</SelectItem>
                              <SelectItem value="french">French</SelectItem>
                              <SelectItem value="german">German</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button onClick={handleGenerate} className="w-full h-10">
                        Generate
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
