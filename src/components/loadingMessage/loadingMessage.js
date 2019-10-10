import React, { Component } from 'react';
import './loadingMessage.scss';
import loadingGif from './src/loading.gif'

export class LoadingMessage extends Component {
  render() {
    return (
      <div className="loadingMessage" style={this.props.style}>
        <img src={loadingGif}/>
        {this.props.title && <h1>{this.props.title}</h1>}
        {this.props.description && <h2>{this.props.description}</h2>}
      </div>
    );
  }
}

export class Loading extends Component {
  render() {
    return (
      <img src={loadingGif} style={this.props.style} className={'loadingGif'} />
    );
  }
} 