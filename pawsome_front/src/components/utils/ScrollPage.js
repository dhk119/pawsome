import { useEffect } from "react";

const ScrollPage = (props) => {
  const { pi, reqPage, setReqPage } = props;

  useEffect(() => {
    const handleScroll = () => {
      // 문서의 전체 높이
      const scrollHeight = document.documentElement.scrollHeight;
      // 현재 스크롤 위치 + 뷰포트 높이
      const scrollTop = window.innerHeight + document.documentElement.scrollTop;

      // 스크롤이 맨 아래에 도달했는지 확인
      if (scrollTop >= scrollHeight - 1) {
        console.log(reqPage);
        console.log(pi.totalPage);
        if (reqPage < pi.totalPage) {
          setReqPage(reqPage + 1);
        }
      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [reqPage, pi.totalPage, setReqPage]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};

export default ScrollPage;
