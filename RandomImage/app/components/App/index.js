import React from 'react';
import AppView from './AppView';

console.disableYellowBox = true // disable warnings as needed (for demos)

export default class AppContainer extends React.Component {
  render() {
      return (
              <AppView />
      )
  }
}