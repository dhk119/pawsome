import axios from "axios";
import { useEffect, useState } from "react";
import { ImOpt } from "react-icons/im";
import { useParams } from "react-router-dom";
import "../write.css";
import QuillEditor from "../../utils/QuillEditor";
import WriteFrm from "./WrtieFrm";

const WriteQna = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams(); //주소창에 데이터 가져오기
  const productNo = params.productNo;
  console.log(productNo);
  const [product, setProduct] = useState({});
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
  return (
    <section className="section productList-wrap">
      <div className="productDetail-wrap">
        <div className="line"></div>
        <div className="page-title">Q&A</div>
        <div className="qna-writeFrm-wrap">
          <div className="qna-writeFrm-title">
            <div>Q&A 작성</div>
          </div>
          <WriteFrm product={product} />
        </div>
      </div>
    </section>
  );
};

export default WriteQna;
