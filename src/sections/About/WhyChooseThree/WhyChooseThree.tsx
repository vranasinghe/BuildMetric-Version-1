import { useLanguage } from "../../../i18n/LanguageContext";
 
const WhyChooseThree = () => {
  const { tr } = useLanguage();
  return (
    <div className="space-top text-center overflow-hidden shape-mockup-wrap">
      <div className="container">
        <div className="title-area text-center">
          <div className="shadow-title">{tr("Why Choose Us")}</div>
          <span className="sub-title">
            <img src="/assets/img/icon/section-subtitle-icon.svg" alt="img" />
            {tr("Why Choose Us")}
          </span>
          <h2 className="sec-title">{tr("High Quality Innovate Design")}</h2>
        </div>
        <div className="row gy-50 align-items-center">
          <div className="col-xl-4 col-md-6">
            <div className="wcu-card-wrap left-align">
              <div className="wcu-card">
                <div className="wcu-card-icon">
                  <img src="/assets/img/icon/why-icon1-1.svg" alt="img" />
                </div>
                <div className="wcu-card-details">
                  <h4 className="wcu-card-title">{tr("Technology")}</h4>
                  <p className="wcu-card-text">
                    {tr("We are expert your all work is very nice waiting for next project.")}
                  </p>
                </div>
              </div>
              <div className="wcu-card">
                <div className="wcu-card-icon">
                  <img src="/assets/img/icon/why-icon1-2.svg" alt="img" />
                </div>
                <div className="wcu-card-details">
                  <h4 className="wcu-card-title">{tr("Core Planning")}</h4>
                  <p className="wcu-card-text">
                    {tr("All the Lorem Ipsum generators on the Internet tend to repeat predefined")}
                  </p>
                </div>
              </div>
              <div className="wcu-card">
                <div className="wcu-card-icon">
                  <img src="/assets/img/icon/why-icon1-3.svg" alt="img" />
                </div>
                <div className="wcu-card-details">
                  <h4 className="wcu-card-title">{tr("Project Result")}</h4>
                  <p className="wcu-card-text">
                    {tr("Making this the first true generator on the Internet uses a dictionary")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 order-xl-3">
            <div className="wcu-card-wrap right-align">
              <div className="wcu-card">
                <div className="wcu-card-icon">
                  <img src="/assets/img/icon/why-icon1-4.svg" alt="img" />
                </div>
                <div className="wcu-card-details">
                  <h4 className="wcu-card-title">{tr("Trusted Clients")}</h4>
                  <p className="wcu-card-text">
                    {tr("Passage of Lorem Ipsum, you need to be sure there isn't anything")}
                  </p>
                </div>
              </div>
              <div className="wcu-card">
                <div className="wcu-card-icon">
                  <img src="/assets/img/icon/why-icon1-5.svg" alt="img" />
                </div>
                <div className="wcu-card-details">
                  <h4 className="wcu-card-title">{tr("Skilled Team")}</h4>
                  <p className="wcu-card-text">
                    {tr("We are expert your all work is very nice waiting for next project.")}
                  </p>
                </div>
              </div>
              <div className="wcu-card">
                <div className="wcu-card-icon">
                  <img src="/assets/img/icon/why-icon1-6.svg" alt="img" />
                </div>
                <div className="wcu-card-details">
                  <h4 className="wcu-card-title">{tr("Save Money")}</h4>
                  <p className="wcu-card-text">
                    {tr("We are expert your all work is very nice waiting for next project.")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="wcu-thumb1-1">
              <img src="/assets/img/normal/why_1-1.png" alt="img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseThree;
