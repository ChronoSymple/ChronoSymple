import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';

import Login from '../Components/Auth/Login';
import SignIn from '../Components/Auth/SignIn';
import Home from '../Components/Home';

const ProfilTabs = createMaterialTopTabNavigator({
  Home: Home,
  Login: Login,
  SignIn: SignIn
},{
  tabBarOptions: {
      activeTintColor: '#000',
      inactiveTintColor: 'gray',
      style: {
          backgroundColor: '#fff',
      },
      indicatorStyle: {
          backgroundColor: '#000',
      },
  }
});

export default createAppContainer(ProfilTabs);