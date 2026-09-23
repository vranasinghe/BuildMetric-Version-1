 
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../i18n/LanguageContext";

const About = () => {
    const { tr } = useLanguage();
    const { ref: counterRef, inView: counterInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div className="about-area-1 space overflow-hidden shape-mockup-wrap" ref={counterRef} id="about-sec">
            
            <div
                className="about_shape_1-1 shape-mockup jump-reverse"
                data-bottom="0"
                data-right="0"
                style={{ bottom: '0px', right: '0px' }}
            >
                <img src="/assets/img/normal/about_shape_1-2.png" alt="img" />
            </div>
            <div className="container">
                <div className="row gx-60 align-items-center">
                    <div className="col-xl-6">
                        <div className="about-thumb1 mb-40 mb-lg-0">
                            <div className="about-img-1">
                                <img src="/assets/img/normal/about_1-1.png" alt="img" />
                            </div>
                            <div className="about-counter-wrap jump">
                                <h3 className="about-counter-number">
                                    <span className="counter-number">
                                        {counterInView && (
                                            <CountUp
                                                end={1.2}
                                                duration={4}
                                                decimals={1}
                                                decimal="."
                                            />
                                        )}
                                    </span>
                                    k
                                </h3>
                                <p className="about-counter-text">{tr("Happy Customers")}</p>
                                <div className="about-counter-shape">
                                    <img src="/assets/img/normal/about_shape_1-1.png" alt="img" />
                                </div>
                                <div className="client-group-thumb">
                                    <img src="/assets/img/normal/client_group_1-1.png" alt="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="about-content-wrap1">
                            <div className="title-area mb-25">
                                <span className="sub-title">
                                    <img src="/assets/img/icon/section-subtitle-icon.svg" alt="img" />
                                    {tr("ABOUT US")}
                                </span>
                                <h2 className="sec-title">{tr("We build everything that you need")}</h2>
                                <p className="sec-text">
                                    {tr("BuildMetric is a specialist construction cost and commercial consultancy delivering strategic Quantity Surveying, cost management, contract, claims and project advisory services.")}
                                </p>
                                <p className="sec-text mt-15">
                                    {tr("Drawing on extensive experience across complex residential, hospitality, commercial, marine and infrastructure developments, we provide independent, commercially focused advice throughout the project lifecycle. Our approach combines technical expertise, contractual")} 
                                </p>
                            </div>
                            <div className="checklist mb-35">
                                <ul>
                                    <li>
                                        <img
                                            src="/assets/img/icon/about-checklsit-icon1-1.svg"
                                            alt="img"
                                        />
                                        {tr("Providing Solutions For Construction, Management")}
                                    </li>
                                    <li>
                                        <img
                                            src="/assets/img/icon/about-checklsit-icon1-1.svg"
                                            alt="img"
                                        />
                                        {tr("Engineers design and build the structure")}
                                    </li>
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
        </div>
    );
};

export default About;
