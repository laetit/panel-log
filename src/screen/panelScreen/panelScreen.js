import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import Grid from '../../components/grid/grid'
import Filter from '../../components/filter/filter'
import { getDataPanel, putReinstate, getPageConfig } from '../../api/integration/integrationAPI'
import { Trans } from 'react-i18next'
import { isEmptyObj } from '../../utils'
import { logout } from '../../auth'
import { Loading } from '../../components/loadingMessage/loadingMessage'
import { NotificationManager } from 'react-notifications';
import IconControls from '../../src/controls.svg'
import IconSend from '../../src/send.svg'

import './panelScreen.scss'

export default class panel extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			filterData: [],
			filters: [],
			lastFilterRequest: [],
			filterStatus: false,
			gridSelecteds: [],
			gridPage: 1,
			gridReset: false,
			LoadMore: true
		}
		this.t = null
	}

	componentDidMount() {
		this.mountDataPage()
	}

	async mountDataPage() {
		this.setState({ Loading: true })

		let data = await getPageConfig()
		console.log("data da pagina: ", data)
		if (data === 'error') {
		} else if (data === 'logout') {
			this.tokenLogout()
		} else {
			if (data.FILTER && data.PANEL) {
				this.setState({ filterData: data.FILTER })
				this.setState({ panelHeader: data.PANEL })
			}
			this.setState({ Loading: false })
		}
	}

	statusFilter() {
		if (!this.state.filterStatus) {
			this.setState({ filterStatus: true })
		} else {
			this.setState({ filterStatus: false })
		}
	}

	async sendSelectGrid() {
		let gridSelected = this.state.gridSelecteds
		let selectedKeys = []
		
		for (let i in gridSelected) {
			selectedKeys.push(gridSelected[i].key)
		}
		console.log("sendSelectGrid grids para envio: ", gridSelected, " key: ",selectedKeys)
		if (isEmptyObj(selectedKeys)) {
			NotificationManager.warning('É necessario selecionar uma integração')
		} else {
			NotificationManager.info('Dados enviados com sucesso')
			let response = await putReinstate(selectedKeys)
			console.log("resposta do reintegrar: ", response)
			this.filterReinstate(response)
		}
	}

	filterReinstate(reinstate) {
		let newData = []

		this.state.data.map(item => {
			let busca = reinstate.filter(item2 => item.key === item2.key)
			if (busca.length !== 0) {
				console.log("integratedTypes: ",this.state.lastFilterRequest.integratedTypes)
				if (this.state.lastFilterRequest.integratedTypes && this.state.lastFilterRequest.integratedTypes.includes("TODO")) {
					console.log("TODO selecionado")
					item.status = busca[0].status
					item.statusDesc = busca[0].statusDesc
					newData.push(item)
				} else {
					console.log("Todo não selecionado")
				}

			} else {
				newData.push(item)
			}
		})
		console.log("data atualizada no panel: ", newData)
		this.setState({ data: newData })
	}


	setSelect(gridSelecteds) {
		console.log("grid selecionado: ", gridSelecteds)
		this.setState({ gridSelecteds: gridSelecteds })
	}

	async checkFilter(filters) {
		console.log("envio de filtros: ", filters)
		this.setState({ SubmitLoading: true })
		if (!isEmptyObj(filters)) {
			this.onFilterSubmit(filters)
		} else {
			NotificationManager.warning('Preencha os dados')
			this.setState({ SubmitLoading: false })
		}
	}

	async onFilterSubmit(filters) {
		console.log("onseemore filters: ", filters)
		this.setState({ gridPage: 1 })
		this.setState({ LoadMore: true })
		filters = { ...filters, page: 1 }
		console.log(filters)
		this.setState({ lastFilterRequest: filters })
		let data = await getDataPanel(filters)
		console.log(data)
		if (data === 'error') {

		} else if (data === 'logout') {
			this.tokenLogout()
		} else {
			data = await this.findDateOnData(data)
			data.length < 10 ? this.setState({ LoadMore: false }) : this.setState({ LoadMore: true })
			this.setState({ data: data })
		}
		this.setState({ Loading: false })
		this.setState({ SubmitLoading: false })
	}

	tokenLogout() {
		logout()
		this.props.history.push('/login')
	}

	findDateOnData(data) {
		let newDate
		let keyValues

		data.map((obj, idx) => {
			keyValues = Object.keys(obj).filter(key => {
				return /data/.test(key) ? obj[key] : false
			})
			keyValues.forEach((i) => {
				newDate = new Date(obj[i])
				newDate = newDate.toLocaleDateString()
				obj[i] = newDate
				return obj
			})
		})
		return data
	}

	async onSeeMore(index) {
		let filters = await this.state.lastFilterRequest
		filters['page'] = index
		console.log("onseemore filters: ", filters)
		let newData = await getDataPanel(filters)
		newData.length < 10 ? this.setState({ LoadMore: false }) : this.setState({ LoadMore: true })
		newData = this.findDateOnData(newData)
		await this.setState({ gridPage: index })
		if (isEmptyObj(newData)) {
			this.setState({ gridReset: true })
			NotificationManager.warning('Todos os dados foram carregados')
		} else {
			this.setState({ gridReset: false })
			this.setState({ data: [...this.state.data, ...newData] })
		}

	}

	render() {
		return (
			<div className='content-page'>
				<div className='div-btns'>
					<button onClick={() => this.statusFilter()} className='btn-filter'>
						<ReactSVG className='icon' src={IconControls} />
						<p><Trans i18nKey="integration.btn.filters" /></p>
					</button>
					<button onClick={() => this.sendSelectGrid()} className='btn-grid'>
						<ReactSVG className='icon' src={IconSend} />
						<p><Trans i18nKey="integration.btn.reinstate" /></p>
					</button>
				</div>
				<div className={`content-grid ${this.state.filterStatus ? 'close-content' : ''}`}>
					{!this.state.Loading && <Grid onSeeMore={(index) => this.onSeeMore(index)} LoadMore={this.state.LoadMore} getSelect={(selecteds) => this.setSelect(selecteds)} reset={this.state.gridReset} page={this.state.gridPage} header={this.state.panelHeader} data={this.state.data} />}
				</div>
				{!this.state.Loading && <Filter 
					onFilterSubmit={(filters) => this.checkFilter(filters)} 
					Loading={this.state.Loading} 
					classFilter={`filter ${this.state.filterStatus ? 'close-filter' : ''}`} 
					data={this.state.filterData} 
				/>}
				{(this.state.Loading || this.state.SubmitLoading) && <Loading />}
			</div>
		);
	}
}
