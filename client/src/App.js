import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';

// Components
import Navbar from './components/Navbar';
import themeFile from './util/theme';

// Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

// CSS
import './App.css';
const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		window.location.href = '/login';
		authenticated = false;
	} else {
		authenticated = true;
	}
}

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<div className="App">
				<BrowserRouter>
					<Navbar/>
					<div className='container'>
						<Switch>
							<Route exact path='/' component={Home}/>
							<Route exact path='/login' component={Login}/>
							<Route exact path='/signup' component={Signup}/>
						</Switch>
					</div>
				</BrowserRouter>
			</div>
		</MuiThemeProvider>
	);
}

export default App;
