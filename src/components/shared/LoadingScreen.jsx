import React from "react";
import { LogoLoadingIcon } from "../../icons.jsx";
import { useLoadingScreenStyles } from "../../styles.js";

const LoadingScreen = () => {
	const classes = useLoadingScreenStyles();

	return (
		<section className={classes.section}>
			<span>
				<LogoLoadingIcon />
			</span>
		</section>
	);
};

export default LoadingScreen;
