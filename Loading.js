import React from "react";
import {StyleSheet, Text, View, StatusBar} from "react-native";

export default function Loading(){
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"/>
      <Text style={styles.text}>Getting the fucking weather</Text>
    </View>
  );
}
// paddingHorizontal, vertical은 CSS에서 사용 불가능 react native에서만 사용 가능
// font size에 px 단위로 입력해줄때 따옴표 안에 넣어주니까 못 받아들인다.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    paddingVertical: 100,
    backgroundColor: "#FDF6AA"
  },
  text: {
    color: "#2c2c2c",
    fontSize: 30
  }
})
