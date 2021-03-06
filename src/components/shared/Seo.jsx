import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";

const Seo = ({ title }) => {
	const titleText = title ? `${title} · Instagram` : "Instagram";

	return (
		<Helmet>
			<title>{titleText}</title>
		</Helmet>
	);
};

Seo.propTypes = {
	title: PropTypes.string,
};

export default Seo;
