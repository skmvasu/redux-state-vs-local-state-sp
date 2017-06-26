import React, { Component } from 'react';
import {Provider} from 'react-redux';
import GoTCharacterContainer from './GoTCharactersContainer';
import store from './RootStore';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <GoTCharacterContainer />
      </Provider>
    );
  }
}

export default App;
