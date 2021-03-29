import { AppBar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { useNavbarStyles } from "../../styles.js";

const Navbar = () => {
	const classes = useNavbarStyles();

	return (
		<AppBar className={classes.appBar}>
			<section className={classes.section}>
				<Logo />
			</section>
		</AppBar>
	);
};

const Logo = () => {
	const classes = useNavbarStyles();

	return (
		<div className={classes.logoContainer}>
			<Link to="/">
				<div className={classes.logoWrapper}>
					<img src={logo} alt="Apollo Instagram" className={classes.logo} />
				</div>
			</Link>
		</div>
	);
};

export default Navbar;
