import { Button, Dialog, Divider, Zoom } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { defaultPost } from "../../data.js";
import { useOptionsDialogStyles } from "../../styles.js";

const OptionsDialog = ({ onClose }) => {
	const classes = useOptionsDialogStyles();

	return (
		<Dialog
			open
			classes={{ scrollPaper: classes.dialogScrollPaper }}
			TransitionComponent={Zoom}
			onClose={onClose}
		>
			<Button className={classes.redButton}>Unfollow</Button>
			<Divider />
			<Button className={classes.button}>
				<Link to={`/p/${defaultPost.id}`}>Go to post</Link>
			</Button>
			<Divider />
			<Button className={classes.button}>
				<Link>Share</Link>
			</Button>
			<Divider />
			<Button className={classes.button}>
				<Link>Copy Link</Link>
			</Button>
			<Divider />
			<Button className={classes.button} onClick={onClose}>
				<Link>Cancel</Link>
			</Button>
		</Dialog>
	);
};

OptionsDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default OptionsDialog;
