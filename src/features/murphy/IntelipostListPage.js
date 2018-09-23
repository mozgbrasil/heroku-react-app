import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchIntelipostList } from './redux/actions';

export class IntelipostListPage extends Component {
  static propTypes = {
    murphy: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { fetchIntelipostListPending, intelipostList, fetchIntelipostListError } = this.props.murphy;
    const { fetchIntelipostList } = this.props.actions;

    return (
      <div className="murphy-intelipost-list-page">
        <h1>Uso da API do Intelipost</h1>
        <p>Esta demonstração mostra como usar as ações assíncronas do Redux para buscar dados da API REST do Intelipost.</p>
        <button className="btn-fetch-intelipost" disabled={fetchIntelipostListPending} onClick={fetchIntelipostList}>
          {fetchIntelipostListPending ? 'Buscando...' : 'Calcular'}
        </button>
        {fetchIntelipostListError && (
          <div className="fetch-list-error">Failed to load: {fetchIntelipostListError.toString()}</div>
        )}
        {intelipostList.length > 0 ? (
          <ul className="murphy-intelipost-list">
            {intelipostList.map(item => (
              <li key={item.delivery_method_id}>
                {item.description}
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-items-tip">Nenhum item ainda.</div>
        )}
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
    actions: bindActionCreators({ fetchIntelipostList }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IntelipostListPage);
