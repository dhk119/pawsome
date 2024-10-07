import { useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import * as DOMPurify from "dompurify";
// kakao 기능 동작을 위해 넣어준다.
const { Kakao } = window;

export default (props) => {
  const board = props.board;
  // 배포한 자신의 사이트
  const realUrl = `http://192.168.10.16:3000/board/view/${board.boardNo}`;
  // 로컬 주소 (localhost 3000 같은거)
  const resultUrl = window.location.href;
  const cleanContent = DOMPurify.sanitize(String(board.boardContent));
  const strippedContent = cleanContent.replace(/<\/?p[^>]*>/g, ""); // 정규표현식으로 에디터 태그 없애기

  // 재랜더링시에 실행되게 해준다.
  useEffect(() => {
    // init 해주기 전에 clean up 을 해준다.
    Kakao.cleanup();
    // 자신의 js 키를 넣어준다.
    Kakao.init("0b28239c9a35cece0a60cf5dd3fd6c23");
    // 잘 적용되면 true 를 뱉는다.
    console.log(Kakao.isInitialized());
  }, []);

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: board.boardTitle,
        description: strippedContent,
        imageUrl: "https://ifh.cc/g/bD50pd.png",
        link: {
          mobileWebUrl: realUrl,
          webUrl: realUrl,
        },
      },
      buttons: [
        {
          title: "상세보기",
          link: {
            mobileWebUrl: realUrl,
            webUrl: realUrl,
          },
        },
      ],
    });
  };

  return (
    <>
      <button
        className="grey-btn"
        onClick={() => {
          shareKakao();
        }}
      >
        <IoIosSend />
        공유하기
      </button>
    </>
  );
};
