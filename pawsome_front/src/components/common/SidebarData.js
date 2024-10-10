import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
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
        path: "/market/main/productList/0/all",
      },
      {
        title: "사료",
        path: "/market/main/productList/0/feed",
      },
      {
        title: "간식",
        path: "/market/main/productList/0/snack",
      },
      {
        title: "영양제",
        path: "/market/main/productList/0/nutrient",
      },
      {
        title: "식기용품",
        path: "/market/main/productList/0/tableware",
      },
      {
        title: "위생용품",
        path: "/market/main/productList/0/hygiene",
      },
      {
        title: "장난감",
        path: "/market/main/productList/0/toy",
      },
      {
        title: "패션",
        path: "/market/main/productList/0/fashion",
      },
      {
        title: "하우스",
        path: "/market/main/productList/0/house",
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
        title: "건강체크",
        path: "/service/healthTest",
      },
    ],
  },
  {
    title: "문의사항",
    path: "/inquiry/list",
    icons: <AiIcons.AiOutlineQuestionCircle />,
    cName: "nav-text",
    sub: [],
  },
];
