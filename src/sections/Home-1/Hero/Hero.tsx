import { useRef, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useContent } from "../../../admin/ContentContext";

const Hero = () => {
  const { content } = useContent();
  const slides = content.homeHero;
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<any>(null);

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true,
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
    afterChange: (current: number) => setCurrentSlide(current),
  };

  return (
    <div
      className="hero-wrapper hero-1 shape-mockup-wrap"
      id="hero"
      style={{ width: "100%", overflow: "hidden", marginTop: 0, backgroundColor: "transparent" }}
    >
      {/* Slider */}
       
      <Slider {...settings} ref={sliderRef} className="hero-slider1 global-carousel">
        {slides.map((slide, index) => (
          <div key={slide.id || index} id={`slide${index + 1}`} style={{ width: "100%", height: "100%" }}>
            <div
              className={`hero-slide background-image ${currentSlide === index ? 'slick-current slick-active' : ''}`}
              data-opacity="5"
              data-overlay="title"
              style={{
                backgroundImage: `url('${slide.bgImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                minHeight: "850px",
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <div className="container">
                <div className="hero-style1 hero-style4-adapted" style={{ paddingTop: "260px", paddingBottom: "220px", position: "relative", zIndex: 6 }}>
                  <div
                    className={`hero-subtitle slider-custom-anim-left hero-four-home-four-flex ${currentSlide === index ? 'slider-animated' : ''}`}
                    style={{ animationDelay: '0.1s', color: 'var(--theme-color)', textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 600, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}
                  >
                    {slide.subtitle}{" "}
                    <img src="/assets/img/icon/long-arrow-right2.svg" alt="img" />
                  </div>
                  <h1
                    className={`hero-title text-white slider-custom-anim-left ${currentSlide === index ? 'slider-animated' : ''}`}
                    style={{ animationDelay: '0.2s', maxWidth: "820px" }}
                  >
                    {slide.title}
                  </h1>
                  <p
                    className={`hero-text text-white slider-custom-anim-left ${currentSlide === index ? 'slider-animated' : ''}`}
                    style={{ animationDelay: '0.3s', maxWidth: "620px", fontSize: "18px", marginTop: "18px", marginBottom: "30px" }}
                  >
                    {slide.text}
                  </p>
                  <div
                    className={`btn-group slider-custom-anim-left ${currentSlide === index ? 'slider-animated' : ''}`}
                    style={{ animationDelay: '0.4s' }}
                  >
                    <Link to={slide.btnLink || "/about"} className="btn style2" data-text={slide.btnText || "Discover More"}>
                      {slide.btnText || "Discover More"} <i className="ri-arrow-right-up-line"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Side navigation arrows */}
      <button
        onClick={goToPrev}
        className="hero-side-arrow prev-arrow"
        aria-label="Previous Slide"
      >
        <i className="ri-arrow-left-line"></i>
      </button>

      <button
        onClick={goToNext}
        className="hero-side-arrow next-arrow"
        aria-label="Next Slide"
      >
        <i className="ri-arrow-right-line"></i>
      </button>

      <style>{`
        .hero-side-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-color: #ffffff;
          border: 2px solid #263b82;
          color: #263b82;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 25;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          padding: 0;
        }
        .hero-side-arrow.prev-arrow {
          left: 40px;
        }
        .hero-side-arrow.next-arrow {
          right: 40px;
        }
        .hero-side-arrow:hover {
          background-color: #263b82;
          color: #ffffff;
          border-color: #263b82;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 8px 25px rgba(38, 59, 130, 0.45);
        }
        .hero-side-arrow:active {
          transform: translateY(-50%) scale(0.95);
        }
        @media (max-width: 991px) {
          .hero-side-arrow {
            width: 44px;
            height: 44px;
            font-size: 20px;
          }
          .hero-side-arrow.prev-arrow {
            left: 15px;
          }
          .hero-side-arrow.next-arrow {
            right: 15px;
          }
        }
        @media (max-width: 767px) {
          .hero-1 .hero-slide {
            min-height: 560px !important;
          }
          .hero-1 .hero-style1 {
            padding-top: 110px !important;
            padding-bottom: 130px !important;
            padding-left: 4px;
            padding-right: 4px;
          }
          .hero-1 .hero-subtitle {
            justify-content: center;
            font-size: 13px;
            letter-spacing: 0.2em !important;
          }
          .hero-1 .hero-title {
            font-size: 34px !important;
            line-height: 1.2 !important;
          }
          .hero-1 .hero-text {
            font-size: 16px !important;
            line-height: 1.6 !important;
          }
          /* Move arrows below the content so they don't cover the text */
          .hero-side-arrow {
            top: auto;
            bottom: 36px;
            transform: none;
            width: 42px;
            height: 42px;
            font-size: 18px;
          }
          .hero-side-arrow:hover,
          .hero-side-arrow:active {
            transform: none;
          }
          .hero-side-arrow.prev-arrow {
            left: calc(50% - 50px);
          }
          .hero-side-arrow.next-arrow {
            right: calc(50% - 50px);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;