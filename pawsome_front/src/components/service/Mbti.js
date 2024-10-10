import { Link } from "react-router-dom";
import { useState } from "react";
import html2canvas from "html2canvas";
const Mbti = () => {
  const [qNumber, setPage] = useState(-1); // 초기값 -1로 설정
  const [results, setResults] = useState([
    { name: "I", count: 0 }, //내향
    { name: "E", count: 0 }, //외향
    { name: "C", count: 0 }, //교감
    { name: "W", count: 0 }, //본능
    { name: "N", count: 0 }, //필요
    { name: "T", count: 0 }, //신뢰
    { name: "L", count: 0 }, //정착
    { name: "A", count: 0 }, //모험
  ]);

  const questions = [
    {
      question: "1. 오랜만에 산책을 나가려 한다. 어디로 갈까?",
      options: [
        { type: "E", text: "친구가 기다리고 있는 사람많은 공원" },
        { type: "I", text: "여유롭고 한산하며 혼자 즐길 수 있는 공원" },
      ],
    },
    {
      question:
        "2. 공원으로 가는 도중, 모르는 친구가 와서 반갑다며 인사를 한다. 어떻게 할까?",
      options: [
        { type: "E", text: "나도 반갑게 인사한다" },
        { type: "I", text: "누군지를 먼저 알아본다(경계)" },
      ],
    },
    {
      question: "3. 가고 있는데 친구들이 모여 놀고 있다! 나는 어떻게 할까?",
      options: [
        { type: "E", text: "같이 놀자며 달려간다" },
        { type: "I", text: "그냥 놀고있는 모습을 구경한다" },
      ],
    },
    {
      question: "4. 또 가고 있었는데 갈림길이 나왔다! 나는 어떤 길로 갈까?",
      options: [
        { type: "L", text: "혹시 몰라! 매일 매일 가던 왼쪽길!" },
        { type: "A", text: "오늘은 특별하게 가야지! 오른쪽으로 가자!" },
      ],
    },
    {
      question:
        "5. 갈림길을 넘었는데, 누군가가 길을 물어본다. 뭐라고 설명해줄까?",
      options: [
        {
          type: "C",
          text: "왼쪽길로 가시면 도서관이 나오는데 거기에서 오른쪽으로 가면 있어요! 라고 구체적으로 설명한다",
        },
        {
          type: "W",
          text: "저기 큰 도로 옆으로 쭉가세요! 라고 단순하게 큰길로 설명한다",
        },
      ],
    },
    {
      question: "6. 공원에 도착했다! 나에게는?",
      options: [
        {
          type: "W",
          text: "공원에 왔다! 라는게 중요함",
        },
        {
          type: "C",
          text: "공원에 오는 과정이 중요함",
        },
      ],
    },
    {
      question:
        "7. 공원에서 쉬는 중, 어떤 친구가 짜증이 난다며 투덜투덜대며 나에게 다가온다.",
      options: [
        {
          type: "C",
          text: "'속상해? 기분풀어~~'라고 먼저 격려해준다",
        },
        {
          type: "W",
          text: "무슨일인지 먼저 물어본다",
        },
      ],
    },
    {
      question:
        "8. 덕분에 친구의 마음이 풀렸다. 근데 벌써 집에 갈 시간이다. 친구와 다음에 만나기로 약속하며",
      options: [
        {
          type: "T",
          text: "언제쯤에 만날까? 시간은? 어디서?",
        },
        {
          type: "N",
          text: "그냥 일단 둘 다 시간날때만나자~",
        },
      ],
    },
    {
      question: "9. 집에 돌아가는길.. 못보던 길이 나왔다",
      options: [
        {
          type: "L",
          text: "피곤하니 나중에 가보자.. 그냥 가던길로 간다",
        },
        {
          type: "A",
          text: "오! 재밌겠다~ 바로 못보던 길로 달려간다",
        },
      ],
    },
    {
      question: "10. 집에 도착하니 오랜만에 못보던 주인의 친구가 있다",
      options: [
        {
          type: "N",
          text: "피곤해...대충 인사한다",
        },
        {
          type: "T",
          text: "반가워!! 같이 놀자고 달려간다",
        },
      ],
    },
    {
      question: "11. 놀다보니 잘 시간이 되었다",
      options: [
        {
          type: "T",
          text: "잠은 주인이랑 자야지! 주인곁에서 같이잔다",
        },
        {
          type: "N",
          text: "아 피곤해.. 혼자 자야지..자기만의 공간을 찾는다",
        },
      ],
    },
    {
      question: "12. 자기전 내일은 뭐 할지 생각해본다",
      options: [
        {
          type: "L",
          text: "오늘 신나게 놀았으니 당분간은 쉬어야겠다..",
        },
        {
          type: "A",
          text: "오늘 너무 재밌었어! 매일매일 놀러가고싶다!",
        },
      ],
    },
    {
      question: "테스트가 완료되었습니다!",
      options: [{ text: "[ 결과보러가기 ]" }],
    },
    // 추가 질문 작성
  ];
  const [showResults, setShowResults] = useState(false); // 결과 화면 표시 여부

  const answerClick = (type) => {
    setResults((prev) => {
      return prev.map((item) => {
        if (item.name === type) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
    });
    nextQuestion();
  };

  const nextQuestion = () => {
    if (qNumber < questions.length - 1) {
      setPage(qNumber + 1);
    } else {
      setShowResults(true); // 결과 화면 표시
      console.log("결과:", results);
    }
  };

  const renderResults = () => {
    const result = setMbti();
    const matchedContent = mc.find((element) => element.mbti === result);
    const contentArray = matchedContent
      ? matchedContent.contents
      : ["내용 없음"];
    const image = matchedContent ? matchedContent.image : null;
    let content = "";
    mc.forEach((element) => {
      if (element.mbti === result) {
        content = element.contents;
      }
    });
    console.log(contentArray);
    // 결과를 계산하여 표시하는 로직
    return (
      <>
        <div className="results">
          <div id="results">
            <h1>- 테스트 결과 -</h1>
            {image && (
              <img
                src={image}
                alt={`${result} 이미지`}
                style={{ width: "600px" }}
              />
            )}

            <div
              style={{
                borderRadius: "20px",
                border: "10px solid #FFD697",
                color: "black",
              }}
            >
              <p style={{ fontWeight: "bolder", fontSize: "25px" }}>
                반려견의 DBTI는? : {result}
              </p>
              <br></br>
              <p style={{ fontWeight: "bolder", fontSize: "25px" }}>
                {contentArray[0]}
              </p>
            </div>
            <br></br>
            <div
              style={{
                borderRadius: "15px",
                border: "5px solid #FFD697",
                color: "black",
                fontWeight: "bolder",
                fontSize: "18px",
                float: "left",
              }}
            >
              <p>{contentArray[1]}</p>
              <p>{contentArray[2]}</p>
              <p>{contentArray[3]}</p>
            </div>
            <img
              src="/image/service/MBTI/dbti-graph.png"
              style={{ width: "600px" }}
            ></img>
          </div>

          <button className="ps-btn1" onClick={onClickDownloadButton}>
            사진으로 저장하기
          </button>
        </div>
      </>
    );
  };
  const onClickDownloadButton = () => {
    const target = document.getElementById("results");
    if (!target) {
      return alert("사진 저장에 실패했습니다.");
    }
    html2canvas(target).then((canvas) => {
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.href = canvas.toDataURL("image/png");
      link.download = "dbti.png"; // 다운로드 이미지 파일 이름
      link.click();
      document.body.removeChild(link);
    });
  };
  const mc = [
    {
      mbti: "WTIL",
      contents: [
        "엄마 껌딱지 겁쟁이",
        "마당개나 번식장 등의 열악한 환경에서 구조돼 사회화 교육이 부족했을 가능성이 큽니다. 어미견의 양육태도나 강아지의 선천적 기질때문일 수도 있어요, ",
        "소심하다고 실망할 필요는 없어요 겁쟁이지만 보호자와의 신뢰 관계는 높아서 긍정적인 경험을 통해 환경에 빨리 익숙해질 수 있도록 노력하면 사회성이 훨씬 좋아질 수 있어요.",
      ],
      image: "/image/service/MBTI/WTIL.png",
    },
    {
      mbti: "WTIA",
      contents: [
        "조심스러운 관찰견",
        "'돌다리도 두들겨 보고 건너는 스타일'로 자기 자신의 안전이 제일인 친구입니다. 주변 환경이나 대상을 비교적 빠르게 파악하고 '안전하다'고 판단되면 제법 활동적인 모습을 보여요, ",
        "처음 본 친구가 갑자기 적극적으로 다가오면 다소 경계할 수 있습니다. 많은 친구보단 마음에 드는 친구 몇몇과 편하게 지내고 싶어해요.",
        "다양한 경험을 단계적으로 할 수 있게 하는것을 추천해드려요, 미용이나 목욕 등 강아지가 싫어하지만 꼭 해야하는 것들은 억지로 하지 말고 보상을 통해 좋은 기억부터 만들어주세요",
      ],
      image: "/image/service/MBTI/WTIA.png",
    },
    {
      mbti: "WTEL",
      contents: [
        "초면엔 신중, 구면엔 친구",
        "처음엔 경계하다가 밥을 계속 챙겨주면 마음을 여는 강아지를 떠올리면 돼요. 보호자 옆에 차분하게 머무는 편으로 정적인 보호자님과 궁합이 잘 맞습니다.",
        "보호자에게 의존도가 높은 WTEL 성향의 아이는 낯선 대상에 대한 경험을 자주 겪게하며 보호자 외의 대상에 경계할 필요가 없다는 것을 지속적으로 알려주시는 것이 좋습니다.",
        "자신의 상태를 알리는 표현력이 부족하기 때문에 보호자님께서 항상 예의주시할 필요가 있습니다.",
      ],
      image: "/image/service/MBTI/WTEL.png",
    },
    {
      mbti: "WTEA",
      contents: [
        "허세부리는 호기심쟁이",
        "WTEA 친구들은 자신의 힘을 과시하려고 하기 때문에 자기 영역에서는 짖고, 흥분하면 다른 강아지에게 달려들 수 있어요. 바깥에선 성급히 목줄을 풀기보단 산책하듯 함께 걸으며 아이의 반응을 살펴보고 불필요하다면 접촉을 삼가해 주시는게 좋습니다",
        "WTEA 아이들에겐 '포인트 훈련'과 '기다려'훈련을 추천해요. 집에 손님이 오거나 밖에서 소리가 났을때 방석 위에 올라가 차분히 기다릴 수 있도록 해주세요.",
        "소유욕과 우위성을 줄여주는 것이 필요해요. 물건에 대한 집착을 보이면 다른 물건이나 간식으로 물물교환 하듯 빼앗아 주시고, 장난감을 정리정돈 해주세요.",
      ],
      image: "/image/service/MBTI/WTEA.png",
    },
    {
      mbti: "WNEL",
      contents: [
        "까칠한 지킬앤 하이드",
        "WNEL은 낯선 장소, 낯선 사람을 마주하면 예민해지기 때문에 돌발행동을 할 수 있어요. 이를 예방하기 위해 언제든 '엎드려(복종 훈련)'할 수 있도록 '기다려'교육도 같이 해주세요. 익숙한 장소에서 하는것이 아이의 집중력을 높일 수 있습니다!",
        "물건, 음식 등 소유욕에 의한 공격성이 높아지면 보호자조차 컨트롤할 수 없으니 이런 징후가 보이면 전문가의 도움을 받아야 해요!",
        "호불호가 강하고 고집이 센데 낯선 사람의 손길을 싫어하기 때문에 충분히 친해진 후에 교육을 해줘야 아이가 잘 따를 수 있습니다.",
      ],
      image: "/image/service/MBTI/WNEL.png",
    },
    {
      mbti: "WNIA",
      contents: [
        "선긋는 외톨이 야생견",
        "혼자 편하게 잘있다가도 간식이나 산책 등 원하는 것이나 필요한 것이 생기면 애교를 부리는 아이들입니다. 외출을 하게되면 자기가 가고싶은데로 가고 주인이 불러도 잘 오지 않아요.",
        "마음에 드는 친구들에겐 잘하지만, 모르는 강아지가 다가오면 회피하거나 짖고, 낯선 사람이 그냥 지나가면 신경쓰지않는데 자신에게 다가오면 흥분하면서 돌변해요.",
        "발 닦기, 빗질 등 싫어하는 행동을 하면 참지않고 바로 치아 자랑을 한답니다.. 꽤나 독립적인 성향의 WNIA라고 할 수 있어요.",
      ],
      image: "/image/service/MBTI/WTIA.png",
    },
    {
      mbti: "WNIL",
      contents: [
        "패닉에 빠진 극소심견",
        "WNIL 아이들은 학대받다가 구조된 아이들에게서 많이 보이는 성향입니다. 지금 있는곳 이외의 모든 상황에서는 극도의 불안감을 보일 수 있으니 적응력을 높여주겠다는 목적으로 낯선 곳에 데리고 다니면 안됩니다.",
        "사람과 환경에 대해 불신이 많기 때문에 우선 보호자와의 관계부터 형성해야 합니다. '옆에 그냥 앉아있기','간식주기','쓰다듬기','안아주기'등",
        "닫혀있던 마음이 어느정도 열리면 생활규칙을 조금씩 알려주세요. WNIL아이들은 적응하기까지 시간이 걸리지만 보호자에 대한 무한한 신뢰가 생긴다면 더욱 애틋한 관계로 발전될 수 있습니다.",
      ],
      image: "/image/service/MBTI/WNIL.png",
    },
    {
      mbti: "WNEA",
      contents: [
        "동네 대장 일진",
        "WNEA는 제일 센 성격이에요, 무리에서도 항상 주도적인 역할을 하려하고 엄마아빠도 내 마음대로 하려고 하죠, 산책시 갑자기 공격을 할 수 있기 때문에 입마개와 튼튼한 목줄은 필수!",
        "타인, 타견, 오토바이 트럭 등 반려견이 특히 흥분하는 대상을 보호자가 먼저 발견하고 '엎드려''기다려'를 시켜줄 수 있도록 해주세요.(흥분한뒤 하는것은 너무 늦어요!!)",
        "평소에 보호자는 '주도권훈련(복종훈련)'을 많이 해주셔야 해요. 교육시 손으로 주둥이를 잡거나 코를 때리면 절대 안돼요!! 손에 대해 안좋은 기억이 남아 물 수 있어요..",
      ],
      image: "/image/service/MBTI/WNEA.png",
    },
    {
      mbti: "CTEL",
      contents: [
        "신이 내린 반려특화견 ",
        "CTEL 친구들은 아낌없이 주는 나무같은 존재입니다. 새로운 환경에 대한 두려움이 없고 사람이나 강아지에 대해 공감능력이 뛰어나 매개 치료견, 헬퍼독으로도 적합합니다.",
        "누군가 스트레스를 주거나 아파도 표현하지 않고 참기 때문에 아이가 힘들지 않도록 보호자의 세심한 관찰이 필요합니다. 아이가 갑자기 하지않던 대소변 실수를 한다면 스트레스를 많이 받은것일 수 있어요.",
        "우리 강아지의 성격이 좋다고 섣불리 다른사람이나 강아지에게 인사시키다가 공격적인 사람이나 강아지에게 상처 받으면 트라우마가 생길 수 있으니 조심해주세요! 아이가 스트레스 받지 않도록 꾸준한 산책과 놀이를 해주며 반려견의 성향을 잘 유지시켜 주세요!",
      ],
      image: "/image/service/MBTI/CTEL.png",
    },
    {
      mbti: "CTEA",
      contents: [
        "인간사회 적응 만렙",
        "CTEA아이들은 보호자에 대한 무조건적인 신뢰가 형성돼 있어요. 그만큼 보호자님이 아이와 시간도 많이보내고 교감도 잘했다는 의미이기도 하죠^^ 보호자와 교감을 잘하고 집중력이 높아서 어떤 훈련이든 잘 해낼 수 있습니다.",
        "다만 너무 오래 훈련하면 아이가 지루함을 느낄 수 있기 때문에 짧게 여러번 하는 것이 습득하는데 훨씬 좋습니다. 넘치는 에너지로 산책을 하다 영역 주장이 강한 친구를 만나면 싸움이 생길 수 있어요. 평소 '기다려' 훈련을 많이 해주면 흥분도를 낮추는 데 도움이 됩니다.",
        "무기력함이 생기지 않도록 매일 1~2시간의 산책은 필수! 부족한 활동량은 노즈워크, 터그 놀이 등으로 해소해주고, 새로운 개인기를 알려주는 것도 좋습니다!",
      ],
      image: "/image/service/MBTI/CTEA.png",
    },
    {
      mbti: "CTIA",
      contents: [
        "가족빼곤 다 싫어",
        "CTIA는 다른 사람이나 친구들보다 보호자와 함께 하는걸 가장 좋아하는 아이에요. 보호자와 교감을 잘하고 학습능력이 뛰어나 교육을 해주면 잘 따라올 수 있어요.",
        "지배적인 성향도 있기 때문에 적극적인 강아지나 사람이 다가오면 트러블이 생길 수 있으니 주의해 주세요. 어린 자녀와 단둘이 두는것도 피해주세요",
        "CTIA 아이에게는 '힐 트레이닝'교육을 해주세요 보호자의 눈을 맞추고 옆에서 나란히 걷게 하는것으로 보호자 보다 앞서 걷게 하지 않는 것이 중요합니다. 산책 시 잘 흥분하는 강아지에게 적합한 훈련이에요",
      ],
      image: "/image/service/MBTI/CTIA.png",
    },
    {
      mbti: "CTIL",
      contents: [
        "모범견계의 엄친아",
        "CTIL 아이들은 보호자와 함께하는 모든것을 좋아하고 믿고 따라요. 성격이 차분하여 다른 강아지와 트러블을 일으킬 가능성도 거의 없어요. 착한만큼 상처도 쉽게 받을 수 있기 때문에 보호자가 잘 지켜줘야 해요.",
        "보호자에 대한 애착이 지나치면 분리불안이 생길 수 있어요. 보호자를 보고 짖거나 안아달라는 등의 요구성 행동을 하면 단호하게 거절하고, 규칙을 세워 지속적인 훈련을 해주세요",
        "CTIL 아이들에게는 단시간 '앉아', 장시간은 '엎드려'훈련이 꼭 필요합니다. 잘 앉아서 기다리면 앞으로 와서 간식으로 보상해주고 뒤로 물러나는 거리를 늘리며 훈련을 자주 진행해주세요.",
      ],
      image: "/image/service/MBTI/CTIL.png",
    },
    {
      mbti: "CNEA",
      contents: [
        "허당끼 가득한 핵인싸",
        "CNEA아이들은 외부 자극에 대한 호기심이 많기 때문에 평소 '콜백 훈련'과 '집중력 강화 훈련'을 열심히 해주셔야 합니다. 넘치는 에너지를 소비해주지 않으면 집안 물건을 물어뜯는 등 파괴적인 행동을 보일 수 있어요",
        "매일 산책과 운동을 병행해주는 것을 물론 부족한 부분은 노즈워크, 터그놀이를 통해 채워 주셔야 합니다!",
        "'콜백 훈련'이 잘 되어 있지 않다면 오프리쉬는 위험해요. 사람이나 다른 친구들을 워낙 좋아해서 적극적으로 먼저 다가가는데 상대 강아지나 사람이 놀랄 수 있으니 주의해야해요.",
      ],
      image: "/image/service/MBTI/CNEA.png",
    },
    {
      mbti: "CNEL",
      contents: [
        "곱게자란 막내딸",
        "CNEL아이들은 성격이 차분하고 온순해서 사회성이 낮거나 트라우마 있는 친구들의 헬퍼독 역할을 해줄 수 있어요. 하지만 과잉보호하면 떼쓰는 아이처럼 버릇이 없어질 수도 있어요..",
        "잘했을 때 안아주고 안되는건 안돼라는 규칙을 세워주는 것이 서로의 행복을 위해 꼭 필요해요! 단, 너무 강압적인 보호자의 태도는 강아지가 내성적인 성향으로 바뀔 수 있으니 주의!",
        "강아지가 짖을때 그 순간 조용히 시키기 위해서 간식을 주거나 소리를 지르면 안돼요! 짖을때는 아무 반응을 하지 말고 짖지 않을 때(잘했을 때) 칭찬과 보상을 해주세요.",
      ],
      image: "/image/service/MBTI/CNEL.png",
    },
    {
      mbti: "CNIL",
      contents: [
        "치고 빠지고 밀당 천재",
        "CNIL 성향의 강아지는 혼자서도 잘 지내고 어떻게 하면 보호자에게 원하는 것을 얻을 수 있는지 잘 아는 '냥멍이'스타일 입니다. 다른 강아지들과 억지로 같이 놀게 하면 오히려 역 효과가 날 수 있으니 불편해하면 함께 자리를 옮겨 주세요",
        "CNIL 강아지에겐 보호자와 교감을 위한 '플레이 트레이닝'을 추천해 드려요. 혼자 노는게 마냥 좋지 않기 때문에 보호자와 놀면서 즐거운 추억을 많이 만들어 주세요. 터그놀이, 벨놀이 등을 추천드립니다!",
        "또 CNIL 아이들은 친구가 싫어하는 행동을 해도 겉으로 표현하지 않기 때문에 평소 '리콜교육'(이름을 부르면 오게하는)을 통해 부르면 올 수 있도록 교육해 주는 것이 좋습니다.",
      ],
      image: "/image/service/MBTI/CNIL.png",
    },
    {
      mbti: "CNIA",
      contents: [
        "주위 관심없는 나 혼자 산다",
        "CNIA 성향의 친구들은 새로운 환경에서 혼자 노는걸 좋아해요. 평소 다른 강아지들에게 문제를 일으키지 않지만 자신에게 시비거는 친구가 있으면 바로 대응하기 때문에 이럴경우 보호자의 컨트롤이 어려울 수 있어요.",
        "CNIA 친구들에겐 독립성으로 인한 문제점을 보완할 수 있는 '플레이 트레이닝'을 추천해드려요.*마냥 혼자 노는 것은 좋지 않아요..*",
        "평소 꾸준한 '리콜 교육'을 통해 강아지가 불편한 상황인 것 같으면 미리 자리를 피할 수 있도록 불러서 보호자에게 올 수 있도록 해주세요!",
      ],
      image: "/image/service/MBTI/CNIA.png",
    },
  ];
  function setMbti() {
    let WorC = //data : result(mbti문제푼결과)를 대표하는 변수
      results.find((data) => data.name === "W").count >
      results.find((data) => data.name === "C").count
        ? "W"
        : "C";

    let NorT =
      results.find((data) => data.name === "N").count >
      results.find((data) => data.name === "T").count
        ? "N"
        : "T";

    let IorE =
      results.find((data) => data.name === "I").count >
      results.find((data) => data.name === "E").count
        ? "I"
        : "E";

    let LorA =
      results.find((data) => data.name === "L").count >
      results.find((data) => data.name === "A").count
        ? "L"
        : "A";
    let mbti = WorC + NorT + IorE + LorA;
    /* setMbtiContents([mc.filter((val) => val.mbti === mbti)[0]]);*/

    return mbti;
  }
  return (
    <>
      <nav className="nav-box">
        <ul>
          <li className="nav-btn">
            <Link to="/service/allMap">반려동물 시설 검색</Link>
          </li>
          <li className="nav-btn">
            <Link to="/service/mbti">멍BTI</Link>
          </li>
          <li className="nav-btn">
            <Link to="/service/healthTest">건강체크</Link>
          </li>
        </ul>
      </nav>
      <div className="mbti-container">
        <div className="dog-mbti">
          <h2
            style={{ margin: "20px", fontWeight: "bolder", fontSize: "35px" }}
          >
            12문제로 알아보는 나의 강아지 유형 MBTI는?
          </h2>
          {qNumber === -1 ? ( // 초기 상태에서 시작 버튼 보여주기 (0이되면 1번 문제 시작)
            <div className="test-main" style={{ position: "relative" }}>
              <img
                src="/image/service/mbti-main.jpg"
                style={{ width: "600px", position: "relative" }}
              />
              <span className="start-btn" onClick={() => setPage(0)}>
                테스트 시작하기
              </span>
            </div>
          ) : showResults ? ( // 결과 화면 표시
            renderResults()
          ) : (
            <div className="qna-box" style={{ margin: "20px" }}>
              <img src="/image/service/siba.png" style={{ width: "500px" }} />
              <div className="question">{questions[qNumber].question}</div>
              {questions[qNumber].options.map((option, index) => (
                <div
                  key={index}
                  className="answer-box"
                  onClick={() => answerClick(option.type)}
                  style={{ margin: "20px" }}
                >
                  {option.text}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Mbti;
