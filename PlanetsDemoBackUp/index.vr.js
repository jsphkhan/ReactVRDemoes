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

export default class PlanetsDemoBackUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planet: 'Earth'
    }
  }
  render() {
    return (
      <View>
        <Pano source={asset('stars.jpg')}/>
        <Header subTitle={this.state.planet}/>
        <Menu onClick={(planet) => {
          this.setState({planet: planet});
        }}/>
        <Planet planet={this.state.planet}/>
      </View>
    );
  }
};

AppRegistry.registerComponent('PlanetsDemoBackUp', () => PlanetsDemoBackUp);
