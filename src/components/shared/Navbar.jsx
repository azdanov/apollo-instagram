import {
	AppBar,
	Avatar,
	Fade,
	Grid,
	Hidden,
	InputBase,
	Typography,
	Zoom,
} from "@material-ui/core";
import { useNProgress } from "@tanem/react-nprogress";
import PropTypes from "prop-types";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { defaultCurrentUser, getDefaultUser } from "../../data.js";
import {
	AddIcon,
	ExploreActiveIcon,
	ExploreIcon,
	HomeActiveIcon,
	HomeIcon,
	LikeActiveIcon,
	LikeIcon,
	LoadingIcon,
} from "../../icons.jsx";
import logo from "../../images/logo.png";
import { RedTooltip, useNavbarStyles, WhiteTooltip } from "../../styles.js";
import NotificationList from "../notification/NotificationList.jsx";
import NotificationTooltip from "../notification/NotificationTooltip.jsx";

const Navbar = ({ isNavbarMinimal }) => {
	const classes = useNavbarStyles();
	const history = useHistory();
	const [isLoading, setIsLoading] = React.useState(true);

	const path = history.location.pathname;

	React.useEffect(() => {
		setIsLoading(false);
	}, [path]);

	return (
		<>
			<Progress isAnimating={isLoading} />
			<AppBar className={classes.appBar}>
				<section className={classes.section}>
					<Logo />
					{!isNavbarMinimal && (
						<>
							<Search />
							<Links path={path} />
						</>
					)}
				</section>
			</AppBar>
		</>
	);
};

Navbar.propTypes = {
	isNavbarMinimal: PropTypes.bool,
};

const Progress = ({ isAnimating }) => {
	const classes = useNavbarStyles();
	const { animationDuration, isFinished, progress } = useNProgress({ isAnimating });

	return (
		<div
			className={classes.progressContainer}
			style={{
				opacity: isFinished ? 0 : 1,
				transition: `opacity ${animationDuration}ms linear`,
			}}
		>
			<div
				className={classes.progressBar}
				style={{
					marginLeft: `${(-1 + progress) * 100}%`,
					transition: `margin-left ${animationDuration}ms linear`,
				}}
			>
				<div className={classes.progressBackground} />
			</div>
		</div>
	);
};

Progress.propTypes = {
	isAnimating: PropTypes.bool.isRequired,
};

const Logo = () => {
	const classes = useNavbarStyles();

	return (
		<div className={classes.logoContainer}>
			<Link to="/">
				<div className={classes.logoWrapper}>
					<img src={logo} alt="Instagram" className={classes.logo} />
				</div>
			</Link>
		</div>
	);
};

const Search = () => {
	const classes = useNavbarStyles();
	const history = useHistory();
	const [loading, setLoading] = React.useState(false);
	const [results, setResults] = React.useState([]);
	const [query, setQuery] = React.useState("");

	const hasResults = Boolean(query) && results.length > 0;

	React.useEffect(() => {
		if (!query.trim) return;

		setResults(Array.from({ length: 5 }, getDefaultUser));
	}, [query]);

	const handleClearInput = () => {
		setQuery("");
	};

	return (
		<Hidden xsDown>
			<WhiteTooltip
				arrow
				interactive
				TransitionComponent={Fade}
				open={hasResults}
				title={
					hasResults && (
						<Grid container className={classes.resultContainer}>
							{results.map((result) => (
								<Grid
									key={result.id}
									item
									className={classes.resultLink}
									onClick={() => {
										history.push(`/${result.username}`);
										handleClearInput();
									}}
								>
									<div className={classes.resultWrapper}>
										<div className={classes.avatarWrapper}>
											<Avatar src={result.profile_image} alt="User avatar" />
										</div>
										<div className={classes.nameWrapper}>
											<Typography variant="body1">{result.username}</Typography>
											<Typography variant="body2" color="textSecondary">
												{result.name}
											</Typography>
										</div>
									</div>
								</Grid>
							))}
						</Grid>
					)
				}
			>
				<InputBase
					className={classes.input}
					startAdornment={<span className={classes.searchIcon} />}
					endAdornment={
						loading ? (
							<LoadingIcon />
						) : (
							<span className={classes.clearIcon} onClick={handleClearInput} />
						)
					}
					placeholder="Search"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
				/>
			</WhiteTooltip>
		</Hidden>
	);
};

const Links = ({ path }) => {
	const classes = useNavbarStyles();
	const [showList, setShowList] = React.useState(false);
	const [showTooltip, setShowTooltip] = React.useState(true);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			handleHideTooltip();
		}, 5000);
		return () => {
			clearTimeout(timeout);
		};
	}, []);

	const handleToggleList = () => {
		setShowList((previousShowList) => !previousShowList);
	};

	const handleHideTooltip = () => {
		setShowTooltip(false);
	};

	const handleHideList = () => {
		setShowList(false);
	};

	return (
		<div className={classes.linksContainer}>
			{showList && <NotificationList handleHideList={handleHideList} />}
			<div className={classes.linksWrapper}>
				<Hidden xsDown>
					<AddIcon />
				</Hidden>
				<Link to="/">{path === "/" ? <HomeActiveIcon /> : <HomeIcon />}</Link>
				<Link to="/explore">
					{path === "/explore" ? <ExploreActiveIcon /> : <ExploreIcon />}
				</Link>
				<RedTooltip
					arrow
					open={showTooltip}
					TransitionComponent={Zoom}
					title={<NotificationTooltip />}
					onOpen={handleHideTooltip}
				>
					<div className={classes.notifications} onClick={handleToggleList}>
						{showList ? <LikeActiveIcon /> : <LikeIcon />}
					</div>
				</RedTooltip>
				<Link to={`/${defaultCurrentUser.username}`}>
					<div
						className={
							path === `/${defaultCurrentUser.username}` ? classes.profileActive : null
						}
					/>
					<Avatar
						src={defaultCurrentUser.profile_image}
						className={classes.profileImage}
					/>
				</Link>
			</div>
		</div>
	);
};

Links.propTypes = {
	path: PropTypes.string.isRequired,
};

export default Navbar;
