import { useNavigate, useParams } from "react-router-dom";
import "../write.css";
import WriteFrm from "./WrtieFrm";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { memberNicknameState } from "../../utils/RecoilData";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateQna = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
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
  const qnaNo = params.qnaNo;
  useEffect(() => {
    axios
      .get(`${backServer}/product/productDetail/${productNo}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${backServer}/product/qna/${qnaNo}`)
      .then((res) => {
        console.log(res);
        setQnaType(res.data.qnaType);
        setQnaTitle(res.data.qnaTitle);
        setQnaContent(res.data.qnaContent);
        setQnaPublic(res.data.qnaPublic);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateQna = () => {
    if (qnaTitle !== "" && qnaContent !== "") {
      const form = new FormData();
      form.append("qnaNo", qnaNo);
      form.append("qnaType", qnaType);
      form.append("qnaTitle", qnaTitle);
      form.append("qnaContent", qnaContent);
      form.append("qnaWriter", memberNickname);
      form.append("qnaPublic", qnaPublic);
      form.append("productNo", productNo);
      axios
        .patch(`${backServer}/product`, form)
        .then((res) => {
          console.log(res);
          if (res.data) {
            Swal.fire({
              title: "수정 성공",
              text: "Q&A 수정을 완료했습니다.",
              icon: "success",
            });
            navigate(`/market/main/productDetail/${productNo}/qna`);
          } else {
            Swal.fire({
              title: "수정 실패",
              text: "나중에 다시 시도해주세요",
              icon: "error",
            });
            navigate(
              `/market/main/productDetail/${productNo}/qna/updateQna/${qnaNo}`
            );
          }
        })
        .catch((err) => {
          console.log(err);
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
            updateQna();
          }}
        >
          <div className="qna-writeFrm-title">
            <div>Q&A 수정</div>
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
                Q&A 수정
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateQna;
