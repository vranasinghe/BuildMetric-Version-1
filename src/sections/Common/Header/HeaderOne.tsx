
import React, { useEffect, useRef, useState } from "react"; 
import { Link, useLocation } from "react-router-dom";
import MultiPageMobileMenu from "../MultiPageMobileMenu/MultiPageMobileMenu"; 
import { useContent } from "../../../admin/ContentContext";

const HeaderOne = () => {
    const { content } = useContent();
    const headerData = content.header;
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path: string) => {
        if (path === "/" || path === "/home-1") {
            return currentPath === "/" || currentPath === "/home-1";
        }
        return currentPath.startsWith(path);
    };

    const [isSticky, setIsSticky] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false); 
    const sidebarRef = useRef<HTMLDivElement>(null);

    console.log(isMenuOpen);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 120) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSearchPopupOpen = () => {
        setIsPopupOpen(true);
    }
    const handleSearchPopupClose = () => {
        setIsPopupOpen(false);
    }

    const handleMobileMenuOpen = () => {
        setIsMenuOpen(true);
    }
    const handleSideBarClose = () => {
        setIsSideBarOpen(false);
    }

    const handleSideBarOpen = () => {
        setIsSideBarOpen(true);
    };

    // useEffect(() => {
    //     function handleClickOutside({ event }: any) { 
    //         if (sidebarRef.current?.contains(event.target as Node)) {
    //             setIsSideBarOpen(false);
    //         }
    //     }

    //     document.addEventListener('mousedown', handleClickOutside);

    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [sidebarRef]);


    return (
        <div className="header-decoration">
            <div className={`popup-search-box ${isPopupOpen ? 'show' : ''}`}>
                <button onClick={handleSearchPopupClose} className="searchClose"><i className="ri-close-line"></i></button>
                <form action="#">
                    <input type="text" placeholder="Search Here.." />
                    <button type="submit"><i className="ri-search-line"></i></button>
                </form>
            </div>
            <div className={`sidemenu-wrapper ${isSideBarOpen ? 'show' : ''}`}>
                <div ref={sidebarRef} className="sidemenu-content">
                    <button onClick={handleSideBarClose} className="closeButton sideMenuCls">
                        <i className="ri-close-line"></i>
                    </button>
                    <div className="widget widget-about footer-widget">
                        <div className="footer-logo footer-img">
                            <Link to="/home-1">
                                <img src="/assets/img/buildmetric-logo.png" alt="BuildMetric CONSULTANCY" style={{ height: "45px", width: "auto" }} />
                            </Link>
                        </div>
                        <p className="about-text mb-4">
                            A small business can be better than a big business because of agility and
                            adaptability due to their size and scale.
                        </p>

                        <p className="footer-text">
                            <Link to="tel:851555961658">
                                <i className="ri-phone-line space-right-sidebar-icon"></i>+85 155 596 1658
                            </Link>
                        </p>
                        <p className="contact-text">
                            <i className="ri-map-pin-line space-right-sidebar-icon"></i> Losangle, Street Road 24, New
                            York, USA - 67452
                        </p>
                        <p className="footer-text">
                            <Link to="mailto:support@gmail.com">
                                <i className="ri-mail-line space-right-sidebar-icon"></i>support@gmail.com
                            </Link>
                        </p>
                        <div className="social-btn style3 mt-30">
                            <Link to="https://www.twitter.com/"><i className="ri-twitter-x-line"></i></Link>
                            <Link to="https://instagram.com/"><i className="ri-instagram-line"></i></Link>
                            <Link to="https://facebook.com/"><i className="ri-facebook-fill"></i></Link>
                            <Link to="https://linkedin.com/"><i className="ri-linkedin-fill"></i></Link>
                        </div>
                        <div className="recent-post-wrap mt-40">
                            <div className="recent-post">
                                <div className="media-img">
                                    <Link to="/blog-details">
                                        <img src="/assets/img/blog/recent-post1.png" alt="Blog Image" width={100} height={100} />
                                    </Link>
                                </div>
                                <div className="media-body">
                                    <h4 className="post-title">
                                        <Link className="text-inherit" to="/blog-details">Best features of
                                            Building construction work</Link>
                                    </h4>
                                    <div className="recent-post-meta">
                                        <Link to="/blog">By Nicholes</Link>
                                        <Link to="/blog">30 min ago</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="recent-post">
                                <div className="media-img">
                                    <Link to="/blog-details">
                                        <img src="/assets/img/blog/recent-post2.png" alt="Blog Image" width={100} height={100} />
                                    </Link>
                                </div>
                                <div className="media-body">
                                    <h4 className="post-title">
                                        <Link className="text-inherit" to="/blog-details">The beast team is a
                                            around and how we make it</Link>
                                    </h4>
                                    <div className="recent-post-meta">
                                        <Link to="/blog">By Nicholes</Link>
                                        <Link to="/blog">2 days ago</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="recent-post">
                                <div className="media-img">
                                    <Link to="/blog-details">
                                        <img src="/assets/img/blog/recent-post4.png" alt="Blog Image" width={100} height={100} />
                                    </Link>
                                </div>
                                <div className="media-body">
                                    <h4 className="post-title">
                                        <Link className="text-inherit" to="/blog-details">A well designed
                                            construction website is user accessible</Link>
                                    </h4>
                                    <div className="recent-post-meta">
                                        <Link to="/blog">By Nicholes</Link>
                                        <Link to="/blog">3 week ago</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MultiPageMobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}></MultiPageMobileMenu>
            <style>{`
                /* Sticky wrapper styles */
                .header-layout1 .sticky-wrapper.sticky {
                    top: 0 !important;
                    padding: 0 !important;
                    position: fixed !important;
                    left: 0 !important;
                    right: 0 !important;
                    width: 100% !important;
                    z-index: 9999 !important;
                    background: #ffffff !important;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08) !important;
                    border-bottom: 1px solid #e7e8ec !important;
                    animation: stickyAni 0.35s ease-in-out !important;
                }
                .header-layout1 .sticky-wrapper.sticky .main-menu > ul > li > a {
                    height: 72px !important;
                    padding: 0 24px !important;
                }

                /* Header section - Titillium Web Font */
                .header-layout1,
                .header-layout1 .main-menu > ul > li > a,
                .header-layout1 .main-menu .sub-menu li a,
                .header-layout1 .header-top-bar,
                .header-layout1 .header-top-bar span,
                .header-layout1 .header-top-bar a,
                .header-layout1 .header-contact-items,
                .header-layout1 .header-contact-items span,
                .header-layout1 .header-contact-items a,
                .header-layout1 .header-nav-bar,
                .header-layout1 .header-nav-bar a,
                .header-layout1 .header-nav-bar button,
                .header-layout1 .header-nav-bar span {
                    font-family: "Titillium Web", sans-serif !important;
                }

                /* Header navigation menu items layout - Full Height Filled Block */
                .header-layout1 .header-nav-bar {
                    align-items: stretch !important;
                }
                .header-layout1 .main-menu {
                    display: flex !important;
                    align-items: stretch !important;
                    height: 72px !important;
                }
                .header-layout1 .main-menu > ul {
                    display: flex !important;
                    align-items: stretch !important;
                    gap: 0 !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    height: 72px !important;
                }
                .header-layout1 .main-menu > ul > li {
                    margin: 0 !important;
                    position: relative !important;
                    display: flex !important;
                    align-items: stretch !important;
                    height: 72px !important;
                }

                /* Header navigation links - Full-height filled square/rectangle */
                /* Mobile / tablet (<= 991px): logo + menu toggle only */
                @media (max-width: 991px) {
                    .header-layout1.nav-header {
                        min-height: 71px !important;
                    }
                    .header-layout1 .header-inner-row {
                        min-height: 0 !important;
                    }
                    .header-layout1 .main-menu {
                        display: none !important;
                    }
                    .header-layout1 .header-nav-bar {
                        padding: 0 16px !important;
                        min-height: 70px !important;
                    }
                    .header-layout1 .header-mobile-logo img {
                        height: 44px !important;
                        max-width: 190px !important;
                    }
                    .header-layout1 .navbar-right .menu-toggle {
                        width: 44px;
                        height: 44px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        background: #263b82;
                        color: #ffffff;
                        border: none;
                        border-radius: 4px;
                        font-size: 22px;
                        line-height: 1;
                        padding: 0;
                    }
                    .header-layout1 .sticky-wrapper.sticky .header-nav-bar {
                        min-height: 64px !important;
                    }
                }

                .header-layout1 .main-menu > ul > li > a {
                    font-weight: 700 !important;
                    font-size: 15px !important;
                    color: #141d30 !important;
                    letter-spacing: 0.5px !important;
                    padding: 0 24px !important;
                    border-radius: 0 !important;
                    display: inline-flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    height: 72px !important;
                    background: transparent !important;
                    transition: all 0.2s ease !important;
                }

                /* Hover state for unselected menu items */
                .header-layout1 .main-menu > ul > li:not(.active) > a:hover {
                    color: #263b82 !important;
                    background-color: rgba(38, 59, 130, 0.06) !important;
                }

                /* Selected / Active Route state - Fully filled Navy Blue square/rectangle */
                .header-layout1 .main-menu > ul > li.active > a,
                .header-layout1 .main-menu > ul > li > a.active {
                    background-color: #263b82 !important;
                    color: #ffffff !important;
                    font-weight: 700 !important;
                    border-radius: 0 !important;
                    height: 72px !important;
                }

                /* Chevron arrow for dropdowns */
                .header-layout1 .main-menu ul li.menu-item-has-children > a:after {
                    transition: color 0.2s ease !important;
                    margin-left: 6px !important;
                }
                .header-layout1 .main-menu ul li.menu-item-has-children:not(.active) > a:hover:after {
                    color: #263b82 !important;
                }
                .header-layout1 .main-menu ul li.menu-item-has-children.active > a:after,
                .header-layout1 .main-menu ul li.menu-item-has-children > a.active:after {
                    color: #ffffff !important;
                }

                /* Submenu dropdown links */
                .header-layout1 .main-menu .sub-menu li a {
                    font-weight: 600 !important;
                    color: #141d30 !important;
                    transition: all 0.2s ease !important;
                }
                .header-layout1 .main-menu .sub-menu li a:hover,
                .header-layout1 .main-menu .sub-menu li.active > a,
                .header-layout1 .main-menu .sub-menu li > a.active {
                    color: #263b82 !important;
                    padding-left: 8px !important;
                }

                /* Preserve icons */
                .header-layout1 i,
                .header-layout1 [class^="ri-"],
                .header-layout1 [class*=" ri-"] {
                    font-family: 'remixicon' !important;
                }
                .header-layout1 .main-menu ul li.menu-item-has-children > a:after {
                    font-family: var(--icon-font, "Font Awesome 6 Pro") !important;
                }

                /* Text Selection highlight for header section */
                .header-layout1 ::selection,
                .header-layout1 *::selection {
                    background-color: #263b82 !important;
                    color: #ffffff !important;
                }
            `}</style>
            <header className="nav-header header-layout1 header-decoration" style={{ background: "#fff", borderBottom: "1px solid #e7e8ec", minHeight: isSticky ? "117px" : "auto", position: "relative" }}>
                <div className={`sticky-wrapper ${isSticky ? 'sticky' : ''}`} style={{ background: "#fff", padding: 0 }}>
                    <div className="container-fluid" style={{ padding: 0 }}>
                        <div className="header-inner-row d-flex align-items-stretch" style={{ width: "100%", minHeight: isSticky ? "72px" : "116px" }}>
                            {/* Left Box: Full-height Logo */}
                            <div className="header-logo-box d-none d-lg-flex align-items-center justify-content-center" style={{
                                width: isSticky ? "260px" : "290px",
                                minWidth: isSticky ? "260px" : "290px",
                                borderRight: "1px solid #e7e8ec",
                                padding: "0 15px",
                                background: "#fff",
                                transition: "all 0.3s ease"
                            }}>
                                <Link to="/home-1" style={{ display: "inline-block" }}>
                                    <img
                                        src={headerData.logoUrl || "/assets/img/buildmetric-logo.png"}
                                        alt="BuildMetric CONSULTANCY"
                                        style={{
                                            height: isSticky ? "54px" : "72px",
                                            maxWidth: isSticky ? "230px" : "265px",
                                            width: "auto",
                                            display: "block",
                                            objectFit: "contain",
                                            transition: "all 0.3s ease"
                                        }}
                                    />
                                </Link>
                            </div>

                            {/* Right Box: Top Bar + Navigation Row */}
                            <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
                                {/* Top Row - Hidden when sticky */}
                                {!isSticky && (
                                <div className="header-top-bar d-none d-lg-flex justify-content-between align-items-center" style={{
                                    padding: "8px 35px",
                                    borderBottom: "1px solid #e7e8ec",
                                    minHeight: "44px",
                                    background: "#fff"
                                }}>
                                    {/* Left: Social Media Icons & Admin shortcut */}
                                    <div className="header-social-wrap" style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                                        {headerData.socialLinks.map((item, index) => (
                                            <Link
                                                key={index}
                                                to={item.url}
                                                style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    backgroundColor: "#f4f5f7",
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderRadius: "2px",
                                                    color: "#686e7d",
                                                    fontSize: "14px",
                                                    textDecoration: "none",
                                                    transition: "all 0.2s ease"
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = "#f15a24";
                                                    e.currentTarget.style.color = "#ffffff";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = "#f4f5f7";
                                                    e.currentTarget.style.color = "#686e7d";
                                                }}
                                            >
                                                <i className={item.icon} />
                                            </Link>
                                        ))}

                                        {/* Admin Link Button */}
                                        <Link
                                            to="/admin"
                                            title="Open BuildMetric Admin Panel"
                                            style={{
                                                height: "30px",
                                                padding: "0 10px",
                                                backgroundColor: "#001F5B",
                                                color: "#ffffff",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "5px",
                                                borderRadius: "2px",
                                                fontSize: "11px",
                                                fontWeight: 700,
                                                letterSpacing: "0.5px",
                                                textDecoration: "none",
                                                marginLeft: "6px",
                                                transition: "background-color 0.2s ease"
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f15a24"}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#001F5B"}
                                        >
                                            <i className="ri-settings-4-line" />
                                            <span>ADMIN</span>
                                        </Link>
                                    </div>

                                    {/* Centre: Language & Region Switcher */}
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 600 }}>
                                        {/* Language buttons */}
                                        {(headerData.languages && headerData.languages.length > 0 ? headerData.languages : [
                                            { id: "lang-en", code: "EN", name: "English" },
                                            { id: "lang-ar", code: "AR", name: "العربية" }
                                        ]).map((lang, lIdx) => (
                                            <React.Fragment key={lang.id || lIdx}>
                                                {lIdx > 0 && <span style={{ color: "#ccc", fontSize: "11px" }}>|</span>}
                                                <button
                                                    type="button"
                                                    style={{
                                                        background: "none",
                                                        border: "none",
                                                        padding: "2px 6px",
                                                        cursor: "pointer",
                                                        color: lIdx === 0 ? "#001F5B" : "#686e7d",
                                                        fontWeight: lIdx === 0 ? 700 : 600,
                                                        fontSize: "12px",
                                                        fontFamily: "'Titillium Web', sans-serif",
                                                        borderBottom: lIdx === 0 ? "2px solid #f15a24" : "none"
                                                    }}
                                                >
                                                    {lang.code}
                                                </button>
                                            </React.Fragment>
                                        ))}
                                        <span style={{ color: "#e7e8ec", fontSize: "11px", margin: "0 4px" }}>|</span>
                                        {/* Region */}
                                        <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#686e7d", fontSize: "12px" }}>
                                            <img
                                                src={headerData.regionFlagUrl || "https://flagcdn.com/w20/lk.png"}
                                                alt={headerData.regionName || "Sri Lanka"}
                                                style={{ width: "18px", height: "12px", objectFit: "cover", borderRadius: "2px" }}
                                            />
                                            {headerData.regionName || "Sri Lanka"}
                                        </span>
                                    </div>

                                    {/* Right: Working Hours & Location with orange circular icons */}
                                    <div className="header-contact-items" style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#686e7d" }}>
                                            <span style={{
                                                width: "22px",
                                                height: "22px",
                                                borderRadius: "50%",
                                                border: "1.5px solid #f15a24",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#f15a24",
                                                fontSize: "12px",
                                                flexShrink: 0
                                            }}>
                                                <i className="ri-time-line" />
                                            </span>
                                            <span>{headerData.workingHours}</span>
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#686e7d" }}>
                                            <span style={{
                                                width: "22px",
                                                height: "22px",
                                                borderRadius: "50%",
                                                border: "1.5px solid #f15a24",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#f15a24",
                                                fontSize: "12px",
                                                flexShrink: 0
                                            }}>
                                                <i className="ri-map-pin-line" />
                                            </span>
                                            <Link to={headerData.locationLink || "https://www.google.com/maps/place/Sri+Lanka"} target="_blank" rel="noopener noreferrer" style={{ color: "#686e7d", textDecoration: "none" }}>
                                                {headerData.regionName || "Sri Lanka"}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                )}

                                {/* Bottom Row: Navigation + Action Buttons */}
                                <div className="header-nav-bar d-flex justify-content-between align-items-center" style={{
                                    padding: "0 35px",
                                    flexGrow: 1,
                                    minHeight: "72px",
                                    background: "#fff"
                                }}>
                                    {/* Mobile Logo for <= 991px */}
                                    <div className="header-mobile-logo d-lg-none py-2">
                                        <Link to="/home-1">
                                            <img src={headerData.logoUrl || "/assets/img/buildmetric-logo.png"} alt="BuildMetric CONSULTANCY" style={{ height: "48px", maxWidth: "220px", width: "auto", objectFit: "contain", display: "block" }} />
                                        </Link>
                                    </div>

                                    {/* Desktop Navigation Menu */}
                                    <nav className="main-menu d-none d-lg-inline-block" style={{ margin: 0 }}>
                                        <ul style={{ margin: 0, padding: 0 }}>
                                            {(headerData.navLinks && headerData.navLinks.length > 0 ? headerData.navLinks : [
                                                { id: "nav-1", label: "HOME", url: "/" },
                                                { id: "nav-2", label: "ABOUT", url: "/about" },
                                                { id: "nav-3", label: "SERVICES", url: "/service" },
                                                { id: "nav-4", label: "PROJECTS", url: "/project" },
                                                { id: "nav-5", label: "CONTACT", url: "/contact" },
                                            ]).map((navItem) => {
                                                const isService = navItem.url.toLowerCase().includes("service");
                                                const isProject = navItem.url.toLowerCase().includes("project");
                                                if (isService) {
                                                    return (
                                                        <li key={navItem.id} className={`menu-item-has-children ${isActive("/service") ? "active" : ""}`}>
                                                            <Link to={navItem.url} className={isActive("/service") ? "active" : ""}>{navItem.label.toUpperCase()}</Link>
                                                            <ul className="sub-menu">
                                                                <li className={currentPath === "/service" ? "active" : ""}><Link to="/service" className={currentPath === "/service" ? "active" : ""}>Services</Link></li>
                                                                <li className={currentPath === "/service-details" ? "active" : ""}><Link to="/service-details" className={currentPath === "/service-details" ? "active" : ""}>Service Details</Link></li>
                                                            </ul>
                                                        </li>
                                                    );
                                                }
                                                if (isProject) {
                                                    return (
                                                        <li key={navItem.id} className={`menu-item-has-children ${isActive("/project") ? "active" : ""}`}>
                                                            <Link to={navItem.url} className={isActive("/project") ? "active" : ""}>{navItem.label.toUpperCase()}</Link>
                                                            <ul className="sub-menu">
                                                                <li className={currentPath === "/project" ? "active" : ""}><Link to="/project" className={currentPath === "/project" ? "active" : ""}>Project Page</Link></li>
                                                                <li className={currentPath === "/project-details" ? "active" : ""}><Link to="/project-details" className={currentPath === "/project-details" ? "active" : ""}>Project Details</Link></li>
                                                            </ul>
                                                        </li>
                                                    );
                                                }
                                                return (
                                                    <li key={navItem.id} className={isActive(navItem.url) ? "active" : ""}>
                                                        <Link to={navItem.url} className={isActive(navItem.url) ? "active" : ""}>{navItem.label.toUpperCase()}</Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </nav>

                                    {/* Mobile Hamburger Toggle */}
                                    <div className="navbar-right d-inline-flex d-lg-none">
                                        <button onClick={handleMobileMenuOpen} type="button" aria-label="Open menu" className="menu-toggle icon-btn"><i className="ri-menu-line"></i></button>
                                    </div>

                                    {/* Right Action Controls: Search + Vertical Divider + Grid */}
                                    <div className="d-none d-lg-flex align-items-center" style={{ gap: "20px" }}>

                                        {/* Search Icon */}
                                        <button
                                            onClick={handleSearchPopupOpen}
                                            type="button"
                                            aria-label="Search"
                                            style={{
                                                background: "none",
                                                border: "none",
                                                padding: 0,
                                                margin: 0,
                                                cursor: "pointer",
                                                color: "#15161c",
                                                fontSize: "20px",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                lineHeight: 1
                                            }}
                                        >
                                            <i className="ri-search-line" />
                                        </button>

                                        {/* Vertical Divider */}
                                        <div style={{ width: "1px", height: "24px", backgroundColor: "#e2e4e8" }} />

                                        {/* 9-Dot / 3x3 Grid Icon */}
                                        <button
                                            onClick={handleSideBarOpen}
                                            type="button"
                                            aria-label="Sidebar Menu"
                                            style={{
                                                background: "none",
                                                border: "none",
                                                padding: 0,
                                                margin: 0,
                                                cursor: "pointer",
                                                color: "#15161c",
                                                fontSize: "22px",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                lineHeight: 1
                                            }}
                                        >
                                            <i className="ri-grid-fill" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div >
    );
};

export default HeaderOne; 