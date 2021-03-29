import { Button, Card, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/shared/Seo.jsx";
import { useSignUpPageStyles } from "../styles.js";
import { LoginWithFacebook } from "./Login.jsx";

const SignUpPage = () => {
	const classes = useSignUpPageStyles();

	return (
		<>
			<Seo title="Sign up" />
			<section className={classes.section}>
				<article>
					<Card className={classes.card}>
						<div className={classes.cardHeader} />
						<Typography className={classes.cardHeaderSubHeader}>
							Sign up to see photos and videos from your friends.
						</Typography>
						<LoginWithFacebook color="primary" iconColor="white" variant="contained" />
						<div className={classes.orContainer}>
							<div className={classes.orLine} />
							<div>
								<Typography variant="body2" color="textSecondary">
									OR
								</Typography>
							</div>
							<div className={classes.orLine} />
						</div>
						<form action="">
							<TextField
								fullWidth
								variant="filled"
								label="Email"
								type="email"
								margin="dense"
								className={classes.textField}
							/>
							<TextField
								fullWidth
								variant="filled"
								label="Full Name"
								margin="dense"
								className={classes.textField}
							/>
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
								autoComplete="new-password"
							/>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.button}
								type="submit"
							>
								Sign Up
							</Button>
						</form>
					</Card>
					<Card className={classes.loginCard}>
						<Typography align="right" variant="body2">
							Have an account?
						</Typography>
						<Link to="/accounts/login">
							<Button color="primary" className={classes.loginButton}>
								Log in
							</Button>
						</Link>
					</Card>
				</article>
			</section>
		</>
	);
};

export default SignUpPage;
