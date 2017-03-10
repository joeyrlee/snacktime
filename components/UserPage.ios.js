import React, { Component } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  Image,
  ScrollView,
  ListView,
  TouchableHighlight
} from 'react-native';
import styles from '../styles.ios.js';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import helpers from '../helpers/helpers.js';


class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      ingredients: []
    }
  }

  goBack() {
    this.props.navigator.pop();
  }

  componentWillMount() {
    if(!this.props.state.id) {
      console.log('THERE IS NO STATE ID')
    } else {
      this.getData();
    }
  }

  // create NewUser if not find in DB
  createNewUserIfNotAccount(useridforfb) {
    var local = 'http://localhost:8000/'
    var userid = useridforfb
    var reqBody = {
      "id": userid
    }
    axios.post(`${local}createUser`, reqBody)
    .then((reponese) => {
    }).catch((error) => {
    });
  }

  deleteRecipe(recipeId) {
    helpers.user.deleteRecipe(recipeId, this.props.state.id);
    this.getData();
  }

  getData() {
    var local = 'http://localhost:8000/'
    var FacebookUserID = this.props.state.id.userID
    axios.get(`${local}findUser`, {
      params: {
        ID: FacebookUserID
      }
    })
    .then((response) => {
      var userrecipedata = response.data[0].FavoriteRecipe
        this.setState({
          dataSource: userrecipedata
        })
      })
      .catch((error) => {
        console.log('creating a new user');
      this.createNewUserIfNotAccount(FacebookUserID)
    })
  }

  render() {
    return this.props.state.isAuthenticated
      ?
        (
          <View>
            <Text style={{marginTop: 25}}>UserHomePage</Text>
            <TouchableHighlight style={styles.backButtonCamera} onPress={this.goBack.bind(this)}>
              <Image
                style={styles.backButtonImage}
                source={{uri: 'https://cdn0.iconfinder.com/data/icons/vector-basic-tab-bar-icons/48/back_button-128.png'}}
              />
            </TouchableHighlight>
            <Text>Your FavoriteRecipe</Text>
            <ScrollView style={{marginBottom: 110}}>
            {this.state.dataSource.map((data, index) => (
              <View key={index} style={styles.ingredientContainer}>
                <View style={styles.ingredientList}>
                  <Text>Recipe Name: {data.name}</Text>
                    <View style={styles.recipeImageAndIcons}>
                      <Image source={{uri: data.image}} style={styles.recipeImage} />
                    </View>
                    <TouchableHighlight style={styles.backButtonCamera} onPress={this.deleteRecipe.bind(this, data.id)}>
                      <Image
                        style={styles.backButtonImage}
                        source={require('../public/removeicon.png')}
                      />
                    </TouchableHighlight>
                </View>
              </View>
            ))}
            </ScrollView>
          </View>
        )
      :
        (
          <View style={{marginTop: 75}}>
            <Text>Not login</Text>
            <TouchableHighlight style={styles.backButtonCamera} onPress={this.goBack.bind(this)}>
              <Image
                style={styles.backButtonImage}
                source={{uri: 'https://cdn0.iconfinder.com/data/icons/vector-basic-tab-bar-icons/48/back_button-128.png'}}
              />
            </TouchableHighlight>
          </View>
        )
  }
}

export default connect(state => ({
    state: state.facebook
  }), null
)(UserPage);

// <Text style={styles.recipeTitle2}>Ingredients:</Text>
// <Text style={styles.ingredientListText2}>{ingredients}</Text>