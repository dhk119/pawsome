import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

class CancelPay {
  cancelPay = (buyNo, productNo, payUid, cancelRequestAmount, setResult) => {
    // 받아야할 파라미터
    // memberNo : 회원번호 (없으면 0 줘야함)
    // companyNo : 업체 번호 (없으면 null 줘야함)
    // payment : payment 객체 (memberPayDTO나 companyPayDTO 조회해서 필요한 데이터 가져오면 됨)
    // refundReason : 별로 중요하지 않음 -> 입력 안 받았으면 문자열 대충 아무거나 주면 됨
    // setResult : setResult state 넘겨주면 됨 (환불성공시 result state는 1이 들어가고 실패시 0이 들어감 그래서 초기세팅을 -1로 하는게 좋음)
    const backServer = process.env.REACT_APP_BACK_SERVER;
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
              hmtl: "카드사 정책에 따라 환불처리가 영업일기준 3~4일 소요될 수 있습니다.</br>더 좋은 상품으로 찾아뵙겠습니다.",
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
