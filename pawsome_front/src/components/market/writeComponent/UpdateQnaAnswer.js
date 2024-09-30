import { useNavigate, useParams } from "react-router-dom";
import WriteAnswerFrm from "./WriteAnswerFrm";
import { memberNicknameState } from "../../utils/RecoilData";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateQnaAnswer = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const params = useParams();
  const productNo = params.productNo;
  const qnaNo = params.qnaNo;
  const [product, setProduct] = useState({});
  const [qna, setQna] = useState({});
  const [qnaAnswerContent, setQnaAnswerContent] = useState("");

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
        setQna(res.data);
        setQnaAnswerContent(res.data.qnaAnswerContent);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateQnaAnswer = () => {
    if (qnaAnswerContent != "") {
      const form = new FormData();
      form.append("qnaNo", qnaNo);
      form.append("qnaAnswerContent", qnaAnswerContent);
      form.append("qnaAnswerWriter", memberNickname);
      axios
        .patch(`${backServer}/product/qnaAnswer`, form)
        .then((res) => {
          console.log(res);
          if (res.data) {
            Swal.fire({
              title: "수정 성공",
              text: "답변 수정을 완료했습니다.",
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
              `/market/main/productDetail/${productNo}/qna/updateQnaAnswer/${qna.qnaNo}`
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
            updateQnaAnswer();
          }}
        >
          <div className="qna-writeFrm-title">
            <div>Q&A 답변 수정</div>
          </div>
          <div className="qna-writeFrm-info">
            <WriteAnswerFrm
              product={product}
              qna={qna}
              qnaAnswerContent={qnaAnswerContent}
              setQnaAnswerContent={setQnaAnswerContent}
            />
            <div className="submit-btn-wrap answer">
              <button type="submit" className="submit-btn">
                Q&A 답변 수정
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateQnaAnswer;
