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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tiptap-ui-primitive/tooltip"

export function TableMenu() {
  const { editor } = useCurrentEditor()

  if (!editor) return null

  const isInTable = editor.isActive("table")

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button data-style="ghost">
              <svg className="tiptap-button-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 4.5h13v11h-13v-11zm0 0v11m13-11v11m-9.75-11v11m6.5-11v11m-9.75-5.5h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <ChevronDownIcon className="tiptap-button-icon" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Table</TooltipContent>
      </Tooltip>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().addRowBefore().run()}
          disabled={!isInTable}
          className="flex items-center gap-2"
        >
          <ArrowUpToLine className="size-4" />
          <span>Add Row Above</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().addRowAfter().run()}
          disabled={!isInTable}
          className="flex items-center gap-2"
        >
          <ArrowDownToLine className="size-4" />
          <span>Add Row Below</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          disabled={!isInTable}
          className="flex items-center gap-2"
        >
          <ArrowLeftToLine className="size-4" />
          <span>Add Column Before</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          disabled={!isInTable}
          className="flex items-center gap-2"
        >
          <ArrowRightToLine className="size-4" />
          <span>Add Column After</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => editor.chain().focus().deleteRow().run()}
          disabled={!isInTable}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 focus:text-red-600 data-[disabled]:text-red-500/50"
        >
          <Trash2 className="size-4" />
          <span>Delete Row</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().deleteColumn().run()}
          disabled={!isInTable}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 focus:text-red-600 data-[disabled]:text-red-500/50"
        >
          <Trash2 className="size-4" />
          <span>Delete Column</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => editor.chain().focus().deleteTable().run()}
          disabled={!isInTable}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 focus:text-red-600 data-[disabled]:text-red-500/50"
        >
          <Trash2 className="size-4" />
          <span>Delete Table</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
