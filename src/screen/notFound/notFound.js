import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import iconNotFound from './src/not-found.svg'
import './notFound.scss'

export default class NotFound extends Component {
	render() {
		return (
			<div className="not-found">
				<ReactSVG className='not-found-ico' src={iconNotFound}/>
				<h1>Pagina não foi encontrada</h1>
			</div>
		)
	}
}
