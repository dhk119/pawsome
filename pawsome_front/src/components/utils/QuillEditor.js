import axios from "axios";
import { useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillEditor = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const inquiryContent = props.inquiryContent;
  const setInquiryContent = props.setInquiryContent;
  const editorRef = useRef(null);
  const changeValue = () => {
    //const editorData = editorRef.current.getInstance().getHTML();
    setInquiryContent();
  };
  const uploadImage = (file, callbackfunc) => {
    const form = new FormData();
    form.append("image", file);
    axios
      .post(`${backServer}/inquiry/editorImage`, form, {
        headers: {
          contentType: "multipart/form/data",
          processData: false,
        },
      })
      .then((res) => {
        callbackfunc(`${backServer}${res.data}`, "image");
      })
      .catch(() => {});
  };
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["image"],
          [{ header: [1, 2, 3, 4, 5, false] }],
          ["bold", "underline"],
        ],
        handlers: {
          image: uploadImage,
        },
      },
    }),
    []
  );
  return (
    <div>
      <ReactQuill
        theme="snow"
        ref={editorRef}
        onChange={changeValue}
        value={inquiryContent}
        modules={modules}
      ></ReactQuill>
    </div>
  );
};
export default QuillEditor;
