import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditProfilePage from "./pages/EditProfile.jsx";
import ExplorePage from "./pages/Explore.jsx";
import FeedPage from "./pages/Feed.jsx";
import LoginPage from "./pages/Login.jsx";
import NotFoundPage from "./pages/NotFound.jsx";
import PostPage from "./pages/Post.jsx";
import ProfilePage from "./pages/Profile.jsx";
import SignUpPage from "./pages/Signup.jsx";

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={FeedPage} />
				<Route path="/explore" component={ExplorePage} />
				<Route exact path="/:username" component={ProfilePage} />
				<Route exact path="/p/:postId" component={PostPage} />
				<Route path="/accounts/edit" component={EditProfilePage} />
				<Route path="/accounts/login" component={LoginPage} />
				<Route path="/accounts/emailsignup" component={SignUpPage} />
				<Route path="*" component={NotFoundPage} />
			</Switch>
		</Router>
	);
};

export default App;
