import React from 'react'
import { colors, windowSize } from '../StyleSheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { APIGetGeneralUnitNoteFileds } from '../../API/APIModule'
import { getUserToken, getUserCurrentModule } from '../../Redux/Action/action';
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView
} from "react-native";

class ModalFilter extends React.Component {
  
  constructor (props) {
    super(props)
    console.log("RECONSTRUCT");
    this.state = {
      modalVisible: this.props.modalShow,
      checkedBox: [],
      noteFields: []
    };
  }

  getNoteFileds = () => {
    console.log("get data")
    this.props.getUserToken().then(() => {
      this.props.getUserCurrentModule().then(() => {
        APIGetGeneralUnitNoteFileds(this.props.token.token, this.props.currentModule.currentModule).then(async data => {
        let response = await data.json()
        if (data.status == 200) {
          this.setState({noteFields: response})
        }
        }).catch(error => {
          this.setState({ error })
        })
      })
    }).catch(error => {
      this.setState({ error })
    })
  }

  boxChecked = (elem, i) => {
    let checkedB = this.state.checkedBox;

    if (this.state.checkedBox.includes(elem)) {
      var pos = checkedB.indexOf(elem);
      checkedB.splice(pos, 1);
    } else {
      console.log(elem)
      checkedB.push(elem);
    }
    this.setState({checkedBox: checkedB})
  }

  isChecked = (elem) => {
    return (this.state.checkedBox.includes(elem));
  }
  
  render() {
    console.log("render");
    return(
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          fade={true}
          visible={this.state.modalVisible}
        >
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
            <View style={{flex: 9}}>
              <ScrollView>
                { 
                  this.state.noteFields.map((e, i) => {
                      return (
                        <View style={{paddingBottom: 15}}>
                          <CheckBox
                            title={e}
                            checkedColor={colors.primary}
                            checked={this.isChecked(e)}
                            onPress={ () => { this.boxChecked(e, i) } }
                          />
                        </View>
                      );
                  })
                }
                </ScrollView>
            </View>
            <View style={{flexDirection: 'row', alignContent: 'center'}}>
              <View style={{alignSelf: "flex-start", paddingRight: 80}}>
                <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: colors.errorColor }}
                onPress={() => {
                  this.props.modalHide()
                }}
              >
              <Text style={styles.textStyle}>Fermer</Text>
              </TouchableHighlight>
              </View>

              <View style={{alignSelf: "flex-end"}}>
               <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: colors.primary }}
                onPress={() => {
                  this.props.modalHide()
                }}
              >
                <Text style={styles.textStyle}>Partager</Text>
              </TouchableHighlight>
              </View>
            </View>
          </View>
          </View>
        </Modal>
      </View>
    )
  }

  componentDidUpdate(prevProps) {
    if (this.props.modalShow !== prevProps.modalShow) {
      if (this.state.noteFields.length == 0) {
        this.getNoteFileds();
      }
      this.setState({modalVisible: this.props.modalShow})
    }
  }
}


const styles = StyleSheet.create({
  
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: windowSize.x * 0.8,
    height: windowSize.y * 0.8
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

const mapStateToProps = state => ({
  token: state.token,
  currentModule: state.currentModule
});

const mapDispatchToProps = dispatch => ({
  getUserToken: () => dispatch(getUserToken()),
  getUserCurrentModule: () => dispatch(getUserCurrentModule())
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalFilter);
