"use client"

import * as React from "react"
import { useCurrentEditor } from "@tiptap/react"

// --- Icons ---
import { ChevronDownIcon } from "@/components/tiptap-icons/chevron-down-icon"
import { 
  Trash2, 
  ArrowDownToLine,
  ArrowRightToLine,
  ArrowUpToLine,
  ArrowLeftToLine
} from "lucide-react"

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/tiptap-ui-primitive/dropdown-menu"

export function TableMenu() {
  const { editor } = useCurrentEditor()

  if (!editor) return null

  const isInTable = editor.isActive("table")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button data-style="ghost">
          <svg className="tiptap-button-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 4.5h13v11h-13v-11zm0 0v11m13-11v11m-9.75-11v11m6.5-11v11m-9.75-5.5h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <ChevronDownIcon className="tiptap-button-icon" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().addRowBefore().run()}
          disabled={!isInTable}
        >
          <ArrowUpToLine className="tiptap-button-icon" />
          Add Row Above
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().addRowAfter().run()}
          disabled={!isInTable}
        >
          <ArrowDownToLine className="tiptap-button-icon" />
          Add Row Below
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          disabled={!isInTable}
        >
          <ArrowLeftToLine className="tiptap-button-icon" />
          Add Column Before
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          disabled={!isInTable}
        >
          <ArrowRightToLine className="tiptap-button-icon" />
          Add Column After
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => editor.chain().focus().deleteRow().run()}
          disabled={!isInTable}
        >
          <Trash2 className="tiptap-button-icon" />
          Delete Row
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().deleteColumn().run()}
          disabled={!isInTable}
        >
          <Trash2 className="tiptap-button-icon" />
          Delete Column
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => editor.chain().focus().deleteTable().run()}
          disabled={!isInTable}
        >
          <Trash2 className="tiptap-button-icon" />
          Delete Table
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
