const InquiryFrm = (props) => {
  const inquiryTitle = props.inquiryTitle;
  const setInquiryTitle = props.setInquiryTitle;
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
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default InquiryFrm;
