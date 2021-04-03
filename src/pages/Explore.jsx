import React from "react";
import ExploreGrid from "../components/explore/ExploreGrid.jsx";
import ExploreSuggestions from "../components/explore/ExploreSuggestions.jsx";
import Layout from "../components/shared/Layout.jsx";

const ExplorePage = () => {
	return (
		<Layout>
			<ExploreSuggestions />
			<ExploreGrid />
		</Layout>
	);
};

export default ExplorePage;
