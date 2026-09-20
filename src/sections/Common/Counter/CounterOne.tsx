import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useContent } from "../../../admin/ContentContext";

const CounterOne = () => {
    const { content } = useContent();
    const counters = content.homeCounter;

    const { ref: counterRef, inView: counterInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div
            className="counter-area-1"
            ref={counterRef}
            style={{
                paddingTop: "75px",
                paddingBottom: "45px",
                background: "transparent",
            }}
        >
            <style>{`
                .outline-counter-card {
                    text-align: left;
                }
                .outline-counter-number {
                    font-size: 110px;
                    line-height: 0.95;
                    font-weight: 400;
                    font-family: var(--title-font, "Titillium Web", sans-serif);
                    color: transparent;
                    -webkit-text-stroke: 1.5px #b6beca;
                    letter-spacing: -2px;
                    margin-bottom: 24px;
                    display: flex;
                    align-items: baseline;
                    transition: -webkit-text-stroke-color 0.25s ease;
                }
                .outline-counter-card:hover .outline-counter-number {
                    -webkit-text-stroke-color: #838e9e;
                }
                .outline-counter-text {
                    font-size: 17px;
                    font-weight: 400;
                    color: #686e7d;
                    font-family: var(--body-font, sans-serif);
                    margin: 0;
                    letter-spacing: 0.2px;
                }
                @media (max-width: 1200px) {
                    .outline-counter-number {
                        font-size: 85px;
                        margin-bottom: 18px;
                    }
                }
                @media (max-width: 768px) {
                    .outline-counter-number {
                        font-size: 64px;
                        margin-bottom: 12px;
                    }
                    .outline-counter-text {
                        font-size: 15px;
                    }
                }
                @media (max-width: 575px) {
                    .counter-area-1 {
                        padding-top: 50px !important;
                        padding-bottom: 30px !important;
                    }
                    .counter-area-1 .row {
                        --bs-gutter-y: 32px;
                    }
                    .outline-counter-card {
                        text-align: center;
                    }
                    .outline-counter-number {
                        font-size: 46px;
                        letter-spacing: -1px;
                        justify-content: center;
                        margin-bottom: 8px;
                    }
                    .outline-counter-text {
                        font-size: 14px;
                    }
                }
            `}</style>
            <div className="container">
                <div className="row justify-content-between gy-40">
                    {counters.map((c, index) => (
                        <div
                            className="col-xl-auto col-lg-auto col-md-6 col-6"
                            key={c.id || index}
                        >
                            <div className="outline-counter-card">
                                <div className="outline-counter-number">
                                    {c.prefix && <span>{c.prefix}</span>}
                                    <span className="counter-number">
                                        {counterInView ? (
                                            <CountUp start={0} end={c.number} duration={2} />
                                        ) : (
                                            c.number
                                        )}
                                    </span>
                                    <span>{c.suffix}</span>
                                </div>
                                <p className="outline-counter-text">{c.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CounterOne;

