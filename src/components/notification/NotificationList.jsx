import { Avatar, Grid, Typography } from "@material-ui/core";
import useDidMount from "@rooks/use-did-mount";
import useOutsideClick from "@rooks/use-outside-click";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { defaultNotifications } from "../../data.js";
import { useNotificationListStyles } from "../../styles.js";
import FollowButton from "../shared/FollowButton.jsx";

const NotificationList = ({ handleHideList }) => {
	const classes = useNotificationListStyles();
	const listContainerRef = React.useRef();
	const [isActive, setIsActive] = React.useState(false);
	useDidMount(() => {
		setIsActive(true);
	});
	useOutsideClick(listContainerRef, handleHideList, isActive);

	return (
		<Grid ref={listContainerRef} container className={classes.listContainer}>
			{defaultNotifications.map((notification) => {
				const isLike = notification.type === "like";
				const isFollow = notification.type === "follow";

				return (
					<Grid key={notification.id} className={classes.listItem}>
						<div className={classes.listItemWrapper}>
							<div className={classes.avatarWrapper}>
								<Avatar src={notification.user.profile_image} alt="User avatar" />
							</div>
							<div className={classes.nameWrapper}>
								<Link to={`/${notification.user.username}`}>
									<Typography variant="body1">{notification.user.username}</Typography>
								</Link>
								<Typography
									variant="body2"
									color="textSecondary"
									className={classes.typography}
								>
									{isLike && "likes your photo. 4d"}
									{isFollow && "started following you. 5d"}
								</Typography>
							</div>
						</div>
						<div>
							{isLike && (
								<Link to={`/p/${notification.post.id}`}>
									<Avatar src={notification.post.media} alt="Post cover" />
								</Link>
							)}
							{isFollow && <FollowButton />}
						</div>
					</Grid>
				);
			})}
		</Grid>
	);
};

NotificationList.propTypes = {
	handleHideList: PropTypes.func.isRequired,
};

export default NotificationList;
