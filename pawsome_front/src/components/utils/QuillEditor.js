import axios from "axios";
import { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillEditor = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const inquiryContent = props.inquiryContent;
  const setInquiryContent = props.setInquiryContent;
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
      },
    }),
    []
  );
  return (
    <div>
      <ReactQuill
        theme="snow"
        onChange={setInquiryContent}
        value={inquiryContent}
        modules={modules}
        hooks={{ addImageBlobHook: uploadImage }}
      ></ReactQuill>
    </div>
  );
};
export default QuillEditor;
