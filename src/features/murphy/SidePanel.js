import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class SidePanel extends Component {
  static propTypes = {
    murphy: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="murphy-side-panel">
        <ul>
          <li>
            <Link to="/murphy">Painel</Link>
          </li>
          {/*<li>
            <Link to="/murphy/counter">Counter Demo</Link>
          </li>*/}
          <li>
            <Link to="/murphy/intelipost">Demonstração da API do Intelipost</Link>
          </li>
        </ul>
        <div className="memo">
          <Link to="/">Voltar para a página inicial</Link>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    murphy: state.murphy,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
