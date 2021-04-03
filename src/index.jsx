import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import theme from "./theme.js";

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<CssBaseline />
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</MuiThemeProvider>,
	document.querySelector("#root"),
);
