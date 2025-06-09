// Badge.tsx
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Badge = ({ color = 'gray', label }: { color?: string; label: string }) => {
    return (
        <View style={[styles.badge, { backgroundColor: getBackgroundColor(color) }]}>
            <Text style={[styles.text, { color: getTextColor(color) }]}>{label.toUpperCase()}</Text>
        </View>
    );
};

const getBackgroundColor = (color: string) => {
    switch (color) {
        case 'red':
            return '#fdecea';
        case 'blue':
            return '#e7f0fd';
        case 'gray':
            return '#f0f0f0';
        default:
            return '#f0f0f0';
    }
};

const getTextColor = (color: string) => {
    switch (color) {
        case 'red':
            return '#d00';
        case 'blue':
            return '#007aff';
        case 'gray':
            return '#333';
        default:
            return '#333';
    }
};

const styles = StyleSheet.create({
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
    },
});

export default Badge;
