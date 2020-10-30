import React from 'react';
import {View, Text, TouchableOpacity, TouchableHighlight, Button} from 'react-native';
import { styles, colors, windowSize } from '../../StyleSheet';
import { connect } from 'react-redux';
import { getUserToken } from '../../../Redux/Action/action';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Settings extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let { navigate } = this.props.navigation;
		return (
			<View style={{flex: 1}}>
				<View style={{backgroundColor: colors.secondary, flex: 1, flexDirection: 'column'}}>
					<View style={{flex:1}}/>
					<View style={{flex:8, flexDirection: 'row', justifyContent:"space-between"}}>
						<TouchableHighlight style={{margin: 10}}>
							<Icon
								name="arrow-back"
								color="#FFF"
								size={35}
								onPress={() => navigate('Profile')}
							/>
						</TouchableHighlight>
					</View>
					<View style={{flex:1}}/>
				</View> 
				<View style={{flex: 9}}>
					<View style={{ flex: 1}}>
						<TouchableOpacity onPress={() => navigate('FAQProfile')} style={{flex: 1, borderTopWidth: 1}}>
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{flex: 4}}>
									<Text style={{ padding: 20, fontSize: 18, color: colors.secondary, textTransform: 'capitalize' }}> FAQ </Text>
								</View>
								<View style={{flex: 1, alignItems: "flex-end", padding: 15}}>
									<Icon
										name="chevron-right"
										color="#62BE87"
										size={35}
									/>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View style={{ flex: 1}}>
						<TouchableOpacity onPress={() => navigate('ContactProfile')} style={{flex: 1, borderTopWidth: 1}}>
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{flex: 4}}>
									<Text style={{ padding: 20, fontSize: 18, color: colors.secondary, textTransform: 'capitalize' }}> Nous Contacter </Text>
								</View>
								<View style={{flex: 1, alignItems: "flex-end", padding: 15}}>
									<Icon
										name="chevron-right"
										color="#62BE87"
										size={35}
									/>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View style={{ flex: 1}}>
						<TouchableOpacity onPress={() => navigate('AProposProfile')} style={{flex: 1, borderTopWidth: 1}}>
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{flex: 4}}>
									<Text style={{ padding: 20, fontSize: 18, color: colors.secondary, textTransform: 'capitalize' }}> A Propos </Text>
								</View>
								<View style={{flex: 1, alignItems: "flex-end", padding: 15}}>
									<Icon
										name="chevron-right"
										color="#62BE87"
										size={35}
									/>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View style={{flex: 5}}/>
				</View>
				<View style={{flex: 1}}/>
			</View>
		)
	}
}

const mapStateToProps = state => ({
	token: state.token
})

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
	getUserToken: () => dispatch(getUserToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings)