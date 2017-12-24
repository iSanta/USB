import React from 'react';
import { StyleSheet} from 'react-native';
import { Text, View } from 'native-base';


class SideBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <View style={styles.menuContainer}>
        <Text>este es el menu :o</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  menuContainer:{
    flex:1,
    backgroundColor: '#fff'
  }
})

export default SideBar;
