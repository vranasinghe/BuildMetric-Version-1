
import { useContent } from "../../../admin/ContentContext";
import { useLanguage } from "../../../i18n/LanguageContext";

const Process = () => {
    const { tr } = useLanguage();
    const { content } = useContent();
    const { benefitsSubtitle, benefitsTitle, benefitsThumb, benefitsList } = content.servicesPage;

    return (
        <section className="process-area-2 space overflow-hidden">
            <div className="container">
                <div className="row justify-content-between align-items-center gy-40">
                    <div className="col-lg-6">
                        <div className="title-area text-left content-text-extra-style">
                            <span className="sub-title"><img src="/assets/img/icon/section-subtitle-icon.svg" alt="img" />{benefitsSubtitle}</span>
                            <h2 className="sec-title">{benefitsTitle}</h2>
                        </div>
                        <div className="process-thumb2-1">
                            <img src={benefitsThumb || "/assets/img/normal/process-thumb2-1.png"} alt="img" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="process-grid-list style2">
                            <div className="process-grid-list-bg-text">
                                {tr("BENEFIT")}
                            </div>
                            {benefitsList.map((item, index) => (
                                <div className="process-grid" key={item.id || index}>
                                    <div className="process-grid-number">{item.number}</div>
                                    <div className="process-grid-details">
                                        <h3 className="process-grid-title">{item.title}</h3>
                                        <p className="process-grid-text">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Process;