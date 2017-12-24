import React from 'react';
import { StyleSheet} from 'react-native';
import {Font} from 'expo';
import { Container, Spinner, Content, Text, View  } from 'native-base';
import firebase from 'firebase';
import Main from './Components/main';

//-------------------------Components
import Log from './Components/log'


export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      fontsAreLoaded: false,
      user: null
    }
  }



  async componentWillMount() {
   Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });


    // Por alguna razon las fuentes no cargan a tiempo, asi que la aplicasion tiene 500 ms para cargarlas
    setTimeout(() => {
      this.setState({fontsAreLoaded: true});
    }, 500)

    //---------------- Para no tener que loguearme cada vez durante el desarrollo
    /*this.setState({
      user: {
        displayName: 'Juan Carlos Santa Abreu',
        email: 'Jcarlossa120@hotmail.com',
        photoURL: "https://firebasestorage.googleapis.com/v0/b/universidad-41c49.appspot.com/o/profilePics%2Fno-photo-male.jpg?alt=media&token=65b5f92a-aab5-47c8-bcd5-dee6758335ba",
        uid: "JCARLOSSA120@HOTMAIL%2ECOM"
      }
    })*/

  }




  loadUser = (userInfo) => {
    this.setState({
      user: userInfo
    })
  }


  loadContent = () => {

    // -----------------------------Carga de las fuentes
    if(this.state.fontsAreLoaded){


      //-----------------Verifica si el usuario esta logueadop
      if (this.state.user) {
        return(
          <Main user={this.state.user}/>
        )
      }
      else{
        return(<Log userInfo={this.loadUser} />)
      }


    }else {
      return(
        <View style={styles.container}>
          <Spinner />
        </View>
      )
    }
  }

  render() {
    return (
      <Container>
        {this.loadContent()}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



firebase.initializeApp({
  apiKey: "AIzaSyBgLjjtZysVtP8sbz4fdxF4EytRAoo3KVU",
  authDomain: "universidad-41c49.firebaseapp.com",
  databaseURL: "https://universidad-41c49.firebaseio.com",
  projectId: "universidad-41c49",
  storageBucket: "universidad-41c49.appspot.com",
  messagingSenderId: "130858667369"
});
