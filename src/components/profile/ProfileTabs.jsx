import { Divider, Hidden, Tab, Tabs, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { GridIcon, SaveIcon } from "../../icons.jsx";
import { useProfileTabsStyles } from "../../styles.js";
import GridPost from "../shared/GridPost.jsx";

const ProfileTabs = ({ user, isOwner }) => {
	const classes = useProfileTabsStyles();
	const [value, setValue] = React.useState(0);

	return (
		<section className={classes.section}>
			<Hidden xsDown>
				<Divider />
			</Hidden>
			<Hidden xsDown>
				<Tabs
					centered
					classes={{ indicator: classes.tabsIndicator }}
					value={value}
					onChange={(_, newValue) => setValue(newValue)}
				>
					<Tab
						icon={<span className={classes.postsIconLarge} />}
						label="POSTS"
						classes={{
							root: classes.tabRoot,
							labelIcon: classes.tabLabelIcon,
							wrapper: classes.tabWrapper,
						}}
					/>
					{isOwner && (
						<Tab
							icon={<span className={classes.savedIconLarge} />}
							label="SAVED"
							classes={{
								root: classes.tabRoot,
								labelIcon: classes.tabLabelIcon,
								wrapper: classes.tabWrapper,
							}}
						/>
					)}
				</Tabs>
			</Hidden>
			<Hidden smUp>
				<Tabs
					centered
					className={classes.tabs}
					classes={{ indicator: classes.tabsIndicator }}
					value={value}
					onChange={(_, newValue) => setValue(newValue)}
				>
					<Tab
						icon={<GridIcon fill={value === 0 ? "#3897f0" : null} />}
						classes={{ root: classes.tabRoot }}
					/>
					{isOwner && (
						<Tab
							icon={<SaveIcon fill={value === 1 ? "#3897f0" : null} />}
							classes={{ root: classes.tabRoot }}
						/>
					)}
				</Tabs>
			</Hidden>
			<Hidden smUp>{user.posts.length === 0 && <Divider />}</Hidden>
			{value === 0 && <ProfilePosts user={user} isOwner={isOwner} />}
			{value === 1 && <SavedPosts />}
		</section>
	);
};

ProfileTabs.propTypes = {
	user: PropTypes.shape({
		posts: PropTypes.array.isRequired,
	}).isRequired,
	isOwner: PropTypes.bool.isRequired,
};

const ProfilePosts = ({ user, isOwner }) => {
	const classes = useProfileTabsStyles();

	if (user.posts.length === 0) {
		return (
			<section className={classes.profilePostsSection}>
				<div className={classes.noContent}>
					<div className={classes.uploadPhotoIcon} />
					<Typography variant="h4">{isOwner ? "Upload a Photo" : "No Photos"}</Typography>
				</div>
			</section>
		);
	}

	return (
		<article className={classes.article}>
			<div className={classes.postContainer}>
				{user.posts.map((post) => (
					<GridPost key={post.id} post={post} />
				))}
			</div>
		</article>
	);
};

ProfilePosts.propTypes = {
	user: PropTypes.shape({
		posts: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				likes: PropTypes.number.isRequired,
				media: PropTypes.string.isRequired,
				comments: PropTypes.array.isRequired,
			}),
		).isRequired,
	}).isRequired,
	isOwner: PropTypes.bool.isRequired,
};

const SavedPosts = () => {
	const classes = useProfileTabsStyles();

	return (
		<section className={classes.savedPostsSection}>
			<div className={classes.noContent}>
				<div className={classes.savePhotoIcon} />
				<Typography variant="h4">Save</Typography>
				<Typography align="center">
					Save photos and videos that you want to see again. No one is notified, and only
					you can see what you&apos;ve saved.
				</Typography>
			</div>
		</section>
	);
};

export default ProfileTabs;
