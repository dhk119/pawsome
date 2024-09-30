import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "다국어",
    path: "#",
    icons: <AiIcons.AiOutlineTranslation />,
    cName: "nav-text",
    sub: [
      {
        title: "",
        path: "",
      },
    ],
  },
  {
    title: "커뮤니티",
    path: "#",
    icons: <AiIcons.AiOutlineNotification />,
    cName: "nav-text",
    sub: [
      {
        title: "자유 게시판",
        path: "/board/list",
      },
      {
        title: "오산완",
        path: "#",
      },
    ],
  },
  {
    title: "마켓",
    path: "#",
    icons: <AiIcons.AiOutlineShopping />,
    cName: "nav-text",
    sub: [
      {
        title: "전체",
        path: "#",
      },
      {
        title: "사료",
        path: "#",
      },
      {
        title: "간식",
        path: "#",
      },
      {
        title: "영양제",
        path: "#",
      },
      {
        title: "식기용품",
        path: "#",
      },
      {
        title: "위생용품",
        path: "#",
      },
      {
        title: "장난감",
        path: "#",
      },
      {
        title: "패션",
        path: "#",
      },
      {
        title: "하우스",
        path: "#",
      },
    ],
  },
  {
    title: "서비스",
    path: "#",
    icons: <AiIcons.AiOutlineGlobal />,
    cName: "nav-text",
    sub: [
      {
        title: "전체",
        path: "/service/PetService",
      },
      {
        title: "반려동물 시설",
        path: "/service/allMap",
      },
      {
        title: "멍비티아이",
        path: "/service/mbti",
      },
      {
        title: "사료추천",
        path: "/service/feedSuggest",
      },
      {
        title: "칩 등록 조회",
        path: "/service/recordList",
      },
    ],
  },
];
