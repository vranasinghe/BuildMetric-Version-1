import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import HeaderOne from "../Common/Header/HeaderOne";
import FooterBuildMetric from "../Common/Footer/FooterBuildMetric";
import ScrollTopButton from "../Common/Scroll/Scroll";
import Wrapper from "../Common/Wrapper";
import BreadcumbNine from "../Service/BreadcumbNine/BreadcumbNine";
import ClientTwoSharedSection from "../Service/Client/Client";
import Contact from "../Service/Contact/Contact";
import { useContent } from "../../admin/ContentContext";
import { useLanguage } from "../../i18n/LanguageContext";

const ServiceDetails: React.FC = () => {
  const { tr } = useLanguage();
  const { content } = useContent();
  const servicesData = content.serviceDetailsList;
  const location = useLocation();
  const [activeAccordionKey, setActiveAccordionKey] = useState<string | null>("0");

  const params = new URLSearchParams(location.search);
  const tabParam = params.get("tab");
  const currentService =
    (tabParam && servicesData.find((item) => item.id === tabParam)) ||
    servicesData[0];

  useEffect(() => {
    setActiveAccordionKey("0");
  }, [tabParam]);

  return (
    <Wrapper>
      <div style={{ overflow: "hidden" }}>
        <HeaderOne />
        <BreadcumbNine />

        <div className="why-area-3 space-top space-bottom" id="service-sec" style={{ overflow: "visible" }}>
          <div
            className="why-sec-bg3-1"
            style={{
              backgroundImage: "url('/assets/img/bg/why-bg3-1.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "top left",
            }}
          ></div>
          <div className="container">

            {/* Back link */}
            <div className="row" style={{ marginBottom: "24px" }}>
              <div className="col-12">
                <Link
                  to="/service"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#001F5B",
                    fontWeight: 700,
                    fontSize: "13px",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    textDecoration: "none",
                    borderBottom: "2px solid #001F5B",
                    paddingBottom: "2px",
                  }}
                >
                  <i className="ri-arrow-left-line"></i>{" "}{tr("Back to All Services")}
                </Link>
              </div>
            </div>

            {/* Section title */}
            <div className="row justify-content-center">
              <div className="col-lg-8 why-three-extra">
                <div className="title-area text-center" style={{ marginBottom: "40px" }}>
                  <span className="sub-title text-theme">
                    {tr("What we do")}{" "}<i className="ri-arrow-right-down-line"></i>
                  </span>
                  <h2 className="homeThree-custom-titleOne">
                    {currentService.serviceTitle}
                  </h2>
                </div>
              </div>
            </div>

            {/* 3-column layout */}
            <div className="row gy-40 gx-30 align-items-start">

              {/* LEFT: Number badge + About + Other Services */}
              <div className="col-xl-4 col-lg-4">

                {/* Navy number + title badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "24px",
                    padding: "18px 24px",
                    backgroundColor: "#001F5B",
                    color: "#fff",
                  }}
                >
                  <span
                    className="service-badge-num"
                    style={{
                      fontSize: "52px",
                      fontWeight: 900,
                      lineHeight: 1,
                      opacity: 0.25,
                    }}
                  >
                    {currentService.num}
                  </span>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.4px",
                      fontFamily: "var(--title-font)",
                      lineHeight: "1.3",
                    }}
                  >
                    {currentService.serviceTitle}
                  </span>
                </div>

                {/* About this Service */}
                <div
                  className="about-service-bottom-box"
                  style={{
                    padding: "24px 26px",
                    backgroundColor: "#ffffff",
                    borderLeft: "4px solid #001F5B",
                    boxShadow: "0px 6px 20px rgba(0,0,0,0.05)",
                    borderRadius: "0px",
                    marginBottom: "28px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: "#FF6600",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginBottom: "8px",
                    }}
                  >
                    <img src="/assets/img/icon/section-subtitle-icon.svg" alt="icon" style={{ width: "13px", height: "13px" }} />
                    {tr("About this Service")}
                  </span>
                  <h4
                    style={{
                      fontSize: "19px",
                      fontWeight: 700,
                      color: "#001F5B",
                      marginBottom: "12px",
                      fontFamily: "var(--title-font)",
                      lineHeight: "1.3",
                    }}
                  >
                    {currentService.serviceTitle}
                  </h4>
                  <p style={{ fontSize: "14px", lineHeight: "1.65", color: "#555555", margin: 0 }}>
                    {currentService.desc}
                  </p>
                </div>
              </div>



              {/* MIDDLE: Service image */}
              <div className="col-xl-4 col-lg-4">
                <div className="why-thumb-wrap3-1" style={{ position: "sticky", top: "100px", margin: "0 auto", maxWidth: "380px" }}>
                  <div className="why-tab-thumb" style={{ borderRadius: "0px", overflow: "hidden" }}>
                    <img
                      src={currentService.thumb}
                      alt={currentService.serviceTitle}
                      style={{ width: "100%", height: "460px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="why-text-wrap">
                    <h4 className="title">{tr("Service")}</h4>
                    <hr className="line" />
                    <div className="number">{currentService.num}</div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Key Scope accordion */}
              <div className="col-xl-4 col-lg-4">
                <div className="why-content-wrap">
                  <div style={{ marginBottom: "20px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        color: "#001F5B",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <img src="/assets/img/icon/section-subtitle-icon.svg" alt="icon" style={{ width: "14px", height: "14px" }} />
                      {tr("Key Scope & Subsections")}
                    </span>
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "#15161c",
                        marginTop: "6px",
                        fontFamily: "var(--title-font)",
                        lineHeight: "1.3",
                      }}
                    >
                      {tr("Scope & Deliverables")}
                    </h3>
                  </div>

                  <div id="serviceFaqAccordion" className="service-faq-accordion">
                    <Accordion
                      activeKey={activeAccordionKey}
                      onSelect={(k) => setActiveAccordionKey(k as string | null)}
                      className="accordion-area homeTwo-custom-accordion-card"
                    >
                      {currentService.subsections.map((sub, idx) => (
                        <Accordion.Item
                          key={idx}
                          eventKey={String(idx)}
                          className="accordion-card"
                          style={{ borderRadius: "0px", marginBottom: "10px" }}
                        >
                          <Accordion.Header>
                            {sub.name.toUpperCase()}
                          </Accordion.Header>
                          <Accordion.Body>
                            <p className="faq-text" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                              {sub.detail}
                            </p>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  </div>

                  <div className="btn-group mt-30">
                    <Link to="/contact" className="btn style3" style={{ borderRadius: "0px" }}>
                      {tr("Request a Consultation")}{" "}<i className="ri-arrow-right-up-line"></i>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <ClientTwoSharedSection />
        <Contact />

        <FooterBuildMetric />
        <ScrollTopButton />
      </div>
    </Wrapper>
  );
};

export default ServiceDetails;
