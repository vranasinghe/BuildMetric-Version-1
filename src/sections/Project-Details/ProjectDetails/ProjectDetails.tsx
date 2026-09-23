
import { useState } from "react";
import PopupVideo from "../../Common/PopupVideo/PopupVideo";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../i18n/LanguageContext";

const ProjectDetailsArea = () => {
    const { tr } = useLanguage();
    const [popup, setPopup] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const openPopup = () => {
        setPopup(true);
        const iframe = document.getElementById("youtube-video") as HTMLIFrameElement;
        if (iframe) {
            iframe.src = "https://www.youtube.com/embed/Q5PG0rMXgvw";
        }
        setIsActive(true);
        document.body.style.overflow = 'hidden';
    };
    return (
        <div>
            <div className="project-details-area space-top overflow-hidden">
                <div className="container">
                    <div className="row gy-30 gx-30">
                        <div className="col-12">
                            <div className="single-page">
                                <div className="project-page-thumb mb-50">
                                    <img className="w-100" src="/assets/img/project/project_details1_1.png" alt="img" />
                                    <aside className="sidebar-area">
                                        <div className="widget widget_project_info style2">
                                            <h3 className="widget_title">{tr("Project Info")}</h3>
                                            <ul className="project-info-list border-0 p-0 m-0">
                                                <li><strong>{tr("Client")}<span>:</span></strong> <span>{tr("Rebecca Tylor")}</span></li>
                                                <li><strong>{tr("Category")}<span>:</span></strong> <span>{tr("Building")}</span></li>
                                                <li><strong>{tr("Location")}<span>:</span></strong> <span>{tr("New York to London")}</span></li>
                                                <li><strong>{tr("Date")}<span>:</span></strong> <span>{tr("12 January, 2024")}</span></li>
                                                <li><strong>{tr("Status")}<span>:</span></strong> <span>{tr("Completed")}</span></li>
                                                <li><strong>{tr("Budget")}<span>:</span></strong> <span>$200,560</span></li>
                                            </ul>
                                        </div>
                                    </aside>
                                </div>
                                <h2 className="sec-title mb-25">{tr("Project Overview")}</h2>
                                <p className="mb-50">{tr("Industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leapinto electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release letraset sheets containing. Richard Clintock a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure latin words, consectetur, from a Lorem Ipsum passage.")}</p>
                                <div className="row gy-4 justify-content-center">
                                    <div className="col-xl-4 col-lg-6">
                                        <div className="service-card style4">
                                            <div className="service-card_icon">
                                                <img src="/assets/img/icon/service-icon1-1.png" alt="img" />
                                            </div>
                                            <div className="service-card_content">
                                                <h4 className="service-card_title"><Link to="/service-details">{tr("Full Principal Contractor service")}</Link></h4>
                                                <p className="service-card_text">{tr("There are many passages of lorem ipsum available")}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6">
                                        <div className="service-card style4">
                                            <div className="service-card_icon">
                                                <img src="/assets/img/icon/service-icon1-2.png" alt="img" />
                                            </div>
                                            <div className="service-card_content">
                                                <h4 className="service-card_title"><Link to="/service-details">{tr("Full-time Onsite Supervision")}</Link></h4>
                                                <p className="service-card_text">{tr("There are many passages of lorem ipsum available")}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6">
                                        <div className="service-card style4">
                                            <div className="service-card_icon">
                                                <img src="/assets/img/icon/service-icon1-3.png" alt="img" />
                                            </div>
                                            <div className="service-card_content">
                                                <h4 className="service-card_title"><Link to="/service-details">{tr("Timber and steel frame construction")}</Link></h4>
                                                <p className="service-card_text">{tr("There are many passages of lorem ipsum available")}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <blockquote>
                                    <p>{tr("“Tortor posuere ac ut consequat tellusi elem isis etum sag ittis vitae atleo duis ut diam odio ut sem nulla phar. Purus sit ame nus mas highly efficient solution whereas open-source application.”")}</p>
                                    <cite>{tr("Aleesha brown")}</cite>
                                    <span className="desig">{tr("Company, CEO")}</span>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="video-area overflow-hidden">
                <div className="video-wrap mt-20">
                    <img src="/assets/img/project/project_details1_2.png" alt="img" />
                    <a onClick={openPopup} className="play-btn style3"><i className="ri-play-fill"></i></a>
                </div>
                <div className="container">
                    <p className="mt-40 mb-0">{tr("Industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leapinto electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release letraset sheets containing.")}</p>
                </div>
            </div>


            <div className="pt-60 pb-60 overflow-hidden">
                <div className="container">
                    <div className="row justify-content-between align-items-center gy-40">
                        <div className="col-lg-6">
                            <div className="title-area text-md-start text-left">
                                <h2 className="sec-title">{tr("Features of Project")}</h2>
                            </div>
                            <div className="process-thumb2-1">
                                <img src="/assets/img/normal/process-thumb2-1.png" alt="img" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="process-grid-list style2">
                                <div className="process-grid-list-bg-text">
                                    {tr("BENEFIT")}
                                </div>
                                <div className="process-grid">
                                    <div className="process-grid-number">01</div>
                                    <div className="process-grid-details">
                                        <h3 className="process-grid-title">{tr("Advanced Technology")}{" "}</h3>
                                        <p className="process-grid-text">{tr("We craft unique digital experiences. With more years of expertise we design")}{" "}</p>
                                    </div>
                                </div>
                                <div className="process-grid">
                                    <div className="process-grid-number">02</div>
                                    <div className="process-grid-details">
                                        <h3 className="process-grid-title">{tr("Trusted Company")}{" "}</h3>
                                        <p className="process-grid-text">{tr("We craft unique digital experiences. With more years of expertise we design")}{" "}</p>
                                    </div>
                                </div>
                                <div className="process-grid">
                                    <div className="process-grid-number">03</div>
                                    <div className="process-grid-details">
                                        <h3 className="process-grid-title">{tr("Professional Teams")}{" "}</h3>
                                        <p className="process-grid-text">{tr("We craft unique digital experiences. With more years of expertise we design")}{" "}</p>
                                    </div>
                                </div>
                                <div className="process-grid">
                                    <div className="process-grid-number">04</div>
                                    <div className="process-grid-details">
                                        <h3 className="process-grid-title">{tr("Stylistic formula method")}</h3>
                                        <p className="process-grid-text">{tr("We craft unique digital experiences. With more years of expertise we design")}{" "}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PopupVideo popup={popup} setPopup={setPopup} isActive={isActive} setIsActive={setIsActive}></PopupVideo>
        </div>
    );
};

export default ProjectDetailsArea;