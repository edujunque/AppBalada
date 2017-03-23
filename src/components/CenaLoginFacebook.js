import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableHighlight, ScrollView, Button} from 'react-native';
import { Actions } from 'react-native-router-flux';
//import firebase from 'firebase';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import {firebaseRef, auth} from '../FirebaseConfig'

const imgLogo = require('../imgs/logo.png');
const imgBackground = require('../imgs/bg.jpg');

export default class LoginFacebook extends Component {
  constructor(props) {
    super(props);
    this.state = {user : ''};
    this.state = {eventos : ''}
  }
 
  saveFacebookData(data){
    var email = data.profile.email;
    var senha = data.profile.id;

    //Verifica se o usuario já existe na base.
    auth.signInWithEmailAndPassword(email, senha).then(() => {
      //Direciona o usuario para a area logada.
      Actions.timeline();
      }, function(error) {
      // An error happened.
        //verifica se o erro é de usuario não encontrado.
        if(error.code == 'auth/user-not-found'){
           //Cria usuario na base padrão de autenticação por email do Firebase  (usado para login e afins)
           auth.createUserWithEmailAndPassword(email, senha).then(() => {
            // Update successful.
            //cria usuario na estrutura de relação entre informações da base. (evento X curtidas e evento X Checkin)
             const usuarioAtual = auth.currentUser;
             //console.log(data);
             firebaseRef.child('user/'+ usuarioAtual.uid).set({
                facebookID : data.profile.id,
                gender : data.profile.gender,
                name : data.profile.first_name + ' ' + data.profile.last_name,
                linkFB : data.profile.link,
                cpf : ''
             });
            
             usuarioAtual.updateProfile({
              photoURL: data.profile.picture.data.url
              }).then(function() {
                // Update successful.
              }, function(error) {
                // An error happened.
              });

              //Direciona o usuario para a area logada.
              Actions.timeline();
            }, function(error) {
            // An error happened.
          });
         //var usuario = auth.auth();
        }
        else{
          alert(error);
        }
    });

  }

listarDados(){
   var eventos = firebaseRef.child('eventos/3');
   eventos.on('value', (snapshot) => { 
      var evento = snapshot.val();
      this.setState({ eventos : evento});
      console.log(evento);
    });
}

  render() {
    return (
     <FBLogin style={{ borderRadius: 30,  width: 225}}
      ref={(fbLogin) => { this.fbLogin = fbLogin }}
      permissions={["email","user_friends"]}
      onLogin={(e) => {this.saveFacebookData(e)}}
      onLoginFound={function(e){console.log(e)}}
      onLoginNotFound={function(e){console.log(e)}}
      onLogout={function(e){console.log(e)}}
      onCancel={function(e){console.log(e)}}
      onPermissionsMissing={function(e){console.log(e)}}
    />

    );
  }
}
