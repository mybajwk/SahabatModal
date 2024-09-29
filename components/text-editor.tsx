import { useEffect, useState } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
  Bold,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline as UnderlineIcon,
} from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface TextEditorProps {
  disabled?: boolean;
  value?: string;
  setValue: (text: string) => void;
  placeholder?: string;
}

export default function TextEditor({
  setValue,
  disabled = false,
  value = "",
  placeholder,
}: TextEditorProps) {
  const [localValue, setLocalValue] = useState(value);
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "focus:outline-none w-full font-poppins h-36",
      },
    },
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
          HTMLAttributes: {
            class: "text-heading",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list",
          },
        },
      }),
      Placeholder.configure({
        placeholder: placeholder ?? "Write something …",
      }),
      Underline,
    ],
    autofocus: false,
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      setValue(htmlContent);
      setLocalValue(htmlContent);
    },
    content: localValue,
    editable: !disabled,
  });

  useEffect(() => {
    if (editor) editor.setEditable(!disabled);
  }, [disabled, editor]);

  useEffect(() => {
    if (editor && value !== localValue) {
      editor
        .chain()
        .setContent(value, false, { preserveWhitespace: "full" })
        .run();
      setLocalValue(value);
    }
  }, [editor, value, localValue]);

  useEffect(() => {
    setLocalValue(value);
    // console.log(value);
  }, [value]);

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full rounded-lg border text-black border-[#9EA2AD] text-base font-lexend ring-0">
      <ScrollArea
        className="w-full bg-transparent p-4"
      >
        <EditorContent editor={editor} />
      </ScrollArea>
      <div className="flex flex-wrap items-center gap-6 border-t border-[#9EA2AD] bg-transparent p-2 px-4">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${editor.isActive("bold") && ""} flex size-[30px] items-center justify-center`}
        >
          <Bold
            size={20}
            color={editor.isActive("bold") ? "#0f0f11" : "#9EA2AD"}
            strokeWidth={editor.isActive("bold") ? 3 : 2}
          />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${editor.isActive("italic") && ""} flex size-[30px] items-center justify-center`}
        >
          <Italic
            size={20}
            color={editor.isActive("italic") ? "#0f0f11" : "#9EA2AD"}
            strokeWidth={editor.isActive("italic") ? 3 : 2}
          />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${editor.isActive("underline") && ""} flex size-[30px] items-center justify-center`}
        >
          <UnderlineIcon
            size={20}
            color={editor.isActive("underline") ? "#0f0f11" : "#9EA2AD"}
            strokeWidth={editor.isActive("underline") ? 3 : 2}
          />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${editor.isActive("strike") && ""} flex size-[30px] items-center justify-center`}
        >
          <Strikethrough
            size={20}
            color={editor.isActive("strike") ? "#0f0f11" : "#9EA2AD"}
            strokeWidth={editor.isActive("strike") ? 3 : 2}
          />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${editor.isActive("bulletList") && ""} flex size-[30px] items-center justify-center`}
        >
          <List
            size={20}
            color={editor.isActive("bulletList") ? "#0f0f11" : "#9EA2AD"}
            strokeWidth={editor.isActive("bulletList") ? 3 : 2}
          />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${editor.isActive("orderedList") && ""} flex size-[30px] items-center justify-center`}
        >
          <ListOrdered
            size={20}
            color={editor.isActive("orderedList") ? "#0f0f11" : "#9EA2AD"}
            strokeWidth={editor.isActive("orderedList") ? 3 : 2}
          />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`${editor.isActive("heading", { level: 1 }) && ""} flex size-[30px] items-center justify-center`}
        >
          <Heading1
            size={20}
            color={
              editor.isActive("heading", { level: 1 }) ? "#0f0f11" : "#9EA2AD"
            }
            strokeWidth={editor.isActive("heading", { level: 1 }) ? 3 : 2}
          />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`${editor.isActive("heading", { level: 2 }) && ""} flex size-[30px] items-center justify-center`}
        >
          <Heading2
            size={20}
            color={
              editor.isActive("heading", { level: 2 }) ? "#0f0f11" : "#9EA2AD"
            }
            strokeWidth={editor.isActive("heading", { level: 2 }) ? 3 : 2}
          />
        </button>
      </div>
    </div>
  );
}
