import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import { styles, colors, windowSize } from '../StyleSheet'

class ModuleItem extends React.Component {
	render() {
			const { dModule, triggerModule, generalUnit} = this.props
		return (
			<View>
			{ !generalUnit
				?
				<View style={{flex: 1, justifyContent : 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.secondary, borderRadius: 15, backgroundColor : 'white', margin: 10}}>					
					<TouchableOpacity style={{
						flex: 1,
						alignItems: 'center',
						flexDirection : 'row', 
						justifyContent: 'center', 
						width: "100%", 
						height: "100%",
						margin: 20, 
						}}
						onPress={() => triggerModule(dModule.id, dModule.name)}>
							<Text style={{ fontSize: 18, textTransform: 'capitalize' }}>{dModule.name}</Text>
					</TouchableOpacity>
				</View>
				:
				<View style={{flex: 1, justifyContent : 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.secondary, borderRadius: 15, backgroundColor : 'white', margin: 10}}>					
					<TouchableOpacity style={{
						flex: 1,
						alignItems: 'center',
						flexDirection : 'row', 
						justifyContent: 'center', 
						width: "100%", 
						height: "100%",
						margin: 20, 
						}}
						onPress={() => triggerModule(dModule.id, dModule.general_unit.name)}>
							<Text style={{ fontSize: 18, textTransform: 'capitalize' }}>{dModule.general_unit.name}</Text>
					</TouchableOpacity>
				</View>
			}
			</View>
		)
	}
}

export default ModuleItem