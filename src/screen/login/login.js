import React, { Component } from 'react'
import { setLogin } from '../../api/login/loginAP'
import { Loading } from '../../components/loadingMessage/loadingMessage'
import { isAuthenticated, login, setPermissions, setProfile } from '../../auth'
import './login.scss'
import { Trans } from 'react-i18next';

export default class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			login: '',
			password: '',
			loginStatus: ''
		}
	}

	componentDidMount(){
		if (isAuthenticated() === true) {
			this.goHomeScreen()
		}
		this.setState({loginStatus: 'nologged'})
	}

	onKeyPress (event) {
		if (event.key === 'Enter') {
			this.Login()
		}
	}

	Login () {
		this.requestLogin(this.state.login, this.state.password)
		this.setState({loginStatus: 'requestlogin'})
	}

	getUserInfo (info) {
		console.log(info)
		const token = info.response[0].token
		const profiles = info.response[0].profiles[0]
		const roles = []
		for (let item in profiles.roles){
			roles.push(profiles.roles[item].id.toString())
		}
		setProfile(profiles.description)
		setPermissions(roles)
		login(token)
		this.goHomeScreen()
	}

	goHomeScreen () {
		this.props.history.push('/panel')
	}

	async requestLogin (login = "", password = "") {
		let dataLogin = { username: login, password: password, module: 'INTEGRATION' }
		let response = await setLogin(dataLogin)
		if (response === 'error'){
			this.setState({loginStatus: 'nologged'})
		}
		else{
			this.getUserInfo(response)
		}
	}

	render () {
		return (
			<div className="login">
				<div className="background-login"></div>
				<form className="form-login">
					<h1><Trans i18nKey='login.title'/></h1>
					<div className="info-login">
						<label>
							<Trans i18nKey='login.labelLogin'/>
							<input
								value={this.state.login}
								onChange={(field) => this.setState({ login: field.target.value })}
								onKeyPress={(event) => this.onKeyPress(event)}
							/>
						</label>
						<label>
						<Trans i18nKey='login.labelPassword'/>
							<input
								type='password'
								value={this.state.password}
								onChange={(field) => this.setState({ password: field.target.value })}
								onKeyPress={(event) => this.onKeyPress(event)}
							/>
						</label>
					</div>
					<div className={this.state.loginStatus === 'requestlogin' ? 'divBtn-blocked' : 'divBtn-login' } onClick={() => this.Login()}><Trans i18nKey='login.btn'/></div>
				</form>
				{this.state.loginStatus === 'requestlogin' && <Loading />}
			</div>
		)
	}
}
