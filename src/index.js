import { html } from 'lit-html';
import MobxApp from './mobx-app';
import ReduxApp from './redux-app';

const stepper = (step, stepUp) => html`
  <button @click=${stepUp}>
    Step
  </button>
  ${step}
`;

const name = (state, setName, setSurname) => html`
  <input
    value=${state.name}
    @input=${setName}
  />

  <input
    value=${state.surname}
    @input=${setSurname}
  />

  Hello, ${state.fullName}!
`;


document.addEventListener('DOMContentLoaded', () => {
  MobxApp(stepper, name);
  ReduxApp(stepper, name);
});


