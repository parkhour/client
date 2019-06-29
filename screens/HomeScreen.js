import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux';

const HomeScreen = (props) => {
    console.log(props.isLogin, 'ini dihome')
    return (
        <View>
            <Text>Welkomeee {props.isLogin}</Text>
        </View>
    )
}


const mapStatetoProps = (state) => {
    return { isLogin: state.auth.isLogin }
}
export default connect(mapStatetoProps, null)(HomeScreen)
