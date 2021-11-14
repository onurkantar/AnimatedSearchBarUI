import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Keyboard,
  Platform,
} from 'react-native';

import {Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const listItems = [
  'Development',
  'Business',
  ' IT & Software',
  'Office Productivity',
  'Personal Development',
  'Design',
  'Marketing',
  'LifeStyle',
  'Photography',
  'Health & Firness',
  'Teacher Training',
  'Music',
];

class App extends Component {
  state = {searchBarFocused: false};

  componentDidMount() {
    this.keyboardDidShow = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardWillShow = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow,
    );
    this.keyboardWillHide = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide,
    );
  }

  keyboardDidShow = () => {
    if (Platform.OS === 'android') this.setState({searchBarFocused: true});
  };

  keyboardWillShow = () => {
    if (Platform.OS === 'ios') this.setState({searchBarFocused: true});
  };

  keyboardWillHide = () => {
    this.setState({searchBarFocused: false});
  };

  render() {
    let textInputRef;

    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            height: 80,
            backgroundColor: '#c45653',
            justifyContent: 'center',
            paddingHorizontal: 5,
          }}>
          <Animatable.View
            animation={'slideInRight'}
            duration={500}
            style={{
              height: 50,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 5,
              flexDirection: 'row',
              borderRadius: 20,
            }}>
            <Animatable.View
              animation={
                this.state.searchBarFocused ? 'fadeInLeft' : 'fadeInRight'
              }
              duration={400}>
              <Icon
                name={this.state.searchBarFocused ? 'arrow-back' : 'search'}
                type="ionicon"
                fontSize={24}
                onPress={() => {
                  this.state.searchBarFocused
                    ? (() => {
                        Keyboard.dismiss();
                      })()
                    : (() => {
                        textInputRef.focus();
                        this.setState({searchBarFocused: true});
                      })();
                }}
              />
            </Animatable.View>
            <TextInput
              ref={ref => {
                textInputRef = ref;
              }}
              style={{
                flex: 1,
                height: 50,
                borderRadius: 20,
                paddingLeft: 10,
              }}
              placeholder={'Search'}
            />
          </Animatable.View>
        </View>

        <FlatList
          style={{
            backgroundColor: this.state.searchBarFocused
              ? 'rgba(0,0,0,0.3)'
              : 'white',
          }}
          data={listItems}
          renderItem={({item}) => (
            <Text style={{padding: 20, fontSize: 20}}>{item}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
