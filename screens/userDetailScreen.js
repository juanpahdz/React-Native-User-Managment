import React, {useEffect, useState} from 'react'
import {View, Text, ScrollView, TextInput, Button, StyleSheet, ActivityIndicator, Alert} from 'react-native'
import firebase from '../database/firebase'

const userDetailScreen = (props) => {
    const initialState = {
        id: '',
        name: '',
        email: '',
        phone: ''
    }
    const [user, setUser] = useState({
        initialState
    })

    const [loader, setLoader] = useState(true)

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection('users').doc(id)
        const doc = await dbRef.get()

        const user = doc.data()
        setUser({
            ...user,
            id: doc.id
        })

        setLoader(false)
    }

    useEffect(() => {
        getUserById(props.route.params.userId)
    }, [])

    
    const handleChangetext = (name, value) => {
        setUser({...user, [name]: value})
    }

    const updateUser = async () => {
        const dbRef = firebase.db.collection('users').doc(user.id)
        
        setLoader(true);
        await dbRef.set({
            name: user.name,
            email: user.email,
            phone: user.phone
        })

        setUser({
            initialState
        })
        props.navigation.navigate('UserList')
    }
    
    const deleteUser = async () => {
        setLoading(true)
        const dbRef = firebase.db
          .collection("users")
          .doc(props.route.params.userId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("UsersList");
    }
    
    const confirmationAlert = () => {
        Alert.alert(
          "Removing the User",
          "Are you sure?",
          [
            { text: "Yes", onPress: () => deleteUser() },
            { text: "No", onPress: () => console.log("canceled") },
          ],
          {
            cancelable: true,
          }
        );
      }
    
    if (loader){
        return(
            <View>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        )
    }


    return (
        <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
            <TextInput 
                placeholder="Name User" 
                value={user.name}
                onChangeText={ (value) => handleChangetext('name', value)}
         
            />
        </View>
        <View style={styles.inputGroup}>
            <TextInput 
                placeholder="Email User"
                value={user.email}
                onChangeText={ (value) => handleChangetext('email', value)}
            />
        </View >
        <View style={styles.inputGroup}>
            <TextInput 
                placeholder="phone User"
                value={user.phone}
                onChangeText={ (value) => handleChangetext('phone', value)}
            />
        </View>
        <View style={styles.inputGroup}>
            <Button 
                title="Save User"
                onPress={() => updateUser()}
                />
        </View>
        <View style={styles.inputGroup}>
            <Button 
                color="#8D1B1F"
                title="Delete User"
                onPress={() => confirmationAlert()}
                />
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:35
    },
    inputGroup: {
        flex:1,
        padding:0,
        marginBottom: 15,
        borderBottomWidth:1,
        borderBottomColor: '#cccccc',
    }
})
export default userDetailScreen