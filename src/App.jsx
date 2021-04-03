import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import PostModal from "./components/post/PostModal.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
import FeedPage from "./pages/FeedPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SignUpPage from "./pages/SignupPage.jsx";

const App = () => {
	const history = useHistory();
	const location = useLocation();
	const previousLocation = React.useRef(location);
	const modal = location.state?.modal;

	React.useEffect(() => {
		if (history.action !== "POP" && !modal) {
			previousLocation.current = location;
		}
	}, [history.action, location, modal]);

	const isModalOpen = modal && previousLocation.current !== location;

	return (
		<>
			<Switch location={isModalOpen ? previousLocation.current : location}>
				<Route exact path="/" component={FeedPage} />
				<Route path="/explore" component={ExplorePage} />
				<Route exact path="/:username" component={ProfilePage} />
				<Route exact path="/p/:postId" component={PostPage} />
				<Route path="/accounts/edit" component={EditProfilePage} />
				<Route path="/accounts/login" component={LoginPage} />
				<Route path="/accounts/emailsignup" component={SignUpPage} />
				<Route path="*" component={NotFoundPage} />
			</Switch>
			{isModalOpen && <Route exact path="/p/:postId" component={PostModal} />}
		</>
	);
};

export default App;
