import { useEffect, useState } from "react";
import { loginEmailState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import axios from "axios";

const BuyList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [buyList, setBuyList] = useState([]);
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);

  useEffect(() => {
    if (loginEmail) {
      axios
        .get(`${backServer}/member/selectBuyList/${loginEmail}`)
        .then((res) => {
          setBuyList(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [loginEmail, backServer]);

  return (
    <div className="buy-list-wrap">
      <h1>구매내역</h1>
      <div>
        {buyList.length > 0 ? (
          buyList.map((item, index) => (
            <div key={index} className="buy-item">
              {item.buyCount} - {item.buyState}
            </div>
          ))
        ) : (
          <p>구매 내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default BuyList;
