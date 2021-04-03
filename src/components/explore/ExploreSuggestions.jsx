import { Hidden, Typography } from "@material-ui/core";
import React from "react";
import { useExploreSuggestionsStyles } from "../../styles.js";
import FollowSuggestions from "../shared/FollowSuggestions.jsx";

const ExploreSuggestions = () => {
	const classes = useExploreSuggestionsStyles();

	return (
		<Hidden xsDown>
			<div className={classes.container}>
				<Typography
					color="textSecondary"
					variant="subtitle2"
					component="h2"
					className={classes.typography}
				>
					Discover People
					<FollowSuggestions hasHiddenHeader />
				</Typography>
			</div>
		</Hidden>
	);
};

export default ExploreSuggestions;
