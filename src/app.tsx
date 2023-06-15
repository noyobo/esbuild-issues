import { actions, store } from '@/redux';

const { dispatch } = store;

class App {
  render() {
    console.log('app', dispatch, actions, store);
  }
}

export default App;
