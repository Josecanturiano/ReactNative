import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
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
import create from "antd/lib/icon/IconFont";

class viewDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: this.props.navigation.state.params.article,
    };
  }

  componentDidMount() {
    console.log(this.state.article);
  }

  render() {
    console.disableYellowBox = true;
    return (
      <View>
        <ScrollView>
          <Text style={styles.title}>{this.state.article.title}</Text>
          <Image
            style={{ width: wp("100%"), height: hp("30%"), marginTop: 10 }}
            source={{ uri: this.state.article.urlToImage }}
          />
          <Text style={styles.text}>
            {this.state.article.content}
            {"\n"}
          </Text>
          <Text style={styles.text}>
            {this.state.article.description}
            {"\n"}
          </Text>
          <Text style={styles.text}>
            Fuente : {this.state.article.source.name}
            {"\n"}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});

const AppNavigator = createStackNavigator({
  details: {
    screen: viewDetails,
    navigationOptions: {
      header: null,
    },
  },
});

export default createAppContainer(AppNavigator);
