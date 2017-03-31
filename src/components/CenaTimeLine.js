import React, { Component } from 'react';
import { StyleSheet,  Text,  View, Button, TouchableHighlight, ScrollView, Select, Option} from 'react-native';
import firebase from 'firebase';
import { Image,  ListView,  Tile,  Title,  Subtitle,  Screen} from '@shoutem/ui';
import { Actions } from 'react-native-router-flux';
import Rodape from './Rodape'
import Topo from './Topo'
import Filtro from './Filtro'
import BotaoLike from './BotaoLike'
import {firebaseRef, auth} from '../FirebaseConfig'

//import { NavigationBar } from '@shoutem/ui/navigation';
const imgLogo = require('../imgs/logo.png');
const imgLike = require('../imgs/ico_like.png');
const imgTemp = require('../imgs/NoPhoto_icon-user-default.jpg');
const showBuyBtn = false;

export default class CenaTimeLine extends Component {
 
constructor(props) {
  super(props);
  this.state = {eventos : []}
  this.filterUser = this.filterUser.bind(this);
}

 filterUser(filter){
  this.listarDados(filter);
 }

listarDados(filter){
   const usuarioAtual = auth.currentUser;
   var eventos = firebaseRef.child('eventos').orderByKey();
   // var user = firebaseRef.child('user');
   var evento;
   eventos.on('value', function(snapshot) { 
    evento = snapshot.val();
   });

   var refDataUser = firebaseRef.child('user/'+ usuarioAtual.uid);
   refDataUser.on('value', (snapshot) => {
     var listagemEventos = [];
       //aplica as regras de filtro
     if(filter == 'Curtidas'){
     
        evento.forEach((childSnapshot) => {
         if( snapshot.child('/eventosCurtidos' + '/evID/' + childSnapshot.evID).exists()){
          //Se existe verificar se esta true ou false.
          var evLiked = snapshot.child('/eventosCurtidos' + '/evID/' + childSnapshot.evID).val();
          if(evLiked.liked){

            //Caso true quer dizer que o usuario curtiu esse evento.
            //Adiciona o evento no objeto que será enviado para o state
            listagemEventos.push(childSnapshot);
          }
         }
        });
     } else if(filter == 'Rolando Agora'){

     } else if(filter == 'Bombando'){

     } else {
      //Lista as mais recentes
         evento.forEach((childSnapshot) => {
            listagemEventos.push(childSnapshot);
         });
         
     }
     this.setState({ eventos : listagemEventos});
   });
}

 // componentDidMount() {
 //   this.listarDados("Recentes");
 // }

 returnBuyBtn(blnShow){

    if(blnShow){
        return (
         <TouchableHighlight style={styles.btnComprar}
            onPress={() => {Actions.timeline(); }}>
            <Text style={styles.txtComprar}>COMPRAR</Text>
         </TouchableHighlight>
      );             
    }
  
 }

 returnDay(date){
    var res = String(date).split("/");
    var date1 = new Date(res[2],res[1],res[0]);
    return date1.getDate();
 }

 returnMonth(date){
    var monthNames = ["JAN", "FEV", "MAR", "ABR", "MAIO", "JUN",
    "JUL", "AGO", "SET", "OUT", "NOV", "DEZ", ""];
    var res = String(date).split("/");
    return monthNames[res[1] -1];
 }

 returnYear(date){
    var res = String(date).split("/");
    return String(res[2]).toString().substr(2,2);
 }

  // getEventos() {
  //   return require('../../assets/agendabox-2a212-export.json');
  // }

  // defines the UI of each row in the list
  renderRow(eventos) {
    return (
      <View style={{backgroundColor: '#303030', marginBottom: 20}}>
        <View style={{flexDirection:'row', margin: 5, }}>
          <View style={{flex: 0.7, }}>
            <Image source={imgTemp} style={{width: 40, height: 40, borderRadius: 30, backgroundColor: '#303030', resizeMode: 'cover'}}/>
          </View>
          <View style={{flex: 4}}>
            <Text style={{color: 'white'}}>{eventos.evOrganizador}</Text>
            <Text style={{fontSize: 11, color: 'white'}}>Publicado em: {eventos.evDataPublicacao}</Text>
          </View>
        </View>
        <View>
          <TouchableHighlight 
              onPress={() => {Actions.eventodetalhes({evID: eventos.evID})}}>
               <Image styleName="large-banner" source={{ uri: eventos.evFotoBanner }}></Image>
          </TouchableHighlight>
         
          
            <View style={{backgroundColor: '#303030', flexDirection: 'row'}}>
              <View style={{alignItems: 'center', justifyContent: 'center', flex : 2, paddingTop: 5}}>
                <Text style={{fontSize: 26, color:'#737373', fontWeight: 'bold'}}>{this.returnDay(eventos.evData)}</Text>
                <Text style={{fontSize: 9, color:'#737373', fontWeight: 'bold'}}>{this.returnMonth(eventos.evData)}/
                  <Text style={{fontSize: 9, color:'#737373', fontWeight: 'normal'}}>{this.returnYear(eventos.evData)}</Text>
                </Text>
              </View>
              <View style={{ flex : 10, paddingTop: 3}}>
                <Title style={{color: 'white', fontSize: 16}}>{eventos.evNome}</Title>
                <Subtitle style={{color: '#737373', fontSize: 12}}>{eventos.evLocal}</Subtitle>
              </View>
              <View style={{ flex : 2, paddingTop: 10}}>
                <BotaoLike evID={eventos.evID} />
              </View>
            </View>
          <View style={{flexDirection: 'row', borderTopWidth: 0.2, borderColor: 'white', margin: 10}}>
            <View style={{ flex: 1, marginTop: 10}}>
              <Text style={{color:'white', paddingTop: 5}}>R$ {eventos.eventoPrecos[0].Valor} a </Text>
            </View>
            <View style={{ flex: 2, alignItems: 'flex-start', marginTop: 10}}>
              <Text style={{color:'white', paddingTop: 5}}>R$ {eventos.eventoPrecos[2].Valor}</Text>
            </View>
            <View style={{flex: 2, alignItems: 'flex-end'}}>
                {this.returnBuyBtn(showBuyBtn)}
            </View>
          </View>
        </View>

      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topo}>
          <Topo />
        </View>
        <View style={styles.filtro}>
          <Filtro  filterUser={this.filterUser} />
        </View>
        <Screen style={{flex: 8, backgroundColor: 'black'}}>
          <ListView
          data={this.state.eventos}
          renderRow={eventos => this.renderRow(eventos)}
          />
        </Screen>
       
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
 },
 topo: {
  flex: 1.5,
 },
 user: {
  margin: 10
 },
 filtro: {
  flex: 1,
  backgroundColor: 'black'
 },
  btnComprar: {
  backgroundColor: '#EE2B7A',
  width: 100,
  alignItems: 'center',
  padding: 7,
  borderRadius: 30,
  marginTop: 10,
},
  txtComprar: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12
},  
});

