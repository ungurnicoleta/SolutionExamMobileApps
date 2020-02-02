/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import HomePage from './src/pages/homePage';


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<HomePage/>);
  }
};

