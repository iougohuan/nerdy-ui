"use client"

import * as React from "react"
import { useEditorState } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { 
  Table, 
  Trash2, 
  Plus,
  ArrowDownToLine,
  ArrowRightToLine,
  ArrowUpToLine,
  ArrowLeftToLine
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export function TableMenu() {
  const { editor } = useEditorState()

  if (!editor) return null

  const isInTable = editor.isActive("table")

  if (!isInTable) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Table className="size-4" />
          Table
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem
          onClick={() => editor.chain().focus().addRowBefore().run()}
          className="gap-2"
        >
          <ArrowUpToLine className="size-4" />
          Add Row Above
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().addRowAfter().run()}
          className="gap-2"
        >
          <ArrowDownToLine className="size-4" />
          Add Row Below
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          className="gap-2"
        >
          <ArrowLeftToLine className="size-4" />
          Add Column Before
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          className="gap-2"
        >
          <ArrowRightToLine className="size-4" />
          Add Column After
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => editor.chain().focus().deleteRow().run()}
          className="gap-2 text-destructive focus:text-destructive"
        >
          <Trash2 className="size-4" />
          Delete Row
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().deleteColumn().run()}
          className="gap-2 text-destructive focus:text-destructive"
        >
          <Trash2 className="size-4" />
          Delete Column
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => editor.chain().focus().deleteTable().run()}
          className="gap-2 text-destructive focus:text-destructive"
        >
          <Trash2 className="size-4" />
          Delete Table
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
