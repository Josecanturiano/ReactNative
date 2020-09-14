import axios from "axios";
import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Icon4 from "react-native-vector-icons/AntDesign";

// url and key of the service
const link = "https://api.unsplash.com/search/photos?query=";
const key =
  "&client_id=b70bdeb051b294bf39c1108f183a2597f347dc1624febbe7b372f08eb5c07901";

class Home extends React.Component {
  constructor(props) {
    super(props);
    //define the state
    this.state = {
      category: "General",
      content: [],
      loading: false,
    };
  }

  componentDidMount() {
    // fill the content array on init.
    this.get();
  }

  get = () => {
    //build the query
    let query = "";
    let { category } = this.state;
    category ? (query = category) : (query = "general");
    let url = link + query + key;
    // set true loading
    this.setState({ loading: true });
    // make a http request
    axios
      .get(url)
      .then((x) => {
        this.setState({ content: x.data.results });
        this.setState({ loading: false });
      })
      .catch((x) => {
        console.log(url);
        console.log(x);
        this.setState({ loading: false });
      });
  };

  createCards(content) {
    console.disableYellowBox = true;
    return (
      <ScrollView style={styles.scroll}>
        {content.length > 0 ? (
          content.map((x) => {
            return (
              <View style={styles.containerImg}>
                <Image
                  style={{
                    width: wp("96%"),
                    height: hp("32%"),
                    marginBottom: wp("2.3%"),
                    marginLeft: wp("2.1%"),
                    borderRadius: wp("2%"),
                  }}
                  source={{ uri: x.urls.small }}
                />
                <View>
                  <Icon4
                    name="heart"
                    style={{ left: wp("5%"), marginBottom: hp("1%") }}
                    size={hp("3.2%") + wp("1.6%")}
                    color="red"
                  />
                  <Text style={styles.likes}>{x.likes}</Text>
                  <Icon4
                    name="tago"
                    style={{ position: "absolute", left: wp("40%") }}
                    size={hp("3.2%") + wp("1.6%")}
                    color="black"
                  />
                  <Text style={styles.username}>{x.user.username}</Text>
                </View>
              </View>
            );
          })
        ) : (
          <View>
            <Text>No hay datos</Text>
          </View>
        )}
      </ScrollView>
    );
  }

  render() {
    const { loading, content } = this.state;
    return (
      <View>
        <View style={styles.search}>
          <TextInput
            style={styles.SearchBar}
            placeholder="Your search here..."
            placeholderTextColor="black"
            onChangeText={(x) => this.setState({ category: x }, this.get)}
          />
          <Icon4
            name="search1"
            style={{ position: "absolute", right: wp("5%"), top: hp("1.3%") }}
            size={hp("3.2%") + wp("1.6%")}
            color="black"
          />
        </View>
        {/* condition to render when after loading */}
        {loading ? (
          <ActivityIndicator style={styles.load} size="large" color="#ff0000" />
        ) : (
          this.createCards(content)
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  load: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  SearchBar: {
    paddingLeft: wp("3%"),
    backgroundColor: "#cecece",
    width: wp("96%"),
    height: hp("7%"),
    borderRadius: wp("2%"),
    fontSize: wp("6%"),
  },
  search: {
    marginLeft: wp("2%"),
    marginTop: wp("2%"),
    marginBottom: wp("2%"),
  },
  likes: {
    position: "absolute",
    left: wp("17%"),
    top: wp("1.4%"),
    fontSize: hp("1.4%") + wp("1.4%"),
  },
  username: {
    position: "absolute",
    left: wp("50%"),
    top: wp("1.4%"),
    fontSize: hp("1.4%") + wp("1.4%"),
  },
  scroll: {
    marginBottom: hp("12%"),
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
