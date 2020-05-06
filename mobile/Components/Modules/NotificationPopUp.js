import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TouchableHighlight } from 'react-native'
import { withInAppNotification } from 'react-native-in-app-notification';

class NotificationPopUp extends React.Component {
	constructor (props) {
		super(props)
	}

	componentDidMount() {
		this.props.showNotification({
	        title: this.props.title,
	        message: this.props.message,
	        //backgroundColor: "blue" 
	        additionalProps: {backgroundColor: "blue", textColor: "blue"}
	    });
	}	
					

  render() {
  	return (
  		<View>
	    </View>
      );
    }
}

export default withInAppNotification(NotificationPopUp)