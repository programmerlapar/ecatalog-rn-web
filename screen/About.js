import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const About = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/cafe.png')} style={styles.logo} />
            <Text style={styles.title}>Snow Motion Cafe</Text>
            <Text style={styles.description}>
                Snow Motion Cafe adalah cafe dengan vibe modern dan desain interior
                yang kece banget. Didirikan pada tahun 2020.
            </Text>
        </View>
    )
}

export default About;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 16,
    },
    title: {
        color: 'gold',
        fontSize: 24,
        fontStyle: 'italic',
        fontWeight: 'bold',
        marginBottom: 16,
    },
    description: {
        maxWidth: 480,
        textAlign: 'center',
        lineHeight: 24,
    },
})
