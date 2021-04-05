import { Button, Card, CardHeader, TextField, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/shared/Seo.jsx";
import FacebookIconBlue from "../images/facebook-icon-blue.svg";
import FacebookIconWhite from "../images/facebook-icon-white.png";
import { useLoginPageStyles } from "../styles.js";

const LoginPage = () => {
	const classes = useLoginPageStyles();

	return (
		<>
			<Seo title="Login" />
			<section className={classes.section}>
				<article>
					<Card className={classes.card}>
						<CardHeader className={classes.cardHeader} />
						<form>
							<TextField
								fullWidth
								variant="filled"
								label="Username"
								margin="dense"
								className={classes.textField}
								autoComplete="username"
							/>
							<TextField
								fullWidth
								variant="filled"
								label="Password"
								type="password"
								margin="dense"
								className={classes.textField}
								autoComplete="current-password"
							/>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.button}
								type="submit"
							>
								Log in
							</Button>
						</form>
						<div className={classes.orContainer}>
							<div className={classes.orLine} />
							<div>
								<Typography variant="body2" color="textSecondary">
									OR
								</Typography>
							</div>
							<div className={classes.orLine} />
						</div>
						<LoginWithFacebook color="secondary" iconColor="blue" />
						<Button fullWidth color="secondary">
							<Typography variant="caption">Forgot password?</Typography>
						</Button>
					</Card>
					<Card className={classes.signUpCard}>
						<Typography align="right" variant="body2">
							Don&apos;t have an account?
						</Typography>
						<Link to="/accounts/emailsignup">
							<Button color="primary" className={classes.button}>
								Sign up
							</Button>
						</Link>
					</Card>
				</article>
			</section>
		</>
	);
};

export const LoginWithFacebook = ({ color, iconColor, variant }) => {
	const classes = useLoginPageStyles();
	const facebookIcon = iconColor === "blue" ? FacebookIconBlue : FacebookIconWhite;

	return (
		<Button fullWidth color={color} variant={variant}>
			<img src={facebookIcon} alt="Facebook" className={classes.facebookIcon} />
			Log In With Facebook
		</Button>
	);
};

LoginWithFacebook.propTypes = {
	color: PropTypes.string.isRequired,
	iconColor: PropTypes.string.isRequired,
	variant: PropTypes.string,
};

export default LoginPage;
