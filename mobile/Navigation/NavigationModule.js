import React from 'react' // N'oubliez pas l'import de React ici. On en a besoin pour rendre nos components React Native Image ! 
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator, SwitchNavigator } from 'react-navigation'

import { DrawerActions } from 'react-navigation';
import {View,Text,StyleSheet,Platform,TouchableOpacity,Image,StatusBar} from 'react-native';
import HomeModule from '../Components/HomeModule.js'
import Export from '../Components/Export.js'
import Statistic from '../Components/Statistic.js'
import Note from '../Components/Note.js'
import Calendar from '../Components/Calendar.js'
import ModulePlace from '../Components/ModulePlace.js'
import DrawerScreen from './DrawerScreen';
//import DrawerNavigation from './NavigationDrawer.js'

const HomeModuleStackNavigator = createStackNavigator({
	HomeModule: {
	  screen: HomeModule,
	}

})

const NoteStackNavigator = createStackNavigator({
	Note: {
	  screen: Note,
	}
})

const CalendarStackNavigator = createStackNavigator({
	Calendar: {
	  screen: Calendar,
	}
})

const StatisticStackNavigator = createStackNavigator({
	Statistic: {
		screen: Statistic,
	}
})

const ExportStackNavigator = createStackNavigator({
	Export: {
	  screen: Export,
	}
})

const ModuleTabNavigator = createBottomTabNavigator(
{
	Home: {
    	screen: HomeModuleStackNavigator
	},
  	Note: {
	    screen: NoteStackNavigator
  	},
  	Calendar: {
	  	screen: CalendarStackNavigator
  	},
  	Statistic: {
	    screen: StatisticStackNavigator
	},
	Export: {
	    screen: ExportStackNavigator
	}
},
{
	headerMode: 'none'
}
)

export default ModuleTabNavigator;