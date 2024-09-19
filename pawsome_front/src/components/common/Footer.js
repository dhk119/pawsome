import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <ul>
          <li>
            <Link to="#">이용약관</Link>
          </li>
          <li>
            <Link to="#">제휴제안</Link>
          </li>
          <li>
            <Link to="#">개인정보처리방침</Link>
          </li>
          <li>
            <Link to="#">운영정책</Link>
          </li>
        </ul>
        <p>@ Pawsome Company</p>
      </div>
    </footer>
  );
};

export default Footer;
