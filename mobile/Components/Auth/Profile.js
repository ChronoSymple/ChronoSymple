import React from 'react'
import { View, Button, Image, Text, Alert, StyleSheet, Dimensions, TouchableOpacity, TextInput, Modal, TouchableHighlight, ActivityIndicator} from 'react-native'
import { colors, windowSize } from '../StyleSheet';
import { connect } from 'react-redux'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getPatientInfoWithApi, updatePatientProfile } from '../../API/APIConnection';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImgToBase64 from 'react-native-image-base64';
import { showMessage } from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";

class Profile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			tmpEmail: "",
			tmpPhoneNumber: "",
			birthdate: "",
			civility: "",
			picture: "",
			modalPictureVisible: false,
			password : "",
			confirmPressed: false,
			modalInternetVisible: false,
			modalPhoneVisible: false,
			modalMailVisible: false,
			passwordFocused: false,
			emailFocused: false,
			phoneRegExp: new RegExp("^[0-9]{8,12}$", 'g'),
			emailRegExp: new  RegExp(".*@.*\..*", 'g'),
			pageToReturn: this.props.navigation.getParam("pageToReturn"),
		}
		this.getPatientInfo()
	}

	getPatientInfo = () => {
		NetInfo.fetch().then((state) => {
			if (state.isConnected == true) {
				this.setInternetModal(false)
			} else {
				this.setInternetModal(true)
			}
		})
		getPatientInfoWithApi(this.props.token.token).then(async data => {
			let response = await data.json()
			this.setState({
				firstName: response.first_name,
				lastName: response.last_name,
				email: response.email,
				phoneNumber: response.phone_number ? response.phone_number : "",
				birthdate: response.birthdate,
				civility: response.civility,
				picture: response.picture ? response.picture : '',
			})
		})
	}

	chooseImage = () => {
		let options = {
			title: 'Select Image',
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
		};
		ImagePicker.launchImageLibrary(options, (response) => {
			if (response.didCancel) {
			} else if (response.error) {
			} else if (response.customButton) {
				alert(response.customButton);
			} else {
				const source = { uri: response.uri };

				this.setState({modalPictureVisible: true })
				ImgToBase64.getBase64String(response.uri)
					.then(base64String => {
						this.setState({
							filePath: response,
							fileData: base64String,
							fileUri: response.uri
						});

					})
					.catch(err => err);

			}
		});
	}

	setModalPictureVisible = (visible) => {
		this.setState({ modalPictureVisible: visible })
	}

	setModalPhoneVisible = (visible) => {
		this.setState({ modalPhoneVisible: visible })
	}

	setModalMailVisible = (visible) => {
		this.setState({ modalMailVisible: visible })
	}

	setInternetModal = (visible) => {
		this.setState({ modalInternetVisible: visible })
	}

	setTmpPhoneNumber = (text) => {
		this.setState({ tmpPhoneNumber: text })
	}

	setTmpAdresseMail = (text) => {
		this.setState({ tmpEmail: text })
	}

	setPassword = (text) => {
		this.setState({ password: text })
	}

	textFieldFocused = (state) => {
		this.setState({[state]: true})
	}

	textFieldBlured = (state) => {
		this.setState({[state]: false})
	}

	confirmNewPicturePressed = () => {
		this.setState({ confirmPressed: true })
		updatePatientProfile(this.props.token.token, "picture", this.state.fileData, this.state.password).then(async data => {
			if (data.status == 200) {
				this.getPatientInfo()
				showMessage({
					message: "Votre photo de profil a bien été modifié",
					type: "success"
				});
			} else if (data.status == 403) {
				showMessage({
					message: "Le mot de passe saisie est incorrecte",
					type: "danger"
				});
			} else if (data.status == 401) {
				showMessage({
					message: "Vous avez été deconnecte",
					type: "danger"
				});
				this.props.navigation.navigate("Logout")
			} else {
				let response = await data.json()
				showMessage({
					message: "Une erreur est survenue. Recommencez. Si le probleme persiste contactez nous.",
					type: "danger"
				});
			}
			this.setState({ password: '' })
			this.setModalPictureVisible(!this.state.modalPictureVisible)
			this.setState({ confirmPressed: false})
		})
	}


	confirmNewPhonePressed = () => {
		if (this.state.phoneRegExp.test(this.state.tmpPhoneNumber) == true) {
			updatePatientProfile(this.props.token.token, "phoneNumber", this.state.tmpPhoneNumber, this.state.password).then(async data => {
				if (data.status == 200) {
					this.getPatientInfo()
					this.setState({ password: '', tmpPhoneNumber: ''})
					showMessage({
						message: "Le numero de telephone a bien été changé",
						type: "success"
					});
				} else if (data.status == 403) {
					showMessage({
						message: "Le mot de passe saisie est incorrecte",
						type: "danger"
					});
				} else if (data.status == 401) {
					showMessage({
						message: "Vous avez été deconnecte",
						type: "danger"
					});
					this.props.navigation.navigate("Logout")
				} else {
					let response = await data.json()
					showMessage({
						message: "Une erreur est survenue. Recommencez. Si le probleme persiste contactez nous.",
						type: "danger"
					});
				}
			})
		}
		else {
			showMessage({
				message: "Votre numero de telephone ou mot de passe est invalide",
				type: "danger"
			});
			this.setState({ password: '', tmpPhoneNumber: ''})
		}
		this.setModalPhoneVisible(!this.state.modalPhoneVisible)
	}

	confirmNewAdressMailPressed = () => {
		if (this.state.emailRegExp.test(this.state.tmpEmail) == true) {
			updatePatientProfile(this.props.token.token, "email", this.state.tmpEmail, this.state.password).then(async data => {
				if (data.status == 200) {
					this.getPatientInfo()
					this.setState({ password: '', tmpEmail: ''})
					showMessage({
						message: "L'adresse mail a bien été changé",
						type: "success"
					});
				} else if (data.status == 403) {
					showMessage({
						message: "Le mot de passe saisie est incorrecte",
						type: "danger"
					});
				} else if (data.status == 401) {
					showMessage({
						message: "Vous avez été deconnecte",
						type: "danger"
					});
					this.props.navigation.navigate("Logout")
				} else {
					let response = await data.json()
					showMessage({
						message: "Une erreur est survenue. Recommencez. Si le probleme persiste contactez nous.",
						type: "danger"
					});
				}
			})
		} else {
			showMessage({
				message: "Votre adresse mail ou mot de passe est invalide",
				type: "danger"
			});
			this.setState({ password: '', tmpEmail: ''})
		}
		this.setModalMailVisible(!this.state.modalMailVisible)
	}

	render() {
		let { navigate } = this.props.navigation;
		let placeholder_password 	= "Mot de passe";
		let placeholder_email = "nouvelle adresse mail";
		let emailFocused 		= "emailFocused";
		let passwordFocused 		= "passwordFocused"
		return (
		<View style={{ flex: 1}}>
			<Modal
				animationType="slide"
				transparent={false}
				visible={this.state.modalInternetVisible}
			>
				<View style={{ flex: 1, marginTop: 10}}>
					<View style={{flex: 1 }}>
					<TouchableHighlight style={{margin: 10}}>
						<Icon
							name="clear"
							color="#62BE87"
							size={35}
							onPress={() => this.setInternetModal(false)}
						/>
					</TouchableHighlight>
					</View>
					<View style={{flex: 1}}>
						<Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#62BE87'}}>
							Un probleme est survenue.{'\n'} Ceci peut etre du a un probleme de connexion internet{'\n'}{'\n'}
						</Text>
						<Button 
							style={styles.buttonNoModule}
							color="#62BE87"
							onPress={() => {this.getPatientInfo()}}
							title="Actualiser la page"
						/>
					</View>
					<View style={{flex: 1}}/>
				</View>
			</Modal>
			<Modal
		          animationType="slide"
		          transparent={false}
		          visible={this.state.modalPhoneVisible}
			>
				<View style={{ flex: 1, marginTop: 10}}>
					<View style={{ flex: 1, justifyContent: "center", alignContent: 'center', marginLeft: 10, marginRight: 20}}>
						<TextInput
				            placeholder="nouveau numero de telephone"
				            onChangeText={(text) => this.setTmpPhoneNumber(text)}
				            style={styles.textField, {borderBottomWidth: 1 }}
				            value={this.state.tmpPhoneNumber}
				        />
				        <Text style={{fontSize: 13, color: colors.secondary}}> Numero de telephone </Text>
					</View>
					<View style={{ flex: 1, justifyContent: "center", alignContent: 'center', marginLeft: 10, marginRight: 20}}>
						<TextInput
							onFocus={() => this.textFieldFocused(passwordFocused)}
							onBlur={() => this.textFieldBlured(passwordFocused)}
							secureTextEntry={true}
							label="votre mot de passe"
							autoCorrect={false}
							style={{borderBottomWidth: 1, borderColor: 'grey'}}
							value={this.state.password}
							onChangeText={ (password) => this.setState({ password }) }
							placeholder={placeholder_password}
						/>
				        <Text style={{fontSize: 13, color: colors.secondary}}> Mot de passe</Text>
					</View>
					<View style={{flex: 1}}/>
					<View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around'}}>
						<View >
							<Button 
								color="#62BE87"
								style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
								onPress={() => this.setModalPhoneVisible(!this.state.modalPhoneVisible) }
								title="Retour"
							/>
						</View>
						<View >
							<Button 
								color="#62BE87"
								style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
								onPress={() => this.confirmNewPhonePressed()}
								title="Confirmer"
							/>
						</View>
					</View>
					<View style={{flex: 4}}/>
		        </View>
		    </Modal>

		    <Modal
		        animationType="slide"
		        transparent={false}
		        visible={this.state.modalMailVisible}
		        onRequestClose={() => {
					Alert.alert('Modal for adresse mail has been closed.');
		        }}
			>
		        <View style={{ flex: 1, marginTop: 22}}>
		    		<View style={{ flex: 1, justifyContent: "center", alignContent: 'center', marginLeft: 10, marginRight: 20}}>
				        <TextInput
							onFocus={() => this.textFieldFocused(emailFocused)}
							onBlur={() => this.textFieldBlured(emailFocused)}
							label="nouvelle adresse mail"
							autoCorrect={false}
							style={{borderBottomWidth: 1, borderColor: 'grey'}}
							value={this.state.tmpEmail}
							onChangeText={ (text) => this.setTmpAdresseMail(text) }
							placeholder={placeholder_email}
						/>
				        <Text style={{fontSize: 13, color: colors.secondary}}> Adresse mail</Text>
					</View>
					<View style={{ flex: 1, justifyContent: "center", alignContent: 'center', marginLeft: 10, marginRight: 20}}>
				        <TextInput
							onFocus={() => this.textFieldFocused(passwordFocused)}
							onBlur={() => this.textFieldBlured(passwordFocused)}
							secureTextEntry={true}
							label="votre mot de passe"
							autoCorrect={false}
							style={{borderBottomWidth: 1, borderColor: 'grey'}}
							value={this.state.password}
							onChangeText={ (password) => this.setState({ password }) }
							placeholder={placeholder_password}
						/>
				        <Text style={{fontSize: 13, color: colors.secondary}}> Mot de passe</Text>
					</View>
					<View style={{flex: 1}}/>
					<View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around'}}>
						<View>
							<Button 
								color="#62BE87"
								style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
								onPress={() => this.setModalMailVisible(!this.state.modalMailVisible) }
								title="Retour"
							/>
						</View>
						<View>
							<Button 
								color="#62BE87"
								style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
								onPress={() => this.confirmNewAdressMailPressed()}
								title="Confirmer"
							/>
						</View>
					</View>
					<View style={{flex: 4}}/>
		        </View>
		    </Modal>
			<View style={{flex: 1, backgroundColor: colors.secondary, justifyContent: 'center', alignContent: "center", width: Dimensions.get('window').width, flexDirection: "row"}}>
				<View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
					{ this.state.pageToReturn != undefined
					?
						<Icon
							name="arrow-back"
							color={"white"}
							size={45}
							onPress={() => { this.props.navigation.navigate(this.state.pageToReturn) }}
							style={{justifyContent: "flex-end"}}
						/>
					:
						<Icon
							name="arrow-back"
							color={"white"}
							size={45}
							onPress={() => { this.props.navigation.navigate("Home") }}
							style={{justifyContent: "flex-end"}}
						/>
					}
            	</View>
            	<View style={{flex: 6, justifyContent: "center", alignItems: "center"}}>
            		<Text style={{color: "white", fontWeight: "bold", fontSize:22}}>Page de profil</Text>
            	</View>
            	<View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
            		<Icon
					  	name="exit-to-app"
					  	color={"white"}
					  	size={45}
						  onPress={() => Alert.alert(
							'Déconnexion',
							"Etes vous sûr de vouloir vous déconnecter ?",
							[
								{text: 'Annuler', style: 'cancel'},
								{text: 'OK', onPress: () => navigate('Logout')},
							],
							{ cancelable: false }
						)}
					  	style={{justifyContent: "flex-end"}}
					/>
            	</View>
          	</View>
			<View style={{ flex: 2.5, alignItems: "center", justifyContent : "center" , flexDirection: 'row'}}>
				<TouchableOpacity onPress={() => this.chooseImage()}>
				{ this.state.picture ?
					<Image
					 	source={{uri: 'data:image/jpeg;base64,' + this.state.picture }}
						style={{ width: 140, height: 140, borderRadius: 140 / 2, borderWidth : 2, borderColor: "black"}}
					/>
					:
					<Image
					 	source={{uri: 'https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/118963341_107148524459460_1961865992722379461_n.png?_nc_cat=103&ccb=2&_nc_sid=85a577&efg=eyJpIjoidCJ9&_nc_ohc=WzS6lvFcgKcAX-FS0QT&_nc_ht=scontent-cdt1-1.xx&oh=d5cfd640968255af3cc1e8d075bf8fb4&oe=5FD84C90' }}
						style={{ width: 140, height: 140, borderRadius: 140 / 2, borderWidth : 2, borderColor: "black"}}
					/>
					}
				</TouchableOpacity>
			</View>
			<View style={{flex: 7}}>
				<TouchableOpacity onPress={() => { this.setModalMailVisible(true); }} style={{flex: 1, borderTopWidth: 1, flexDirection: 'row', backgroundColor: '#F7F7F7'}}>
					<View style={{flex: 1.5, flexDirection: 'row'}}>
						<View style={{flex: 4}}>
							<Text style={{ padding: 20, fontSize: 13, textTransform: 'capitalize' }}> Email </Text>
						</View>
						<View style={{flex: 3}}>
							<Text style={{paddingTop: 20, fontSize: 13, textTransform: 'capitalize' }}>{this.state.email}</Text>
						</View>
						<View style={{flex: 1, alignItems: "flex-end", padding: 10}}>
							<Icon
								name="chevron-right"
								color="#62BE87"
								size={35}
							/>
						</View>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={{flex: 1, borderTopWidth: 1, flexDirection: 'row', backgroundColor: '#F7F7F7'}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 4}}>
							<Text style={{ padding: 20, fontSize: 13, textTransform: 'capitalize' }}> Nom </Text>
						</View>
						<View style={{flex: 3}}>
							<Text style={{paddingTop: 20, fontSize: 13, textTransform: 'capitalize' }}>{this.state.lastName}</Text>
						</View>
						<View style={{flex: 1, padding: 10}}/>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={{flex: 1, borderTopWidth: 1, flexDirection: 'row', backgroundColor: '#F7F7F7'}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 4}}>
							<Text style={{ padding: 20, fontSize: 13, textTransform: 'capitalize' }}> Prenom </Text>
						</View>
						<View style={{flex: 3}}>
							<Text style={{paddingTop: 20, fontSize: 13, textTransform: 'capitalize' }}>{this.state.firstName}</Text>
						</View>
						<View style={{flex: 1, padding: 10}}/>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => { this.setModalPhoneVisible(true); }} style={{flex: 1, borderTopWidth: 1, flexDirection: 'row', backgroundColor: '#F7F7F7'}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 4}}>
							<Text style={{ padding: 20, fontSize: 13, textTransform: 'capitalize' }}> Telephone </Text>
						</View>
						<View style={{flex: 3}}>
							<Text style={{paddingTop: 20, fontSize: 13, textTransform: 'capitalize' }}>{this.state.phoneNumber}</Text>
						</View>
						<View style={{flex: 1, alignItems: "flex-end", padding: 10}}>
							<Icon
								name="chevron-right"
								color="#62BE87"
								size={35}
							/>
						</View>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={{flex: 1, borderTopWidth: 1, flexDirection: 'row', backgroundColor: '#F7F7F7'}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 4}}>
							<Text style={{ padding: 20, fontSize: 13, textTransform: 'capitalize' }}> Civilite </Text>
						</View>
						<View style={{flex: 3}}>
							<Text style={{paddingTop: 20, fontSize: 13, textTransform: 'capitalize' }}>{this.state.civility}</Text>
						</View>
						<View style={{flex: 1, padding: 10}}/>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={{flex: 1, borderTopWidth: 1, flexDirection: 'row', backgroundColor: '#F7F7F7'}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 4}}>
							<Text style={{ padding: 20, fontSize: 13, textTransform: 'capitalize' }}> Date de naissance </Text>
						</View>
						<View style={{flex: 3}}>
							<Text style={{paddingTop: 20, fontSize: 13, textTransform: 'capitalize' }}>{this.state.birthdate}</Text>
						</View>
						<View style={{flex: 1, padding: 10}}/>
					</View>
				</TouchableOpacity>
				<View style={{flex: 0.5, marginBottom: 15, marginTop: 10}}>
					<View style={{flex: 1, marginRight: 35, marginLeft: 35}}>
						<Button
							onPress={() => navigate('PasswordProfile')}
							title="Changer de mot de passe"
							color="#00928C"
						/>
					</View>
				</View>
			</View>
			<Modal
				animationType="slide"
				transparent={false}
				visible={this.state.modalPictureVisible}
			>
				<View style={{ flex: 1, marginTop: 22}}>
					<View style={{ flex: 1, justifyContent: "center", alignContent: 'center', marginLeft: 15, marginRight: 25}}>
						<TextInput 
							secureTextEntry={true}
							label="mot de passe"
							autoCorrect={false}
            				style={{borderBottomWidth: 1, borderColor: 'grey'}}
							value={this.state.password}
							onChangeText={ (password) => this.setState({ password }) }
							placeholder={placeholder_password}
						/>
					</View>
					<View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around'}}>
						<View>
							<Button 
							color="#62BE87"
							style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
							onPress={() => this.setModalPictureVisible(!this.state.modalPictureVisible) }
							title="Retour"
							/>
						</View>
						<View>
							<Button 
							color="#62BE87"
							style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
							onPress={() => this.confirmNewPicturePressed()}
							title="Confirmer"
							/>
						</View>
					</View>
					{this.state.confirmPressed ? 
						<View style={styles.container}>
							<ActivityIndicator size='large' color='#62BE87' />
						</View>
						:
						<View style={{flex: 1}}>
						</View>
					}
				</View>
			</Modal>
		</View>
		)
	}
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

	body: {
		backgroundColor: Colors.white,
		justifyContent: 'center',
		borderColor: 'black',
		borderWidth: 1,
		height: Dimensions.get('screen').height - 20,
		width: Dimensions.get('screen').width
	},
	ImageSections: {
		display: 'flex',
		flexDirection: 'row',
		paddingHorizontal: 8,
		paddingVertical: 8,
		justifyContent: 'center'
	},
	images: {
		width: 150,
		height: 150,
		borderColor: 'black',
		borderWidth: 1,
		marginHorizontal: 3
	},
	textField: {
		height: 40,
		marginBottom: 30,
		borderBottomWidth: 1,
		borderColor: "grey"
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column'
	}
});


const mapStateToProps = (state) => {
	return {
	  token: state.token,
	  idCurrentModule: state.idCurrentModule
	}
      }
      
export default connect(mapStateToProps)(Profile)