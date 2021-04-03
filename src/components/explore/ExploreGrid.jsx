import { Typography } from "@material-ui/core";
import React from "react";
import { getDefaultPost } from "../../data.js";
import { LoadingLargeIcon } from "../../icons.jsx";
import { useExploreGridStyles } from "../../styles.js";
import GridPost from "../shared/GridPost.jsx";

const ExploreGrid = () => {
	const classes = useExploreGridStyles();
	const loading = false;

	return (
		<Typography
			gutterBottom
			color="textSecondary"
			variant="subtitle2"
			component="h2"
			className={classes.typography}
		>
			{loading ? (
				<LoadingLargeIcon />
			) : (
				<article className={classes.article}>
					<div className={classes.postContainer}>
						{Array.from({ length: 20 }, getDefaultPost).map((post) => (
							<GridPost key={post.id} post={post} />
						))}
					</div>
				</article>
			)}
		</Typography>
	);
};

export default ExploreGrid;
