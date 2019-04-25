import React from 'react';
import {
  asset,
  View,
  Model,
  AmbientLight,
  Animated
} from 'react-vr';

export default class Planet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rotation: 50,
            moveAnim: new Animated.Value(0)
        }

        this.lastUpdate = Date.now();
        this.rotate = this.rotate.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.planet !== nextProps.planet) {
            this.state.moveAnim.setValue(-50);
            Animated.spring(this.state.moveAnim, {
                toValue: 0,
                duration: 250
            }).start();
        }
    }
    componentDidMount() {
        //start the animation
        this.rotate();
    }
    componentWillUnmount() {
        if(this.frameHandle) {
            cancelAnimationFrame(this.frameHandle);
            this.frameHandle = null;
        }
    }
    rotate() {
        const now = Date.now();
        const delta = now - this.lastUpdate;
        this.lastUpdate = now;
        
        this.setState({rotation: this.state.rotation + delta / 50});

        this.frameHandle = requestAnimationFrame(this.rotate);
    }
    render() {
        const {planet} = this.props;
        const {rotation} = this.state;
        return (
            <View>
                <Animated.View style={{transform: [{translate: [this.state.moveAnim, 0, 0]}]}}>
                    <Model 
                        source={{obj: asset(`models/${planet}.obj`)}}
                        texture={asset(`textures/${planet}.png`)} 
                        style={{
                            transform: [{
                                translate: [-1,-2,-13]
                            }, {
                                scale: 0.2
                            }, {
                                rotateY: rotation
                            }],
                        }} />
                </Animated.View>
            </View>
        );
    }
}