// Components/Profile.js

import React from 'react'
import { View, Button, Image, Text, CameraRoll, ScrollView, StyleSheet, Dimensions, TouchableOpacity, TextInput, Modal, TouchableHighlight} from 'react-native'
import { colors, windowSize } from '../StyleSheet';
import { connect } from 'react-redux'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getPatientInfoWithApi, updatePatientProfile } from '../../API/APIConnection';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';



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
			isPasswordValid: true,
		}
		this.getPatientInfo()
	}

	getPatientInfo = () => {
		getPatientInfoWithApi(this.props.token.token).then(async data => {
			console.log("Profile - data :")
			console.log(data)
			let response = await data.json()
			console.log("Profile - response: ")
			console.log(response)
			this.setState({
				firstName: response.first_name,
				lastName: response.last_name,
				email: response.email,
				picture: response.picture ? response.picture : 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
			})
			console.log("valeur de picture profile :")
			console.log(this.state.picture)
		})
		

	}

	changeProfilePhoto = () => {
		console.log('changeProfilePhoto button pressed')
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
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
				alert(response.customButton);
			} else {
				const source = { uri: response.uri };

				// You can also display the image using data:
				// const source = { uri: 'data:image/jpeg;base64,' + response.data };
				// alert(JSON.stringify(response));s
				console.log('response', JSON.stringify(response));
				this.setState({
					filePath: response,
					fileData: response.data,
					fileUri: response.uri
				});
				console.log(this.state.fileData)
				this.setState({modalPictureVisible: true })

			}
		});
	}

	launchCamera = () => {
		let options = {
		storageOptions: {
			skipBackup: true,
			path: 'images',
			},
		};
		ImagePicker.launchCamera(options, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
				alert(response.customButton);
			} else {
				const source = { uri: response.uri };
				console.log('response', JSON.stringify(response));
				this.setState({
					filePath: response,
					fileData: response.data,
					picture: response.uri
				});
			}
		});
	}

	setModalPictureVisible = (visible) => {
		this.setState({ modalPictureVisible: visible })
	}

	setPassword = (text) => {
		this.setState({ password: text })
	}

	confirmNewPicturePressed = () => {
		updatePatientProfile(this.props.token.token, "picture", this.state.fileData, this.state.password).then(async data => {
			if (data.status == 200) {
				this.setState({ isPasswordValid: true })
				this.getPatientInfo()
				this.setModalPictureVisible(!this.state.modalPictureVisible)
			} else {
				let response = await data.json()
				this.setState({ isPasswordValid: false })
			}
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
			<View style={{flex: 0.5}}>
			</View>
			<View style={{ flex: 3, alignItems: "center", justifyContent : "center" , flexDirection: 'row'}}>
				<View style={{flex: 1, flexDirection: 'column', alignItems: "center", justifyContent : "center"}}>
					<Image
						source={{uri: this.state.picture}}
					 	/*source={{uri: 'data:image/jpeg;base64,'+ this.state.picture }}*/
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
				<TouchableOpacity onPress={() => navigate('ModuleProfile')} style={{flex: 1, borderTopWidth: 1}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 4}}>
							<Text style={{ padding: 20, fontSize: 18, color: colors.secondary, textTransform: 'capitalize' }}> Mes modules </Text>
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
					<View style={{ flex: 1, justifyContent: "center", alignContent: 'center', marginLeft: 10}}>
						<Text> Mot de passe </Text>
						<TextInput
							placeholder="votre mot de passe"
							onChangeText={(text) => this.setPassword(text)}
							style={styles.textField, { width: windowSize.x / 1.5, borderWidth: 1 }}
						/>
					</View>
					{this.state.isPasswordValid ?
						null
						:
						<Text style={{color: colors.errorColor}}> /!\ Invalid password ! /!\ </Text>
					}
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
	}
});


const mapStateToProps = (state) => {
	return {
	  token: state.token,
	  idCurrentModule: state.idCurrentModule
	}
      }
      
export default connect(mapStateToProps)(Profile)