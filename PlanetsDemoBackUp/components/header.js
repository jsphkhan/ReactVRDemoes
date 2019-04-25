import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-vr';

export default class Header extends React.Component {
    render() {
        const {subTitle} = this.props;
        return (
            <View style={styles.header}>
                <Text style={styles.title}>The Solar System</Text>
                <Text style={styles.subTitle}>{subTitle}</Text>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    header: {
        alignItems: 'center',
        //backgroundColor: 'red',
        height: 0.6,
        layoutOrigin: [0.5, 3, 0],
        transform: [{
            translate: [0,-0.2,-3]
        }]
    },
    title: {
        fontSize: 0.25,
    },
    subTitle: {
        fontSize: 0.15
    }
});