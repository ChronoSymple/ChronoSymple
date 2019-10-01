import React from 'react'
import { APIGetPatientModules } from '../API/APIModule'
import { Icon } from 'react-native-vector-icons'
//import CustomMenu from './CustomMenu';
//import our Custom menu component
//import CustomMenuIcon from './CustomMenuIcon';
import {
	ActivityIndicator,
	StyleSheet,
	View,
	ScrollView,
	FlatList,
	Text,
	Button,
	BackHandler,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { getUserToken } from '../Redux/Action/action';

class Home extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			Dmodules: [],
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
		
	/* _menu = null;
	
};
	setMenuRef = ref => {
	  this._menu = ref;
	};
       
	hideMenu = () => {
	  this._menu.hide();
	};
       
	showMenu = () => {
	  this._menu.show();
	};
 */
	changeModule = (idModule) => {
		this.props.navigation.navigate('HomeModule', {idModule: idModule})
	}

	render() {
		let { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
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
							title="ALLEZ SUR LE MODULE PLACE"
						/>
					</View>
					:
					<ScrollView style={{flex: 1}}>
						<FlatList data={this.state.Dmodules} keyExtractor={(item) => item.id.toString()} 
							renderItem={({ item }) => (
								<TouchableOpacity style={{flex: 1, justifyContent : 'center', alignItems: 'center', flexDirection : 'row', backgroundColor: item.general_unit.color,
								borderColor: 'black', borderRadius: 10, margin: 5, padding: 20, borderWidth: 3}}
								onPress={() => this.changeModule(item.general_unit.id)}>
									<Text style={{fontSize: 20}}>{item.general_unit.name.charAt(0).toUpperCase() + item.general_unit.name.slice(1)}</Text>
								</TouchableOpacity>
							)}
						/>
						<View style={{flex: 1, justifyContent : 'center', alignItems: 'center'}}>
							<TouchableOpacity style={{ margin: 20, flexDirection : 'row'}}
								onPress={() => navigate('Stack')}>
								<Icon style={{ flex: 1}} size='20' color="grey" name="add-circle" size={30}/>
								<Text style={{ flex: 2, marginLeft: 20 , backgroundColor: '#fff', fontSize: 20}}>
									Ajouter un module
								</Text>
							</TouchableOpacity>
						</View>
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

{/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Menu
				  ref={this.setMenuRef}
				  button={<Text onPress={this.showMenu}>Show menu</Text>}
				>
				<MenuItem onPress={this.hideMenu}>Menu item 1</MenuItem>
				<MenuItem onPress={this.hideMenu}>Menu item 2</MenuItem>
				<MenuItem onPress={this.hideMenu} disabled>
				  Menu item 3
				</MenuItem>
				<MenuDivider />
				<MenuItem onPress={this.hideMenu}>Menu item 4</MenuItem>
				</Menu>
				</View> */}
