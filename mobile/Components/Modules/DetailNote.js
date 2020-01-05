// Components/ModulePlace.js

import React from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Image, BackHandler} from 'react-native'
import { styles, colors, windowSize } from '../StyleSheet'
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon_Ant from 'react-native-vector-icons/AntDesign';

class ModulePlace extends React.Component {
	
	render() {
		let { navigate } = this.props.navigation;
		let item = this.props.navigation.getParam('data')
		console.log(item)
		return (
			<View style={{flex:1}}>
					<View style={{backgroundColor:colors.secondary, flex:1, flexDirection: 'column'}}>
						<View style={{flex:1}}></View>
						<View style={{flex:8, flexDirection: 'row', justifyContent:"space-between"}}>
							<TouchableHighlight style={{margin: 10}}>
								<Icon
									name="arrow-back"
									color="#FFF"
									size={35}
									onPress={() => navigate("Calendar")}
			    				/>
							</TouchableHighlight>
						</View>
						<View style={{flex:1}}></View>
					</View>
					<View style={{ flex: 1}}></View>
					<View style={{ flex: 2, justifyContent: "center", alignCOntent: 'center'}}>
						<View style={{flex: 0.5}}></View>
						<View style={{flex: 4.25, flexDirection:"row"}}>
							<View style={{ flex: 1.5}}></View>
							<Icon_Ant
								name="clockcircleo"
								color="#000"
								size={40}
							/>
							<View style={{ flex: 1.5}}></View>
							<View style={{ flex: 5}}>
        						<Button style={{fontSize: 15, borderRadius: 15,	borderWidth: 4,	borderColor: colors.primary }} color={colors.primary} title={item.date}/>
							</View>
							<View style={{ flex: 1}}></View>
						</View>
						<View style={{flex: 0.5}}></View>
						<View style={{flex: 4.25, flexDirection:"row"}}>
							<View style={{ flex: 1.5}}></View>
							<Icon_Ant
								name="calendar"
								color="#000"
								size={40}
							/>
							<View style={{ flex: 1.5}}></View>
							<View style={{ flex: 5}}>
        						<Button style={{fontSize: 15, borderRadius: 15,	borderWidth: 4,	borderColor: colors.primary }} color={colors.primary}  title={item.time} />
							</View>
							<View style={{ flex: 1}}></View>
						</View>
						<View style={{flex: 0.5}}></View>
					</View>
					<View style={{ flex: 1}}></View>
					<View style={{ flex: 5, justifyContent: "center"}}>
							<View style={{flexDirection: "row"}}>
								<View style={{flex:0.5}}></View>
								<Text style={{flex:4, fontSize: 22}}>
									Glucose
								</Text>
								<View style={{flex:0.5}}></View>
								<Icon
									style={{flex:1}}
									name="bubble-chart"
									color="#ffbb00"
									size={35}
									onPress={() => navigate("Calendar")}
								/>
								<View style={{flex:0.5}}></View>
								<Text style={{width: windowSize.x / 1.5, flex: 4 }}>
									{item.BloodGlucose}
								</Text>
								<View style={{flex:0.5}}></View>
							</View>
							<View style={{flexDirection: "row"}}>
								<View style={{flex:0.5}}></View>
								<Text style={{flex:4, fontSize: 22}}>
									Insuline (Nourr.)
								</Text>
								<View style={{flex:0.5}}></View>
								<Icon
									style={{flex:1}}
									name="lens"
									color="#b2ff00"
									size={35}
								/>
								<View style={{flex:0.5}}></View>
								<Text style={{width: windowSize.x / 1.5, flex: 4 }}>
									{item.InsulineFood}
								</Text>
								<View style={{flex:0.5}}></View>
							</View>
							<View style={{flexDirection: "row"}}>
								<View style={{flex:0.5}}></View>
								<Text style={{flex:4, fontSize: 22}}>
									Insuline (Corr.)
								</Text>
								<View style={{flex:0.5}}></View>
								<Icon
									style={{flex:1}}
									name="label"
									color="red"
									size={35}
								/>
								<View style={{flex:0.5}}></View>
								<Text style={{width: windowSize.x / 1.5, flex: 4, fontSize: 22, color: colors.primary }}>
									{item.InsulineCorr}
								</Text>
								<View style={{flex:0.5}}></View>
							</View>
							<View style={{flexDirection: "row"}}>
								<View style={{flex:0.5}}></View>

								<Text style={{flex:4, fontSize: 22}}>
									Description
								</Text>
								<View style={{flex:0.5}}></View>
								<Icon
									style={{flex:1}}
									name="textsms"
									color="#00bfff"
									size={35}
									onPress={() => navigate("Calendar")}
								/>
								<View style={{flex:0.5}}></View>
								<Text style={{width: windowSize.x / 1.5, flex: 4 }}>
									{item.description}
								</Text>
								<View style={{flex:0.5}}></View>
							</View>
							<View style={{flexDirection: "row"}}>
								<View style={{flex:0.5}}></View>
								<Text style={{flex:4, fontSize: 22}}>
									Quelle période de la journée ?
								</Text>
								<View style={{flex:0.5}}></View>
								<Button style={{fontSize: 20, borderRadius: 15,	borderWidth: 4,	borderColor: colors.primary }} color={colors.primary} title={item.wichLunch}/>
								<View style={{flex:0.5}}></View>
							</View>
					</View>
					<View style={{flex: 0.5}}></View>
				</View>
		)
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

	handleBackPress = () => {
		this.props.navigation.navigate('Calendar')
		return true;
	}
}

const styles2 = StyleSheet.create({
	main_container: {
		flex: 1, 
		justifyContent: "center", 
		alignItems: "center",
		width: windowSize.x
	},
	moduleText: {
		fontSize: 17,
		width: windowSize.x / 1.2
	}
})

export default ModulePlace;