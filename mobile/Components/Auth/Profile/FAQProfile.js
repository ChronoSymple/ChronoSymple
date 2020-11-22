import React from 'react';
import {View, Text, TouchableOpacity, Button, TouchableHighlight, ScrollView, Dimensions} from 'react-native';
import { styles, colors, windowSize } from '../../StyleSheet';
import { connect } from 'react-redux';
import { getUserToken } from '../../../Redux/Action/action';
import Icon from 'react-native-vector-icons/MaterialIcons';


class FAQProfile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			question: [false,
				false,
				false,
				false,
			],
			motDePasseQuestion: false,
			adresseMailQuestion: false,
			numTelephoneQuestion: false,
			changeMedecinQuestion: false,
			symptomeMalDeclareQuestion: false
		}
	}

	motDePasseQuestionPressed = () => {
		this.setState({
			motDePasseQuestion: !this.state.motDePasseQuestion
		})
	}

	adresseMailQuestionPressed = () => {
		this.setState({
			adresseMailQuestion: !this.state.adresseMailQuestion
		})	
	}

	numTelephoneQuestionPressed = () => {
		this.setState({
			numTelephoneQuestion: !this.state.numTelephoneQuestion
		})	
	}

	changeMedecinQuestionPressed = () => {
		this.setState({
			changeMedecinQuestion: !this.state.changeMedecinQuestion
		})
	}

	symptomeMalDeclareQuestionPressed = () => {
		this.setState({
			symptomeMalDeclareQuestion: !this.state.symptomeMalDeclareQuestion
		})
	}

	render() {
		let { navigate } = this.props.navigation;
		let screenWidth = Dimensions.get('window').width;
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
								onPress={() => navigate('Paramètres')}
		    				/>
						</TouchableHighlight>
					</View>
					<View style={{flex:1}}/>
				</View>
				<View style={{flex :9}}>
				    <ScrollView
				        horizontal={false}
				        vertical={true}
				        pagingEnabled={false}
				        showsHorizontalScrollIndicator={false}
				        ref={(node) => this.scroll = node}
				    >
				    	
				    	<View style={{flex: 1, justifyContent : 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.secondary, borderRadius: 15, backgroundColor : 'white', margin: 10}}>
							<TouchableOpacity style={ styles.module }
								onPress={() => this.motDePasseQuestionPressed() }>
									<Text style={{ fontSize: 18, color: "black", textTransform: 'capitalize', textAlign: "center", padding: 10}}> Comment changer son mot de passe ?</Text>
							</TouchableOpacity>
						</View>
				    	{this.state.motDePasseQuestion ?
				    		<View style={{paddingLeft: 10, paddingRight: 10}}>
					    		<Text> Pour changer son mot de passe {"\n"}
					    		 allez sur votre profile -> info -> cliquez sur la ligne de mot de passe
					    		 -> vous devriez avoir la possibilité de changer votre mot de passe
					    		</Text>
					    	</View>
				    		:
				    		null
				    	}

					    <View style={{flex: 1, justifyContent : 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.secondary, borderRadius: 15, backgroundColor : 'white', margin: 10}}>
							<TouchableOpacity style={ styles.module }
								onPress={() => this.adresseMailQuestionPressed() }>
									<Text style={{ fontSize: 18, color: "black", textTransform: 'capitalize', textAlign: "center", padding: 10 }}> Comment changer son adresse mail ? </Text>
							</TouchableOpacity>
						</View>
						{this.state.adresseMailQuestion ?
							<View>
								<Text style={{fontSize: 13, color: colors.secondary}}> pour changer son adresse mail:  {"\n"}
								 Allez sur votre profile{"\n"}
								 -> cliquez sur info{"\n"}
								 -> cliquez sur votre adresse mail{"\n"}
								 -> Vous devrez ensuite avoir la possibilité de changer votre adresse mail.
								</Text>
							</View>
							:
							null
					    }

					    <View style={{flex: 1, justifyContent : 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.secondary, borderRadius: 15, backgroundColor : 'white', margin: 10}}>
							<TouchableOpacity style={ styles.module }
								onPress={() => this.numTelephoneQuestionPressed() }>
									<Text style={{ fontSize: 18, color: "black", textTransform: 'capitalize', textAlign: "center", padding: 10 }}> Comment changer son numero de telephone ? </Text>
							</TouchableOpacity>
						</View>
						{this.state.numTelephoneQuestion ?
							<View>
								<Text> pour changer son numero de telephone :  {"\n"}
								 Allez sur votre page de pofile{"\n"}
								 -> info{"\n"}
								 -> cliquez sur votre numero de telephone{"\n"}
								 -> Vous devriez par la suite pouvoir changer votre numéro de telephone
								</Text>
							</View>
							:
							null
					    }

						<View style={{flex: 1, justifyContent : 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.secondary, borderRadius: 15, backgroundColor : 'white', margin: 10}}>
							<TouchableOpacity style={ styles.module }
								onPress={() => this.changeMedecinQuestionPressed() }>
									<Text style={{ fontSize: 18, color: "black", textTransform: 'capitalize', textAlign: "center", padding: 10 }}> Comment changer de medecin ? </Text>
							</TouchableOpacity>
						</View>
						{this.state.changeMedecinQuestion ?
							<View>
								<Text> pour changer de medecin :  {"\n"}
								 Allez sur votre page de pofile{"\n"}
								 -> Mes modules{"\n"}
								 -> cliquez sur le module auquel vous voulez changer de medecin{"\n"}
								 -> Liste des docteurs{"\n"}
								 -> Sur cette page vous pouvez ajouter et retirer un docteurs
								</Text>
							</View>
							:
							null
					    }

					    <View style={{flex: 1, justifyContent : 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.secondary, borderRadius: 15, backgroundColor : 'white', margin: 10}}>
							<TouchableOpacity style={ styles.module }
								onPress={() => this.symptomeMalDeclareQuestionPressed() }>
									<Text style={{ fontSize: 18, color: "black", textTransform: 'capitalize', textAlign: "center", padding: 10 }}> J'ai mal déclaré mes symptomes, est ce possible de la modifier ? </Text>
							</TouchableOpacity>
						</View>
						{this.state.symptomeMalDeclareQuestion ?
							<View>
								<Text> Oui c'est possible de modifier les symptomes déclarer :  {"\n"}
								 Allez sur le module ou vous avez declarer votre symptome{"\n"}
								 -> ensuite aller sur le calendrier{"\n"}
								 -> Ici vous avez l'historique de toute vos declarations{"\n"}
								 -> Cliquez sur la declaration ou vous avez fait l'erreur{"\n"}
								 -> Vous devriez avoir un bouton d'edition de la note declarer{"\n"}
								 /!\ Dans le cas ou vous ne voyez pas une de ces etapes contactez nous /!\
								</Text>
							</View>
							:
							null
					    }

					</ScrollView>
				</View>
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

export default connect(mapStateToProps, mapDispatchToProps)(FAQProfile)