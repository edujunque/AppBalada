import React, { Component } from 'react';
import { StyleSheet,  Text,  View, TouchableHighlight, Image, Modal } from 'react-native';
import {firebaseRef, auth} from '../FirebaseConfig'
import { Actions } from 'react-native-router-flux';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

const imgLike = require('../imgs/bt-central.png');
const imgLiked = require('../imgs/bt-central.png');

export default class botaoLike extends Component {
  constructor(props){
    super(props);
    this.state = { Checkedin : false};
    this.state = {modalVisible : false};
   }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

   componentWillMount() {
    this.setModalVisible(false);
    
      const usuarioAtual = auth.currentUser;
      var refData = firebaseRef.child('user/'+ usuarioAtual.uid);
      refData.on('value',(snapshot) => {
        if (snapshot.child('/eventosCheckin' + '/evID/' + this.props.evID).exists()){
          // console.log('existe o nó:');
          var evCheckedin = snapshot.child('/eventosCheckin' + '/evID/' + this.props.evID).val();
          //Se o nó existe é ´porque o usuario já deu like nesse evento
          //Verifica qual é o estado atual do like
          // console.log(evLiked.liked);
          if(evCheckedin.Checkedin){
            this.setState({Checkedin: true});
            // console.log('existe o nó: setou estado true');
          }
          else{
            this.setState({Checkedin: false});
            // console.log('existe o nó: setou estado false');
          }
          
        }
        else{
          this.setState({Checkedin: false});
          // console.log('nao existe o nó: setou estado false');
        }
      }); 
   }
  
  actionCheckedinBtn(){
      this.setModalVisible(false);
      var evCheckin = 0;
      var refDataEvento = firebaseRef.child('eventos/'+ this.props.evID);
      refDataEvento.on('value',(snapshot) => {
        evCheckin = snapshot.val().evCheckin;
      }); 
    const usuarioAtual = auth.currentUser;
    if(this.state.Checkedin){
      //atualiza usuario
      firebaseRef.child('user/'+ usuarioAtual.uid + '/eventosCheckin/evID/' + this.props.evID).set({
        Checkedin : false
      });
      //atualiza evento
      firebaseRef.child('eventos/'+ this.props.evID).update({
        evCheckin : evCheckin - 1
      });
    }
    else{
      //atualiza usuario
     firebaseRef.child('user/'+ usuarioAtual.uid + '/eventosCheckin/evID/' + this.props.evID).set({
        Checkedin : true
      });
     //atualiza evento
      firebaseRef.child('eventos/'+ this.props.evID).update({
        evCheckin : evCheckin + 1
      });
    }
    
  }
  
  disableCheckin(){
    if(this.state.Checkedin){
      return true
    } else{
      return false
    }
  }

  render() {
    if(this.state.Checkedin){
      return (
        <View style={{backgroundColor: 'transparent'}}>
          <TouchableHighlight style={{opacity: 0.5}}
             onPress={() => {this.setModalVisible(!this.state.modalVisible)}}
             underlayColor={'transparent'}
             activeOpacity={0.5}
             disabled= {this.disableCheckin()}
             >
             <Image source={imgLiked} style={{width: 70, height: 59, backgroundColor: 'transparent'}}/>
          </TouchableHighlight>
        </View>
      );
    }else{
      return (
        <View>
          <View >
             <Modal 
                animationType={"slide"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}
                >
                   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{backgroundColor: '#303030',height: 100, width: 200, alignItems: 'center', borderRadius: 15}}>
                      <View>
                        <TouchableHighlight style={styles.btnComprar}
                          onPress={() => {
                          this.actionCheckedinBtn()
                        }}>
                          <Text style={styles.txtComprar}>FAZER CHECK-IN</Text>
                        </TouchableHighlight>
                      </View>
                      <View style={{paddingTop: 10}}>
                        <TouchableHighlight style={styles.btnCancelar}
                          onPress={() => {
                          this.setModalVisible(!this.state.modalVisible)
                        }}>
                          <Text style={styles.txtCancelar}>Cancelar</Text>
                        </TouchableHighlight>
                      </View>
                      </View>
                   </View>
            </Modal>
          </View>
          <View>
            <TouchableHighlight 
               onPress={() => {this.setModalVisible(!this.state.modalVisible)}}
               underlayColor={'transparent'}
               activeOpacity={0.5}
               disabled= {this.disableCheckin()}
               >
               <Image source={imgLike} style={{width: 70, height: 59, backgroundColor: 'transparent'}}/>
            </TouchableHighlight>        
          </View>
        </View>
      );
    }
  
  }
}

const styles = StyleSheet.create({
 btnComprar: {
  backgroundColor: '#EE2B7A',
  width: 150,
  alignItems: 'center',
  padding: 10,
  borderRadius: 30,
  marginTop: 10
},
txtComprar: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 12
},
btnCancelar: {
  backgroundColor: 'transparent',
  width: 125,
  alignItems: 'center',
  padding: 5,
  borderRadius: 30,
  borderWidth: 1,
  borderColor: '#737373'
},
txtCancelar: {
  color: '#737373',
  fontWeight: 'bold',
  fontSize: 12
}
});
