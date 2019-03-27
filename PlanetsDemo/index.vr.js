import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
} from 'react-vr';

export default class PlanetsDemo extends React.Component {
  render() {
    return (
      <View>
        <Pano source={asset('stars.jpg')}/>
      </View>
    );
  }
};

AppRegistry.registerComponent('PlanetsDemo', () => PlanetsDemo);
