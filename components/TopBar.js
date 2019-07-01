import React from 'react'
import { View } from 'react-native'
import { Container, Text } from 'native-base'
import { Row, Grid } from 'react-native-easy-grid'

const TopBar = (props) => {
    return (
        <Container
        style={{
          borderBottomLeftRadius: 45,
          borderBottomRightRadius: 45,
          backgroundColor: "rgb(255,207,0)",
          flex: 0.26
        }}
      >
        <Grid>
          <Row style={{ padding: 20, paddingTop: 40 }}>
            <Text style={{ fontWeight: "bold", fontSize: 25, color: "white" }}>
              {props.text}
            </Text>
          </Row>
        </Grid>
      </Container>
    )
}

export default TopBar
