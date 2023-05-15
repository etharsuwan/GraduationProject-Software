import React, { Component, useEffect } from 'react';
import { Modal, Text, View, Image, TouchableOpacity } from 'react-native';
import { Sound } from 'react-native-sound';
import Ionicons from 'react-native-vector-icons/Ionicons';
import successSound from '../assets/success.mp3';

class SuccessModal extends Component {
  successSoundObject = new Sound(successSound);

  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      this.successSoundObject.play();
    } else if (prevProps.visible && !this.props.visible) {
      this.successSoundObject.stop();
    }
  }


handleClose = () => {

}
  
  
  render() {
    return (
      <Modal visible={this.props.visible} onRequestClose={this.onClose}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../assets/check.png')} style={{ width: 100, height: 100 }} />
          <Text style={{fontWeight:'bold',fontSize:16,marginTop:20}}>Order sent successfully!</Text>
          <View style={{margin:20}}>       
             {/* <Text>You'll be notified when a drive pick your order!!</Text> */}
          </View>
        </View>
        <TouchableOpacity onPress={this.handleClose} style={{ alignSelf: 'center', position: 'absolute', bottom: 20 }}>
<Ionicons name="md-close-circle-outline" size={65} color='black'  />
</TouchableOpacity>
      </Modal>
    );
  }
}

export default SuccessModal;
