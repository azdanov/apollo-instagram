import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router-dom";
import { useGridPostStyles } from "../../styles.js";

const GridPost = ({ post }) => {
	const history = useHistory();
	const classes = useGridPostStyles();

	const handleOpenPostModal = () => {
		history.push({
			pathname: `/p/${post.id}`,
			state: { modal: true },
		});
	};

	return (
		<div className={classes.gridPostContainer} onClick={handleOpenPostModal}>
			<div className={classes.gridPostOverlay}>
				<div className={classes.gridPostInfo}>
					<span className={classes.likes} />
					<Typography>{post.likes}</Typography>
				</div>
				<div className={classes.gridPostInfo}>
					<span className={classes.comments} />
					<Typography>{post.comments.length}</Typography>
				</div>
			</div>
			<img src={post.media} alt="Post cover" className={classes.image} />
		</div>
	);
};

GridPost.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.string.isRequired,
		likes: PropTypes.number.isRequired,
		media: PropTypes.string.isRequired,
		comments: PropTypes.array.isRequired,
	}).isRequired,
};

export default GridPost;
