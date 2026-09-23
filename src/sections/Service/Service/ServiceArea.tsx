import { Link } from "react-router-dom";
import { useContent } from "../../../admin/ContentContext";
import { useLanguage } from "../../../i18n/LanguageContext";

const ServiceArea = () => {
    const { tr } = useLanguage();
    const { content } = useContent();
    const servicesPage = content.servicesPage;
    const servicesData = servicesPage.services;

    return (
        <div className="service-area-4 space-top space-bottom">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-8">
                        <div className="title-area text-center mb-50">
                            <span className="sub-title"><img src="/assets/img/icon/section-subtitle-icon.svg" alt="img" /> {servicesPage.subtitle}</span>
                            <h2 className="sec-title">{servicesPage.title}</h2>
                            <p className="sec-text">{servicesPage.description}</p>
                        </div>
                    </div>
                </div>
                <div className="row gy-40 gx-30">
                    {servicesData.map((service, index) => (
                        <div className="col-xl-4 col-md-6" key={index}>
                            <div className="service-card style3" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", marginBottom: "35px" }}>
                                <div className="service-card-shadow-text">
                                    {tr("SERVICES", "الخدمات")} - {service.num}
                                </div>
                                <div className="service-card_content" style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                                    <div className="service-card_icon">
                                        <img src={service.icon} alt="img" />
                                    </div>
                                    <h4 className="service-card_title" style={{ minHeight: "56px" }}>
                                        <Link to={`/service-details?tab=service-tab-${index + 1}`}>{service.title}</Link>
                                    </h4>
                                    <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 28px 0", flexGrow: 1 }}>
                                        {service.items.map((item, itemIdx) => (
                                            <li key={itemIdx} style={{ fontSize: "14px", color: "#666", marginBottom: "8px", display: "flex", alignItems: "flex-start", gap: "8px", lineHeight: "1.45" }}>
                                                <i className="ri-checkbox-circle-fill" style={{ color: "#263b82", fontSize: "15px", marginTop: "2px", flexShrink: 0 }}></i>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="btn-wrap" style={{ marginTop: "auto" }}>
                                        <div className="icon-btn"><i className="ri-arrow-right-up-line"></i></div>
                                        <Link to={`/service-details?tab=service-tab-${index + 1}`} className="btn">{tr("Explore Service")}{" "}<i className="ri-arrow-right-up-line"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceArea;