// Components/Profile.js

import React from 'react'
import { View, Button, Image, Text, CameraRoll, ScrollView, StyleSheet, Dimensions, TouchableOpacity, TextInput, Modal, TouchableHighlight, ActivityIndicator} from 'react-native'
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
			picture: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
			modalPictureVisible: false,
			password : "",
			confirmPressed: false,
			modalInternetVisible: false,
		}
		this.getPatientInfo()
	}

	getPatientInfo = () => {
		NetInfo.fetch().then((state) => {
			console.log(
				'is connected: ' +
				state.isConnected
			);
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
				picture: response.picture ? response.picture : 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
			})
			/*console.log("valeur de picture profile :")
			console.log(this.state.picture)*/
		})
	}

	changeProfilePhoto = () => {

	}

	chooseImage = () => {
		let options = {
			title: 'Select Image',
			customButtons: [
				{ name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
			],
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
		};
		ImagePicker.showImagePicker(options, (response) => {
			if (response.didCancel) {
			} else if (response.error) {
			} else if (response.customButton) {
				alert(response.customButton);
			} else {
				const source = { uri: response.uri };

				// You can also display the image using data:
				// const source = { uri: 'data:image/jpeg;base64,' + response.data };
				// alert(JSON.stringify(response));s
				this.setState({modalPictureVisible: true })
				ImgToBase64.getBase64String(response.uri)
					.then(base64String => {
						this.setState({
							filePath: response,
							fileData: base64String,
							fileUri: response.uri
						});

					})
					.catch(err => console.log(err));
/*
				console.log(response
				console.log('valuer de limage:')
				console.log(source)*/

			}
		});
	}
/*
	launchCamera = () => {
		let options = {
		storageOptions: {
			skipBackup: true,
			path: 'images',
			},
		};
		ImagePicker.launchCamera(options, (response) => {
			if (response.didCancel) {
			} else if (response.error) {
			} else if (response.customButton) {
				alert(response.customButton);
			} else {
				const source = { uri: response.uri };
				this.setState({
					filePath: response,
					fileData: response.data,
					picture: response.uri
				});
			}
		});
	}
*/
	setModalPictureVisible = (visible) => {
		this.setState({ modalPictureVisible: visible })
	}

	setInternetModal = (visible) => {
		this.setState({ modalInternetVisible: visible })
	}

	setPassword = (text) => {
		this.setState({ password: text })
	}

	confirmNewPicturePressed = () => {
		this.setState({ confirmPressed: true })
		updatePatientProfile(this.props.token.token, "picture", this.state.fileData, this.state.password).then(async data => {
			console.log(data.status)
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

	renderFileData() {
		if (this.state.fileData) {
			return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
				style={styles.images}
			/>
		} else {
			return <Image source={require('../../assets/photo-1532274402911-5a369e4c4bb5.jpeg')}
				style={styles.images}
			/>
		}
	}

	renderFileUri() {
		if (this.state.fileUri) {
			return <Image
				source={{ uri: this.state.fileUri }}
				style={styles.images}
			/>
		} else {
			return <Image
				source={require('../../assets/photo-1532274402911-5a369e4c4bb5.jpeg')}
				style={styles.images}
			/>
		}
	}

	render() {
		let { navigate } = this.props.navigation;
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
							Un probleme est survenue.{'\n'}Ceci peut etre du a un probleme de connexion internet{'\n'}{'\n'}
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
			<View style={{flex: 0.5}}>
			</View>
			<View style={{ flex: 3, alignItems: "center", justifyContent : "center" , flexDirection: 'row'}}>
				<View style={{flex: 1, flexDirection: 'column', alignItems: "center", justifyContent : "center"}}>
					<Image
						/*source={{uri: this.state.picture}}*/
					 	source={{uri: 'data:image/jpeg;base64,'+ this.state.picture }}
						style={{ width: 140, height: 140, borderRadius: 140 / 2, borderWidth : 1, borderColor: '#000000'}}
					/>
					<TouchableOpacity onPress={() => this.chooseImage()}>
					 <Text style={{fontSize: 16, color: colors.secondary}}> changer </Text>
					</TouchableOpacity>
				</View>
				<View style={{flex: 1, flexDirection: 'column', alignItems: "center", justifyContent : "center"}}>
					<Text style={{fontSize: 20}}>
						{this.state.lastName} {this.state.firstName}
					</Text>
					<Text style={{}}>
						email: {this.state.email}
					</Text>
				</View>
			</View>
			<View style={{flex: 1}}>
			</View>
			<View style={{ flex: 1}}>
				<TouchableOpacity onPress={() => navigate('InfoProfile')} style={{flex: 1, borderTopWidth: 1}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 4}}>
							<Text style={{ padding: 20, fontSize: 18, color: colors.secondary, textTransform: 'capitalize' }}> Info </Text>
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
				<TouchableOpacity onPress={() => navigate('PasswordProfile')} style={{flex: 1, borderTopWidth: 1}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 4}}>
							<Text style={{ padding: 20, fontSize: 18, color: colors.secondary, textTransform: 'capitalize' }}> Changer de mot de passe </Text>
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
				<TouchableOpacity onPress={() => navigate('SupportProfile')} style={{flex: 1, borderTopWidth: 1}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 4}}>
							<Text style={{ padding: 20, fontSize: 18, color: colors.secondary, textTransform: 'capitalize' }}> Support </Text>
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
				<TouchableOpacity onPress={() => navigate('AllDoctors')} style={{flex: 1, borderTopWidth: 1}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 4}}>
							<Text style={{ padding: 20, fontSize: 18, color: colors.secondary, textTransform: 'capitalize' }}> Mes médecins</Text>
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
				<TouchableOpacity onPress={() => navigate('Logout')} style={{flex: 1, borderTopWidth: 1}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 4}}>
							<Text style={{ padding: 20, fontSize: 18, color: colors.secondary, textTransform: 'capitalize' }}> Se deconnecter </Text>
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
			<View style={{flex: 1}}>
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
							value={this.state.password}
							onChangeText={ (password) => this.setState({ password }) }
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
	btnParentSection: {
		alignItems: 'center',
		marginTop:10
	},
	btnSection: {
		width: 225,
		height: 50,
		backgroundColor: '#DCDCDC',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 3,
		marginBottom:10
	},
	btnText: {
		textAlign: 'center',
		color: 'gray',
		fontSize: 14,
		fontWeight:'bold'
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