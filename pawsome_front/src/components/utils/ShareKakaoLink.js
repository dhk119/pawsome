import { useEffect } from "react";
import { IoIosSend } from "react-icons/io";
// kakao 기능 동작을 위해 넣어준다.
const { Kakao } = window;

export default () => {
  // 배포한 자신의 사이트
  const realUrl = "http://localhost:3000";
  // 로컬 주소 (localhost 3000 같은거)
  const resultUrl = window.location.href;

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
        title: "오늘의 디저트",
        description: "아메리카노, 빵, 케익",
        imageUrl:
          "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
        link: {
          mobileWebUrl: realUrl,
        },
      },
      buttons: [
        {
          title: "나도 테스트 하러가기",
          link: {
            mobileWebUrl: realUrl,
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
