import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// Redux
import { Provider } from 'react-redux'
import store from './redux/store';
import * as actionTypes from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

// Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';
import themeFile from './util/theme';

// Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import User from './pages/user';

// CSS
import './App.css';
const theme = createMuiTheme(themeFile);

// axios.defaults.baseURL = 'https://us-central1-social-app-f23ce.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	} else {
		store.dispatch({ type: actionTypes.SET_AUTHENTICATED });
		axios.defaults.headers.common['Authorization'] = token;
		store.dispatch(getUserData());
	}
}

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<BrowserRouter>
					<Navbar/>
					<div className='container'>
						<Switch>
							<Route exact path='/' component={Home}/>
							<AuthRoute exact path='/login' component={Login} />
							<AuthRoute exact path='/signup' component={Signup} />
							<Route exact path='/users/:handle' component={User}/>
							<Route exact path='/users/:handle/scream/:screamId' component={User}/>
						</Switch>
					</div>
				</BrowserRouter>
			</Provider>
		</MuiThemeProvider>
	);
}

export default App;
