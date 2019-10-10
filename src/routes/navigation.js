import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import { PANEL_PATH, ACCESS_PANEL, LOGIN_PATH, GLOBAL_PATH } from './routesPath'
import { isAuthenticated, getPermissions, getProfile } from '../auth'
import ButtonLanguage from '../components/buttonLanguage/buttonLanguage'
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import Header from '../components/header/header'
import NavMenu from '../components/navMenu/navMenu'
import Login from '../screen/login/login'
import Panel from '../screen/panelScreen/panelScreen'
import NotFound from '../screen/notFound/notFound'

const PrivateRoutes = () => {
	if (isAuthenticated() === true) {
		return ( <div>
			<Header user={getProfile()} />
			<NavMenu/>
			<div className="page-body">
				<Switch>
					{ROUTES.map((route, idx) =>{
						if (checkPermissions(route.permission) === true) { return (
							<Route path={route.path} exact={route.exact} component={route.component} key={idx}/>	)}
					})}
				</Switch>
			</div>
		</div> )
	} else { 
		return (<Redirect to={LOGIN_PATH} />) 
	}
}

const ROUTES = [
	{ component: Panel, path: PANEL_PATH, exact: true, permission: ACCESS_PANEL },
	{ component: NotFound, path: '*', exact: true, permission: true }
]

const checkPermissions = (permission) => {
	try{
		let roles = getPermissions()
		return roles.includes(permission) || permission === true ?	 true	:  false
	} catch(error) {
		return (<Redirect to={LOGIN_PATH} />)
	}
}


class routes extends Component {
	render() {
		return (
			<Router>
				{/* <ButtonLanguage/> */}
				<NotificationContainer/>
				<Switch>
					<Route path={LOGIN_PATH} exact component={Login} />
					<Route path={GLOBAL_PATH} component={PrivateRoutes} />
				</Switch>
			</Router>
		);
	}
}

export default routes;