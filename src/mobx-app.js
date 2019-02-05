import { render } from 'lit-html';
import { observable, computed, action, reaction } from 'mobx';

class Store {
  @observable step = 0;
  @observable name = 'John';
  @observable surname = 'Doe';
  @computed get fullName() {
    return this.name + ' ' + this.surname;
  }

  @action setName = (e) => {
    this.name = e.target.value;
  }

  @action setSurname = (e) => {
    this.surname = e.target.value;
  }

  @action stepUp = () => this.step++;
}

const store = new Store();

export default function MobxApp(stepper, name) {
  reaction(
    () => store.step,
    (step) => render(stepper(step, store.stepUp), document.querySelector('#stepper-mobx')),
    { fireImmediately: true }
  );

  reaction(
    () => store.fullName,
    () => render(name(store, store.setName, store.setSurname), document.querySelector('#name-mobx')),
    { fireImmediately: true }
  );
};
