import { StyleSheet, Dimensions } from 'react-native'

const windowSize = {
  x: Dimensions.get('window').width,
  y: Dimensions.get('window').height
};

const colors = {
  primary:      "#06C4BF",
  activeTextField:  this.primary,
  secondary:      "#91aefa",
  borderColor:    "grey",
  labelColor:     "grey",
  errorColor:     "#e94e62"
};


const styles = StyleSheet.create({
  title: {
    fontSize: 24
  },
  navBar: {
    backgroundColor: colors.primary
  },
  textField: {
    height: 40,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderColor: colors.borderColor
  },
  textFieldFocus: {
    height: 40,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderColor: colors.primary
  },
  label: {
    fontWeight: 'bold',
    color: colors.labelColor
  }, mainContner: {
    flex: 1,
    // alignItems: "center", 
    alignSelf:  "center",
    // justifyContent: "center",
    width: windowSize.x / 1.2,
    marginTop: 40,
    marginBottom: 30,
  }

});

export { styles, colors, windowSize }