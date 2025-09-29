"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ChevronRight, Pencil, FileDown } from "lucide-react"

interface IEPResultProps {
  content: string
  studentName?: string
  gradeLevel?: string
  onBack: () => void
  onExport: () => void
  onEdit?: () => void
}

export function IEPResult({ 
  content, 
  studentName = "[Student name]",
  gradeLevel = "4th grade",
  onBack, 
  onExport,
  onEdit 
}: IEPResultProps) {
  const documentTitle = `IEP - ${studentName} - ${gradeLevel}`;
  
  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink 
                href="#" 
                className="text-xs text-muted-foreground hover:text-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  onBack();
                }}
              >
                My resources
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="size-3.5" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xs text-foreground">
                {documentTitle}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Header with title and export button */}
      <div className="flex items-center justify-between gap-4 max-w-[1080px] w-full">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium leading-7 tracking-normal text-foreground">
            {documentTitle}
          </h1>
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-1 hover:bg-white/10 rounded transition-colors"
              aria-label="Edit title"
            >
              <Pencil className="size-4 text-foreground" />
            </button>
          )}
        </div>
        <Button 
          variant="outline" 
          onClick={onExport}
          className="gap-2"
        >
          <FileDown className="size-4" />
          Export
        </Button>
      </div>

      {/* Document Card */}
      <Card className="p-8 surface-card">
        <div 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Card>
    </div>
  )
}
