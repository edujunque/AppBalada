import React, { Component } from 'react';
import { Container, Content, Picker } from 'native-base';
import { Text, View } from 'react-native'; 

//const Item = Picker.Item;​
const Item = Picker.Item;
export default class PickerExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: undefined,
            selected1: 'key-1',
            results: {
                items: []
            }
        }
    }
    onValueChange (value: string) {
        this.setState({
            selected1 : value
        });
    }

    render() {
        return (
          <View style={{backgroundColor: '#303030', width: 350}}>
            <Picker style={{color:'#F467B4'}}
                        iosHeader="Select one"
                        mode="dropdown"
                        selectedValue={this.state.selected1}
                        onValueChange={this.onValueChange.bind(this)}>
                        <Item label="Publicações Recentes" value="key-1" />
                        <Item label="Rolando agora" value="key0" />
                        <Item label="Bombando" value="key1" />
                   </Picker>
         </View>
        );
    }
}