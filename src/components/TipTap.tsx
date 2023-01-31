import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import type {
  Editor,
  JSONContent
} from "@tiptap/react";
import {
  Content,
  EditorContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { lowlight } from "lowlight/lib/core";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/github.css"

lowlight.registerLanguage("java", java)
lowlight.registerLanguage("js", javascript)


import {
  Dispatch,
  FocusEvent,
  SetStateAction,
  useEffect
} from "react";
import {
  useState,
} from "react";
const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="container flex mx-auto">
      <div className="m-1 p-1 bg-slate-400 rounded-lg flex align-middle">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <svg
            className={editor.isActive("bold") ? "fill-blue-400" : "fill-black"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className={
              editor.isActive("italic") ? "fill-blue-400" : "fill-black"
            }
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        >
          <svg
            className={
              editor.isActive("strike") ? "fill-blue-400" : "fill-black"
            }
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M17.154 14c.23.516.346 1.09.346 1.72 0 1.342-.524 2.392-1.571 3.147C14.88 19.622 13.433 20 11.586 20c-1.64 0-3.263-.381-4.87-1.144V16.6c1.52.877 3.075 1.316 4.666 1.316 2.551 0 3.83-.732 3.839-2.197a2.21 2.21 0 0 0-.648-1.603l-.12-.117H3v-2h18v2h-3.846zm-4.078-3H7.629a4.086 4.086 0 0 1-.481-.522C6.716 9.92 6.5 9.246 6.5 8.452c0-1.236.466-2.287 1.397-3.153C8.83 4.433 10.271 4 12.222 4c1.471 0 2.879.328 4.222.984v2.152c-1.2-.687-2.515-1.03-3.946-1.03-2.48 0-3.719.782-3.719 2.346 0 .42.218.786.654 1.099.436.313.974.562 1.613.75.62.18 1.297.414 2.03.699z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
        >
          <svg
            className={
              editor.isActive("underline") ? "fill-blue-400" : "fill-black"
            }
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z" />
          </svg>
        </button>
      </div>
      <div className="m-1 p-1 bg-slate-400 rounded-lg flex align-middle">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
        >
          <svg
            className={editor.isActive("code") ? "fill-blue-400" : "fill-black"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M23 12l-7.071 7.071-1.414-1.414L20.172 12l-5.657-5.657 1.414-1.414L23 12zM3.828 12l5.657 5.657-1.414 1.414L1 12l7.071-7.071 1.414 1.414L3.828 12z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
        >
          <svg
            className={
              editor.isActive("code-block") ? "fill-blue-400" : "fill-black"
            }
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm16 7l-3.536 3.536-1.414-1.415L17.172 12 15.05 9.879l1.414-1.415L20 12zM6.828 12l2.122 2.121-1.414 1.415L4 12l3.536-3.536L8.95 9.88 6.828 12zm4.416 5H9.116l3.64-10h2.128l-3.64 10z" />
          </svg>
        </button>
      </div>
      <div className="m-1 p-1 bg-slate-400 rounded-lg flex align-middle">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          disabled={!editor.can().chain().focus().toggleSubscript().run()}
        >
          <svg
            className={
              editor.isActive("subscript") ? "fill-blue-400" : "fill-black"
            }
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M5.596 4L10.5 9.928 15.404 4H18l-6.202 7.497L18 18.994V19h-2.59l-4.91-5.934L5.59 19H3v-.006l6.202-7.497L3 4h2.596zM21.55 16.58a.8.8 0 1 0-1.32-.36l-1.155.33A2.001 2.001 0 0 1 21 14a2 2 0 0 1 1.373 3.454L20.744 19H23v1h-4v-1l2.55-2.42z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          disabled={!editor.can().chain().focus().toggleSuperscript().run()}
        >
          <svg
            className={
              editor.isActive("superscript") ? "fill-blue-400" : "fill-black"
            }
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M5.596 5l4.904 5.928L15.404 5H18l-6.202 7.497L18 19.994V20h-2.59l-4.91-5.934L5.59 20H3v-.006l6.202-7.497L3 5h2.596zM21.55 6.58a.8.8 0 1 0-1.32-.36l-1.155.33A2.001 2.001 0 0 1 21 4a2 2 0 0 1 1.373 3.454L20.744 9H23v1h-4V9l2.55-2.42z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const TipTap = ({ content: initialContent, stateCallback, editable }: editorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Subscript, Superscript],
    content: initialContent ?? "",
    onUpdate: ({ editor }) => {
      stateCallback ? stateCallback(JSON.stringify(editor.getJSON())) : null;
    },
  });
  useEffect(() => {
    editor?.setEditable(editable ?? true);
  }, [editable, editor])
  return (
    <div className="group">
      <div className={"relative invisible" + (editable ? " group-focus-within:visible" : "")}>
        <div className="absolute -top-10">
          <MenuBar editor={editor} />
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;

export function CodeEditor({ content: initialContent, stateCallback, editable }: editorProps) {
  const editor = useEditor({
    content: initialContent ?? "",
    extensions: [CodeBlockLowlight.configure({ lowlight }), Document, Text, Paragraph],
    onUpdate: ({ editor }) => {
      stateCallback ? stateCallback(JSON.stringify(editor.getJSON())) : null;
    },
    onCreate: (({ editor }) => { initialContent ? null : editor?.commands.toggleCodeBlock() }),
    editorProps: {
      attributes: {
        class: "bg-white"
      }
    }
  });
  useEffect(() => {
    editor?.setEditable(editable ?? true);
  }, [editable, editor])
  return <EditorContent editor={editor} />

}


interface editorProps {
  content?: string;
  stateCallback?: Dispatch<SetStateAction<string>>
  editable?: boolean;
}

