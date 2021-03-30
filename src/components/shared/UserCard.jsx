import { Avatar, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { useUserCardStyles } from "../../styles.js";

const UserCard = ({ user, avatarSize = 44 }) => {
	const classes = useUserCardStyles({ avatarSize });

	return (
		<div className={classes.wrapper}>
			<Link to={`/${user.username}`}>
				<Avatar src={user.profile_image} alt="User avatar" className={classes.avatar} />
			</Link>
			<div className={classes.nameWrapper}>
				<Link to={`/${user.username}`}>
					<Typography variant="subtitle2" className={classes.typography}>
						{user.username}
					</Typography>
				</Link>
				<Typography color="textSecondary" variant="body2" className={classes.typography}>
					{user.name}
				</Typography>
			</div>
		</div>
	);
};

UserCard.propTypes = {
	user: PropTypes.shape({
		id: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		profile_image: PropTypes.string.isRequired,
	}).isRequired,
	avatarSize: PropTypes.number,
};

export default UserCard;
