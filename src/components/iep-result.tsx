"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Pencil, FileDown } from "lucide-react"
import { EditorContent, EditorProvider, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { Link } from "@tiptap/extension-link"
import { Underline } from "@tiptap/extension-underline"
import { TaskList } from "@tiptap/extension-task-list"
import { TaskItem } from "@tiptap/extension-task-item"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Toolbar, ToolbarGroup, ToolbarSeparator } from "@/components/tiptap-ui-primitive/toolbar"
import { Spacer } from "@/components/tiptap-ui-primitive/spacer"
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu"
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button"
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu"
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button"
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button"
import { ColorHighlightPopover } from "@/components/tiptap-ui/color-highlight-popover"
import { LinkPopover } from "@/components/tiptap-ui/link-popover"
import { MarkButton } from "@/components/tiptap-ui/mark-button"
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button"
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button"
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension"
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension"
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils"
import { useIsMobile } from "@/hooks/use-mobile"

// Import styles
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss"
import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss"
import "@/components/tiptap-node/list-node/list-node.scss"
import "@/components/tiptap-node/image-node/image-node.scss"
import "@/components/tiptap-node/heading-node/heading-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"
import "@/components/tiptap-templates/simple/simple-editor.scss"

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
  const isMobile = useIsMobile();
  
  const extensions = React.useMemo(() => [
    StarterKit.configure({
      horizontalRule: false,
    }),
    Link.configure({
      openOnClick: false,
    }),
    Underline,
    HorizontalRule,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    TaskList,
    TaskItem.configure({ nested: true }),
    Highlight.configure({ multicolor: true }),
    Image,
    Typography,
    Superscript,
    Subscript,
    ImageUploadNode.configure({
      accept: "image/*",
      maxSize: MAX_FILE_SIZE,
      limit: 3,
      upload: handleImageUpload,
      onError: (error) => console.error("Upload failed:", error),
    }),
  ], []);
  
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1080px]">
      {/* Header with title and export button */}
      <div className="flex items-center justify-between gap-4 w-full">
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

      {/* Editor with Toolbar */}
      <div className="w-full bg-[#181b37] rounded-3xl overflow-hidden opacity-95">
        <EditorProvider
          extensions={extensions}
          content={content}
          editorProps={{
            attributes: {
              autocomplete: "off",
              autocorrect: "off",
              autocapitalize: "off",
              class: "simple-editor p-6 min-h-[800px]",
            },
          }}
          immediatelyRender={false}
          shouldRerenderOnTransaction={false}
          slotBefore={
            <Toolbar className="bg-[#0c0e24] border-b border-[rgba(232,232,253,0.05)] sticky top-0 z-10">
              <ToolbarGroup>
                <UndoRedoButton action="undo" />
                <UndoRedoButton action="redo" />
              </ToolbarGroup>
              <ToolbarSeparator />
              <ToolbarGroup>
                <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={true} />
                <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} portal={true} />
                <BlockquoteButton />
                <CodeBlockButton />
              </ToolbarGroup>
              <ToolbarSeparator />
              <ToolbarGroup>
                <MarkButton type="bold" />
                <MarkButton type="italic" />
                <MarkButton type="strike" />
                <MarkButton type="code" />
                <MarkButton type="underline" />
                <ColorHighlightPopover />
                <LinkPopover />
              </ToolbarGroup>
              <ToolbarSeparator />
              <ToolbarGroup>
                <MarkButton type="superscript" />
                <MarkButton type="subscript" />
              </ToolbarGroup>
              <ToolbarSeparator />
              <ToolbarGroup>
                <TextAlignButton align="left" />
                <TextAlignButton align="center" />
                <TextAlignButton align="right" />
                <TextAlignButton align="justify" />
              </ToolbarGroup>
              <ToolbarSeparator />
              <ToolbarGroup>
                <ImageUploadButton text="Add" />
              </ToolbarGroup>
              <Spacer />
            </Toolbar>
          }
        />
      </div>
    </div>
  )
}
