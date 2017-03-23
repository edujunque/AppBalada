import React, { Component } from 'react';
import { View, Image, TouchableHighlight, StyleSheet } from 'react-native'; 
import { Actions } from 'react-native-router-flux';

const imgTimeline= require('../imgs/bt-timeline-cor.png');
const imgEventos = require('../imgs/bt-eventos-cor.png');
const imgLocal = require('../imgs/bt-central.png');
const imgBombando = require('../imgs/bt-bombando-cor.png');
const imgConvites = require('../imgs/bt-convites-cor.png');

export default class Rodape extends Component {

    render() {
        return (
          <View style={styles.rodape}>
              <View style={styles.btnrodape}>
                  <TouchableHighlight style={{paddingRight: 30, paddingTop: 3}}
                     onPress={() => {Actions.timeline(); }}
                     underlayColor={'#303030'}
                     activeOpacity={0.5}
                     >
                     <Image style={{width: 40, height: 40}} source={imgTimeline}/>
                  </TouchableHighlight>
                  <TouchableHighlight style={{paddingRight: 15}}
                     onPress={() => {Actions.timeline(); }}
                     underlayColor={'#303030'}
                     activeOpacity={0.5}
                     >
                      <Image style={{width: 40, height: 45}} source={imgEventos}/>
                  </TouchableHighlight>              
              </View>
              <View>  
                  <TouchableHighlight 
                    onPress={() => {Actions.timeline(); }}
                     underlayColor={'#303030'}
                     activeOpacity={0.5}
                    >
                    <Image style={{width: 70, height: 59 }} source={imgLocal}/>
                  </TouchableHighlight>
              </View>
              <View style={styles.btnrodape}>
                  <TouchableHighlight style={{paddingTop: 3, paddingLeft: 5}}
                      onPress={() => {Actions.timeline(); }}
                      underlayColor={'#303030'}
                      activeOpacity={0.5}
                      >
                      <Image style={{width: 53, height: 40}} source={imgBombando}/>
                  </TouchableHighlight>
                  <TouchableHighlight style={{paddingLeft: 30}}
                      onPress={() => {Actions.timeline(); }}
                     underlayColor={'#303030'}
                     activeOpacity={0.5}
                      >
                      <Image style={{width: 40, height: 42}} source={imgConvites}/>
                  </TouchableHighlight>
              </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  rodape: {
      flexDirection: 'row',
      backgroundColor: '#303030',
      alignItems: 'center',
      justifyContent: 'center',
     flex: 1
 },
 btnrodape: {
    flexDirection: 'row',
    justifyContent: 'center',
 }, 
});