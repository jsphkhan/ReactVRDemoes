import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  AmbientLight,
  Animated,
  VrButton,
  Scene,
  StyleSheet
} from 'react-vr';

import Header from './components/header';

class Menu extends React.Component {
  render() {
    return (
      <View style={styles.planetMenu}>
        <Button style={styles.button} text="Earth" callBack={() => {this.props.handeClick('Earth')}}/>
        <Button style={styles.button} text="Jupiter" callBack={() => {this.props.handeClick('Jupiter')}}/>
        <Button style={styles.button} text="Mars" callBack={() => {this.props.handeClick('Mars')}}/>
        <Button style={styles.button} text="Mercury" callBack={() => {this.props.handeClick('Mercury')}}/>
      </View>
    );
  }
}

export class Button extends React.Component {
  render() {
    return (
      <VrButton onClick={this.props.callBack} style={styles.button}>
        <Text style={styles.text}>{this.props.text}</Text>
      </VrButton>
    );
  }
}

//3d Model example
export class ModelVR extends React.Component {
  constructor() {
    super();

    this.state = {
      rotation: 0,
      zoom: -13,
      bounceAnim: new Animated.Value(1)
    };

    this.lastUpdate = Date.now();

    this.rotate = this.rotate.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.planet !== nextProps.planet) {
      const bounceConfig = {
        value: this.state.bounceAnim,
        initial: -30,
        toVal: 0,
        friction: 5
      }
      this.bounce(bounceConfig);
    }
  }
  bounce(config) {
    let value = config.value;
    value.setValue(config.initial);

    Animated.spring(value, {
      toValue: config.toVal,
      friction: config.friction
    }).start();
  }
  componentDidMount() {
    this.rotate();
  }
  componentWillUnmount() {
    if(this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }
  // planet rotate animation
  rotate() {
    const now = Date.now();
    const delta = now - this.lastUpdate;
    this.lastUpdate = now;
    this.setState({
      rotation: this.state.rotation + delta / 50
    });
    this.frameHandle = requestAnimationFrame(this.rotate);
  }
  render() {
    const {rotation} = this.state;
    const {planet} = this.props;
    return (
      <View style={{transform: [{translate: [-1,0,0]}]}}>
        <AmbientLight intensity={3.6} />
        <View style={styles.menu}>
          <Button callBack={() => {this.setState((prevState) => ({
            zoom: prevState.zoom + 1
          }))}} text="Zoom In" />
          <Button callBack={() => {this.setState((prevState) => ({
            zoom: prevState.zoom - 1
          }))}} text="Zoom Out" />
        </View>
        
        <Animated.View style={{transform: [{
          translate: [this.state.bounceAnim, 0, 0]
        }]}}>
          <Model 
            source={{obj: asset(`models/${planet}.obj`)}}
            texture={asset(`textures/${planet}.png`)} 
            style={{transform: [
              { translate: [0, 0, this.state.zoom] }, 
              { scale: 0.2 }, 
              { rotateY: rotation }, 
              ],
              position: 'absolute'
            }}/>
        </Animated.View>
      </View>
    );
  }
}

//Pano and Text component
export default class AwesomeVR extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      planet: 'Earth'
    }
  }
  render() {
    return (
      <View>
        <Scene style={{ transform: [ {translate: [0,0,0]} ] }}/>
        <Pano source={asset('stars.jpg')}/>
        <Header currentPlanet={this.state.planet}/>
        {/* <Text
          style={{
            backgroundColor: '#777879',
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [10,0,-20]}],
          }}>
          This is Mother Earth
        </Text> */}
        <Menu handeClick={(planet) => {
          this.setState({planet: planet});
        }}/>
        <ModelVR planet={this.state.planet}/>
      </View>
    );
  }
};

const WIDTH = 2.5;

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    flexDirection: 'column',
    width: 1,
    alignItems: 'stretch',
    transform: [{translate: [10, 1, -10]}, {rotateY: -50}],
    //backgroundColor: 'yellow'
  },
  planetMenu: {
    flex: 1,
    width: WIDTH,
    flexDirection: 'row',
    flexWrap: 'wrap',
    transform: [{translate: [5,3,-7]}, {scale: 1}],
    //backgroundColor: 'orange'
  },
  button: {
    margin: 0.02,
    padding: 0.05,
    width: WIDTH/2 - 0.04,
    height: 1,
    backgroundColor: '#5790D9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 0.3,
    textAlign: "center",
    color: '#ffffff'
  }
});

AppRegistry.registerComponent('AwesomeVR', () => AwesomeVR);
