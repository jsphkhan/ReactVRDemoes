import React from 'react';
import {
  VrHeadModel,
  View
} from 'react-vr';
const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

/**
 * Helper to fix a component to the viewport.
 * @module components/fixed
 */
class Fixed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hmRot: VrHeadModel.rotation(),
      hmYpr: VrHeadModel.yawPitchRoll(),
      hmMatrix: VrHeadModel.getHeadMatrix()
    }
    this._headMatrixListener = RCTDeviceEventEmitter.addListener(
      'onReceivedHeadMatrix',
      this._onReceivedHeadMatrix.bind(this)
    );
  }
  _onReceivedHeadMatrix(headMatrix, viewMatrix, fov, aspect) {
    this.setState({
      hmRot: VrHeadModel.rotation(),
      hmYpr: VrHeadModel.yawPitchRoll(),
      hmMatrix: VrHeadModel.getHeadMatrix()
    });
  }
  render(){
    let {hmRot, hmYpr, hmMatrix} = this.state;
    return (
      <View
        style={{
          position: 'absolute',
          layoutOrigin: [0, 1],
          transform: [
            {translate: [0, 0, 0]},
            {matrix: hmMatrix}
          ]
        }}>
        <View
          style={{
            position: 'absolute',
            layoutOrigin: [0.5, 0.5],
            transform: [
              {translate: [0, 0, 0]}
            ]
          }}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

module.exports = Fixed;