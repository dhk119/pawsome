import axios from "axios";
import { useEffect, useState } from "react";
import { loginEmailState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";

const ProductLike = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [productLike, setProductLike] = useState([]);
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);

  useEffect(() => {
    axios
      .get(`${backServer}/member/product-like`)
      .then((res) => {
        console.log(res.data);
        setProductLike(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginEmail]);

  return (
    <div>
      <div>test</div>
    </div>
  );
};

export default ProductLike;
