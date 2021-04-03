import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/shared/Layout.jsx";

const NotFoundPage = () => {
	return (
		<Layout isNavbarMinimal title="Page Not Found" marginTop={120}>
			<Typography paragraph variant="h5" align="center">
				Sorry, this page isn&apos;t available
			</Typography>
			<Typography align="center">
				The link you followed may be broken, or the page may have been removed.{" "}
				<Link to="/">
					<Typography color="primary" component="span">
						Go back to Apollo Instagram
					</Typography>
				</Link>
			</Typography>
		</Layout>
	);
};

export default NotFoundPage;
