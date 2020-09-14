import React from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as SQLite from "expo-sqlite";
import Icon4 from "react-native-vector-icons/AntDesign";
import { Tag } from "antd-mobile";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

const db = SQLite.openDatabase("db.db");

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      title: "myTitle",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi officiis nemo nostrum, harum quasi facilis dignissimos aut aliquid facere esse maxime quis adipisci quod amet soluta cumque laborum aliquam cupiditate?",
      status: "Pendiente",
      search: "",
      radio: [
        { label: "Pending  ", value: "pendiente" },
        { label: "In process...  ", value: "enProceso" },
        { label: "Finalized  ", value: "finalizado" },
      ],
    };
  }

  componentWillMount() {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists Tasks (id integer primary key not null, title text ,description text,date text, status text);"
      );
    });
    this.get();
  }

  get = () => {
    this.setState({ data: [] });
    var query = "SELECT * FROM Tasks order by id desc";
    var params = [];
    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (tx, results) => {
          if (results.rows._array.length > 0) {
            this.setState({
              data: results.rows._array,
            });
            console.log(results.rows._array);
          }
        },
        function (tx, err) {
          alert("Welcome");
        }
      );
    });
  };
  delete = async (id) => {
    var query = "delete from Tasks where id = ?";
    var params = [id];

    await Alert.alert("Delete", "Are you want to delete", [
      { text: "No" },
      {
        text: "Yes",
        onPress: () => {
          db.transaction((tx) => {
            tx.executeSql(
              query,
              params,
              (tx, results) => {
                alert("Success", "Deleted");
                this.get();
              },
              function (tx, err) {
                alert("Warning", "Empty fields are not allowed");
                console.log(tx, err);
                return;
              }
            );
          });
        },
      },
    ])();
    this.get();
  };
  render() {
    console.disableYellowBox = true;
    const { search } = this.state;
    let data = this.state.data;
    let estados = ["pendiente", "enProceso", "finalizado"];
    search.length > 1
      ? (data = data.filter((x) => {
          if (x.title.indexOf(search) !== -1) {
            return x;
          }
        }))
      : data;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.addBtn}
          title={"post"}
          onPress={() => {
            this.props.navigation.navigate("Create", {
              title: "Create new",
              method: this.get,
              data: { title: "", description: "" },
            });
          }}
        >
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
        <ScrollView>
          <TextInput
            style={styles.SearchBar}
            placeholder="Make your search here..."
            placeholderTextColor="black"
            onChangeText={(x) => this.setState({ search: x }, this.get)}
          />
          <Icon4
            name="search1"
            style={{ position: "absolute", right: wp("5%"), top: hp("2.3%") }}
            size={hp("3.2%") + wp("1.6%")}
            color="black"
          />
          <View>
            {!(data.length > 0) ? (
              <View style={styles.dataEmpty}>
                <Text style={styles.fontError}>Add a new task</Text>
              </View>
            ) : (
              data.map((x, c) => {
                const { title, description, date } = x;

                return (
                  <View style={styles.card} key={c}>
                    <Text style={styles.textCard}>Title : {title}</Text>
                    <Text style={styles.textCard}>
                      Description : {description}
                    </Text>
                    <Text style={styles.textCard}>Date : {date}</Text>

                    <View style={styles.optionsTask}>
                      <RadioForm
                        radio_props={this.state.radio}
                        initial={estados.indexOf(x.status)}
                        formHorizontal={true}
                        labelHorizontal={true}
                        buttonSize={10}
                        buttonColor={"#2196f3"}
                        animation={true}
                        width={wp("90%")}
                        onPress={(value) => {
                          if (value == "finalizado") {
                            this.delete(x.id);
                          }
                          var query =
                            "update Tasks set status = ? where id = ?";
                          var params = [value, x.id];
                          db.transaction((tx) => {
                            tx.executeSql(
                              query,
                              params,
                              (tx, results) => {},
                              function (tx, err) {
                                alert("Warning");
                                console.log(tx, err);
                                return;
                              }
                            );
                          });
                        }}
                      />
                    </View>

                    <View style={styles.options}>
                      <TouchableOpacity
                        style={styles.update}
                        onPress={() => {
                          this.props.navigation.navigate("Create", {
                            title: "Update",
                            data: x,
                            method: this.get,
                          });
                        }}
                      >
                        <Text style={{ textAlign: "center" }}>Update</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.delete}
                        onPress={(a) => {
                          this.delete(x.id);
                        }}
                      >
                        <Text style={{ textAlign: "center" }}>Detele</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: wp("100%"),
    height: hp("90%"),
  },
  fontError: {
    fontSize: hp("2.3%") + wp("2%"),
  },
  dataEmpty: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    fontSize: hp("1.7%") + wp("1.4%"),
  },
  plus: {
    textAlign: "center",
    fontSize: hp("1.7%") + wp("1.4%"),
  },
  options: {
    flexDirection: "row",
  },
  optionsTask: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  update: {
    padding: hp("1%") + wp("1%"),
    backgroundColor: "#0abde3",
    marginLeft: wp("2%"),
    borderRadius: wp("1%") + hp("1%"),
    width: wp("41.5%"),
  },
  delete: {
    padding: hp("1%") + wp("1%"),
    backgroundColor: "#ee5253",
    marginLeft: wp("2%"),
    borderRadius: wp("1%") + hp("1%"),
    width: wp("40.5%"),
  },
  addBtn: {
    position: "absolute",
    bottom: hp("2%"),
    right: wp("3.9%"),
    zIndex: 1,
    backgroundColor: "#48dbfb",
    borderRadius: 360,
    width: wp("15%"),
    height: wp("15%"),
    display: "flex",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#cecece",
    margin: hp("0.9%") + wp("0.9%"),
    borderRadius: hp("0.9%") + wp("0.9%"),
    padding: wp("3.9%"),
  },
  textCard: {
    fontSize: hp("1.7%") + wp("1.4%"),
    padding: hp("0.7%") + wp("0.4%"),
  },
  SearchBar: {
    paddingLeft: wp("3%"),
    backgroundColor: "#cecece",
    width: wp("96%"),
    height: hp("7%"),
    borderRadius: wp("2%"),
    fontSize: wp("6%"),
    marginLeft: wp("2%"),
    marginTop: wp("2%"),
    marginBottom: wp("0.5%"),
  },
});

const AppNavigator = createStackNavigator({
  home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
});

export default createAppContainer(AppNavigator);
