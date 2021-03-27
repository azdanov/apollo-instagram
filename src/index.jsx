import React from 'react';
import ReactDOM from 'react-dom';
import {MuiThemeProvider, CssBaseline} from '@material-ui/core';
import theme from './theme.js';
import App from './App.jsx';

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<CssBaseline />
		<App />
	</MuiThemeProvider>,
	document.querySelector('#root'),
);
