import { Hidden } from "@material-ui/core";
import React from "react";
import FeedPostSkeleton from "../components/feed/FeedPostSkeleton.jsx";
import FeedSideSuggestions from "../components/feed/FeedSideSuggestions.jsx";
import Layout from "../components/shared/Layout.jsx";
import LoadingScreen from "../components/shared/LoadingScreen.jsx";
import UserCard from "../components/shared/UserCard.jsx";
import { getDefaultPost, getDefaultUser } from "../data.js";
import { LoadingLargeIcon } from "../icons.jsx";
import { useFeedPageStyles } from "../styles.js";

const FeedPost = React.lazy(() => import("../components/feed/FeedPost.jsx"));

const FeedPage = () => {
	const classes = useFeedPageStyles();
	const [isEndOfFeed] = React.useState(false);

	const loading = false;
	if (loading) {
		return <LoadingScreen />;
	}

	return (
		<Layout>
			<div className={classes.container}>
				<div>
					{Array.from({ length: 5 }, getDefaultPost).map((post, index) => (
						<React.Suspense key={post.id} fallback={<FeedPostSkeleton />}>
							<FeedPost post={post} index={index} />
						</React.Suspense>
					))}
				</div>
				<Hidden smDown>
					<div className={classes.sidebarContainer}>
						<div className={classes.sidebarWrapper}>
							<UserCard user={getDefaultUser()} avatarSize={50} />
							<FeedSideSuggestions />
						</div>
					</div>
				</Hidden>
				{!isEndOfFeed && <LoadingLargeIcon />}
			</div>
		</Layout>
	);
};

export default FeedPage;
