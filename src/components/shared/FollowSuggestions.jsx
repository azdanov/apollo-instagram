import { Avatar, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { getDefaultUser } from "../../data.js";
import { LoadingLargeIcon } from "../../icons.jsx";
import { useFollowSuggestionsStyles } from "../../styles.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import FollowButton from "./FollowButton.jsx";

const FollowSuggestions = ({ hasHiddenHeader = false }) => {
	const classes = useFollowSuggestionsStyles();

	const loading = false;

	return (
		<div className={classes.container}>
			{!hasHiddenHeader && (
				<Typography
					color="textSecondary"
					variant="subtitle2"
					className={classes.typography}
				>
					Suggestions For You
				</Typography>
			)}
			{loading ? (
				<LoadingLargeIcon />
			) : (
				<Slider
					infinite
					variableWidth
					swipeToSlide
					arrows
					className={classes.slide}
					dots={false}
					speed={1000}
					touchThreshold={1000}
					slidesToScroll={3}
					easing="ease-in-out"
				>
					{Array.from({ length: 10 }, getDefaultUser).map((user) => (
						<FollowSuggestionsItem key={user.id} user={user} />
					))}
				</Slider>
			)}
		</div>
	);
};

FollowSuggestions.propTypes = {
	hasHiddenHeader: PropTypes.bool,
};

const FollowSuggestionsItem = ({ user }) => {
	const classes = useFollowSuggestionsStyles();

	return (
		<div>
			<div className={classes.card}>
				<Link to={`/${user.username}`}>
					<Avatar
						src={user.profile_image}
						alt={`${user.username}'s profile`}
						classes={{ root: classes.avatar, img: classes.avatarImg }}
					/>
				</Link>
				<Link to={`/${user.username}`}>
					<Typography variant="subtitle2" className={classes.text} align="center">
						{user.username}
					</Typography>
					<Typography
						color="textSecondary"
						variant="body2"
						className={classes.text}
						align="center"
					>
						{user.name}
					</Typography>
					<FollowButton />
				</Link>
			</div>
		</div>
	);
};

FollowSuggestionsItem.propTypes = {
	user: PropTypes.shape({
		id: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		profile_image: PropTypes.string.isRequired,
	}).isRequired,
};

export default FollowSuggestions;
