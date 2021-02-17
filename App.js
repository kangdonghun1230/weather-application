import React from 'react';
import {Alert} from "react-native";
import Loading from "./Loading";
import * as Location from 'expo-location';
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "226bbec4dc84d1ed19f0d5e602d3bcf3";

//View는 div같은 것이다.
export default class extends React.Component {
  state = {
    isLoading: true
  };
  //template 개념이 적용되었다.
  getWeather = async(latitude, longitude) => {
    const {
      data: {
        main: {temp},
        weather
      }
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    this.setState({
      isLoading: false, 
      condition: weather[0].main, 
      temp
    });
  };
  getLocation = async() => {
    try {
      // permission을 사용자가 안준다면 error 를 return하고 catch 구문에서 error를 잡을 것
      await Location.requestPermissionsAsync();
      const {
         coords: {latitude, longitude}
       } = await Location.getCurrentPositionAsync();

      // Send to API and get weather
      // false로 설정하면 현재 화면이 loading되지 않는다.
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  };
  componentDidMount(){
    this.getLocation();
  }
  render(){
    const { isLoading, temp, condition} = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition}/>;
  }
}
// flex direction의 default 값은 column이다.
// container가 parent이고, parent에서 flex 1을 부여하지 않으면 child도 적용 X
// child에서 flex 값을 설정해준 비율대로 공간을 알아서 차지한다.
// height나 width로 레이아웃을 설정하는 경우 기기에 따라서 다르게 적용될 가능성
// 따라서 flex로 레이아웃을 설정하는 것 기기 차이에도 의도된 비율로 설정이 가능하다.
