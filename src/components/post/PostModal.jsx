import React from "react";
import Modal from "react-modal";
import { useHistory, useParams } from "react-router-dom";
import { CloseIcon } from "../../icons.jsx";
import { usePostModalStyles } from "../../styles.js";
import Post from "./Post.jsx";

const PostModal = () => {
	const { postId } = useParams();
	const history = useHistory();
	const classes = usePostModalStyles();

	const handleClose = () => {
		history.goBack();
	};

	return (
		<>
			<Modal
				isOpen
				ariaHideApp={false}
				overlayClassName={classes.overlay}
				style={{
					content: {
						display: "flex",
						alignItems: "center",
						maxWidth: 935,
						width: "100%",
						top: "50%",
						left: "50%",
						right: "auto",
						bottom: "auto",
						transform: "translate(-50%, -50%)",
						margin: 0,
						padding: 0,
						overflow: "none",
						WebkitOverflowScrolling: "touch",
					},
				}}
				onRequestClose={handleClose}
			>
				<Post id={postId} />
			</Modal>
			<div className={classes.close} onClick={handleClose}>
				<CloseIcon />
			</div>
		</>
	);
};

export default PostModal;
