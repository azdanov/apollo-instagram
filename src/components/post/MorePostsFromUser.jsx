import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { defaultUser, getDefaultPost } from "../../data.js";
import { LoadingLargeIcon } from "../../icons.jsx";
import { useMorePostsFromUserStyles } from "../../styles.js";
import GridPost from "../shared/GridPost.jsx";

const MorePostsFromUser = () => {
	const classes = useMorePostsFromUserStyles();
	const loading = false;

	return (
		<div className={classes.container}>
			<Typography
				gutterBottom
				color="textSecondary"
				variant="subtitle2"
				component="h2"
				className={classes.typography}
			>
				More Posts from{" "}
				<Link to={`/${defaultUser.username}`} className={classes.link}>
					@{defaultUser.username}
				</Link>
			</Typography>
			{loading ? (
				<LoadingLargeIcon />
			) : (
				<article className={classes.article}>
					<div className={classes.postContainer}>
						{Array.from({ length: 6 }, getDefaultPost).map((post) => (
							<GridPost key={post.id} post={post} />
						))}
					</div>
				</article>
			)}
		</div>
	);
};

export default MorePostsFromUser;
