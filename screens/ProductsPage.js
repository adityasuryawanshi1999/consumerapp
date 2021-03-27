import React, { useState,useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'
import ProductItem from '../components/ProductItem'
import Card from '../components/Card'

const ProductsPage = props => {
    const shopid = props.navigation.getParam('shopid')
    const [ dataSource, setDataSource ] = useState({ data: []})
    const [laoding, setLoading] = useState(true)
    const [noresults, setNoResults] = useState(false)
    const [name, setName] = useState("")


    useEffect( () => { 
      (async() => {
          fetch('https://rental-portal.000webhostapp.com/fetchproducts.php', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
             
                // Getting the id.
                query: shopid+"-products"
             
              }) 
              
            }).then((response) => response.json())
                  .then((responseJson) => {
                    setDataSource({ data: responseJson})
                    //console.log(dataSource)
                    setLoading(false)
                  }).catch((error) => {
                    console.error(error);
                  }); 
      })();
    },[])

    const searchByName = async() => {
      setLoading(true)
      var ourq = 'https://rental-portal.000webhostapp.com/fetchproductsbyname.php'
      if(name==='Horror' || name==='Romantic' || name==='Thriller' || name==='Fictional' || name==='Real-Life' || name==='Educational' || name==='romantic' || name==='thriller' || name==='fictional' || name==='horror' || name==='real-life' || name==='educational'){
        ourq = 'https://rental-portal.000webhostapp.com/consumer/fetchproductsbygenre.php'
      }
        fetch(ourq, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
               
                  // Getting the id. 
                  query2: shopid+"-products",
                  name: '%'+name+'%'
               
                })  
                
              }).then((response) => response.json())
                    .then((responseJson) => { 
                      if(responseJson===0){
                        setNoResults(true)
                        setLoading(false)
                      }
                      else{
                      setDataSource({ data: responseJson})
                      setLoading(false)
                      setNoResults(false)
                      //console.log(dataSource)
                      }
                    }).catch((error) => {
                      console.log(error);
                      setLoading(false)
                    });
    }

    const resetAction = async() => {
      setLoading(true)
      setName("")
      fetch('https://rental-portal.000webhostapp.com/fetchproducts.php', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
               
                  // Getting the id.
                  query: shopid+"-products"
               
                }) 
                
              }).then((response) => response.json())
                    .then((responseJson) => {
                      setDataSource({ data: responseJson})
                      //console.log(dataSource)
                      setNoResults(false)
                      setLoading(false)
                    }).catch((error) => {
                      console.error(error);
                    });
    }

    if(laoding){
      return(
        <View style={styles.rootContainer}>
            <Card style={styles.textContainer}>
                <Text style={{fontSize: 15, marginBottom: 4, marginLeft: 4}}>Filter by name or simply type in genre:</Text>
                <TextInput style={styles.text} value={name} onChangeText={ text => setName(text)} />
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity style={styles.buttonContainer} onPress={resetAction}  >
                      <Text style={styles.greetingText}>Reset</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonContainer} onPress={searchByName}  >
                      <Text style={styles.greetingText}>Search</Text>
                  </TouchableOpacity>
                </View>
            </Card>
            <View style={styles.activity}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        </View>
      )
    }

    if(noresults){
      return(
        <View style={styles.rootContainer}>
            <Card style={styles.textContainer}>
                <Text style={{fontSize: 15, marginBottom: 4, marginLeft: 4}}>Filter by name or simply type in genre:</Text>
                <TextInput style={styles.text} value={name} onChangeText={ text => setName(text)} />
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity style={styles.buttonContainer} onPress={resetAction}  >
                      <Text style={styles.greetingText}>Reset</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonContainer} onPress={searchByName}  >
                      <Text style={styles.greetingText}>Search</Text>
                  </TouchableOpacity>
                </View>
            </Card>
            <View style={styles.noresults}>
                <Text style={{fontSize: 15}}>No active results</Text>
            </View>
        </View> 
      )
    }

    return(
      <View style={styles.rootContainer}>
          <Card style={styles.textContainer}>
              <Text style={{fontSize: 15, marginBottom: 4, marginLeft: 4}}>Filter by name or simply type in genre:</Text>
              <TextInput style={styles.text} value={name} onChangeText={ text => setName(text)} />
              <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.buttonContainer} onPress={resetAction}  >
                    <Text style={styles.greetingText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={searchByName}  >
                    <Text style={styles.greetingText}>Search</Text>
                </TouchableOpacity>
              </View> 
          </Card>
          <FlatList data={dataSource.data} keyExtractor={ item => item.product_id } renderItem={ itemData => <ProductItem title={itemData.item.name} pid={itemData.item.product_id} url ={itemData.item.image_url} issued={itemData.item.issued} onViewDetail={ ()=> props.navigation.navigate('ProductsThird',{query: shopid, pid: itemData.item.product_id})  } /> } />
      </View> 
  )

}

ProductsPage['navigationOptions'] = () => (
    { 
      title: "Products",
      headerStyle: {
        backgroundColor: Colors.primary
      }
    }
)

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: '#ccc',
    paddingTop: 5
},
activity:{
  flex: 1,
  justifyContent: "center",
  backgroundColor: '#ccc'
},
textContainer:{
  width: Dimensions.get('window').width*0.98,
  alignItems: "center", 
  marginBottom: 5
},
text:{
  backgroundColor: '#ccc',
  width: Dimensions.get('window').width*0.90,
  height: 50,
  borderRadius: 10,
  paddingHorizontal: 5
},
buttonContainer:{
  width: Dimensions.get('window').width*0.35,
  height: 50,
  justifyContent: "center",
  //alignContent: "center",
  alignItems: "center",
  backgroundColor: Colors.primary,
  borderRadius: 25,
  marginTop: 4,
},
noresults:{
flex: 1,
justifyContent: "center"
},
buttonWrapper:{
width: '100%',
flexDirection: "row",
justifyContent: "space-evenly",
marginTop: 2
}

})

export default ProductsPage