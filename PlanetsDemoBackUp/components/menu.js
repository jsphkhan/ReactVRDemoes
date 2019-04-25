import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  VrButton
} from 'react-vr';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.planets = ['Earth', 'Mars', 'Jupiter', 'Mercury'];
    }
    render() {
        const {onClick} = this.props;
        return (
            <View style={styles.menu}>
                {this.planets.map((planet, index) => {
                    return (
                        <VrButton onClick={() => {
                            //console.log('clicked');
                            onClick(planet);
                        }} style={styles.button} key={index}>
                            <Text style={styles.text}>{planet}</Text>
                        </VrButton>
                    )
                })}
            </View>
        );
    }
}

const WIDTH = 2;
const styles= StyleSheet.create({
    menu: {
        width: WIDTH,
        flexDirection: 'row',
        flexWrap: 'wrap',
        //backgroundColor: 'green',
        padding: 0.01,
        layoutOrigin: [0.5, 0.5],
        transform: [{
            translate: [3.8,1.5,-5],
        }, {
            rotateY: -30
        }]
    },
    button: {
        width: WIDTH/2 - (0.01) - 2 * 0.01,
        height: 0.7,
        backgroundColor: '#5790D9',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0.01
    },
    text: {
        fontSize: 0.2
    }
  });