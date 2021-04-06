import { Person } from "@material-ui/icons";
import React from "react";
import { useProfilePictureStyles } from "../../styles.js";
import PropTypes from "prop-types";

const ProfilePicture = ({
	size,
	image = "https://i.pravatar.cc/300",
	isOwner = false,
}) => {
	const classes = useProfilePictureStyles({ size, isOwner });

	return (
		<section className={classes.section}>
			<div className={classes.wrapper}>
				{image ? (
					<img src={image} alt="User profile" className={classes.image} />
				) : (
					<Person className={classes.person} />
				)}
			</div>
		</section>
	);
};

ProfilePicture.propTypes = {
	size: PropTypes.number,
	image: PropTypes.string,
	isOwner: PropTypes.bool,
};

export default ProfilePicture;
