// inspiration = https://gist.github.com/nickw/4fba9fe9b6547f592c34692e1c93d85d
import React, { Component } from 'react';

import {
  Text,
  View,
  Platform,
  StyleSheet, 
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

const APP_BLUE = '#1346b8' 

const styles = StyleSheet.create({
  button: {
    bottom: Platform.OS === 'ios' ? -8 : -30,
    borderRadius: 12,
    padding: 12,
    margin: 5,
    width: 165,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: APP_BLUE,
  },
  buttonLabel: {
    textAlign: 'center',
    ...Platform.select({
      ios: {
        color: '#fff',
      },
      android: {
        color: '#fff',
      }
    }),
  }
})

const ButtonWrapper = ({ buttonTitle, onPress }) => {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple()}
      >
        <View style={[styles.button]}>
            <Text style={[styles.buttonLabel]}>{buttonTitle}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableOpacity
      style={[styles.button]}
      onPress={onPress}
    >
    <Text style={[styles.buttonLabel]}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}

class CustomButton extends Component {
  renderLabel() {
    const labelStyles = [styles.buttonLabel];
    let labelText = this.props.label;
    if (Platform.OS === 'android') {
      labelText = labelText;
    }

    return <Text>{labelText}</Text>;
  }
  
  render() {
    return (
      <ButtonWrapper {...this.props}>
        {this.renderLabel()}
      </ButtonWrapper>
    );
  }
}

export default CustomButton;
