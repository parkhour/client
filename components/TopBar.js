import React from 'react'
import { View } from 'react-native'
import { Container, Text } from 'native-base'
import { Row, Grid } from 'react-native-easy-grid'
import { LinearGradient } from 'expo-linear-gradient';

const TopBar = (props) => {
    return (
        <Container
        style={{
          borderBottomLeftRadius: 45,
          borderBottomRightRadius: 45,
          flex: 0.36,
         
        }}
      >
          

           <LinearGradient
          colors={[ '#FFDD00','#FBB034']}
          style={{
            borderBottomLeftRadius: 45,
            borderBottomRightRadius: 45,  
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height:170,
          }}
        />
        <Grid>
          <Row style={{ padding: 20, paddingTop: 65 }}>
            <Text style={{ fontWeight: "bold", fontSize: 25, color: "white" }}>
              {props.text}
            </Text>
          </Row>
        </Grid>
      </Container>
    )
}

export default TopBar
