import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

class CancelPay {
  cancelPay = (buyNo, productNo, payUid, cancelRequestAmount, setResult) => {
    console.log("test");
    console.log(buyNo, productNo, payUid, cancelRequestAmount, setResult);
    const backServer = process.env.REACT_APP_BACK_SERVER;
    //부분취소
    axios({
      url: `${backServer}/pay/refund`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        buyNo: buyNo, //구매번호
        productNo: productNo, //상품번호
        payUid: payUid, // 주문번호
        cancelRequestAmount: cancelRequestAmount, // 환불금액
        //reason: refundReason, // 환불사유
      },
    })
      .then((res) => {
        if (res.data) {
          console.log(res);
          setResult(1);
          if (res.data == 1) {
            Swal.fire({
              title: "결제 취소 완료",
              text: "카드사 정책에 따라 환불처리가 영업일기준 3~4일 소요될 수 있습니다.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "결제 취소 실패",
              text: "나중에 다시 시도해주시기 바랍니다.",
              icon: "warning",
            });
          }
        } else {
          setResult(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export const cancelPay = new CancelPay().cancelPay;
