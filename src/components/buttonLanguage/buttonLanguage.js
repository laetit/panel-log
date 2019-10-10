import React, {Component} from 'react'
import ReactSVG from 'react-svg'
import WorldSvg from './src/internet.svg'
import './buttonLanguage.scss'

export default class ButtonLanguage extends Component{
	constructor(){
		super()
		this.state ={ status: 'pt', openLanguage: false }
		this.languages = [ 'pt', 'en' ]
		this.closeLanguage = this.closeLanguage.bind(this)
	}

	openLanguage(){
		this.setState({ openLanguage: true}, () => {
			document.removeEventListener('click', this.closeNotification);
		})
	}

	closelanguage(){
		this.setState({ openLanguage: false}, () => {
			document.removeEventListener('click', this.closeNotification);
		})
	}

	render(){
		return(
			<div className='div-language'>
				<div className='btn-language' onClick={() => this.openLanguage()}><ReactSVG src={WorldSvg}/></div>
				{
					this.state.openLanguage &&
					<div>
						<ul>
							{this.languages.forEach(element => {
								return <li>
									<p>{element}</p>
								</li>
							}) }
						</ul>
					</div>
				}
			</div>
		)
	}
}