import React from 'react';
import { StyleSheet, Text, View, StatusBar, } from 'react-native';

function ProfileScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headText}>Settings</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.field}>Name</Text>
                <Text style={styles.info}>Sidra Aziz</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.field}>Email</Text>
                <Text style={styles.info}>sidraziz98@gmail.com</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.field}>Password</Text>
                <Text style={styles.info}>**</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight,
    },
    header: {
        backgroundColor: '#f43e57',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 20
    },
    headText: {
        fontFamily: 'Roboto',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: 30,
    },
    field: {
        textAlign: 'center',
        fontSize: 15,

    },
    info: {
        textAlign: 'center',
        fontSize: 15,
    }

});

export default ProfileScreen;