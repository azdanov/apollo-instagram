import React from "react";
import Layout from "../components/shared/Layout.jsx";
import { useProfilePageStyles } from "../styles.js";

const ProfilePage = () => {
	useProfilePageStyles();

	return <Layout>ProfilePage</Layout>;
};

export default ProfilePage;
