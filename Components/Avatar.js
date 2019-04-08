import React from 'react'
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native'
import { ImagePicker, Permissions } from 'expo';
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';

class Avatar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      default: require('../assets/ic_tag_faces.png'),
      avatar: null
    }
    this._avatarClicked = this._avatarClicked.bind(this)
  }

  _cameraClicked = async() => {

    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)

    if (status == 'granted') {

      const { cancelled, uri } = await ImagePicker.launchCameraAsync({});

      if (!cancelled) {
          const action = { type: "SET_AVATAR", uri }
          this.props.dispatch(action)
      }
    }
    else
    {
       alert('Persmission d\'accées à la caméra non accordée')
       this._avatarClicked();
    }

  }
  _avatarClicked = async() => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    //console.log(result);
    if (!result.cancelled) {
      const action = { type: "SET_AVATAR", value: result.uri }
      this.props.dispatch(action)
    } 
     
  }
  
    _defaultAvatar(image) {

      if(image == null || image == 2)
      { 
        return ( <Image style={styles.avatar} source={this.state.default} /> )
      }
      else
      {
        return ( <Image style={styles.avatar} source={{ uri : image }} /> )
      }

    }

  render() {
    let  { avatar } = this.props 
    //alert(avatar)
    return(
      <View >
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={this._avatarClicked}>
          {this._defaultAvatar(avatar)}
        </TouchableOpacity>
        <TouchableOpacity onPress={this._cameraClicked}>
          <Ionicons name="md-camera" size={35} color="black" />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
    width: 100, // Pensez bien à définir une largeur ici, sinon toute la largeur de l'écran sera cliquable
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#9B9B9B',
    borderWidth: 2
  }
})

// On mappe l'avatar aux props de notre component
const mapStateToProps = state => {
  return {
    avatar: state.setAvatar.avatar
  }
}

export default connect(mapStateToProps)(Avatar)