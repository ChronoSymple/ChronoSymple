import React from 'react';
import {View, Text, TouchableOpacity,  Button} from 'react-native';
import { styles, colors, windowSize } from '../../StyleSheet';
import { connect } from 'react-redux';
import { getUserToken } from '../../../Redux/Action/action';

class AProposProfile extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let { navigate } = this.props.navigation;
		return (
			<View>
				<Text> AProposProfile 
					Chronosymple est une application mobile qui consiste a aider les personnes atteinte de maladie chronique.
					Sur cet application les patients pourront declarer leurs symptomes, prendre des notes et partager ces informations a leurs medecins
					pour qu'il puisse voir tout ce que vous avez declarer avant votre prochain rendez vous avec lui.
					Avantage:
						- Plus d'entretenir un cahier ou autre pour faire une prise de note
						- Vous et votre medecin gagnez du temps lors du rendez-vous
						- Sachant que votre medecin a acces a vos prise de note / declarations, il peut rapidement vous contacter en cas de probleme
							(au lieu d'attendre le rendez vous ou que ca soit vous qui l'appelliez)
						- Vous avez un suivi statistique sur toute vos declarations depuis votre inscription

					Chronosymple rassemble plusieurs module, c'est a dire que Chronosymple n'est pas seulement dédié qu'a une seule
					maladie chronique mais vraiment a toutes les maladies chronique qui existe (but final)
					Elle vise aussi les personnes qui pourraient etre atteinte de plusieurs maladie chronique a la fois. Au lieu de devoir télécharger
					pllusieurs application pour chacune des maladies. Elle auront juste besoin d'installer Chronosymple et ces personnes pourront declarer leurs 
					prise de note en fonction de leurs maladie sur l'application.
				</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(AProposProfile)