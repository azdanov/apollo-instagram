import {
	Avatar,
	Button,
	Card,
	CardContent,
	Dialog,
	DialogTitle,
	Divider,
	Hidden,
	Typography,
	Zoom,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import ProfileTabs from "../components/profile/ProfileTabs.jsx";
import Layout from "../components/shared/Layout.jsx";
import ProfilePicture from "../components/shared/ProfilePicture.jsx";
import { defaultCurrentUser } from "../data.js";
import { GearIcon } from "../icons.jsx";
import { useProfilePageStyles } from "../styles.js";

const ProfilePage = () => {
	const classes = useProfilePageStyles();
	const [showOptionsMenu, setShowOptionsMenu] = React.useState(false);
	const isOwner = true;

	const user = defaultCurrentUser;

	const handleOpenOptionsMenu = () => {
		setShowOptionsMenu(true);
	};

	const handleCloseOptionsMenu = () => {
		setShowOptionsMenu(false);
	};

	return (
		<Layout title={`${user.name} (@${user.username})`}>
			<div className={classes.container}>
				<Hidden xsDown>
					<Card className={classes.cardLarge}>
						<ProfilePicture isOwner={isOwner} />
						<CardContent className={classes.cardContentLarge}>
							<ProfileNameSection
								user={user}
								isOwner={isOwner}
								handleOpenOptionsMenu={handleOpenOptionsMenu}
							/>
							<PostCountSection user={user} />
							<NameBioSection user={user} />
						</CardContent>
					</Card>
				</Hidden>
				<Hidden smUp>
					<Card className={classes.cardSmall}>
						<CardContent>
							<section className={classes.sectionSmall}>
								<ProfilePicture size={77} isOwner={isOwner} />
								<ProfileNameSection
									user={user}
									isOwner={isOwner}
									handleOpenOptionsMenu={handleOpenOptionsMenu}
								/>
							</section>
							<NameBioSection user={user} />
						</CardContent>
						<PostCountSection user={user} />
					</Card>
				</Hidden>
				{showOptionsMenu && (
					<OptionsMenu handleCloseOptionsMenu={handleCloseOptionsMenu} />
				)}
				<ProfileTabs user={user} isOwner={isOwner} />
			</div>
		</Layout>
	);
};

const ProfileNameSection = ({ user, handleOpenOptionsMenu, isOwner = false }) => {
	const classes = useProfilePageStyles();
	const [showUnfollowDialog, setShowUnfollowDialog] = React.useState(false);

	let FollowButton;
	const isFollowing = false;
	const isFollower = false;

	if (isFollowing) {
		FollowButton = () => (
			<Button
				variant="outlined"
				className={classes.button}
				onClick={() => setShowUnfollowDialog(true)}
			>
				Following
			</Button>
		);
	} else if (isFollower) {
		FollowButton = () => (
			<Button variant="contained" color="primary" className={classes.button}>
				Follow Back
			</Button>
		);
	} else {
		FollowButton = () => (
			<Button variant="outlined" color="primary" className={classes.button}>
				Follow
			</Button>
		);
	}

	return (
		<>
			<Hidden xsDown>
				<section className={classes.usernameSection}>
					<Typography className={classes.username}>{user.username}</Typography>
					{isOwner ? (
						<>
							<Link to="/accounts/edit">
								<Button variant="outlined">Edit Profile</Button>
							</Link>
							<div className={classes.settingsWrapper} onClick={handleOpenOptionsMenu}>
								<GearIcon className={classes.settings} />
							</div>
						</>
					) : (
						<FollowButton />
					)}
				</section>
			</Hidden>
			<Hidden smUp>
				<section>
					<div className={classes.usernameDivSmall}>
						<Typography className={classes.username}>{user.username}</Typography>
						{isOwner && (
							<div className={classes.settingsWrapper} onClick={handleOpenOptionsMenu}>
								<GearIcon className={classes.settings} />
							</div>
						)}
					</div>
					{isOwner ? (
						<Link to="/accounts/edit">
							<Button fullWidth variant="outlined">
								Edit Profile
							</Button>
						</Link>
					) : (
						<FollowButton />
					)}
				</section>
			</Hidden>
			{showUnfollowDialog && (
				<UnfollowDialog user={user} onClose={() => setShowUnfollowDialog(false)} />
			)}
		</>
	);
};

ProfileNameSection.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string.isRequired,
	}).isRequired,
	handleOpenOptionsMenu: PropTypes.func.isRequired,
	isOwner: PropTypes.bool,
};

const UnfollowDialog = ({ user, onClose }) => {
	const classes = useProfilePageStyles();

	return (
		<Dialog
			open
			classes={{
				scrollPaper: classes.unfollowDialogScrollPaper,
			}}
			TransitionComponent={Zoom}
			onClose={onClose}
		>
			<div className={classes.wrapper}>
				<Avatar
					src={user.profile_image}
					alt={`${user.username}'s avatar`}
					className={classes.avatar}
				/>
			</div>
			<Typography align="center" variant="body2" className={classes.unfollowDialogText}>
				Unfollow @{user.username}?
			</Typography>
			<Divider />
			<Button className={classes.unfollowButton}>Unfollow</Button>
			<Divider />
			<Button className={classes.cancelButton} onClick={onClose}>
				Cancel
			</Button>
		</Dialog>
	);
};

UnfollowDialog.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string.isRequired,
		profile_image: PropTypes.string.isRequired,
	}).isRequired,
	onClose: PropTypes.func.isRequired,
};

const PostCountSection = ({ user }) => {
	const classes = useProfilePageStyles();
	const options = ["posts", "followers", "following"];

	return (
		<>
			<Hidden smUp>
				<Divider />
			</Hidden>
			<section className={classes.followingSection}>
				{options.map((option) => (
					<div key={option} className={classes.followingText}>
						<Typography className={classes.followingCount}>
							{user[option].length}
						</Typography>
						<Hidden xsDown>
							<Typography>{option}</Typography>
						</Hidden>
						<Hidden smUp>
							<Typography color="textSecondary">{option}</Typography>
						</Hidden>
					</div>
				))}
			</section>
			<Hidden smUp>
				<Divider />
			</Hidden>
		</>
	);
};

PostCountSection.propTypes = {
	user: PropTypes.shape({
		posts: PropTypes.array.isRequired,
		followers: PropTypes.array.isRequired,
		following: PropTypes.array.isRequired,
	}).isRequired,
};

const NameBioSection = ({ user }) => {
	const classes = useProfilePageStyles();

	return (
		<section className={classes.section}>
			<Typography className={classes.typography}>{user.name}</Typography>
			<Typography>{user.bio}</Typography>
			<a href={user.website} target="_blank" rel="noopener noreferrer">
				<Typography color="secondary" className={classes.typography}>
					{user.website}
				</Typography>
			</a>
		</section>
	);
};

NameBioSection.propTypes = {
	user: PropTypes.shape({
		name: PropTypes.string.isRequired,
		bio: PropTypes.string.isRequired,
		website: PropTypes.string.isRequired,
	}).isRequired,
};

const OptionsMenu = ({ handleCloseOptionsMenu }) => {
	const classes = useProfilePageStyles();
	const [showLogOutMessage, setShowLogOutMessage] = React.useState(false);

	const handleLogOutClick = () => {
		setShowLogOutMessage(true);
	};

	return (
		<Dialog
			open
			classes={{ scrollPaper: classes.dialogScrollPaper, paper: classes.dialogPaper }}
			TransitionComponent={Zoom}
			onClose={handleCloseOptionsMenu}
		>
			{showLogOutMessage ? (
				<DialogTitle className={classes.dialogTitle}>
					Logging Out
					<Typography color="textSecondary">
						You need to log back in to continue using Instagram.
					</Typography>
				</DialogTitle>
			) : (
				<>
					<OptionsItem text="Change Password" onClick={() => {}} />
					<OptionsItem text="Nametag" onClick={() => {}} />
					<OptionsItem text="Authorized Apps" onClick={() => {}} />
					<OptionsItem text="Notifications" onClick={() => {}} />
					<OptionsItem text="Privacy and Security" onClick={() => {}} />
					<OptionsItem text="Log Out" onClick={handleLogOutClick} />
					<OptionsItem text="Cancel" onClick={handleCloseOptionsMenu} />
				</>
			)}
		</Dialog>
	);
};

OptionsMenu.propTypes = {
	handleCloseOptionsMenu: PropTypes.func.isRequired,
};

const OptionsItem = ({ text, onClick }) => {
	return (
		<>
			<Button style={{ padding: "12px 8px" }} onClick={onClick}>
				{text}
			</Button>
			<Divider />
		</>
	);
};

OptionsItem.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default ProfilePage;
