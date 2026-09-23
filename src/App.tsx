import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeOne from "./sections/pages/HomeOne";
import About from "./sections/pages/About";
import Service from "./sections/pages/Service";
import ServiceDetails from "./sections/pages/ServiceDetails";
import Project from "./sections/pages/Project";
import ProjectDetails from "./sections/pages/ProjectDetails";
import Contact from "./sections/pages/Contact";
import AdminLayout from "./admin/AdminLayout";
import { ContentProvider } from "./admin/ContentContext";
import { AuthProvider } from "./auth/AuthContext";
import AuthPage from "./sections/pages/AuthPage";
import Account from "./sections/pages/Account";

const router = createBrowserRouter([
	{ path: "/", element: <HomeOne /> },
	{ path: "/home-1", element: <HomeOne /> },
	{ path: "/about", element: <About /> },
	{ path: "/service", element: <Service /> },
	{ path: "/service-details", element: <ServiceDetails /> },
	{ path: "/project", element: <Project /> },
	{ path: "/project-details", element: <ProjectDetails /> },
	{ path: "/contact", element: <Contact /> },
	{ path: "/login", element: <AuthPage mode="login" /> },
	{ path: "/register", element: <AuthPage mode="register" /> },
	{ path: "/account", element: <Account /> },
	{ path: "/admin", element: <AdminLayout /> },
]);

function App() {
	return (
		<AuthProvider>
			<ContentProvider>
				<RouterProvider router={router} />
			</ContentProvider>
		</AuthProvider>
	);
}

export default App;
