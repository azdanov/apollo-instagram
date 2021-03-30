import { Button } from "@material-ui/core";
import * as PropTypes from "prop-types";
import React from "react";
import { useFollowButtonStyles } from "../../styles.js";

const FollowButton = ({ isSide = false }) => {
	const classes = useFollowButtonStyles({ isSide });
	const [isFollowing, setIsFollowing] = React.useState(false);

	const followButton = (
		<Button
			fullWidth
			variant={isSide ? "text" : "contained"}
			color="primary"
			className={classes.button}
			onClick={() => setIsFollowing(true)}
		>
			Follow
		</Button>
	);

	const followingButton = (
		<Button
			fullWidth
			variant={isSide ? "text" : "outlined"}
			className={classes.button}
			onClick={() => setIsFollowing(false)}
		>
			Following
		</Button>
	);

	return isFollowing ? followingButton : followButton;
};

FollowButton.propTypes = {
	isSide: PropTypes.bool,
};

export default FollowButton;
