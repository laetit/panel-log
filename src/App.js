import React, {Component} from 'react';
import Navigation from './routes/navigation'
import GetEndpoint from './screen/getEndpoint/getEndpoint'

export default class App extends Component {
	constructor(){
		super()
		this.state = { endpoint:''}
	}
	async GetEndpoint(){
		let endpointLet = localStorage.getItem("endpoint")
		console.log(endpointLet)
		if (endpointLet){
			await this.setState({endpoint: endpointLet})
		} 
	}

	render(){
		let endpoint = localStorage.getItem("endpoint")
		console.log(endpoint)
		if (endpoint){
			return ( <Navigation/>);
		} else {
			return (<GetEndpoint onSubmit={() => this.GetEndpoint()}/>)
		}
	}
}
