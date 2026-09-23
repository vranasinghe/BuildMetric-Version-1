import { Link } from "react-router-dom";
import { useLanguage } from "../../../i18n/LanguageContext";

// Same look as the other page breadcrumbs, with a configurable title.
const PageBanner = ({ title, crumb }: { title: string; crumb: string }) => {
  const { tr } = useLanguage();
  return (
  <div
    className="breadcumb-wrapper"
    style={{ backgroundImage: "url('/assets/img/bg/breadcrumb-bg.png')" }}
  >
    <div
      className="section-animation-shape1-1 shape-mockup animation-infinite"
      style={{ backgroundImage: "url('/assets/img/shape/global-line-shape1.png')" }}
    ></div>
    <div className="container">
      <div className="breadcumb-content">
        <h1 className="breadcumb-title">{title}</h1>
        <ul className="breadcumb-menu">
          <li>
            <Link to="/">
              <i className="ri-home-4-fill"></i> {tr("HOME")}
            </Link>
          </li>
          <li className="active">{crumb}</li>
        </ul>
      </div>
    </div>
  </div>
  );
};

export default PageBanner;
