"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ToolbarEditor } from "./toolbar-editor";

interface ITiptapEditorProps {
  content: string;
  onChange(text: string): void;
}

export const TiptapEditor = ({ content, onChange }: ITiptapEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[360px] w-full border border-input rounded-md px-3 py-1 text-sm shadow-sm bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="space-y-2 prose-sm prose-ol:list-decimal prose-ul:list-disc">
      <ToolbarEditor editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
