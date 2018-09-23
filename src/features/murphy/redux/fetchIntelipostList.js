import axios from 'axios';
import {
  MURPHY_FETCH_INTELIPOST_LIST_BEGIN,
  MURPHY_FETCH_INTELIPOST_LIST_SUCCESS,
  MURPHY_FETCH_INTELIPOST_LIST_FAILURE,
  MURPHY_FETCH_INTELIPOST_LIST_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchIntelipostList(args = {}) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: MURPHY_FETCH_INTELIPOST_LIST_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchIntelipostReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = axios.get('https://heroku-laravel-mozg.herokuapp.com/webservice/actions.php?printi=true');
      //const doRequest = axios.get('http://www.reddit.com/r/reactjs.json');

      doRequest.then(
        res => {
          dispatch({
            type: MURPHY_FETCH_INTELIPOST_LIST_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        err => {
          dispatch({
            type: MURPHY_FETCH_INTELIPOST_LIST_FAILURE,
            data: { error: err },
          });
          reject(err);
        }
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissFetchIntelipostListError() {
  return {
    type: MURPHY_FETCH_INTELIPOST_LIST_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  console.info('=== fetchIntelipostList');
  console.log('state',state);
  console.log('action',action);
  switch (action.type) {
    case MURPHY_FETCH_INTELIPOST_LIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchIntelipostListPending: true,
        fetchIntelipostListError: null,
      };

    case MURPHY_FETCH_INTELIPOST_LIST_SUCCESS:
      // The request is success
      console.info('=== ', action.type);
      console.log('action',action);
      console.log('action 2',action.data);
      //console.log('action 3',action.data.content);
      //console.log('action 4',action.data.content.delivery_options);
      return {
        ...state,        
        //intelipostList: action.data.data.children,
        intelipostList: action.data.content.delivery_options,

        fetchIntelipostListPending: false,
        fetchIntelipostListError: null,
      };

    case MURPHY_FETCH_INTELIPOST_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchIntelipostListPending: false,
        fetchIntelipostListError: action.data.error,
      };

    case MURPHY_FETCH_INTELIPOST_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchIntelipostListError: null,
      };

    default:
      return state;
  }
}
