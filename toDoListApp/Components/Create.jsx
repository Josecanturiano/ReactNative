import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Alert,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewText: this.props.navigation.state.params.title,
      data: this.props.navigation.state.params.data,
      title: "",
      description: "",
      newTitle: this.props.navigation.state.params.taskTitle,
      newDescription: this.props.navigation.state.params.taskDescription,
      all: this.props.navigation.state.params,
    };
  }
  update = () => {
    let { data } = this.state;
    const { title, description } = this.state;
    var query = "update Tasks set title = ? ,description = ? where id = ?";
    var params = [title, description, data.id];
    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (tx, results) => {
          alert("Success");
        },
        function (tx, err) {
          alert("Warning");
          return;
        }
      );
    });
    this.props.navigation.navigate("Home", {});
    this.props.navigation.state.params.method();
  };
  post = async () => {
    const { title, description } = this.state;

    if (title.length > 0 && description.length) {
      var query =
        "INSERT INTO Tasks (id,title,description,date,status) VALUES (null,?,?,?,?)";
      var params = [title, description, Date().substr(0, 15), "pendiente"];
      db.transaction((tx) => {
        tx.executeSql(
          query,
          params,
          (tx, results) => {
            Alert("Sucess");
          },
          function (tx, err) {
            alert("Warning");
            return;
          }
        );
      });
      this.props.navigation.navigate("Home", {});
      this.props.navigation.state.params.method();
    } else {
      alert("Empty fields are not allowed");
    }
  };
  render() {
    console.disableYellowBox = true;
    let { viewText, data } = this.state;
    return (
      <View style={styles.content}>
        <Text style={styles.title}>{viewText.toString()} task</Text>
        <TextInput
          style={styles.input}
          defaultValue={data.title ? data.title : ""}
          placeholder={"Title"}
          returnKeyType={"next"}
          onSubmitEditing={() => this.descriptionInput.focus()}
          onChange={(x) => {
            this.setState({ title: x.nativeEvent.text });
          }}
        />
        <TextInput
          style={styles.input2}
          defaultValue={data.description ? data.description : ""}
          multiline
          ref={(input) => {
            this.descriptionInput = input;
          }}
          numberOfLines={40}
          placeholder={"Description"}
          returnKeyType={"next"}
          onSubmitEditing={() => this.descriptionInput.blur()}
          onChange={(x) => {
            this.setState({ description: x.nativeEvent.text });
          }}
        />
        <TouchableOpacity
          style={styles.buttons}
          onPress={(x) => {
            viewText == "Create new" ? this.post() : this.update();
          }}
        >
          <Text>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons2}
          onPress={() => {
            this.props.navigation.navigate("Home", {});
          }}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    display: "flex",
  },
  title: {
    fontSize: wp("2.4%") + hp("2.4%"),
    alignSelf: "center",
    top: wp("2%") + hp("2%"),
    marginBottom: wp("2.4%") + hp("2.4%"),
  },
  input: {
    padding: 15,
    borderStyle: "solid",
    width: wp("90%"),
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#cecece",
    borderRadius: wp("2%"),
    marginTop: hp("2%"),
  },
  input2: {
    padding: 15,
    paddingTop: 15,
    borderStyle: "solid",
    width: wp("90%"),
    height: hp("40%"),
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#cecece",
    borderRadius: wp("2%"),
    marginTop: hp("2%"),
  },
  buttons: {
    padding: wp("2%") + hp("2%"),
    backgroundColor: "#1dd1a1",
    width: wp("90%"),
    alignItems: "center",
    alignSelf: "center",
    marginTop: hp("2%"),
    borderRadius: wp("0.4%") + hp("0.4%"),
  },
  buttons2: {
    padding: wp("2%") + hp("2%"),
    backgroundColor: "#ff6b6b",
    width: wp("90%"),
    alignItems: "center",
    alignSelf: "center",
    marginTop: hp("2%"),
    borderRadius: wp("0.4%") + hp("0.4%"),
    color: "white",
  },
});

const AppNavigator = createStackNavigator({
  Create: {
    screen: Create,
    navigationOptions: {
      header: null,
    },
  },
});

export default createAppContainer(AppNavigator);
