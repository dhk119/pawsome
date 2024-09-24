const MorePage = (props) => {
  const pi = props.pi;
  const reqPage = props.reqPage;
  const setReqPage = props.setReqPage;
  const arr = new Array();

  arr.push(
    <span
      onClick={() => {
        console.log(reqPage);
        console.log(pi.totalPage);
        if (reqPage !== pi.totalPage) {
          setReqPage(reqPage + 1);
        }
      }}
    >
      더보기
    </span>
  );
  return <div>{arr}</div>;
};

export default MorePage;
