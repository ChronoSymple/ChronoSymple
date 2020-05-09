import React from 'react'
import {createStackNavigator, createDrawerNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';

import Login from '../Components/Auth/Login';
import SignIn from '../Components/Auth/SignIn';
import Home from '../Components/Home';
import ModulePlace from '../Components/Modules/ModulePlace';
import Profile from '../Components/Auth/Profile';
import ModuleProfile from '../Components/Auth/ModuleProfile';
import Calendar from '../Components/Modules/Calendar';
import DetailNote from '../Components/Modules/DetailNote';
import AddNote from '../Components/Modules/Note';
import EditNote from '../Components/Modules/EditNote';
import StatisticDiabete from '../Components/Modules/StatisticDiabete';
import StatisticAsthma from '../Components/Modules/StatisticAsthma';
import ExportPDF from '../Components/Modules/ExportPDF';
import Logout from '../Components/Auth/Logout'
import Loading from '../Components/Loading'
import Check from '../Components/CheckModule'

import AProposProfile from '../Components/Auth/Profile/AProposProfile';
import ContactProfile from '../Components/Auth/Profile/ContactProfile';
import FAQProfile from '../Components/Auth/Profile/FAQProfile';
import InfoProfile from '../Components/Auth/Profile/InfoProfile';
import PasswordProfile from '../Components/Auth/Profile/PasswordProfile';
import SupportProfile from '../Components/Auth/Profile/SupportProfile';

import DoctorCard from '../Components/Doctors/DoctorCard';
import SearchDoctors from '../Components/Doctors/SearchDoctors';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import AccountValidation from "../Components/Auth/AccountValidation";
import { styles, colors, windowSize } from '../Components/StyleSheet'

_menu = null;
 
setMenuRef = ref => {
  this._menu = ref;
};

hideMenu = () => {
  this._menu.hide();
};

showMenu = () => {
  this._menu.show();
};

const CalendarStackNavigator = createStackNavigator({
	Calendar: {
		screen : Calendar
	},
	EditNote: {
		screen: EditNote
	},
	AddNote: {
		screen: AddNote
	},
	DetailNote: {
		screen: DetailNote
	},
	ExportPDF: {
		screen: ExportPDF
	},
}, {
	headerMode: 'none'
})

const ProfileStackNavigator = createStackNavigator({
	InfoProfile: {
		screen: InfoProfile,
	},
	ModuleProfile: {
		screen: ModuleProfile,
	},
	PasswordProfile: {
		screen: PasswordProfile,
	},
	SupportProfile: {
		screen: SupportProfile,
	},
	FAQProfile: {
		screen: FAQProfile,
	},
	ContactProfile: {
		screen: ContactProfile,
	},
	AProposProfile: {
		screen: AProposProfile,
	}
}, {
		headerMode: 'none'
})

const DoctorCardStackNavigator = createStackNavigator({
	DoctorCard: {
		screen: DoctorCard,
	}
}, {
	headerMode: 'none'
})

const SearchDoctorsStackNavigator = createStackNavigator({
	SearchDoctors: {
		screen: SearchDoctors,
	}
}, {
	headerMode: 'none'
})

const HomePrincipaleTabs = createBottomTabNavigator({
	Home: {
		screen: Home,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="apps"
				color={tintColor}
				size={40}
			    />
		)})
	},
	Profile: {
		screen: Profile,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="account-circle"
				color={tintColor}
				size={40}
			    />
		)})
	},
}, { 
	initialRouteName: 'Home',
	headerMode: 'none',
	tabBarOptions: {
	    showLabel: false,
	    activeTintColor: '#F8F8F8',
	    inactiveTintColor: colors.secondary,
	    style: {
		backgroundColor: colors.primary
	    }
	},
});

const TabsAsthma = createBottomTabNavigator({
	Statistic: {
		screen : StatisticAsthma,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="insert-chart"
				color={tintColor}
				size={40}
			    />
		)})
	},
	Calendar: {
		screen : StatisticAsthma,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon2
				name="notes-medical"
				color={tintColor}
				size={40}
			    />
		)})
	},
	Profile: {
		screen : Profile,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="account-circle"
				color={tintColor}
				size={40}
			    />
		)})
	},
	Home: {
		screen : Home,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="apps"
				color={tintColor}
				size={40}
			    />
		)})
	},
}, {
	
	tabBarOptions: {
	    showLabel: false,
	    activeTintColor: '#F8F8F8',
	    inactiveTintColor: colors.secondary,
	    style: {
		backgroundColor: colors.primary
	    }
	},
});

const TabsDiabete = createBottomTabNavigator({
	Statistic: {
		screen : StatisticDiabete,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="insert-chart"
				color={tintColor}
				size={40}
			    />
		)})
	},
	Calendar: {
		screen : CalendarStackNavigator,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon2
				name="notes-medical"
				color={tintColor}
				size={40}
			    />
		)})
	},
	Profile: {
		screen : Profile,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="account-circle"
				color={tintColor}
				size={40}
			    />
		)})
	},
	Home: {
		screen : Home,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="apps"
				color={tintColor}
				size={40}
			    />
		)})
	},
}, {
	
	tabBarOptions: {
	    showLabel: false,
	    activeTintColor: '#F8F8F8',
	    inactiveTintColor: colors.secondary,
	    style: {
		backgroundColor: colors.primary
	    }
	},
});

const StackNavigtorWhithModule = createStackNavigator({
	Check: {
		screen: Check
	},
},{
	headerMode: 'none'
})

const StackNavigtorGlobalHome = createStackNavigator({
	HomeTabs : HomePrincipaleTabs,
	Module : StackNavigtorWhithModule,
	Stack: {
		screen: ModulePlace, navigationOptions: { title:'ModulePlace' }
	},
	ProfileStackNavigator : ProfileStackNavigator,
	CalendarStackNavigator : CalendarStackNavigator,
	DoctorCardStackNavigator : DoctorCardStackNavigator,
	SearchDoctorsStackNavigator: SearchDoctorsStackNavigator,
	ModuleDiabete: TabsDiabete,
	ModuleAsthma : TabsAsthma
}, {
	headerMode: 'none'
});


const LoginStack = createStackNavigator({
	Login : Login,
	SignIn : SignIn,
	Logout : Logout,
	AccountValidation : AccountValidation,					
}, {
	headerMode : 'none'
})

const StackNavigator = createStackNavigator({
	Loading : Loading,
	LoginStack : LoginStack,
	Drawer: {
		screen: StackNavigtorGlobalHome
	}
},{
	headerMode: 'none'
});
	  
export default createAppContainer(StackNavigator);