import axios from "axios";
import { useEffect, useState } from "react";
import { ImOpt } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import "../write.css";
import WriteFrm from "./WrtieFrm";
import { useRecoilState } from "recoil";
import { loginEmailState, memberNicknameState } from "../../utils/RecoilData";
import Swal from "sweetalert2";

const WriteQna = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const params = useParams(); //주소창에 데이터 가져오기
  const [qnaType, setQnaType] = useState(1);
  const [qnaTitle, setQnaTitle] = useState("");
  const [qnaContent, setQnaContent] = useState("");
  const [qnaPublic, setQnaPublic] = useState(0);
  const inputTitle = (e) => {
    setQnaTitle(e.target.value);
  };
  const productNo = params.productNo;
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios
      .get(`${backServer}/product/productDetail/${productNo}/${loginEmail}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const writeQna = () => {
    if (qnaTitle !== "" && qnaContent !== "") {
      const form = new FormData();
      form.append("qnaType", qnaType);
      form.append("qnaTitle", qnaTitle);
      form.append("qnaContent", qnaContent);
      form.append("qnaWriter", memberNickname);
      form.append("qnaPublic", qnaPublic);
      form.append("productNo", productNo);
      axios
        .post(`${backServer}/product/qna`, form)
        .then((res) => {
          console.log(res);
          if (res.data) {
            Swal.fire({
              title: "등록 성공",
              text: "Q&A 등록을 완료했습니다.",
              icon: "success",
            });
            navigate(`/market/main/productDetail/${productNo}/qna`);
          } else {
            Swal.fire({
              title: "등록 실패",
              text: "나중에 다시 시도해주세요",
              icon: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (qnaTitle === "") {
      Swal.fire({
        title: "등록 실패",
        text: "문의 제목을 작성해주세요",
        icon: "error",
      });
    } else if (qnaContent === "" || qnaContent === "<p><br></p>") {
      Swal.fire({
        title: "등록 실패",
        text: "문의 내용을 작성해주세요",
        icon: "error",
      });
    }
  };

  return (
    <section className="section productList-wrap">
      <div className="productDetail-wrap">
        <div className="line"></div>
        <div className="page-title">Q&A</div>
        <form
          className="qna-writeFrm-wrap"
          onSubmit={(e) => {
            e.preventDefault();
            writeQna();
          }}
        >
          <div className="qna-writeFrm-title">
            <div>Q&A 작성</div>
          </div>
          <div className="qna-writeFrm-info">
            <WriteFrm
              product={product}
              qnaType={qnaType}
              setQnaType={setQnaType}
              qnaTitle={qnaTitle}
              setQnaTitle={inputTitle}
              qnaContent={qnaContent}
              setQnaContent={setQnaContent}
              qnaPublic={qnaPublic}
              setQnaPublic={setQnaPublic}
            />
            <div className="submit-btn-wrap">
              <button type="submit" className="submit-btn">
                Q&A 등록
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default WriteQna;
