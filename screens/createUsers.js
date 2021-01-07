import React, {useState} from 'react';
import {View, Text, Button, TextInput, ScrollView, StyleSheet} from 'react-native';
import firebase from '../database/firebase'

const createUsers = ( props ) => {
    
    const [state, setstate] = useState({
        name: '',
        email: '',
        phone: ''
    })

    const handleChangetext = (name, value) => {
        setstate({...state, [name]: value})
    }

    const addNewUser = async() =>{
        if (state.name === ''){
               alert('please add a name')
        }
        else{
            await firebase.db.collection('users').add({
               name:state.name,
               email:state.email,
               phone:state.phone,
           })

           props.navigation.navigate('UserList');
           
        }
        
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput 
                    placeholder="Name User" 
                    onChangeText={ (value) => handleChangetext('name', value)}
             
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                    placeholder="Email User"
                    onChangeText={ (value) => handleChangetext('email', value)}
                />
            </View >
            <View style={styles.inputGroup}>
                <TextInput 
                    placeholder="phone User"
                    onChangeText={ (value) => handleChangetext('phone', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <Button 
                    title="Save User"
                    onPress={ () => addNewUser()}
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
export default createUsers