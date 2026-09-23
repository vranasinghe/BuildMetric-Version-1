import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";

const MultiPageMobileMenu = ({ isMenuOpen, setIsMenuOpen }: any) => {
    const location = useLocation();
    const { user } = useAuth();
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
                            <Link to="/" className={isActive("/") ? "active" : ""} onClick={handleMobileMenuClose}>Home</Link>
                        </li>
                        <li className={isActive("/about") ? "active" : ""}>
                            <Link to="/about" className={isActive("/about") ? "active" : ""} onClick={handleMobileMenuClose}>About Us</Link>
                        </li>
                        <li className={`menu-item-has-children submenu-item-has-children ${isServiceMenuOpen ? 'active-class' : ''} ${isActive("/service") ? 'active' : ''}`}>
                            <Link onClick={() => setIsServiceMenuOpen(!isServiceMenuOpen)} to="#" className={isActive("/service") ? "active" : ""}>Services <span className="mean-expand-class"></span></Link>
                            <ul className={`sub-menu submenu-class ${isServiceMenuOpen ? 'menu-open' : ''}`} style={{ display: isServiceMenuOpen ? 'block' : 'none' }}>
                                <li><Link to="/service" className={currentPath === "/service" ? "active" : ""} onClick={handleMobileMenuClose}>Services</Link></li>
                                <li><Link to="/service-details" className={currentPath === "/service-details" ? "active" : ""} onClick={handleMobileMenuClose}>Service Details</Link></li>
                            </ul>
                        </li>
                        <li className={`menu-item-has-children submenu-item-has-children ${isProjectMenuOpen ? 'active-class' : ''} ${isActive("/project") ? 'active' : ''}`}>
                            <Link onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)} to="#" className={isActive("/project") ? "active" : ""}>Projects <span className="mean-expand-class"></span></Link>
                            <ul className={`sub-menu submenu-class ${isProjectMenuOpen ? 'menu-open' : ''}`} style={{ display: isProjectMenuOpen ? 'block' : 'none' }}>
                                <li><Link to="/project" className={currentPath === "/project" ? "active" : ""} onClick={handleMobileMenuClose}>Projects</Link></li>
                                <li><Link to="/project-details" className={currentPath === "/project-details" ? "active" : ""} onClick={handleMobileMenuClose}>Project Details</Link></li>
                            </ul>
                        </li>
                        <li className={isActive("/contact") ? "active" : ""}>
                            <Link to="/contact" className={isActive("/contact") ? "active" : ""} onClick={handleMobileMenuClose}>Contact</Link>
                        </li>
                        <li className={isActive(accountPath) ? "active" : ""}>
                            <Link to={accountPath} className={isActive(accountPath) ? "active" : ""} onClick={handleMobileMenuClose}>
                                {user ? (user.role === "admin" ? "Admin Panel" : "My Account") : "Login / Register"}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MultiPageMobileMenu;