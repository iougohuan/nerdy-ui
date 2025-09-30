"use client";

import { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { Stepper, StepperIndicator, StepperItem, StepperNav, StepperSeparator, StepperTitle, StepperTrigger } from "@/components/ui/stepper";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Mic, FilePlus, Check, GraduationCap, BookUser, OctagonAlert, Goal, CalendarClock, Languages, WandSparkles, ListChecks, ArrowRight, ArrowLeft } from "lucide-react";
import { formOptions } from "./form-options";
import type { MultiSelectOption } from "@/components/ui/multi-select";
import { LoadingDialog } from "@/components/loading-dialog";
import { IEPResult } from "@/components/iep-result";

export default function AIToolsPage() {
  const [studentPerformance, setStudentPerformance] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [step, setStep] = useState(1);
  const [gradeLevel, setGradeLevel] = useState("");
  const [disabilityCategories, setDisabilityCategories] = useState<string[]>([]);
  const [customDisabilityOptions, setCustomDisabilityOptions] = useState<MultiSelectOption[]>([]);
  const [areasOfConcern, setAreasOfConcern] = useState<string[]>([]);
  const [priorityGoalAreas, setPriorityGoalAreas] = useState<string[]>([]);
  const [evaluationSchedule, setEvaluationSchedule] = useState("quarterly");
  const [language, setLanguage] = useState("english");
  const [iepComponents, setIepComponents] = useState<string[]>([]);
  const [existingServices, setExistingServices] = useState<string[]>([]);
  const [customServicesOptions, setCustomServicesOptions] = useState<MultiSelectOption[]>([]);
  const [accommodations, setAccommodations] = useState<string[]>([]);
  const [customAccommodationsOptions, setCustomAccommodationsOptions] = useState<MultiSelectOption[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIEP, setGeneratedIEP] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const recordingTimerRef = useRef<number | null>(null);
  const speechBaseTextRef = useRef<string>("");
  const speechFinalTextRef = useRef<string>("");

  const ACCEPTED_TYPES = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "video/mp4",
    "text/plain",
    "text/markdown",
    "text/csv",
    "application/json",
  ];
  const MAX_FILE_BYTES = 50 * 1024 * 1024; // 50MB

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate IEP generation (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock generated IEP content
    const mockIEP = generateMockIEP();
    setGeneratedIEP(mockIEP);
    setIsGenerating(false);
    toast.success("IEP generated successfully!");
  };

  const generateMockIEP = () => {
    // Retorna HTML string que será convertido pelo TipTap
    return `
      <h3>IEP - [Student name] - ${formOptions.gradeLevels.find(g => g.value === gradeLevel)?.label || '4th grade'}</h3>
      <p><strong>📋 Student Name:</strong> [Student name]</p>
      <p><strong>📚 Grade Level:</strong> ${formOptions.gradeLevels.find(g => g.value === gradeLevel)?.label || '4th Grade'}</p>
      <p><strong>🗣️ Language:</strong> ${formOptions.languages.find(l => l.value === language)?.label || 'English'}</p>
      <p><strong>📅 Evaluation Schedule:</strong> ${formOptions.evaluationSchedule.find(e => e.value === evaluationSchedule)?.label || 'Quarterly'}</p>
      <hr>
      <h3>📖 Present Level of Academic Achievement and Functional Performance (PLAAFP)</h3>
      <p>${studentPerformance || '[Student name] is currently in 6th grade and demonstrates the ability to identify explicit information in short texts with minimal support. However, he has difficulty making inferences, identifying the main idea, and analyzing longer narrative and informational texts.'}</p>
      <p>[Student name] benefits from guided reading sessions, oral questioning prior to writing activities, and structured visual supports like graphic organizers.</p>
      <hr>
      <h3>📚 Disability Categories</h3>
      <ul>
        ${disabilityCategories.map(cat => {
          const option = formOptions.disabilityCategories.find(o => o.value === cat);
          return `<li>${option?.label || cat}</li>`;
        }).join('')}
      </ul>
      <hr>
      <h3>⚠️ Areas of Concern</h3>
      <ul>
        ${areasOfConcern.map(area => {
          const option = formOptions.areasOfConcern.find(o => o.value === area);
          return `<li>${option?.label || area}</li>`;
        }).join('')}
      </ul>
      <hr>
      <h3>🎯 Priority Goal Areas</h3>
      <ul>
        ${priorityGoalAreas.map(goal => {
          const option = formOptions.priorityGoalAreas.find(o => o.value === goal);
          return `<li>${option?.label || goal}</li>`;
        }).join('')}
      </ul>
      <hr>
      <h3>📊 Annual Goals</h3>
      <p><strong>Goal 1: Reading Comprehension</strong></p>
      <p><strong>Objective:</strong></p>
      <p>Within 12 months, [Student name] will improve his reading comprehension skills by accurately answering at least 4 out of 5 literal/inferential main idea questions.</p>
      <p><strong>Short-Term Benchmarks:</strong></p>
      <ol>
        <li>Given a short narrative passage, [Student name] will identify the main idea with 80% accuracy using a graphic organizer.</li>
        <li>When reading an informational text, [Student name] will answer "why" and "how" questions with 75% accuracy.</li>
        <li>[Student name] will complete a cause-effect chart after reading a story, scoring at least 3 out of 4 on a rubric.</li>
      </ol>
      <p><strong>Goal 2: Written Expression</strong></p>
      <p><strong>Objective:</strong></p>
      <p>Within 12 months, [Student name] will improve written expression by composing multi-sentence paragraphs with sentence starters and teacher modeling.</p>
      <hr>
      <h3>📈 Progress Monitoring</h3>
      <p>Progress will be monitored quarterly through:</p>
      <ul>
        <li>Work samples</li>
        <li>Teacher observations</li>
        <li>Rubrics for comprehension and writing tasks</li>
        <li>Informal reading assessments</li>
      </ul>
      <hr>
      <h3>👨‍👩‍👧‍👦 Team Members</h3>
      <ul>
        <li><strong>General Education Teacher:</strong> [name]</li>
        <li><strong>Special Education Teacher:</strong> [name]</li>
        <li><strong>Parent/Guardian:</strong> [name]</li>
        <li><strong>School Psychologist:</strong> [name]</li>
        <li><strong>IEP Coordinator:</strong> [name]</li>
      </ul>
    `;
  };

  const handleAddFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    if (selectedFiles.length === 0) return;

    const validFiles: File[] = [];
    const rejected: { file: File; reason: string }[] = [];

    for (const file of selectedFiles) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        rejected.push({ file, reason: "formato não suportado" });
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        rejected.push({ file, reason: "tamanho acima de 50MB" });
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      setAttachments((prev) => [...prev, ...validFiles]);
      toast.success(
        validFiles.length === 1
          ? `Arquivo anexado: ${validFiles[0].name}`
          : `${validFiles.length} arquivos anexados`
      );
    }

    // Se houver arquivo de texto, ler o primeiro e preencher o textarea
    const textLike = selectedFiles.find((f) =>
      ["text/plain", "text/markdown", "text/csv", "application/json"].includes(f.type) ||
      (/\.txt$/i.test(f.name) || /\.md$/i.test(f.name) || /\.csv$/i.test(f.name) || /\.json$/i.test(f.name))
    );
    if (textLike) {
      const reader = new FileReader();
      reader.onload = () => {
        const content = typeof reader.result === "string" ? reader.result : "";
        setStudentPerformance(content);
        toast.success("Texto do arquivo carregado no campo");
      };
      reader.onerror = () => toast.error("Falha ao ler o arquivo de texto");
      reader.readAsText(textLike);
    }

    if (rejected.length > 0) {
      const msg = rejected
        .map((r) => `${r.file.name} (${r.reason})`)
        .join(", ");
      toast.error(`Arquivos rejeitados: ${msg}`);
    }

    // Permitir selecionar o mesmo arquivo novamente
    e.currentTarget.value = "";
  };

  const getSpeechLang = (value: string) => {
    switch (value) {
      case "spanish":
        return "es-ES";
      case "french":
        return "fr-FR";
      case "german":
        return "de-DE";
      case "english":
      default:
        return "en-US";
    }
  };

  const startRecording = async () => {
    try {
      // Solicitar permissão do microfone primeiro (evita falhas silenciosas em alguns navegadores)
      try {
        await (navigator.mediaDevices as any)?.getUserMedia?.({ audio: true });
      } catch (err) {
        toast.error("Permissão do microfone negada.");
        return;
      }

      const SpeechRecognitionClass =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognitionClass) {
        toast.error("Reconhecimento de voz não suportado neste navegador.");
        return;
      }

      const recognition = new SpeechRecognitionClass();
      recognition.lang = getSpeechLang(language);
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsRecording(true);
        toast.message("Gravação iniciada. Fale agora.");
        // start timer
        setRecordingSeconds(0);
        if (recordingTimerRef.current) window.clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = window.setInterval(() => {
          setRecordingSeconds((s) => s + 1);
        }, 1000);
        // Memoriza o texto existente para fazer merge
        speechBaseTextRef.current = studentPerformance;
        speechFinalTextRef.current = "";
      };

      recognition.onerror = (event: any) => {
        let msg = "Erro no reconhecimento de voz.";
        if (event?.error === "no-speech") msg = "Nenhuma fala detectada.";
        else if (event?.error === "audio-capture") msg = "Sem microfone disponível.";
        else if (event?.error === "not-allowed") msg = "Permissão de microfone negada.";
        toast.error(msg);
      };

      recognition.onend = () => {
        setIsRecording(false);
        if (recordingTimerRef.current) {
          window.clearInterval(recordingTimerRef.current);
          recordingTimerRef.current = null;
        }
      };

      recognition.onresult = (event: any) => {
        let interim = "";
        let newlyFinal = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const res = event.results[i];
          const transcript: string = res[0]?.transcript ?? "";
          if (res.isFinal) newlyFinal += transcript + " ";
          else interim += transcript;
        }
        if (newlyFinal) speechFinalTextRef.current += newlyFinal;

        const pieces = [
          speechBaseTextRef.current?.trim?.(),
          speechFinalTextRef.current.trim(),
          interim.trim(),
        ].filter(Boolean);
        setStudentPerformance(pieces.join(" "));
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      toast.error("Não foi possível iniciar a gravação");
    }
  };

  const stopRecording = () => {
    try {
      recognitionRef.current?.stop?.();
    } catch {}
    setIsRecording(false);
    if (recordingTimerRef.current) {
      window.clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
  };

  const toggleRecording = () => {
    if (isRecording) stopRecording();
    else startRecording();
  };

  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.stop?.();
      } catch {}
      if (recordingTimerRef.current) window.clearInterval(recordingTimerRef.current);
    };
  }, []);

  const formatSeconds = (s: number) => {
    const mm = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "m") {
        e.preventDefault();
        toggleRecording();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isRecording, language]);

  // Show result if IEP is generated
  if (generatedIEP) {
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
          <SiteHeader 
            breadcrumbItems={[
              { label: "My resources", onClick: () => setGeneratedIEP(null) }
            ]}
            currentPage={`IEP - [Student name] - ${formOptions.gradeLevels.find(g => g.value === gradeLevel)?.label || "4th grade"}`}
          />
          <Toaster />
          <div className="flex flex-1 flex-col relative">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6 max-w-[1080px] mx-auto w-full">
                  <IEPResult 
                    content={generatedIEP}
                    studentName="[Student name]"
                    gradeLevel={formOptions.gradeLevels.find(g => g.value === gradeLevel)?.label || "4th grade"}
                    onBack={() => setGeneratedIEP(null)}
                    onExport={() => toast.success("Exporting IEP...")}
                    onEdit={() => toast.info("Edit mode coming soon...")}
                  />
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

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
        <Toaster />
        <div className="flex flex-1 flex-col relative">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6 max-w-[1080px] mx-auto w-full">
                <div className="flex flex-col items-center gap-6 mb-8">
                  <div className="flex flex-col items-center gap-4 max-w-lg">
                    <div className="w-12 h-12">
                      <svg viewBox="0 0 49 48" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" width="48" height="48" rx="13.7143" fill="url(#paint0_linear_899_5101)" />
                        <path d="M31.5008 30.9998C31.7557 31 32.0008 31.0976 32.1862 31.2726C32.3715 31.4476 32.483 31.6867 32.498 31.9412C32.5129 32.1956 32.4301 32.4461 32.2665 32.6416C32.1029 32.837 31.8709 32.9627 31.6178 32.9928L31.5008 32.9998H24.5008C24.2459 32.9995 24.0008 32.9019 23.8154 32.7269C23.6301 32.5519 23.5186 32.3128 23.5036 32.0584C23.4887 31.8039 23.5715 31.5534 23.7351 31.3579C23.8986 31.1625 24.1307 31.0369 24.3838 31.0068L24.5008 30.9998H31.5008ZM32.1318 16.3678C32.364 16.5999 32.5482 16.8755 32.6739 17.1789C32.7996 17.4823 32.8643 17.8074 32.8643 18.1358C32.8643 18.4641 32.7996 18.7893 32.6739 19.0926C32.5482 19.396 32.364 19.6716 32.1318 19.9038L21.2358 30.7998C21.1086 30.927 20.9596 31.0303 20.7958 31.1048L16.9918 32.8338C16.1498 33.2168 15.2838 32.3498 15.6668 31.5078L17.3968 27.7038C17.4709 27.5401 17.5739 27.391 17.7008 27.2638L28.5968 16.3678C29.0656 15.8991 29.7014 15.6358 30.3643 15.6358C31.0272 15.6358 31.663 15.8991 32.1318 16.3678ZM18.5008 12.9998C18.7094 12.9998 18.9127 13.0652 19.0824 13.1865C19.252 13.3079 19.3794 13.4793 19.4468 13.6768L19.5768 14.0548C19.7248 14.4885 19.9702 14.8826 20.2942 15.2067C20.6182 15.5309 21.0121 15.7765 21.4458 15.9248L21.8238 16.0538C22.021 16.1213 22.1921 16.2488 22.3133 16.4184C22.4345 16.5881 22.4996 16.7913 22.4996 16.9998C22.4996 17.2082 22.4345 17.4114 22.3133 17.5811C22.1921 17.7507 22.021 17.8782 21.8238 17.9458L21.4458 18.0758C21.012 18.2238 20.618 18.4692 20.2938 18.7931C19.9696 19.1171 19.724 19.5111 19.5758 19.9448L19.4468 20.3228C19.3792 20.52 19.2517 20.6911 19.0821 20.8123C18.9125 20.9334 18.7092 20.9986 18.5008 20.9986C18.2923 20.9986 18.0891 20.9334 17.9195 20.8123C17.7499 20.6911 17.6224 20.52 17.5548 20.3228L17.4248 19.9448C17.2768 19.511 17.0314 19.1169 16.7074 18.7928C16.3834 18.4686 15.9895 18.223 15.5558 18.0748L15.1778 17.9458C14.9806 17.8782 14.8094 17.7507 14.6883 17.5811C14.5671 17.4114 14.502 17.2082 14.502 16.9998C14.502 16.7913 14.5671 16.5881 14.6883 16.4184C14.8094 16.2488 14.9806 16.1213 15.1778 16.0538L15.5558 15.9238C15.9895 15.7758 16.3836 15.5304 16.7078 15.2064C17.0319 14.8824 17.2776 14.4884 17.4258 14.0548L17.5548 13.6768C17.6222 13.4793 17.7496 13.3079 17.9192 13.1865C18.0888 13.0652 18.2922 12.9998 18.5008 12.9998Z" fill="white" />
                        <defs>
                          <linearGradient id="paint0_linear_899_5101" x1="24.5" y1="0" x2="24.5" y2="48" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#B3560E" />
                            <stop offset="1" stopColor="#FFF706" />
                          </linearGradient>
                        </defs>
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

                <div className="flex w-full items-center justify-center mb-6">
                  <Stepper
                    value={step}
                    onValueChange={setStep}
                    className="space-y-8 w-[400px] sm:w-[400px]"
                    indicators={{ completed: <Check className="size-4" /> }}
                  >
                    <StepperNav className="justify-center w-full">
                      {["Student context", "IEP Setting"].map((title, index, arr) => (
                        <StepperItem key={index} step={index + 1} className="relative">
                          <StepperTrigger className="flex justify-start gap-2">
                            <StepperIndicator>{index + 1}</StepperIndicator>
                            <StepperTitle className="text-center">{title}</StepperTitle>
                          </StepperTrigger>
                          {arr.length > index + 1 && (
                            <StepperSeparator className="mx-2" />
                          )}
                        </StepperItem>
                      ))}
                    </StepperNav>
                  </Stepper>
                </div>

                <Card className="p-6" style={{ borderRadius: "var(--radius-card)", background: "var(--surface-card)", border: "none" }}>
                    <div className="space-y-4">
                    {step === 1 && (
                      <div className="relative">
                        <div
                          className={
                            "p-4 pb-[60px] rounded-xl relative surface-input overflow-auto " +
                            (showErrors && !studentPerformance.trim() ? "ring-[3px] ring-destructive/20 border-destructive" : "")
                          }
                        >
                          <div className="h-full">
                            <textarea
                              value={studentPerformance}
                              onChange={(e) => setStudentPerformance(e.target.value)}
                              placeholder=""
                              className={
                                "w-full h-full bg-transparent text-foreground placeholder-muted-foreground border-none outline-none resize-none text-base leading-6"
                              }
                              rows={6}
                            />
                            {!studentPerformance && (
                            <div className="absolute top-4 left-4 text-base leading-6 pointer-events-none">
                                <span className="text-muted-foreground">Describe student&apos;s current academic and functional performance </span>
                                <span className="text-destructive">*</span>
                              </div>
                            )}
                          </div>
                          <div className="absolute bottom-3 right-3 flex items-center gap-3">
                            <input
                              ref={fileInputRef}
                              type="file"
                              className="hidden"
                              accept="image/jpeg,image/png,application/pdf,video/mp4,text/plain,text/markdown,text/csv,application/json,.txt,.md,.csv,.json"
                              multiple
                              onChange={handleFilesSelected}
                            />
                            <Button 
                              variant="outline" 
                              onClick={handleAddFileClick}
                            >
                              <FilePlus className=" h-[20px]" />
                              Add file
                            </Button>
                            {isRecording && (
                              <span className="text-xs text-destructive font-medium tabular-nums inline-flex items-center gap-1">
                                <span className="inline-block size-2 rounded-full bg-destructive animate-pulse" />
                                {formatSeconds(recordingSeconds)}
                              </span>
                            )}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={toggleRecording}
                                    aria-pressed={isRecording}
                                    className={isRecording ? "ring-2 ring-primary text-primary" : undefined}
                                  >
                                    <Mic className="w-[20px] h-[20px]" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    {isRecording
                                      ? "Recording… Clique para parar (⌘/Ctrl+Shift+M)"
                                      : "Start recording (⌘/Ctrl+Shift+M)"}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        {showErrors && !studentPerformance.trim() && (
                          <p className="mt-1 text-xs text-destructive">Required field</p>
                        )}
                      </div>
                    )}

                    {step === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-label inline-flex items-start gap-2">
                            <GraduationCap className="size-4" />
                            <span>Grade Level <span className="text-destructive">*</span></span>
                          </label>
                            <Select value={gradeLevel} onValueChange={setGradeLevel}>
                              <SelectTrigger tone="surface" invalid={showErrors && !gradeLevel}>
                              <SelectValue placeholder="Select a grade" />
                            </SelectTrigger>
                            <SelectContent tone="surface">
                              {formOptions.gradeLevels.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {showErrors && !gradeLevel && (
                            <p className="mt-1 text-xs text-destructive">Required field</p>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-label inline-flex items-start gap-2">
                            <BookUser className="size-4" />
                            <span>Disability categories <span className="text-destructive">*</span></span>
                          </label>
                            <MultiSelect
                            options={formOptions.disabilityCategories}
                            value={disabilityCategories}
                            onChange={setDisabilityCategories}
                            placeholder="Select a category"
                            summaryFormatter={(n) => `${n} types selected`}
                            invalid={showErrors && disabilityCategories.length === 0}
                            allowCustom={true}
                            customOptionsMap={Object.fromEntries(customDisabilityOptions.map(o => [o.value, o.label]))}
                            onAddCustomOption={(label) => {
                              const newValue = `custom-${Date.now()}`
                              setCustomDisabilityOptions(prev => [...prev, { value: newValue, label }])
                              setDisabilityCategories(prev => [...prev, newValue])
                              toast.success(`Added: ${label}`)
                            }}
                          />
                            {showErrors && disabilityCategories.length === 0 && (
                              <p className="mt-1 text-xs text-destructive">Required field</p>
                            )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-label inline-flex items-start gap-2">
                            <OctagonAlert className="size-4" />
                            <span>Areas of concern <span className="text-destructive">*</span></span>
                          </label>
                          <MultiSelect
                            options={formOptions.areasOfConcern}
                            value={areasOfConcern}
                            onChange={setAreasOfConcern}
                            placeholder="Select a category"
                            summaryFormatter={(n) => `${n} categories selected`}
                            invalid={showErrors && areasOfConcern.length === 0}
                          />
                          {showErrors && areasOfConcern.length === 0 && (
                            <p className="mt-1 text-xs text-destructive">Required field</p>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-label inline-flex items-start gap-2">
                            <Goal className="size-4" />
                            <span>Priority Goal Areas <span className="text-destructive">*</span></span>
                          </label>
                          <MultiSelect
                            options={formOptions.priorityGoalAreas}
                            value={priorityGoalAreas}
                            onChange={setPriorityGoalAreas}
                            placeholder="Select a category"
                            summaryFormatter={(n) => `${n} categories selected`}
                            invalid={showErrors && priorityGoalAreas.length === 0}
                          />
                          {showErrors && priorityGoalAreas.length === 0 && (
                            <p className="mt-1 text-xs text-destructive">Required field</p>
                          )}
                        </div>
                      </div>

                        <div className="flex justify-end">
                          <Button
                            onClick={() => {
                              const missing: string[] = [];
                              if (!studentPerformance.trim()) missing.push("PLAAFP");
                              if (!gradeLevel) missing.push("Grade Level");
                              if (disabilityCategories.length === 0) missing.push("Disability categories");
                              if (areasOfConcern.length === 0) missing.push("Areas of concern");
                              if (priorityGoalAreas.length === 0) missing.push("Priority Goal Areas");
                              if (missing.length > 0) {
                                setShowErrors(true);
                                toast.error(`Please fill: ${missing.join(", ")}`);
                                return;
                              }
                              setShowErrors(false);
                              setStep(2);
                            }}
                            className="h-10"
                          >
                            Next
                            <ArrowRight className="size-4" />
                          </Button>
                      </div>
                    </div>
                    )}

                    {step === 2 && (
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-label inline-flex items-center gap-2">
                          <ListChecks className="size-4" />
                          IEP Components sections <span className="text-destructive">*</span>
                        </label>
                        <MultiSelect
                          options={formOptions.iepComponents}
                          value={iepComponents}
                          onChange={setIepComponents}
                          placeholder="Select sections"
                          summaryFormatter={(n) => `${n} types selected`}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-label inline-flex items-start gap-2">
                            <CalendarClock className="size-4" />
                            <span>Evaluation Schedule <span className="text-destructive">*</span></span>
                          </label>
                          <Select value={evaluationSchedule} onValueChange={setEvaluationSchedule}>
                            <SelectTrigger tone="surface">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent tone="surface">
                              {formOptions.evaluationSchedule.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-label inline-flex items-start gap-2">
                            <Languages className="size-4" />
                            <span>Language <span className="text-destructive">*</span></span>
                          </label>
                          <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger tone="surface">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent tone="surface">
                              {formOptions.languages.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-label inline-flex items-start gap-2">
                            <span>What services are already in place or anticipated for the student? <span className="text-destructive">*</span></span>
                          </label>
                          <MultiSelect
                            options={formOptions.existingServices}
                            value={existingServices}
                            onChange={setExistingServices}
                            placeholder="Select services"
                            summaryFormatter={(n) => `${n} types selected`}
                            allowCustom={true}
                            customOptionsMap={Object.fromEntries(customServicesOptions.map(o => [o.value, o.label]))}
                            onAddCustomOption={(label) => {
                              const newValue = `custom-service-${Date.now()}`
                              setCustomServicesOptions(prev => [...prev, { value: newValue, label }])
                              setExistingServices(prev => [...prev, newValue])
                              toast.success(`Added: ${label}`)
                            }}
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-label inline-flex items-start gap-2">
                            <span>Does the student require accommodations or modifications? <span className="text-destructive">*</span></span>
                          </label>
                          <MultiSelect
                            options={formOptions.accommodations}
                            value={accommodations}
                            onChange={setAccommodations}
                            placeholder="Select types"
                            summaryFormatter={(n) => `${n} types selected`}
                            allowCustom={true}
                            customOptionsMap={Object.fromEntries(customAccommodationsOptions.map(o => [o.value, o.label]))}
                            onAddCustomOption={(label) => {
                              const newValue = `custom-accommodation-${Date.now()}`
                              setCustomAccommodationsOptions(prev => [...prev, { value: newValue, label }])
                              setAccommodations(prev => [...prev, newValue])
                              toast.success(`Added: ${label}`)
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Button variant="outline" onClick={() => setStep(1)} className="h-10">
                          <ArrowLeft className="size-4" />
                          Previous
                        </Button>
                        <Button onClick={handleGenerate} className="h-10">
                          <WandSparkles className="size-4" />
                          Generate
                        </Button>
                      </div>
                    </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Modal */}
        <LoadingDialog 
          open={isGenerating} 
          onOpenChange={setIsGenerating}
          onCancel={() => setIsGenerating(false)}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
