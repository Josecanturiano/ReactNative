import axios from "axios";
import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import Icon4 from "react-native-vector-icons/AntDesign";
import { Button } from "react-native-elements";

const styles = StyleSheet.create({
  backgroundView: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    top: hp("5%"),
  },
  SearchBar: {
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#cecece",
    borderRadius: 10,
    width: wp("90%"),
    height: hp("7%"),
    borderRadius: 10,
    fontSize: 20,
  },
  ContentView: {
    marginTop: 4,
    backgroundColor: "white",
    width: wp("100%"),
    height: hp("80%"),
    alignItems: "center",
  },
  card: {
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 10,
    fontSize: 32,
    padding: 20,
  },
  CategoriesView: {
    flexDirection: "row",
    backgroundColor: "#cecece",
    width: wp("100%"),
    height: hp("8%"),
  },
  load: {
    flex: 1,
    justifyContent: "center",
  },
  navButton: {
    backgroundColor: "#cecece",
    width: wp("20%"),
    padding: 0,
    top: hp("0.8%"),
    marginLeft: wp("1%"),
    left: wp("1.3%"),
  },
});

class IndexView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      param: "q",
      argument: "us",
      urlType: "top-headlines",
      url: "https://newsapi.org/v2/",
      key: "&apiKey=d28cda4084d64befa1c6e9df1311b1ca",
      page: 1,
      loading: true,
      title: "",
      search: "",
    };
  }
  componentDidMount() {
    this.get();
  }
  find = () => {
    // fill data with results
    this.setState(
      {
        urlType: "everything",
        param: "q",
        argument: this.state.search,
        loading: true,
        data: [],
      },
      () => {
        this.get();
      }
    );
  };
  get = () => {
    //build a query
    let url =
      this.state.url +
      this.state.urlType +
      "?" +
      this.state.param +
      "=" +
      this.state.argument +
      this.state.key +
      "&page=" +
      this.state.page;

    this.setState({ loading: true });
    // make a request
    axios
      .get(url)
      .then((x) => {
        this.setState({ articles: x.data.articles });
        this.setState({ loading: false });
      })
      .catch((x) => {
        this.setState({ loading: false });
      });
  };
  bottomBarCategories = () => {
    console.disableYellowBox = true;
    return (
      <View style={styles.CategoriesView}>
        <Button
          onPress={() =>
            this.setState(
              {
                argument: "us",
                urlType: "top-headlines",
                param: "q",
                loading: true,
              },
              () => {
                this.get();
              }
            )
          }
          key="star"
          props={[1, 2, 34, 1]}
          buttonStyle={styles.navButton}
          icon={
            <Icon
              name="ios-star-outline"
              style={styles.navButton}
              size={hp("3.2%") + wp("1.8%")}
              color="black"
            />
          }
          title=""
        />
        <Button
          onPress={() =>
            this.setState(
              {
                argument: "health",
                urlType: "top-headlines",
                param: "category",
                loading: true,
              },
              () => {
                this.get();
              }
            )
          }
          buttonStyle={styles.navButton}
          icon={
            <Icon2
              name="heartbeat"
              style={styles.navButton}
              size={hp("3.2%") + wp("1.8%")}
              color="black"
            />
          }
          title=""
        />
        <Button
          onPress={() =>
            this.setState(
              {
                argument: "entertainment",
                urlType: "top-headlines",
                param: "category",
                loading: true,
              },
              () => {
                this.get();
              }
            )
          }
          buttonStyle={styles.navButton}
          icon={
            <Icon2
              name="tv"
              style={styles.navButton}
              size={hp("3.2%") + wp("1.8%")}
              color="black"
            />
          }
          title=""
        />
        <Button
          onPress={() =>
            this.setState(
              {
                argument: "business",
                urlType: "top-headlines",
                param: "category",
                loading: true,
              },
              () => {
                this.get();
              }
            )
          }
          buttonStyle={styles.navButton}
          icon={
            <Icon2
              name="money"
              style={styles.navButton}
              size={hp("3.2%") + wp("1.8%")}
              color="black"
            />
          }
          title=""
        />
        <Button
          onPress={() =>
            this.setState(
              {
                argument: "technology",
                urlType: "top-headlines",
                param: "category",
                loading: true,
              },
              () => {
                this.get();
              }
            )
          }
          buttonStyle={styles.navButton}
          icon={
            <Icon3
              name="computer"
              style={styles.navButton}
              size={hp("3.2%") + wp("1.8%")}
              cclor="black"
            />
          }
          title=""
        />
      </View>
    );
  };
  contentScrollView = () => {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        {this.state.articles.length !== 0 ? (
          this.state.articles.map((x, a) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Details", { article: x });
                }}
              >
                <View key={a} style={styles.card}>
                  <Image
                    style={{
                      width: wp("90%"),
                      height: hp("22%"),
                      marginTop: 10,
                      borderRadius: 10,
                    }}
                    source={{
                      uri:
                        x.urlToImage === null
                          ? "https://image.flaticon.com/icons/svg/2089/2089805.svg"
                          : x.urlToImage,
                    }}
                  />
                  <View>
                    <Text>{x.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text>Api empty</Text>
        )}
      </ScrollView>
    );
  };
  render() {
    return this.state.loading ? (
      <View style={styles.load}>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    ) : (
      <View style={styles.backgroundView}>
        <View style={styles.search}>
          <TextInput
            style={styles.SearchBar}
            placeholder="Your search here..."
            placeholderTextColor="black"
            onChangeText={(x) => this.setState({ search: x })}
            onSubmitEditing={this.find}
          />
          <Icon4
            name="search1"
            style={{ position: "absolute", right: wp("5%"), top: hp("1.3%") }}
            size={hp("3.2%") + wp("1.6%")}
            color="black"
          />
        </View>
        <View style={styles.ContentView}>{this.contentScrollView()}</View>
        {this.bottomBarCategories()}
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  home: {
    screen: IndexView,
    navigationOptions: {
      header: null,
    },
  },
});

export default createAppContainer(AppNavigator);
