import React from 'react';
import {View, Text, StyleSheet} from 'react-vr'

const Header = ({currentPlanet}) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>The Solar System</Text>
            <Text style={styles.text}>{currentPlanet}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: 3,
        height: 0.4,
        //backgroundColor: 'red',
        layoutOrigin: [0.5, 2.5],
        transform: [{translate: [0, 0, -2]}],
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 0.2,
        //textAlign: 'center',
        color: '#fff'
    },
    text: {
        fontSize: 0.1,
        color: '#ffffff',
        //textAlign: 'center',
    }
});

export default Header;