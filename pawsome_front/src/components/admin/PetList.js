import { useEffect, useState } from "react";
import PageNavi from "../utils/PageNavi";
import axios from "axios";

const PetList = () => {
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [petList, setPetList] = useState([]);
  useEffect(() => {
    axios.get(`${backServer}/admin/petList/${reqPage}`).then((res) => {
      setPetList(res.data.list);
      setPi(res.data.pi);
    });
  }, [reqPage]);
  return (
    <section>
      <div className="admin-title">펫 리스트</div>
      <table className="admin-tbl">
        <thead>
          <tr>
            <th>펫 번호</th>
            <th>이름</th>
            <th>종</th>
            <th>품종</th>
            <th>생년월일</th>
            <th>성별</th>
            <th>중성화 여부</th>
            <th>반려동물 프로필 사진</th>
            <th>몸무게</th>
            <th>멤버 이메일</th>
          </tr>
        </thead>
        <tbody id="admin-member-list-body">
          {petList.map((pet, i) => {
            return (
              <tr key={"pet" + i}>
                <td>{pet.petNo}</td>
                <td>{pet.petName}</td>
                <td>{pet.petClasses}</td>
                <td>{pet.petBreed}</td>
                <td>{pet.petBirth}</td>
                <td>{pet.petGender}</td>
                {pet.neutering === 1 ? <td>o</td> : <td>x</td>}
                <td>
                  <img
                    src={`${backServer}/member/pet/${pet.petProfile}`}
                    style={{ width: "100%", height: "100%" }}
                  ></img>
                </td>
                <td>{pet.petWeight}</td>
                <td>{pet.memberEmail}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pageNavi-frm">
        <ul className="pageNavi-ul">
          <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
        </ul>
      </div>
    </section>
  );
};
export default PetList;
