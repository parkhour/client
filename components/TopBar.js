import React from 'react'
import { View } from 'react-native'
import { Container, Text } from 'native-base'
import { Row, Grid } from 'react-native-easy-grid'
import { LinearGradient } from 'expo-linear-gradient';

const TopBar = (props) => {
    const [col1, col2] = props.col
    const textcol = props.textcol
    return (
        <Container
        style={{
          borderBottomLeftRadius: 45,
          borderBottomRightRadius: 45,
          flex: 0.36,
         
        }}
      >
          

           <LinearGradient
          colors={[ col1, col2]}
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
            <Text style={{ fontWeight: "bold", fontSize: 25, color: textcol }}>
              {props.text}
            </Text>
          </Row>
        </Grid>
      </Container>
    )
}

export default TopBar
