import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SideBar extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    return (
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Cras justo odio</li>
        <li className="list-group-item">Dapibus ac facilisis in</li>
        <li className="list-group-item">Morbi leo risus</li>
        <li className="list-group-item">Porta ac consectetur ac</li>
        <li className="list-group-item">Vestibulum at eros</li>
      </ul>
    );
  }
}
