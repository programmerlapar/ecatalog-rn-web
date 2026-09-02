import React from 'react'
import { Image, ScrollView, StyleSheet, Text } from 'react-native'
import { LittleDarkAccent } from '../constant/ColorsConst'

const About = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Tentang Kami</Text>
            <Image
                accessibilityLabel="Logo Snow Motion Cafe"
                accessibilityRole="image"
                source={require('../assets/cafe.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Snow Motion Cafe</Text>
            <Text style={styles.description}>
                Snow Motion Cafe adalah cafe dengan vibe modern dan desain interior
                yang kece banget. Didirikan pada tahun 2020.
            </Text>
        </ScrollView>
    )
}

export default About;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    heading: {
        color: LittleDarkAccent,
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 24,
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
        color: LittleDarkAccent,
        maxWidth: 480,
        textAlign: 'center',
        lineHeight: 24,
    },
})
