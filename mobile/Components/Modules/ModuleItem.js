import React from 'react'
import {
	Text,
	TouchableOpacity,
	View,
	TouchableWithoutFeedback,
	Animated, 
	ScrollView
	} from 'react-native'
import { styles, colors, windowSize } from '../StyleSheet'
import Modal from "react-native-modal";
import { Button } from 'react-native-paper';

var ACTION_TIMER = 800;


class ModuleItem extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			isModalVisible: false,
			pressAction: new Animated.Value(0),
		  }
	  }
  
	  componentWillMount = () => {
		  this._value = 0;
		  this.state.pressAction.addListener((v) => this._value = v.value);
	  }

  setModalVisible = (visible) => {
	  this.setState({
		  isModalVisible: visible,
	  })
  }


  handlePressIn = () => {
	  Animated.timing(this.state.pressAction, {
		  duration: ACTION_TIMER,
		  toValue: 1
	  }).start(this.animationActionComplete);
  }
  
  handlePressOut= () => {
	  Animated.timing(this.state.pressAction, {
		  duration: 100,
		  toValue: 0
	  }).start();
  }
  
  animationActionComplete= () => {
	  console.log(this._value)
	  if (this._value >= 1) {
		  this.setModalVisible(true)
	  }
  }

	render() {
			const { dModule, triggerModule, generalUnit} = this.props
		return (
			<View>
			{ !generalUnit
				?
				<TouchableOpacity onPress={() => triggerModule(dModule.id, dModule.name)}
					style={{
						flex: 1, 
						justifyContent : 'center', 
						alignItems: 'center', 
						borderWidth: 3, 
						borderColor: colors.secondary, 
						borderRadius: 15, 
						backgroundColor : 'white', 
						margin: 10}}>					
					<View style={{
						flex: 1,
						alignItems: 'center',
						flexDirection : 'row', 
						justifyContent: 'center', 
						width: "100%", 
						height: "100%",
						margin: 20, 
						}}>
							<Text style={{ fontSize: 18, textTransform: 'capitalize' }}>{dModule.name}</Text>
					</View>
				</TouchableOpacity>
				:
				<View>
				<TouchableOpacity onPress={() => triggerModule(dModule.id, dModule.general_unit.name)} 
					style={{
						flex: 1, 
						justifyContent : 'center', 
						alignItems: 'center', 
						borderWidth: 3, 
						borderColor: colors.secondary, 
						borderRadius: 15, 
						backgroundColor : 'white', 
						margin: 10}}>			
					<View style={{
						flex: 1,
						alignItems: 'center',
						flexDirection : 'row', 
						justifyContent: 'center', 
						width: "100%", 
						height: "100%",
						margin: 20, 
						}}>
							<Text style={{ fontSize: 18, textTransform: 'capitalize' }}>{dModule.general_unit.name}</Text>
					</View>
				</TouchableOpacity>
				</View>
			}
			</View>
		)
	}
}

export default ModuleItem