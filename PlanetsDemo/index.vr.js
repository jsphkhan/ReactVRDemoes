import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
} from 'react-vr';

import Header from './components/header';
import Menu from './components/menu';
import Planet from './components/planet';

export default class PlanetsDemo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Pano source={asset('stars.jpg')}/>
      </View>
    );
  }
};

AppRegistry.registerComponent('PlanetsDemo', () => PlanetsDemo);
