import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Text, View, Card, CardItem, Left, Thumbnail, Body, Button, Icon, Right, H1, H3 } from 'native-base';
import firebase from 'firebase';

var dataBaseRef = null;

class Wall extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      user: null,
      pictures: []
    }
  }

  componentWillUnmount() {
    //-------- Es necesario desmontar la referencia de la base de datos, de no ser asi al volver a cargar el componente simplemente leera el primer registro de la base de datos por alguna razon
    dataBaseRef.off();
  }


  componentWillMount(){
    this.setState({
      user: this.props.user
    })


    dataBaseRef = firebase.database().ref('wall');
    dataBaseRef.on('child_added', snapchot =>{
      this.setState({
        pictures: this.state.pictures.concat(snapchot.val())
      })
    })
  }
  render(){
    return(
      <View>
        {
          this.state.pictures.map((post, index) =>(
            <Card style={{flex: 0}} key={index}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: post.userPicture}} />
                <Body>
                  <Text>{post.userName}</Text>
                  <Text note>{post.imageTitle}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: post.photoUrl}} style={{height: 300, width: 320, flex: 1}}/>
                <H1 style={{marginTop:5}}>{post.title}</H1>
                <H3 style={{marginBottom: 20, color: '#969696'}}>{post.subtitle}</H3>
                <Text>
                  {post.content}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
          ))
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  texts: {
    paddingLeft: 10,
    paddingRight: 10,
  },
})

export default Wall;
