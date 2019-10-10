import React, { Component } from 'react'
import { CSVLink } from "react-csv";
import './grid.scss'
import { format } from '../../utils';
import DropDownFilter from '../DropDownFilter/DropDownFilter';
import { Loading } from '../loadingMessage/loadingMessage';
import { ColorEmptyMessage } from '../emptyMessage/emptyMessage';

export default class Grid extends Component {
	constructor(props) {
		super(props)
		this.state = { header: [], data: [], showData: [], contentStyle: {}, maxPerPage: 300, title: 'my-report.csv', increase: true, gridSelecteds: [] }
		this.ROW_SIZE = 50;
		this.COMPONENTS = { loading: <Loading /> }
		this.SIMPLE_ROW_ITENS = ["text", "number", 'float']
	}

	componentDidMount() {
		this.mountGrid(this.props)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data !== this.state.data || nextProps.header !== this.state.header) {
			this.mountGrid(nextProps)
		}
	}

	async mountGrid(props) {
		await this.setState({ header: [], data: [], showData: [], contentStyle: {}, title: 'my-report.csv', increase: true })
		let { header, data, title, page } = props
		await this.setState({ header, data, title, currentPage: 0, showData: data, page: page })
		title = (title) ? title : this.state.title
		this.styliseContent()
	}

	styliseContent() {
		if (this.props.maxShow) { this.setState({ contentStyle: { maxHeight: this.props.maxShow * this.ROW_SIZE } }) }
	}

	sortGrid(key) {
		let { showData, increase } = this.state
		let sorted = []
		if (increase)
			sorted = this.increase(showData, key)
		else
			sorted = this.decrease(showData, key)
		this.setState({ showData: sorted, increase: !increase })
	}

	increase(data, key) {
		return data.sort(function (a, b) {
			if (a[key] < b[key])
				return 1;
			if (a[key] > b[key])
				return -1;
			return 0;
		});
	}

	decrease(data, key) {
		return data.sort(function (a, b) {
			if (a[key] < b[key])
				return -1;
			if (a[key] > b[key])
				return 1;
			return 0;
		});
	}

	getHeader(label, type = '', key) {
		return <th className={`grid-row ${type}`} onClick={() => this.sortGrid(key)} key={key}>{label}</th>
	}

	getRow(key, data, type = '', props = {}) {
		let textData = this.defineMask(key, data)
		let className = `grid-row ${type}`
		return <td className={className} key={key}>{textData}</td>
	}

	defineMask(keyPanel, data) {
		let newData
		this.state.header.map((header, idx) => {
			if (header.mask && header.key === keyPanel) {
				newData = format(data[keyPanel], header.mask, '#')
			} else if (header.key === keyPanel) {
				newData = data[keyPanel]
			}
		})
		return newData
	}

	mapHeaderToSearchBar(header) {
		return header.map(item => { return { text: item.label, value: item.key, type: item.type } })
	}

	onSearch(text, key, comparator) {
		if (this.state.data.length === 0) { return }
		key = (key === undefined) ? this.state.header[0].key : key
		let response = this.filterData(this.state.data, text, key, comparator)
		this.setState({ showData: response, empty: (response.length === 0) })
	}

	filterData(data, text, key, comparator) {
		return data.filter(item => this.compareParams(comparator, item[key], text))
	}

	compareParams(comparator, paramA = '', paramB = '') {
		paramA = String(paramA).toLowerCase()
		paramB = String(paramB).toLowerCase()
		switch (comparator) {
			case 'equal':
			default:
				return paramA === paramB
			case 'contain':
				return paramA.includes(paramB)
			case 'bigger':
				return paramA > paramB
			case 'smaller':
				return paramA < paramB
		}
	}

	onClickGetData(data) {
		console.log(data)
		let selected = (data.gridSelected === undefined) ? true : !data.gridSelected

		data['gridSelected'] = selected

		let gridSelecteds = this.state.gridSelecteds

		if (selected) {
			gridSelecteds = [...gridSelecteds, data]
		} else {
			gridSelecteds = gridSelecteds.filter(item => item !== data)
		}

		this.setState({ gridSelecteds: gridSelecteds })
		this.props.getSelect(gridSelecteds)
	}

	getRowClassName(data) {
		if (data.gridSelected) { return 'grid-body selected' }
		return 'grid-body'
	}

	onSeeMore() {
		let page = this.state.page + 1
		this.setState({ page })
		this.props.onSeeMore(page)
	}

	render() {
		let { header, showData, contentStyle, data, title, empty } = this.state
		let { csv, LoadMore } = this.props
		return (
			<div className='grid'>
				{this.props.searchBar && <SearchBar filters={this.mapHeaderToSearchBar(header)} onSearch={(text, key, comparator) => this.onSearch(text, key, comparator)} />}
				<table className='grid-table'>
					<thead className='grid-header'>
						{header.map(item => this.getHeader(item.label, item.type, item.key))}
					</thead>
					<tbody className='grid-content' style={contentStyle}>
						{showData.map((data, index) => {
							return <tr onClick={() => this.onClickGetData(data)} className={this.getRowClassName(data)} key={index} >
								{header.map(header => this.getRow(header.key, data, header.type, header.mask))}
							</tr>
						})}
					</tbody>
					{(empty || data.length === 0) && <ColorEmptyMessage title='grid.message.title' subtitle='grid.message.subtitle' />}
					{(LoadMore && !empty && data.length !== 0) && <td className={'grid-row grid-see-more'} onClick={() => this.onSeeMore()}>Carregar mais...</td>}
				</table>
				{!(empty || data.length === 0) && csv && <CSVLink data={data} headers={header} filename={title + ".csv"} className="download-button" target="_blank">
					CSV
					</CSVLink>}
			</div>
		)
	}
}

class SearchBar extends Component {
	constructor(props) {
		super(props)
		this.state = { filterType: 'text', comparator: 'contain' }
		this.COMPARATORS = [{ text: 'Igual', value: 'equal' }, { text: 'Contenha', value: 'contain' }, { text: 'Maior que', value: 'bigger' }, { text: 'Menor que', value: 'smaller' }]
		this.TEXT_COMPARATORS = this.COMPARATORS.slice(0, 2)
	}

	getFilters(all = true) {
		return (all) ? this.COMPARATORS : this.TEXT_COMPARATORS
	}

	onFilterSelect(filter) {
		this.setState({ filterType: filter.type, key: filter.value })
		if (this.props.onSearch)
			this.props.onSearch(this.state.text, filter.value, this.state.comparator)
	}

	onComparatorSelect(filter) {
		this.setState({ comparator: filter.value })
		if (this.props.onSearch)
			this.props.onSearch(this.state.text, this.state.key, filter.value)
	}

	onInputChange(text) {
		this.setState({ text })
		if (this.props.onSearch)
			this.props.onSearch(text, this.state.key, this.state.comparator)
	}

	render() {
		let { filterType } = this.state
		let { filters } = this.props
		return (
			<form className="search-grid">
				<DropDownFilter filters={filters} onSelect={(filter) => this.onFilterSelect(filter)} />
				<span style={{ width: 8 }} />
				<DropDownFilter filters={this.getFilters(filterType === 'number')} onSelect={(filter) => this.onComparatorSelect(filter)} />
				<span style={{ width: 8 }} />
				<input type="text" ref={input => this.search = input} placeholder="Pesquisar..." onChange={field => this.onInputChange(field.target.value)} />
			</form>
		)
	}
}