import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useLanguage } from "../../../i18n/LanguageContext";
import { useContent } from "../../../admin/ContentContext";

const Service = () => {
  const { tr } = useLanguage();
  const { content } = useContent();
  const servicesData = content.homeServices;
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    dotsClass: "service-card-dots",
    speed: 1200,
    autoplay: true,
    autoplaySpeed: 4500,
    infinite: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          focusOnSelect: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="space-hd-bottom" id="service-sec">
      <div
        className="service-area-6 space overflow-hidden position-relative shape-mockup-wrap background-image"
        style={{
          backgroundImage: "url('/assets/img/bg/service-bg6-1.png')",
          paddingBottom: "240px",
        }}
      >

        <style>{`
          /* Equal-height cards so titles, text and buttons line up */
          .service-slider6 .slick-track {
            display: flex !important;
          }
          .service-slider6 .slick-slide {
            height: auto !important;
          }
          .service-slider6 .slick-slide > div,
          .service-slider6 .slick-slide > div > div {
            height: 100%;
          }
          .service-slider6 .service-card.style6 {
            height: 100%;
          }
          /* Same size for every service icon */
          .service-card.style6 .service-card_icon img {
            width: 70px;
            height: 70px;
            object-fit: contain;
            display: block;
          }
        `}</style>
        <div className="container">
          <div className="service-card-wrap6">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="title-area text-center mb-50">
                  <span className="sub-title text-theme">
                    {tr("WHAT WE DO")}{" "}<i className="ri-arrow-right-down-line"></i>
                  </span>
                  <h2 className="sec-title">
                    {tr("We provide our services all over the world")}
                  </h2>
                </div>
              </div>
            </div>

            <Slider
              {...settings}
              className="row global-carousel service-slider6 slick-dotted"
            >
              {servicesData.map((service, index) => (
                <div className="col-xxl-auto col-xl-4 col-md-6" key={service.id || index}>
                  <div
                    className="service-card style6 background-image"
                    style={{
                      backgroundImage:
                        "url('/assets/img/bg/service-card-bg6-1.png')",
                      margin: "0rem 0.75rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      minHeight: "530px",
                    }}
                  >
                    <div>
                      <div className="service-card-number">{service.num}</div>
                      <div
                        className="service-card-thumb bg-mask"
                        style={{
                          maskImage:
                            "url('/assets/img/service/service_thumb6_mask.png')",
                          WebkitMaskImage:
                            "url('/assets/img/service/service_thumb6_mask.png')",
                        }}
                      >
                        <img src={service.thumb} alt={service.title} />
                      </div>
                      <div className="service-card_content">
                        <div className="service-card_icon">
                          <img src={service.icon} alt="icon" />
                        </div>
                        <h4
                          className="service-card_title"
                          style={{ minHeight: "54px" }}
                        >
                          <Link to="/service-details">{service.title}</Link>
                        </h4>
                        <p className="service-card_text">{service.desc}</p>
                      </div>
                    </div>
                    <div className="btn-group" style={{ marginTop: "20px" }}>
                      <Link to="/service-details" className="btn">
                        {tr("EXPLORE SERVICE", "استكشف الخدمة")}{" "}
                        <i className="ri-arrow-right-up-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;