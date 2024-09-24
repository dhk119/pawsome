const InquiryFrm = (props) => {
  const inquiryTitle = props.inquiryTitle;
  const setInquiryTitle = props.setInquiryTitle;
  const inquiryType = props.inquiryType;
  const setInquiryType = props.setInquiryType;
  const loginEmail = props.loginEmail;
  return (
    <>
      <div>
        <div>
          <table className="admin-frm">
            <tbody>
              <tr>
                <th>
                  <label htmlFor="inquiryTitle">제목</label>
                </th>
                <td className="inquiry-tilte-td">
                  <div className="admin-input-item">
                    <input
                      type="text"
                      id="inquiryTitle"
                      name="inquiryTitle"
                      value={inquiryTitle}
                      onChange={setInquiryTitle}
                    ></input>
                  </div>
                </td>
              </tr>
              <tr>
                <th>작성자</th>
                <td>{loginEmail}</td>
              </tr>
              <tr>
                <th>
                  <div>타입</div>
                </th>
                <td className="admin-radio-td">
                  <label htmlFor="account">계정 관련</label>
                  <div className="input-item">
                    <input
                      type="radio"
                      id="account"
                      name="inquiryType"
                      value={1}
                      onChange={setInquiryType}
                    ></input>
                  </div>
                </td>
                <td className="admin-radio-td">
                  <label htmlFor="account">게시판 관련</label>
                  <div className="input-item">
                    <input
                      type="radio"
                      id="board"
                      name="inquiryType"
                      value={2}
                      onChange={setInquiryType}
                    ></input>
                  </div>
                </td>
                <td className="admin-radio-td">
                  <label htmlFor="else">기타</label>
                  <div className="input-item">
                    <input
                      type="radio"
                      id="else"
                      name="inquiryType"
                      value={3}
                      onChange={setInquiryType}
                    ></input>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default InquiryFrm;
