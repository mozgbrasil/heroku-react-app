import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class CounterPage extends Component {
  static propTypes = {
    murphy: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="murphy-counter-page">
        <h1>Counter</h1>
        <p>This is simple counter demo to show how Redux sync actions work.</p>
        <button className="btn-minus-one" onClick={this.props.actions.counterMinusOne} disabled={this.props.murphy.count === 0}>
          -
        </button>
        <span>{this.props.murphy.count}</span>
        <button className="btn-plus-one" onClick={this.props.actions.counterPlusOne}>+</button>
        <button className="btn-reset" onClick={this.props.actions.counterReset}>
          Reset
        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CounterPage);
