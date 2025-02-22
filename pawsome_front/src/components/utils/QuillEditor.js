import ImageResize from "@looop/quill-image-resize-module-react";
import axios from "axios";
import { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
Quill.register("modules/ImageResize", ImageResize);

const QuillEditor = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const content = props.content;
  const setContent = props.setContent;
  const editorRef = useRef(null);
  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "align",
    "color",
    "background",
    "size",
    "h1",
    "image",
  ];
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;
      const form = new FormData();
      form.append("image", file);
      axios
        .post(`${backServer}/inquiry/editorImage`, form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          const editor = editorRef.current.getEditor();
          const range = editor.getSelection();
          editor.insertEmbed(range.index, "image", `${backServer}${res.data}`);
          editor.setSelection(range.index + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ["small", false, "large", "huge"] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [
            {
              color: [],
            },
            { background: [] },
          ],
          ["image"],
        ],
        handlers: { image: imageHandler },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
      },
    };
  }, []);
  return (
    <div>
      <ReactQuill
        theme="snow"
        ref={editorRef}
        formats={formats}
        onChange={setContent}
        value={content}
        modules={modules}
        style={{ width: "100%", height: "200px" }}
      ></ReactQuill>
    </div>
  );
};

export default QuillEditor;
