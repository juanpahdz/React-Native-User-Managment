import React, { useEffect, useState} from 'react'
import {View, Text, ScrollView, Button} from 'react-native'
import firebase from '../database/firebase'
import {ListItem, Avatar} from 'react-native-elements'

const userList = (props) => {

    const [users, setUsers] = useState([])

        useEffect(() => {
            firebase.db.collection('users').onSnapshot(querySnapshot => {
                
                const users = [];

                querySnapshot.docs.forEach(doc => {
                    const {name, email, phone} = doc.data()

                    users.push({
                        id: doc.id,
                        name,
                        email,
                        phone,
                    })
                });
                setUsers(users)
            })
        })


    return (
        <ScrollView>
            <Button 
                title="Create User" 
                onPress={() => props.navigation.navigate('CreateUsers')} 
            />
        {
            users.map(user => {
                return (
                    <ListItem 
                        key={user.id}
                        bottomDivider
                        onPress={() => {props.navigation.navigate('UserDetailScreen', {
                                                userId: user.id
                                            })
                                        }
                        }
                    >
                        <ListItem.Chevron/>
                        <Avatar 
                            source={{uri:'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}}
                            rounded
                            />
                        <ListItem.Content>
                            <ListItem.Title> {user.name} </ListItem.Title>
                            <ListItem.Subtitle> {user.email} - {user.phone}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )
            })
        }
        </ScrollView>
    )
}

export default userList
