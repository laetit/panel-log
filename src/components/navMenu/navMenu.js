import React, { Component } from 'react'
import './navMenu.scss'
import { Link } from 'react-router-dom'
import { Trans } from 'react-i18next'
import ReactSVG from 'react-svg'

import IconIntegration from './src/intersect.svg'

import { getPermissions } from '../../auth'
import { formatVersion } from '../../utils'
import { getVersion } from '../../api/version/version'
import { HOME_PATH, PANEL_PATH, ACCESS_PANEL } from '../../routes/routesPath'

export default class navMenu extends Component {
	constructor(props){
		super(props)
		this.state = {
			menuFilter: [],
			active: ''
		}
		this.menu = [
			{
				name: <Trans i18nKey="navmenu.integration"/>,
				image: IconIntegration,
				to: PANEL_PATH,
				permission: ACCESS_PANEL,
				vFront: '',
				vBack: ''
			}
		]
	}

	componentDidMount () {
		this.filterNavMenu()
		this.version()
	}

	async version(){
		this.setState({ vFront: '10001' })
		this.setState({ vBack: await getVersion() })
	}

	filterNavMenu(){
		let permissions = getPermissions()
		let actives = this.menu.filter((item) => {
			return permissions.includes(item.permission)
		})
    this.setState({ menuFilter: actives })
	}

	render () {
    return (
      <nav className="navmenu">
        <ul>
          <li className="option-menu top">
            <div className="id-menu"><Link to={HOME_PATH}><Trans i18nKey="navmenu.title"/></Link></div>
          </li>
          {
            this.state.menuFilter.map((menu, id) => {
              return (
                <div key={id}>
                  <Link id={menu.idx} key={id} to={menu.to}
                    className={this.state.active === menu.idx ? "option-menu menuActive" : "option-menu"}
                  >
                    <span className="icon-menu"><ReactSVG src={menu.image} alt={menu.name} /></span>
                    <p className="title-optionMenu">{menu.name}</p>
                  </Link>
                </div>
              )
            })
          }
        </ul>
        <div className='div-version'>
          <p>{formatVersion(this.state.vFront)}</p>
          <p>{formatVersion(this.state.vBack)}</p>
        </div>
      </nav>
    );
  }
}