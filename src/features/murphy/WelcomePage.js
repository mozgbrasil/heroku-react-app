import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import rekitLogo from '../../images/rekit-logo.svg';
import * as actions from './redux/actions';

export class WelcomePage extends Component {
  static propTypes = {
    murphy: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="murphy-welcome-page">
        <a href="http://github.com/supnate/rekit">
          <img src={rekitLogo} className="app-logo" alt="logo" />
        </a>
        <h1>Bem vindo a MOZG!</h1>
        <p>
          Aqui vai ser concentrado diversas automações usando o universo React!
        </p>
        <p>
          Desenvolvimento por <a href="http://mozg.com.br/">Marcio dos Santos Amorim</a>
        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
