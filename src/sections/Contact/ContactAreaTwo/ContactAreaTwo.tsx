import InquiryForm from "../../Common/InquiryForm/InquiryForm";
import { useLanguage } from "../../../i18n/LanguageContext";

 

const ContactAreaTwo = () => {
  const { tr } = useLanguage();
  return (
    <section className="contact-area-2 space-bottom overflow-hidden">
      <div className="container">
        <div
          className="contact-wrap2 space overflow-hidden shape-mockup-wrap background-image"
          style={{ backgroundImage: "url('/assets/img/bg/contact-bg3-1.png')" }}
        >
          <div
            className="section-animation-shape1-1 shape-mockup animation-infinite background-image"
            data-top="0"
            data-left="0"
            style={{
              backgroundImage: "url('/assets/img/shape/global-line-shape1.png')",
              top: '0px',
              left: '0px'
            }}
          ></div>
          <div className="row gy-60 justify-content-lg-end justify-content-center">
            <div className="col-xl-7">
              <div className="contact-form-wrap">
                <div className="title-area">
                  <span className="sub-title text-theme">
                    <img src="/assets/img/icon/section-subtitle-icon.svg" alt="img" />
                    {tr("Get Free Quote")}
                  </span>
                  <h2 className="sec-title">{tr("Have a project in mind?")}</h2>
                </div>
                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactAreaTwo;
