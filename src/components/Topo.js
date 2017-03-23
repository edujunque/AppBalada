import React, { Component } from 'react';
import { View, Image, TouchableHighlight, StyleSheet } from 'react-native'; 
import {firebaseRef, auth} from '../FirebaseConfig'
import { Actions } from 'react-native-router-flux';

const imgLogo = require('../imgs/logo.png');
const imgTemp = require('../imgs/NoPhoto_icon-user-default.jpg');

export default class Topo extends Component {

  constructor(props) {
    super(props);
    this.state = {usuarioAtual : ''}
  }

  ReturnURL(){
    //console.log(auth.currentUser.photoURL == null ? 'http://icons.veryicon.com/ico/System/Icons8%20Metro%20Style/Users%20User.ico' :  auth.currentUser.photoURL);
        // auth.currentUser.then((usuarioAtual) => {
    //   this.setState = { usuarioAtual : usuarioAtual};
    //   console.log(this.state.usuarioAtual);
    //   return this.state.usuarioAtual.photoURL
    // });
    
    // auth.then((result) => {
    //   console.log(result.currentUser); // "Stuff worked!"
    // }, function(err) {
    //   console.log(err); // Error: "It broke"
    // });
    return auth.currentUser.photoURL == null ? 'https://s3.amazonaws.com/convertflow/uploads/4e5effb9-0ef6-4975-ad75-1fd20c051e78/NoPhoto_icon-user-default.jpg' :  auth.currentUser.photoURL;
  }

    render() {
        // console.log(this.ReturnURL());
        return (
          <View style={styles.topo}>
            <View style={{flex: 10, alignItems: 'center', marginLeft: 30}}>
              <Image source={imgLogo} style={{width: 180, height: 40}}/>
            </View>
            <View style={{flex: 2}}>
              <TouchableHighlight 
                onPress={() => {Actions.editarPerfil()}}
                underlayColor={'#303030'}
                activeOpacity={0.5}
              >
                 <Image source={{uri : this.ReturnURL()}} style={{width: 40, height: 40, borderRadius: 30, backgroundColor: '#303030'}}/>
              </TouchableHighlight>
              
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
 topo: {
  backgroundColor: '#303030',
  alignItems:'center', 
  flex: 1.5,
  flexDirection: 'row'
 },
});