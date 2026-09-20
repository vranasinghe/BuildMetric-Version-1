import { Link } from "react-router-dom";
import Slider from "react-slick";

const servicesData = [
  {
    num: "N.01",
    title: "Quantity Surveying & Cost Management",
    thumb: "/assets/img/service/service_thumb6_1.png",
    icon: "/assets/img/icon/service-icon2-1.svg",
    desc: "Strategic feasibility estimating, cost planning, BOQ preparation, tender evaluation, value engineering, and final accounts.",
  },
  {
    num: "N.02",
    title: "Commercial & Contract Management",
    thumb: "/assets/img/service/service_thumb6_2.png",
    icon: "/assets/img/icon/service-icon2-2.svg",
    desc: "Strategic contract administration, change management, variations control, commercial reporting, and contractual advice.",
  },
  {
    num: "N.03",
    title: "Claims & Dispute Support",
    thumb: "/assets/img/service/service_thumb6_3.png",
    icon: "/assets/img/icon/service-icon2-3.svg",
    desc: "Expert claims preparation, quantum assessment, EOT disruption commercial assessment, and dispute resolution.",
  },
  {
    num: "N.04",
    title: "Project Management / PMC",
    thumb: "/assets/img/service/service_thumb6_1.png",
    icon: "/assets/img/icon/service-icon2-4.svg",
    desc: "Robust project controls, procurement management, design coordination, risk management, and client reporting.",
  },
  {
    num: "N.05",
    title: "Development & Investment Advisory",
    thumb: "/assets/img/service/service_thumb6_2.png",
    icon: "/assets/img/icon/service-icon4-1.svg",
    desc: "Development feasibility, cost benchmarking, technical due diligence, CAPEX forecasting, and project monitoring.",
  },
  {
    num: "N.06",
    title: "Digital Project Commercial Management",
    thumb: "/assets/img/service/service_thumb6_3.png",
    icon: "/assets/img/icon/service-icon4-2.svg",
    desc: "Modern cost dashboards, digital cost controls, 5D BIM integration, and data-driven commercial intelligence.",
  },
];

const Service = () => {
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
                    WHAT WE DO <i className="ri-arrow-right-down-line"></i>
                  </span>
                  <h2 className="sec-title">
                    We provide our services all over the world
                  </h2>
                </div>
              </div>
            </div>

            <Slider
              {...settings}
              className="row global-carousel service-slider6 slick-dotted"
            >
              {servicesData.map((service, index) => (
                <div className="col-xxl-auto col-xl-4 col-md-6" key={index}>
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
                        EXPLORE SERVICE{" "}
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