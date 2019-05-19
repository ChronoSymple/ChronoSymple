import React, { Component } from 'react';
import {createStackNavigator, createDrawerNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';
import { DrawerActions } from 'react-navigation';
import {TouchableOpacity, StyleSheet, Image, Text} from 'react-native';

import Login from '../Components/Auth/Login';
import SignIn from '../Components/Auth/SignIn';
import Logout from '../Components/Auth/Logout';
import Home from '../Components/Home';
import DrawerScreen from './DrawerScreen';
import ModulePlace from '../Components/ModulePlace';
import HomeModule from '../Components/HomeModule';
import Calendar from '../Components/Calendar';
import DoctorChoice from '../Components/DoctorChoice';
import ChooseModulesToSend from '../Components/ChooseModulesToSend';
import DetailNote from '../Components/DetailNote';
import Statistic from '../Components/Statistic';
import Export from '../Components/Export';
import Note from '../Components/Note';
import Loading from '../Components/Loading'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-paper';

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
	DetailNote: {
		screen: DetailNote
	}
}, {
	headerMode: 'none'
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

const DoctorChoiceStackNavigator = createStackNavigator({
	DoctorChoice: {
		screen: DoctorChoice,
	}
}, {
	headerMode: 'none'
})

const ChooseModulesToSendStackNavigator = createStackNavigator({
	ChooseModulesToSend: {
		screen: ChooseModulesToSend,
	}
}, {
	headerMode: 'none'
})

const Tabs = createBottomTabNavigator({
	Home: {
		screen : HomeModule,
		navigationOptions: {
			tabBarLabel:"Home",
			tabBarIcon: ({ tintColor }) => (
			  <Icon name="home" size={20}/>
			)
		},
	},
	Note: {
		screen : Note,
		navigationOptions: {
			tabBarLabel:"Note",
			tabBarIcon: ({ tintColor }) => (
			  <Icon name="note" size={20}/>
			)
		},
	},
	Calendar: {
		screen : Calendar,
		navigationOptions: {
			tabBarLabel:"Calendar",
			tabBarIcon: ({ tintColor }) => (
			  <Icon name="perm-contact-calendar" size={20}/>
			)
		},
	},
	Statistic: {
		screen : Statistic,
		navigationOptions: {
			tabBarLabel:"Statistic",
			tabBarIcon: ({ tintColor }) => (
			  <Icon name="timeline" size={20}/>
			)
		},
	},
	Export: {
		screen : Export,
		navigationOptions: {
			tabBarLabel:"Export",
			tabBarIcon: ({ tintColor }) => (
			  <Icon name="import-export" size={20}/>
			)
		},
	},
},{
	headerMode: 'none'
});


const MenuImage = ({navigation}) => {
	if(!navigation.state.isDrawerOpen){
		return <Icon color="white" name="menu" size={30} marginLeft={10} />
	} else {
		return <Icon color="white" name="arrow-back" size={30} marginLeft={10} />
	}
}

const DrawerNavigator = createDrawerNavigator({
		Home: {
			screen: Home
		},
		HomeModule: {
			screen: Tabs
		},
	},{
		contentComponent: DrawerScreen,
		headerMode: 'none',
		drawerWidth: 300,
		navigationOptions: ({ navigation }) => ({
				title : 'Home',
				  // Title to appear in status bar
				headerLeft: 
				<TouchableOpacity  onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
					<MenuImage navigation={navigation}/>
				</TouchableOpacity>,
				headerRight:
				<TouchableOpacity onPress={() => navigation.navigate('Logout') }>
					<Icon color="white" name="exit-to-app" size={30} marginRight={10} />
				</TouchableOpacity>,
				headerStyle: {
					backgroundColor: '#58b57d',
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
				  fontWeight: 'bold',
				},
		
			})
});

const StackNavigtorWhithoutModule = createStackNavigator({
	Drawer: {
		screen: DrawerNavigator
	},
	Stack: {
		screen: ModulePlace, navigationOptions: { title:'ModulPlace' }
	},
	CalendarStackNavigator: {
		screen : CalendarStackNavigator
	},
	DoctorChoiceStackNavigator: {
		screen: DoctorChoiceStackNavigator
	},
	ChooseModulesToSendStackNavigator: {
		screen: ChooseModulesToSendStackNavigator
	}
})

const LoginStack = createStackNavigator({
	Login: { screen: Login },
	SignIn: { screen: SignIn },
})

const StackNavigator = createStackNavigator({
	Loading: Loading,
	LoginStack: {
		screen: LoginStack, headerMode : 'none'
	},
	Drawer: {
		screen: StackNavigtorWhithoutModule
	},
	Logout: { screen : Logout,
		navigationOptions: {
			headerMode: 'none'
		},
	}
},{
	initialRouteName : 'Loading',
	headerMode: 'none'
});
	  
export default createAppContainer(StackNavigator);