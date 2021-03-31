import PropTypes from "prop-types";
import React from "react";
import { useLayoutStyles } from "../../styles.js";
import Navbar from "./Navbar.jsx";
import Seo from "./Seo.jsx";

const Layout = ({ children, title, isNavbarMinimal = false, marginTop = 60 }) => {
	const classes = useLayoutStyles();

	return (
		<section className={classes.section}>
			<Seo title={title} />
			<Navbar isNavbarMinimal={isNavbarMinimal} />
			<main className={classes.main} style={{ marginTop }}>
				<section className={classes.childrenWrapper}>
					<div className={classes.children}>{children}</div>
				</section>
			</main>
		</section>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string,
	isNavbarMinimal: PropTypes.bool,
	marginTop: PropTypes.number,
};

export default Layout;
