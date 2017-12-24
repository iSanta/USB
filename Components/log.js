import React from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import firebase from 'firebase';
import { Text, Root, Header, Left, Button, Icon, Body, Title, Right, Content, Footer, FooterTab, Form, Item, Input, View, Toast } from 'native-base';


// encoding
import { encode, decode, encodeComponents, decodeComponents } from 'firebase-encode';

class Log extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      page: null,
      email: null,
      pass: null,
      name: null,
      title: 'Inicia sesión'
    }
  }

  componentWillMount(){
    this.setState({
      page: "SessionInit"
    })
  }



//--------------------------------------------- Registrarse
  regist = () => {
    Keyboard.dismiss()
    let name = this.state.name;
    let email = this.state.email;
    let pass = this.state.pass;

    if (name != null && email != null && pass != null) {


      //en caso de un espacio al final de correo, lo elimina
      while (/\s+$/.test(email)) {
        email = email.substring(0, email.length - 1);
      }

      var uid = email.toUpperCase();
      uid = encode(uid);


      //----------------------------------realiza una busqueda en la base de datos con la variable 'uid'
      firebase.database().ref('users').child(uid).once('value', (snapshot) => {

        //------------------------------Determina si el user existe
        if (snapshot.exists()) {
          Toast.show({
            text: 'Este usuario ya se encuentra registrado',
            position: 'bottom',
            buttonText: 'Okay'
          })
        }
        else{

          var record ={
            displayName: name,
            email: email,
            passWord: pass,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/universidad-41c49.appspot.com/o/profilePics%2Fno-photo-male.jpg?alt=media&token=65b5f92a-aab5-47c8-bcd5-dee6758335ba',
            uid: uid
          }
          //--------------------------Se hace el registro
          const dbRef = firebase.database().ref('users/' + uid);
          dbRef.set(record);

          Toast.show({
            text: 'El registro ha sido exitoso.',
            position: 'bottom',
            buttonText: 'Okay'
          })
        }

        this.setState({
          page: 'SessionInit',
          title: 'Inicia sesión'
        })



      })
    }
    else{
      Toast.show({
        text: 'Por favor asegúrese de llenar todos los campos.',
        position: 'bottom',
        buttonText: 'Okay'
      })
    }




  }

// -------------------------------------------- Inicio de sesion
  sessionInit = () => {
    Keyboard.dismiss()
    var email =this.state.email;
    var password =this.state.pass;

    if (email != null && password != null) {
      while (/\s+$/.test(email)) {
        email = email.substring(0, email.length - 1);
      }

      var uid = email.toUpperCase();
      uid = encode(uid);
      //----------------------------------------- Verifica si el email existe en la base de datos
      console.log(uid);
      firebase.database().ref('users').child(uid).once('value', (snapshot) => {
        if (snapshot.exists()) {
          var userEmail = snapshot.val().email;
          var userPass = snapshot.val().passWord;
          if(userEmail === email && userPass === password){
            const userInfo = {
              displayName: snapshot.val().displayName,
              email: userEmail,
              photoURL: snapshot.val().photoURL,
              uid: uid,
            }
            this.props.userInfo(userInfo);
          }
          else{
            Toast.show({
              text: 'La contraseña ingresada es incorrecta.',
              position: 'bottom',
              buttonText: 'Okay'
            })
          }


        }
        else{
          Toast.show({
            text: 'No se ha encontrado su correo en la base de datos.',
            position: 'bottom',
            buttonText: 'Okay'
          })
        }



      })

    }
    else{
      Toast.show({
        text: 'Por favor asegúrese de llenar todos los campos.',
        position: 'bottom',
        buttonText: 'Okay'
      })
    }


  }

  loadContent = () => {
    if(this.state.page === 'SessionInit'){
      return(
        <View style={{paddingTop: 40}}>
          <Text style={styles.texts}>Inicia sesión para acceder al contenido de la aplicación.</Text>
          <Form>
            <Item>
              <Input id='email' placeholder="Correo electrónico" onChangeText={(email) => {this.setState({email})}} />
            </Item>
            <Item last>
              <Input secureTextEntry={true} id='Pass' placeholder="Password" onChangeText={(pass) => {this.setState({pass})}} />
            </Item>
          </Form>
          <Text>{this.state.email}</Text>
          <Button onPress={this.sessionInit} style={styles.buttons} block ><Text style={styles.buttonsText}> Iniciar sesion </Text></Button>
          <View style={{marginTop: 100, borderTopColor: '#e4e4e4', borderTopWidth: 1}}>
            <Text style={styles.texts}>Si no te encuentras registrado, puedes hacerlo a continuación. </Text>
            <Button onPress={() => {this.setState({ page: 'Register', title: 'Registrarse'})}} style={styles.buttons} block ><Text style={styles.buttonsText}>Registrarse</Text></Button>
          </View>
        </View>
      )
    }
    else if(this.state.page === 'Register'){
      return(
        <View>
          <Text style={styles.texts}>Si no te encuentras registrado, puedes hacerlo a continuación.</Text>
          <Form>
            <Item>
              <Input id='Name' placeholder="Nombre Completo" onChangeText={(name) => {this.setState({name})}} />
            </Item>
            <Item>
              <Input id='email' placeholder="Correo electrónico" onChangeText={(email) => {this.setState({email})}} />
            </Item>
            <Item last>
              <Input id='Pass' secureTextEntry={true} placeholder="Password" onChangeText={(pass) => {this.setState({pass})}} />
            </Item>

            <Button onPress={this.regist} style={styles.buttons} block ><Text style={styles.buttonsText}>Registrarse</Text></Button>
          </Form>
        </View>
      )
    }
  }

  render(){
    return(
      <Root>
        <Header style={styles.green}>
          <Left />
          <Body>
            <Title>{this.state.title}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          {this.loadContent()}
        </Content>
        <Footer>
          <FooterTab style={styles.green}>
            <Button  style={styles.green} full onPress={() => {this.setState({ page: 'SessionInit', title: 'Inicia sesión'})  }} >
              <Icon name='home' style={{color: '#fff'}} />
            </Button>
          </FooterTab>
        </Footer>
      </Root>
    )
  }
}



const styles = StyleSheet.create({
  texts: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: '#4CAF50',
  },
  green: {
    backgroundColor: '#4CAF50'
  }
})

export default Log;
