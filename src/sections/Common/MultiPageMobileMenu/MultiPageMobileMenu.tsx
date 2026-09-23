import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { useLanguage } from "../../../i18n/LanguageContext";

const MultiPageMobileMenu = ({ isMenuOpen, setIsMenuOpen }: any) => {
    const location = useLocation();
    const { user } = useAuth();
    const { lang, setLang, tr } = useLanguage();
    const accountPath = user ? (user.role === "admin" ? "/admin" : "/account") : "/login";
    const currentPath = location.pathname;
    const isActive = (path: string) => {
        if (path === "/" || path === "/home-1") {
            return currentPath === "/" || currentPath === "/home-1";
        }
        return currentPath.startsWith(path);
    };

    const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
    const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);

    const handleMobileMenuClose = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className={`mobile-menu-wrapper ${isMenuOpen ? 'body-visible' : ''}`}>
            <style>{`
                .mobile-menu ul li a {
                    font-weight: 700 !important;
                    color: #141d30 !important;
                }
                .mobile-menu ul li.active > a,
                .mobile-menu ul li a.active,
                .mobile-menu ul li a:hover {
                    color: #263b82 !important;
                }
            `}</style>
            <div className="mobile-menu-area">
                <div className="mobile-logo">
                    <Link to="/" onClick={handleMobileMenuClose}>
                        <img src="/assets/img/buildmetric-logo.png" alt="BuildMetric CONSULTANCY" style={{ height: "40px", width: "auto" }} />
                    </Link>
                    <button onClick={handleMobileMenuClose} className="menu-toggle">
                        <i className="ri-close-line"></i>
                    </button>
                </div>
                <div className="mobile-menu">
                    <ul>
                        <li className={isActive("/") ? "active" : ""}>
                            <Link to="/" className={isActive("/") ? "active" : ""} onClick={handleMobileMenuClose}>{tr("Home", "الرئيسية")}</Link>
                        </li>
                        <li className={isActive("/about") ? "active" : ""}>
                            <Link to="/about" className={isActive("/about") ? "active" : ""} onClick={handleMobileMenuClose}>{tr("About Us", "من نحن")}</Link>
                        </li>
                        <li className={`menu-item-has-children submenu-item-has-children ${isServiceMenuOpen ? 'active-class' : ''} ${isActive("/service") ? 'active' : ''}`}>
                            <Link onClick={() => setIsServiceMenuOpen(!isServiceMenuOpen)} to="#" className={isActive("/service") ? "active" : ""}>{tr("Services", "خدماتنا")} <span className="mean-expand-class"></span></Link>
                            <ul className={`sub-menu submenu-class ${isServiceMenuOpen ? 'menu-open' : ''}`} style={{ display: isServiceMenuOpen ? 'block' : 'none' }}>
                                <li><Link to="/service" className={currentPath === "/service" ? "active" : ""} onClick={handleMobileMenuClose}>{tr("Services", "الخدمات")}</Link></li>
                                <li><Link to="/service-details" className={currentPath === "/service-details" ? "active" : ""} onClick={handleMobileMenuClose}>{tr("Service Details", "تفاصيل الخدمة")}</Link></li>
                            </ul>
                        </li>
                        <li className={`menu-item-has-children submenu-item-has-children ${isProjectMenuOpen ? 'active-class' : ''} ${isActive("/project") ? 'active' : ''}`}>
                            <Link onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)} to="#" className={isActive("/project") ? "active" : ""}>{tr("Projects", "مشاريعنا")} <span className="mean-expand-class"></span></Link>
                            <ul className={`sub-menu submenu-class ${isProjectMenuOpen ? 'menu-open' : ''}`} style={{ display: isProjectMenuOpen ? 'block' : 'none' }}>
                                <li><Link to="/project" className={currentPath === "/project" ? "active" : ""} onClick={handleMobileMenuClose}>{tr("Projects", "المشاريع")}</Link></li>
                                <li><Link to="/project-details" className={currentPath === "/project-details" ? "active" : ""} onClick={handleMobileMenuClose}>{tr("Project Details", "تفاصيل المشروع")}</Link></li>
                            </ul>
                        </li>
                        <li className={isActive("/contact") ? "active" : ""}>
                            <Link to="/contact" className={isActive("/contact") ? "active" : ""} onClick={handleMobileMenuClose}>{tr("Contact", "اتصل بنا")}</Link>
                        </li>
                        <li className={isActive(accountPath) ? "active" : ""}>
                            <Link to={accountPath} className={isActive(accountPath) ? "active" : ""} onClick={handleMobileMenuClose}>
                                {user ? (user.role === "admin" ? tr("Admin Panel", "لوحة التحكم") : tr("My Account", "حسابي")) : tr("Login / Register", "تسجيل الدخول / إنشاء حساب")}
                            </Link>
                        </li>
                    </ul>
                </div>
                <div style={{ display: "flex", gap: "8px", padding: "20px 0 0" }} aria-label="Language">
                    {(["en", "ar"] as const).map((code) => (
                        <button
                            key={code}
                            type="button"
                            onClick={() => setLang(code)}
                            aria-pressed={lang === code}
                            style={{
                                flex: 1,
                                height: "40px",
                                border: "1.5px solid #263b82",
                                background: lang === code ? "#263b82" : "#ffffff",
                                color: lang === code ? "#ffffff" : "#263b82",
                                fontWeight: 700,
                                cursor: "pointer",
                            }}
                        >
                            {code === "en" ? "English" : "العربية"}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MultiPageMobileMenu;