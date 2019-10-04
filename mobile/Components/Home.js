import React from 'react'
import { APIGetPatientModules } from '../API/APIModule'
import ModuleItem from './Modules/ModuleItem'
import {
	ActivityIndicator,
	StyleSheet,
	View,
	ScrollView,
	FlatList,
	Text,
	Button,
	BackHandler,
	TouchableOpacity,
	Image
} from 'react-native';
import { connect } from 'react-redux';
import { getUserToken } from '../Redux/Action/action';

class Home extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			Dmodules: null,
			loading: true
		}
		this._bootstrapAsync();
	}

	// Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsync = () => {
		this.props.getUserToken().then(() => {
			APIGetPatientModules(this.props.token.token).then(async data => {
				this.setState({
					loading: false							
				})
				if (data.status == 200) {
					let response = await data.json()
					if (response.length > 0 && JSON.stringify(this.state.Dmodules) != JSON.stringify(response.modules)) {
						this.setState({
							Dmodules: [ ...response ],
						})
					}
				}
			})
		}).catch(error => {
			this.setState({ error })
		})
	}

	changeModule = (idModule) => {
		this.props.navigation.navigate('Module', {idModule: idModule})
	}

	render() {
		let { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
        			<Text style={{color:"#62BE87", textAlign:'center', fontWeight: "bold", justifyContent: 'center', fontSize:30, margin: 30}}>Chronosymple</Text>
				{this.state.loading && <ActivityIndicator size='large' color='black' />}
				{ !this.state.loading && !this.state.Dmodules
					?	
					<View style={styles.WhithoutModule}>
						<Text style={{ marginBottom : 30, fontSize: 20 }}>
							Aucun module actif
						</Text>
						<Button 
							color="#62BE87"
							onPress={() => navigate('Stack')} 
							title="AJOUTER VOTRE PREMIER MODULE EN ALLANT SUR LE MODULE PLACE"
						/>
					</View>
					:
					<ScrollView style={{flex: 1}}>
						<View style={{flex: 1, justifyContent : 'center', alignItems: 'center', borderWidth: 3, borderColor: "black", borderStyle: "dashed", borderRadius: 15, margin: 10}}>
							<TouchableOpacity style={{ margin: 20, flexDirection : 'row', alignItems: 'center', justifyContent: 'center', width: "100%", height: "100%"}} onPress={() => navigate('Stack')}>
								<Text style={{fontSize: 20}}>Ajouter un module</Text>						
							</TouchableOpacity>
						</View>
						<FlatList
							style={styles.list}
							data={this.state.Dmodules}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({item}) => (
								<ModuleItem
									dModule={item}
									triggerModule={this.changeModule}
									generalUnit={true}
								/>
							)}
						/>
					</ScrollView>
				}
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
		BackHandler.exitApp();
		return true;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	WhithoutModule: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})

const mapStateToProps = state => ({
	token: state.token,
});

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);