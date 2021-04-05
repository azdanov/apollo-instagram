import {
	Button,
	Drawer,
	Hidden,
	IconButton,
	List,
	ListItem,
	ListItemText,
	TextField,
	Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React from "react";
import PropTypes from "prop-types";
import Layout from "../components/shared/Layout.jsx";
import ProfilePicture from "../components/shared/ProfilePicture.jsx";
import { defaultCurrentUser } from "../data.js";
import { useEditProfilePageStyles } from "../styles.js";

const EditProfilePage = ({ history }) => {
	const pathname = history.location.pathname;
	const classes = useEditProfilePageStyles();
	const [showDrawer, setShowDrawer] = React.useState(false);

	const handleToggleDrawer = () => setShowDrawer((previous) => !previous);

	const handleSelected = (index) => {
		switch (index) {
			case 0:
				return pathname.includes("edit");
			default:
				break;
		}
	};

	const handleListClick = (index) => {
		switch (index) {
			case 0:
				return history.push("/accounts/edit");
			default:
				break;
		}
	};

	const options = [
		"Edit Profile",
		"Change Password",
		"Apps and Websites",
		"Email and SMS",
		"Push Notifications",
		"Manage Contacts",
		"Privacy and Security",
		"Login Activity",
		"Email from Instagram",
	];

	const DrawerList = () => (
		<List>
			{options.map((option, index) => (
				<ListItem
					key={option}
					button
					selected={handleSelected(index)}
					classes={{ selected: classes.listItemSelected, button: classes.listItemButton }}
					onClick={() => handleListClick(index)}
				>
					<ListItemText primary={option} />
				</ListItem>
			))}
		</List>
	);

	return (
		<Layout title="Edit Profile">
			<section className={classes.section}>
				<IconButton
					edge="start"
					className={classes.menuButton}
					onClick={handleToggleDrawer}
				>
					<Menu />
				</IconButton>
				<nav>
					<Hidden smUp implementation="css">
						<Drawer
							variant="temporary"
							anchor="left"
							open={showDrawer}
							classes={{ paperAnchorLeft: classes.temporaryDrawer }}
							onClose={handleToggleDrawer}
						>
							<DrawerList />
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation="css" className={classes.permanentDrawerRoot}>
						<Drawer
							variant="permanent"
							classes={{
								paper: classes.permanentDrawerPaper,
								root: classes.permanentDrawerRoot,
							}}
						>
							<DrawerList />
						</Drawer>
					</Hidden>
				</nav>
				<main>
					{pathname.includes("edit") && <EditUserInfo user={defaultCurrentUser} />}
				</main>
			</section>
		</Layout>
	);
};

EditProfilePage.propTypes = {
	history: PropTypes.object.isRequired,
};

const EditUserInfo = ({ user }) => {
	const classes = useEditProfilePageStyles();

	return (
		<section className={classes.container}>
			<div className={classes.pictureSectionItem}>
				<ProfilePicture image={user.profile_image} size={38} />
				<div className={classes.justifySelfStart}>
					<Typography className={classes.typography}>{user.username}</Typography>
					<Typography
						color="primary"
						variant="body2"
						className={classes.typographyChangePic}
					>
						Change Profile Photo
					</Typography>
				</div>
			</div>
			<form className={classes.form}>
				<SectionItem text="Name" formItem={user.name} />
				<SectionItem text="Username" formItem={user.username} />
				<SectionItem text="Website" formItem={user.website} />
				<div className={classes.sectionItem}>
					<aside>
						<Typography className={classes.typography}>Bio</Typography>
					</aside>
					<TextField
						fullWidth
						multiline
						variant="outlined"
						rowsMax={3}
						rows={3}
						value={user.bio}
					/>
				</div>
				<div className={classes.sectionItem}>
					<div />
					<Typography color="textSecondary" className={classes.justifySelfStart}>
						Personal Information
					</Typography>
				</div>
				<SectionItem text="Email" formItem={user.email} type="email" />
				<SectionItem text="Phone Number" formItem={user.phone_number} type="tel" />
				<div className={classes.sectionItem}>
					<div />
					<Button
						typoe="submit"
						variant="contained"
						color="primary"
						className={classes.justifySelfStart}
					>
						Submit
					</Button>
				</div>
			</form>
		</section>
	);
};

EditUserInfo.propTypes = {
	user: PropTypes.shape({
		id: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		profile_image: PropTypes.string.isRequired,
		website: PropTypes.string.isRequired,
		bio: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		phone_number: PropTypes.string.isRequired,
	}).isRequired,
};

const SectionItem = ({ type = "text", text, formItem }) => {
	const classes = useEditProfilePageStyles();

	return (
		<div className={classes.sectionItemWrapper}>
			<aside>
				<Hidden xsDown>
					<Typography className={classes.typography} align="right">
						{text}
					</Typography>
				</Hidden>
				<Hidden smUp>
					<Typography className={classes.form}>{text}</Typography>
				</Hidden>
			</aside>
			<TextField
				fullWidth
				variant="outlined"
				value={formItem}
				type={type}
				className={classes.textField}
				inputProps={{ className: classes.textFieldInput }}
			/>
		</div>
	);
};

SectionItem.propTypes = {
	type: PropTypes.oneOf(["text", "email", "tel"]),
	text: PropTypes.string.isRequired,
	formItem: PropTypes.string.isRequired,
};

export default EditProfilePage;
