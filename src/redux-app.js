import { render } from 'lit-html';
import { createStore, bindActionCreators } from 'redux';

const STEP_UP = 'stepup';
const SET_NAME = 'setname';
const SET_SURNAME = 'setsurname';
const initialState = {
  step: 0,
  name: 'John',
  surname: 'Doe',
  fullName: 'John Doe'
};

const stepUp = () => ({ type: STEP_UP });
const setName = (e) => ({
  type: SET_NAME,
  payload: e.target.value
});
const setSurname = (e) => ({
  type: SET_SURNAME,
  payload: e.target.value
});

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case STEP_UP:
      return {
        ...state,
        step: state.step + 1
      }
    case SET_NAME:
      return {
        ...state,
        name: action.payload,
        fullName: state.name + ' ' + state.surname,
      }
    case SET_SURNAME:
      return {
        ...state,
        surname: action.payload,
        fullName: state.name + ' ' + state.surname,
      }
  }

  return state;
};

const store = createStore(reducer);

const actions = bindActionCreators(
  { stepUp, setName, setSurname },
  store.dispatch
);

export default function ReduxApp(stepper, name) {
  store.subscribe(() => {
    const state = store.getState();

    render(stepper(state.step, actions.stepUp), document.querySelector('#stepper-redux'));
    render(name(state, actions.setName, actions.setSurname), document.querySelector('#name-redux'));
  });

  store.dispatch({ type: 'INIT' });
};