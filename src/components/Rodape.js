import React, { Component } from 'react';
import { View, Image, TouchableHighlight, StyleSheet } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

const imgTimeline= require('../imgs/bt-timeline-cor.png');
const imgEventos = require('../imgs/bt-eventos-cor.png');
const imgLocal = require('../imgs/bt-central.png');
const imgBombando = require('../imgs/bt-bombando-cor.png');
const imgConvites = require('../imgs/bt-convites-cor.png');

export default class Rodape extends Component {

    render() {
        return (
          <View style={styles.rodape}>
            <View>
                <TouchableHighlight 
                      onPress={() => {Actions.timeline(); }}
                       underlayColor={'transparent'}
                       activeOpacity={0.5}
                      >
                      <Image style={{width: 70, height: 59 }} source={imgLocal}/>
                    </TouchableHighlight>
            </View>
             
          </View>
         
        );
    }
}

const styles = StyleSheet.create({
  rodape: {
     flex: 1,
     opacity: 0.5,
     alignItems: 'center'
 },
 btnrodape: {
    flexDirection: 'row',
    justifyContent: 'center',
 }, 
});