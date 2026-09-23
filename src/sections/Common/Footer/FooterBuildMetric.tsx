import React from "react";
import { Link } from "react-router-dom";
import { useContent } from "../../../admin/ContentContext";
import { useLanguage } from "../../../i18n/LanguageContext";

const FooterBuildMetric: React.FC = () => {
    const { tr } = useLanguage();
    const { content } = useContent();
    const footerData = content.footer;

    return (
        <footer
            className="footer-one-sec"
            style={{
                position: "relative",
                display: "block",
                backgroundColor: "#0c1527",
                zIndex: 1,
                overflow: "hidden",
            }}
        >
            {/* World map background pattern */}
            <div
                className="footer-one__pattern"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    backgroundImage: "url('/assets/img/footer-v1-pattern.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.05,
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

            {/* Top Section with 4 Columns */}
            <div
                className="footer-one__top"
                style={{
                    position: "relative",
                    display: "block",
                    padding: "100px 0 90px",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.18)",
                    zIndex: 1,
                }}
            >
                {/* ── THE MOVING CAR (FORKLIFT) ── */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "69px",
                        overflow: "hidden",
                        pointerEvents: "none",
                        zIndex: 3,
                    }}
                >
                    <div
                        className="footer-car-anim"
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            height: "69px",
                            display: "flex",
                            alignItems: "flex-end",
                            willChange: "transform",
                        }}
                    >
                        <img
                            src="/assets/img/footer-v1-img3.png"
                            alt="Construction Vehicle"
                            style={{
                                height: "69px",
                                width: "auto",
                                display: "block",
                            }}
                        />
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        {/* ── Col 1: About / Logo / Social ── */}
                        <div className="col-xl-4 col-lg-6 col-md-6" style={{ marginBottom: "30px" }}>
                            <div className="footer-widget__about">
                                <div style={{ marginBottom: "25px" }}>
                                    <Link to="/">
                                        <img
                                            src="/assets/img/logo-1.png"
                                            alt="BuildMetric"
                                            style={{ maxHeight: "48px", width: "auto", display: "block" }}
                                        />
                                    </Link>
                                </div>
                                <p
                                    style={{
                                        color: "rgba(255, 255, 255, 0.7)",
                                        fontSize: "15px",
                                        lineHeight: "28px",
                                        fontWeight: 400,
                                        marginBottom: "28px",
                                        maxWidth: "340px",
                                    }}
                                >
                                    {footerData.aboutText}
                                </p>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    {[
                                        { icon: "ri-facebook-fill", label: "Facebook", href: "#" },
                                        { icon: "ri-twitter-x-fill", label: "Twitter", href: "#" },
                                        { icon: "ri-pinterest-fill", label: "Pinterest", href: "#" },
                                        { icon: "ri-linkedin-fill", label: "LinkedIn", href: "#" },
                                    ].map(({ icon, label, href }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            aria-label={label}
                                            style={{
                                                width: "42px",
                                                height: "42px",
                                                borderRadius: "50%",
                                                backgroundColor: "rgba(255, 255, 255, 0.07)",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "rgba(255, 255, 255, 0.7)",
                                                fontSize: "16px",
                                                textDecoration: "none",
                                                transition: "all 0.3s ease",
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.backgroundColor = "#001F5B";
                                                e.currentTarget.style.color = "#ffffff";
                                                e.currentTarget.style.transform = "translateY(-3px)";
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.07)";
                                                e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                                                e.currentTarget.style.transform = "translateY(0)";
                                            }}
                                        >
                                            <i className={icon} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── Col 2: Our Services ── */}
                        <div className="col-xl-2 col-lg-6 col-md-6" style={{ marginBottom: "30px" }}>
                            <h2
                                style={{
                                    color: "#ffffff",
                                    fontSize: "22px",
                                    lineHeight: "32px",
                                    fontWeight: 700,
                                    marginBottom: "30px",
                                }}
                            >
                                {tr("Our Services")}
                            </h2>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                {[
                                    [tr("Cost Estimating", "تقدير التكاليف"), "/service"],
                                    [tr("Bill of Quantities", "جداول الكميات"), "/service"],
                                    [tr("Commercial Advisory", "الاستشارات التجارية"), "/service"],
                                    [tr("Dispute Resolution", "تسوية النزاعات"), "/service"],
                                    [tr("Value Engineering", "الهندسة القيمية"), "/service"],
                                ].map(([label, to]) => (
                                    <li key={label} style={{ marginBottom: "12px" }}>
                                        <Link
                                            to={to}
                                            style={{
                                                color: "rgba(255, 255, 255, 0.7)",
                                                fontSize: "15px",
                                                textDecoration: "none",
                                                transition: "color 0.2s ease, padding-left 0.2s ease",
                                                display: "inline-block",
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.color = "#ffffff";
                                                e.currentTarget.style.paddingLeft = "5px";
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                                                e.currentTarget.style.paddingLeft = "0";
                                            }}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ── Col 3: Quick Links ── */}
                        <div className="col-xl-2 col-lg-6 col-md-6" style={{ marginBottom: "30px" }}>
                            <h2
                                style={{
                                    color: "#ffffff",
                                    fontSize: "22px",
                                    lineHeight: "32px",
                                    fontWeight: 700,
                                    marginBottom: "30px",
                                }}
                            >
                                {tr("Quick Links")}
                            </h2>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                {[
                                    [tr("About BuildMetric", "عن بيلد متريك"), "/about"],
                                    [tr("Case Studies", "دراسات الحالة"), "/project"],
                                    [tr("Our Capabilities", "قدراتنا"), "/service"],
                                    [tr("Industry Insights", "رؤى القطاع"), "/blog"],
                                    [tr("Book Consultation", "احجز استشارة"), "/contact"],
                                ].map(([label, to]) => (
                                    <li key={label} style={{ marginBottom: "12px" }}>
                                        <Link
                                            to={to}
                                            style={{
                                                color: "rgba(255, 255, 255, 0.7)",
                                                fontSize: "15px",
                                                textDecoration: "none",
                                                transition: "color 0.2s ease, padding-left 0.2s ease",
                                                display: "inline-block",
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.color = "#ffffff";
                                                e.currentTarget.style.paddingLeft = "5px";
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                                                e.currentTarget.style.paddingLeft = "0";
                                            }}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ── Col 4: Featured Articles ── */}
                        <div className="col-xl-4 col-lg-6 col-md-6" style={{ marginBottom: "30px" }}>
                            <h2
                                style={{
                                    color: "#ffffff",
                                    fontSize: "22px",
                                    lineHeight: "32px",
                                    fontWeight: 700,
                                    marginBottom: "30px",
                                }}
                            >
                                {tr("Featured Articles")}
                            </h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                                {[
                                    {
                                        img: "/assets/img/footer-v1-img1.jpg",
                                        title: tr("Managing Material Volatility in NEC4 & JCT", "إدارة تقلبات أسعار المواد في عقود NEC4 وJCT"),
                                        date: tr("18 Sep 2026", "18 سبتمبر 2026"),
                                        to: "/blog",
                                    },
                                    {
                                        img: "/assets/img/footer-v1-img2.jpg",
                                        title: tr("Structuring Defensible Quantum Claims", "صياغة مطالبات القيمة المالية القابلة للدفاع"),
                                        date: tr("04 Sep 2026", "04 سبتمبر 2026"),
                                        to: "/blog",
                                    },
                                ].map(({ img, title, date, to }) => (
                                    <Link
                                        key={title}
                                        to={to}
                                        style={{
                                            display: "flex",
                                            gap: "16px",
                                            textDecoration: "none",
                                            alignItems: "center",
                                        }}
                                        onMouseOver={(e) => {
                                            const heading = e.currentTarget.querySelector(".article-title") as HTMLElement | null;
                                            if (heading) heading.style.color = "#7fa8d8";
                                        }}
                                        onMouseOut={(e) => {
                                            const heading = e.currentTarget.querySelector(".article-title") as HTMLElement | null;
                                            if (heading) heading.style.color = "#ffffff";
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "70px",
                                                height: "75px",
                                                flexShrink: 0,
                                                overflow: "hidden",
                                                backgroundColor: "#e0e0e0",
                                            }}
                                        >
                                            <img
                                                src={img}
                                                alt={title}
                                                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                            />
                                        </div>
                                        <div>
                                            <p
                                                className="article-title"
                                                style={{
                                                    margin: "0 0 6px",
                                                    color: "#ffffff",
                                                    fontSize: "14px",
                                                    lineHeight: "22px",
                                                    fontWeight: 600,
                                                    transition: "color 0.2s ease",
                                                }}
                                            >
                                                {title}
                                            </p>
                                            <span style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "13px" }}>
                                                {date}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Bottom Section (Copyright) ── */}
            <div
                className="footer-one__bottom"
                style={{
                    position: "relative",
                    display: "block",
                    padding: "26px 0",
                    zIndex: 1,
                }}
            >
                <div className="container">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "14px",
                        }}
                    >
                        <p style={{ margin: 0, color: "rgba(255, 255, 255, 0.7)", fontSize: "15px", fontWeight: 600 }}>
                            {footerData.copyrightText || `Copyright © ${new Date().getFullYear()}. All rights reserved to BuildMetric Ltd.`}
                        </p>
                        <div style={{ display: "flex", gap: "22px", flexWrap: "wrap", alignItems: "center" }}>
                            {[
                                ["Terms & Conditions", "الشروط والأحكام", "/about"],
                                ["Services", "الخدمات", "/service"],
                                ["Contact Us", "اتصل بنا", "/contact"],
                                ["Admin Panel", "لوحة التحكم", "/admin"],
                            ].map(([label, arLabel, to]) => (
                                <Link
                                    key={label}
                                    to={to}
                                    style={{
                                        color: label === "Admin Panel" ? "#f15a24" : "rgba(255, 255, 255, 0.7)",
                                        fontSize: "15px",
                                        fontWeight: 600,
                                        textDecoration: "none",
                                        transition: "color 0.2s ease",
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
                                    onMouseOut={(e) => (e.currentTarget.style.color = label === "Admin Panel" ? "#f15a24" : "rgba(255, 255, 255, 0.7)")}
                                >
                                    {tr(label, arLabel)}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Animation CSS */}
            <style>{`
                @keyframes footerCarDrive {
                    0% {
                        transform: translateX(-160px);
                    }
                    100% {
                        transform: translateX(100vw);
                    }
                }
                .footer-car-anim {
                    animation: footerCarDrive 26s linear infinite;
                    animation-delay: -6s;
                }
            `}</style>
        </footer>
    );
};

export default FooterBuildMetric;
