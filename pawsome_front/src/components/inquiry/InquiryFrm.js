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
          <table className="tbl">
            <tbody>
              <tr>
                <th>
                  <label htmlFor="inquiryTitle">제목</label>
                </th>
                <td>
                  <div className="input-item">
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
                <th>
                  <label htmlFor="account">계정관련</label>
                  <div className="input-item">
                    <input
                      type="radio"
                      id="account"
                      name="inquiryType"
                      value={1}
                      onChange={setInquiryType}
                    ></input>
                  </div>
                </th>
                <th>
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
                </th>
                <th>
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
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default InquiryFrm;
