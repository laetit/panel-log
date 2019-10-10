import React, {Component} from 'react'
import './getEndpoint.scss'
import ButtonLanguage from '../../components/buttonLanguage/buttonLanguage'
import { Trans } from 'react-i18next';

export default class GetEndpoint extends Component{
	constructor(){
		super()
		this.state ={ inputValue:'' }
	}
	newEndpoint(){
		localStorage.setItem("endpoint", this.state.inputValue)
		this.props.onSubmit()
	}

	render(){
		return(
			<div className='get-endpoint'>
				{/* <ButtonLanguage/> */}
				<label><Trans i18nKey="endpoint.label"/></label>
				<input value={this.state.inputValue} onChange={(field) => this.setState({inputValue: field.target.value})}/>
				<button onClick={() => this.newEndpoint()}><Trans i18nKey="endpoint.label"/></button>
			</div>
		)
	}
}