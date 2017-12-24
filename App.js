import React from 'react';
import { StyleSheet} from 'react-native';
import {Font} from 'expo';
import { Container, Spinner, Content, Text, View  } from 'native-base';
import firebase from 'firebase';

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
          <Text>Loguado</Text>
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
