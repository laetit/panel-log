import React, { Component } from 'react';
import { STORES_INPUT, CHECKBOX_STATUS } from '../../themes/panelTheme'
import { NotificationManager } from 'react-notifications';
import { isNull } from '../../utils'
import './filter.scss'
import { Trans } from 'react-i18next';

export default class filter extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}

	componentDidMount(){
		this.mapDefaultValueInput()
	}

	mapDefaultValueInput(){
		if(this.props.data.length !== 0){
			this.props.data.map((data, idx) => {
				this.setStateDefaultValue(data)
			})
			STORES_INPUT.map((data, idx) => {
				this.setStateDefaultValue(data)
			})
			
		}
	}

	setStateDefaultValue(data){
		let { id, defaultValue } = data
		if(data.defaultValue){
			this.setState({[id]: defaultValue})
		}
	}

	returnInput(item){
		let {id, type, max, min} = item
		return ( <input min={min} type={type} value={`${this.state[id]}`} onChange={(field)=>{this.checkOnChange(id, field, max, type)}}/>)
	}

	returnStoreInput(){
		return STORES_INPUT.map((input, idx) => {
			let { label } = input
			return (
				<div className='div-input'>
					<label id={idx}>
						<p><Trans i18nKey={label}/></p>
					</label>
					{this.returnInput(input)}
				</div>
			)
		})
	}

	returnCheckbox(){
		let typeName = 'integratedTypes'
		return CHECKBOX_STATUS.map((item, idx) => {
			let { id, text, description } = item
			return (		
				<div className='option-checkbox' title={description}>
					<label className='lbl-checkbox'>
						<input id={idx} type='checkbox' name={id} value={id} onChange={(field) => {this.addCheckOptionState(typeName,id,field.target.checked)}} checked={this.isChecked(typeName, id)}/>
						<p><Trans i18nKey={text}/></p>
					</label>
				</div>
			)
		})		
	}

	isChecked(type, id){
		if (!isNull(this.state[type])){
			if(this.state[type].includes(id)){
				return true
			} else {
				return false
			}
		}
	}

	checkOnChangeDate(id, value){
		this.setState({[id]:value})
	}

	checkOnChange(id, field, max, type){
		let value = field.target.value
		if (value.length <= max) {
			this.setState({[id]:value.replace(/[-]/, '')})
		} else if (type ===	'date'){
			this.setState({[id]:`${value}`})
		}
	}

	async addCheckOptionState(id, name, checked){
		if(this.state[id] === undefined){
			await this.setState({[id]:[]})
		}

		let checkGroup = this.state[id]
		if(checked){
			checkGroup.push(name)
		} else {
			checkGroup.map((item, idx) => {
				if (name === item) {
					checkGroup.splice(idx, 1)
				}
			})
		}
		await this.setState({[id]: checkGroup})
	}

	checkNullInput(){
		let filters = this.props.data
		let checkFilter = []
		filters.map((comp, idx) => {
			if (!isNull(this.state[comp.id])){
				checkFilter.push(true)
			} else {
				checkFilter.push(false)
			}
		})
		if (checkFilter.includes(false)){
			return false
		} 
		return true
	}

	formSubmit(event){
		event.preventDefault()
		if (this.checkNullInput()){
			this.props.onFilterSubmit(this.state)
		} else {
			NotificationManager.warning('Preencha os dados')
		}
	}

	render() {
		let {data} = this.props
		return (
			<div className='container-filter'>
				{!this.props.Loading && <form onSubmit={(event) => this.formSubmit(event)} className={this.props.classFilter}>
					{this.returnStoreInput()}
					{data.map((item, idx) => {
						return (
							<div className='div-input' title={item.description}>
								{item.type !== 'checkbox' && <label id={idx}>
									<p>{item.label}</p>
								</label>}
								{this.returnInput(item)}
							</div>
						)
					})}
					<div className='container-checkbox'>
						{this.returnCheckbox()}
					</div>	
					<div className='div-submit'>
						<button type='submit'><Trans i18nKey='filter.btn.filter'/></button>
					</div>
				</form>}
			</div>
		);
	}
}
