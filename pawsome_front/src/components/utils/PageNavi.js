const PageNavi = (props) => {
  const pi = props.pi;
  const reqPage = props.reqPage;
  const setReqPage = props.setReqPage;
  const arr = new Array();
  arr.push(
    <li key="first-page">
      <span
        onClick={() => {
          setReqPage(1);
        }}
        className="material-icons page-item"
      >
        first_page
      </span>
    </li>
  );
  arr.push(
    <li key="prev-page">
      <span
        onClick={() => {
          if (reqPage !== 1) {
            setReqPage(reqPage - 1);
          }
        }}
        className="material-icons page-item"
      >
        navigate_before
      </span>
    </li>
  );
  let pageNo = pi.pageNo;
  for (let index = 0; index < pi.pageNaviSize; index++) {
    arr.push(
      <li key={"page-" + index} className="num">
        <span
          onClick={(e) => {
            setReqPage(Number(e.target.innerText));
          }}
          className={"page-item" + (pageNo === reqPage ? " active-page" : "")}
        >
          {pageNo}
        </span>
      </li>
    );
    pageNo++;
    if (pageNo > pi.totalPage) {
      break;
    }
  }
  arr.push(
    <li key="next-page">
      <span
        onClick={() => {
          if (reqPage !== pi.totalPage) {
            setReqPage(reqPage + 1);
          }
        }}
        className="material-icons page-item"
      >
        navigate_next
      </span>
    </li>
  );
  arr.push(
    <li key="last-page">
      <span
        onClick={() => {
          setReqPage(pi.totalPage);
        }}
        className="material-icons page-item"
      >
        last_page
      </span>
    </li>
  );
  return <ul className="pagination">{arr}</ul>;
};
export default PageNavi;
