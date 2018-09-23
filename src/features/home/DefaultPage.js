import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import reactLogo from '../../images/react-logo.svg';
import rekitLogo from '../../images/rekit-logo.svg';
import * as actions from './redux/actions';

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="home-default-page">
        <header className="app-header">
          <img src={reactLogo} className="app-logo" alt="logo" />
          <img src={rekitLogo} className="rekit-logo" alt="logo" />
          <h1 className="app-title">Bem vindo a MOZG!</h1>
        </header>
        <div className="app-intro">
          <h3>Aqui vai ser concentrado diversas automações usando o universo React!</h3>
          <ul>
            <li>
              Para ver os exemplos, accesse:&nbsp;
              <Link to="/murphy">/murphy</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultPage);
