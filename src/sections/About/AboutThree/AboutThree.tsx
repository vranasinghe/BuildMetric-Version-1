import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { useContent } from "../../../admin/ContentContext";
import { useLanguage } from "../../../i18n/LanguageContext";

const AboutThree = () => {
  const { tr } = useLanguage();
  const { content } = useContent();
  const about = content.aboutPage;

  return (
    <div className="about-area-2 space-top overflow-hidden">
      <div className="container">
        <div className="row gx-60 align-items-center flex-row-reverse">
          <div className="col-xl-6">
            <div className="about-thumb2 mb-60 mb-xl-0">
              <div className="about-img-1">
                <img src={about.mainImage || "/assets/img/normal/about_2-1.png"} alt="img" />
              </div>
              <div className="about-counter-wrap style2 jump-reverse">
                <div className="about-counter-wrap-bg">
                  <img src="/assets/img/normal/about_shape_2-2.png" alt="img" />
                </div>
                <div className="about-counter-icon">
                  <img
                    src="/assets/img/hero/hero_experience_wrap_icon_1_1.png"
                    alt="img"
                  />
                </div>
                <h3 className="about-counter-number">
                  <span className="counter-number"><CountUp start={0} end={about.experienceYears} /></span>+
                </h3>
                <p className="about-counter-text">{about.experienceLabel}</p>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="title-area mb-25">
              <span className="sub-title">
                <img src="/assets/img/icon/section-subtitle-icon.svg" alt="img" />
                {about.subtitle}
              </span>
              <h2 className="sec-title">
                {about.title}
              </h2>
              <p className="sec-text">
                {about.desc1}
              </p>
              <p className="sec-text mt-15">
                {about.desc2}
              </p>
            </div>
            <div className="checklist mb-35">
              <ul>
                {about.checklist.map((item, idx) => (
                  <li key={idx}>
                    <img src="/assets/img/icon/about-checklsit-icon1-1.svg" alt="img" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="about-grid-wrap">
              <div className="icon">
                <img src="/assets/img/icon/about-grid-icon1-1.svg" alt="img" />
              </div>
              <div className="about-grid-details">
                <h4 className="title">{tr("Our Mission")}</h4>
                <p className="text">
                  {tr("We craft unique digital experiences. With more years of expertise we design")}
                </p>
              </div>
            </div>
            <div className="about-grid-wrap">
              <div className="icon">
                <img src="/assets/img/icon/about-grid-icon1-2.svg" alt="img" />
              </div>
              <div className="about-grid-details">
                <h4 className="title">{tr("Our Vision")}</h4>
                <p className="text">
                  {tr("We craft unique digital experiences. With more years of expertise we design")}
                </p>
              </div>
            </div>
            <div className="btn-group mt-60">
              <Link to="/about" className="btn style3">
                {tr("Explore Our Company")}{" "}<i className="ri-arrow-right-up-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutThree;
