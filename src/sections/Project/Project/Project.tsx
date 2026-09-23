// import { useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../../../admin/ContentContext";
import { useLanguage } from "../../../i18n/LanguageContext";

const ProjectArea = () => {
	const { tr } = useLanguage();
	const { content } = useContent();
	const projects = content.projectsPage.projects;

	return (
		<section className="project-page space-top space-extra-bottom">
			<div className="container">
				<div className="row gy-40 justify-content-center">
					{projects.map((project, index) => (
						<div className="col-md-6 col-lg-4" key={index}>
							<div className="portfolio-card style2" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
								<div className="portfolio-card-thumb">
									<img src={project.image} alt={project.title} />
									<span className="portfolio-card-number">0{index + 1}</span>
									<button className="icon-btn popup-image">
										<i className="ri-eye-line"></i>
									</button>
								</div>
								<div className="portfolio-card-details" style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
									<div>
										<span className="portfolio-card-subtitle">{project.location}</span>
										<h4 className="portfolio-card-title">
											<Link to="/project-details">{project.title}</Link>
										</h4>
										<p className="portofolio-card-text">
											{project.location}
										</p>
									</div>
									<Link to="/project-details" className="btn-with-icon" style={{ marginTop: "15px" }}>
										{tr("VIEW DETAILS")}
										<span className="btn-icon">
											<i className="ri-arrow-right-up-line"></i>
										</span>
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="pagination justify-content-center">
					<ul>
						<li>
							<Link className="active" to="/project">
								01
							</Link>
						</li>
					</ul>
				</div>
			</div>
			{/* {photoIndex !== null && (
				<Lightbox
					open={photoIndex !== null}
					close={() => setPhotoIndex(null)}
					slides={slides}
					index={photoIndex}
					on={{
						view: ({ index }) => setPhotoIndex(index),
					}}
				/>
			)} */}
		</section>
	);
};

export default ProjectArea;
