import React, { Component } from 'react'
import { logout } from '../../auth'
import ReactSVG from 'react-svg'
import IconExit from './src/logout.svg'
import './header.scss'

export default class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
	}

  render() {
    return (
      <header className="header">
        <div className="option-header">
          <div className="data">
            <h2>{this.props.user}</h2>
          </div>
          <a className="logout" onClick={() => logout()} href='/login'><ReactSVG src={IconExit} alt='logout'/></a>
        </div>
      </header>
    );
  }
}
