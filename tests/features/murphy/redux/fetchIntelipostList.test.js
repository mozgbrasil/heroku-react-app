import _ from 'lodash';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  MURPHY_FETCH_INTELIPOST_LIST_BEGIN,
  MURPHY_FETCH_INTELIPOST_LIST_SUCCESS,
  MURPHY_FETCH_INTELIPOST_LIST_FAILURE,
  MURPHY_FETCH_INTELIPOST_LIST_DISMISS_ERROR,
} from '../../../../src/features/murphy/redux/constants';

import {
  fetchIntelipostList,
  dismissFetchIntelipostListError,
  reducer,
} from '../../../../src/features/murphy/redux/fetchIntelipostList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('murphy/redux/fetchIntelipostList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchIntelipostList succeeds', () => {
    const list = _.times(2, i => ({
      data: {
        id: `id${i}`,
        title: `test${i}`,
        url: `http://example.com/test${i}`,
      },
    }));
    nock('http://www.reddit.com/')
      .get('/r/reactjs.json')
      .reply(200, { data: { children: list } });
    const store = mockStore({ intelipostReactjsList: [] });

    return store.dispatch(fetchIntelipostList()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', MURPHY_FETCH_INTELIPOST_LIST_BEGIN);
      expect(actions[1]).toHaveProperty('type', MURPHY_FETCH_INTELIPOST_LIST_SUCCESS);
    });
  });

  it('dispatches failure action when fetchIntelipostList fails', () => {
    nock('http://www.reddit.com/')
      .get('/r/reactjs.json')
      .reply(500, null);
    const store = mockStore({ intelipostReactjsList: [] });

    return store.dispatch(fetchIntelipostList({ error: true })).catch(() => {
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', MURPHY_FETCH_INTELIPOST_LIST_BEGIN);
      expect(actions[1]).toHaveProperty('type', MURPHY_FETCH_INTELIPOST_LIST_FAILURE);
      expect(actions[1]).toHaveProperty('data.error', expect.anything());
    });
  });

  it('returns correct action by dismissFetchIntelipostListError', () => {
    const expectedAction = {
      type: MURPHY_FETCH_INTELIPOST_LIST_DISMISS_ERROR,
    };
    expect(dismissFetchIntelipostListError()).toEqual(expectedAction);
  });

  it('handles action type MURPHY_FETCH_INTELIPOST_LIST_BEGIN correctly', () => {
    const prevState = { fetchIntelipostListPending: false };
    const state = reducer(prevState, { type: MURPHY_FETCH_INTELIPOST_LIST_BEGIN });
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchIntelipostListPending).toBe(true);
  });

  it('handles action type MURPHY_FETCH_INTELIPOST_LIST_SUCCESS correctly', () => {
    const prevState = { fetchIntelipostListPending: true };
    const state = reducer(prevState, {
      type: MURPHY_FETCH_INTELIPOST_LIST_SUCCESS,
      data: { data: { children: [] } },
    });
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchIntelipostListPending).toBe(false);
  });

  it('handles action type MURPHY_FETCH_INTELIPOST_LIST_FAILURE correctly', () => {
    const prevState = { fetchIntelipostListPending: true };
    const state = reducer(prevState, {
      type: MURPHY_FETCH_INTELIPOST_LIST_FAILURE,
      data: { error: new Error('some error') },
    });
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchIntelipostListPending).toBe(false);
    expect(state.fetchIntelipostListError).toEqual(expect.anything());
  });

  it('handles action type MURPHY_FETCH_INTELIPOST_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { fetchIntelipostListError: new Error('some error') };
    const state = reducer(prevState, { type: MURPHY_FETCH_INTELIPOST_LIST_DISMISS_ERROR });
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchIntelipostListError).toBe(null);
  });
});
