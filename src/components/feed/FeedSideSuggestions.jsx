import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { getDefaultUser } from "../../data.js";
import { LoadingIcon } from "../../icons.jsx";
import { useFeedSideSuggestionsStyles } from "../../styles.js";
import FollowButton from "../shared/FollowButton.jsx";
import UserCard from "../shared/UserCard.jsx";

const FeedSideSuggestions = () => {
	const classes = useFeedSideSuggestionsStyles();

	const loading = false;

	return (
		<article className={classes.article}>
			<Paper className={classes.paper}>
				<Typography
					gutterBottom
					color="textSecondary"
					variant="subtitle2"
					component="h2"
					align="left"
					className={classes.typography}
				>
					Suggestions For You
				</Typography>
				{loading ? (
					<LoadingIcon />
				) : (
					Array.from({ length: 5 }, getDefaultUser).map((user) => (
						<div key={user.id} className={classes.card}>
							<UserCard user={user} />
							<FollowButton isSide />
						</div>
					))
				)}
			</Paper>
		</article>
	);
};

export default FeedSideSuggestions;
