// src/components/common/CustomButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type CustomButtonProps = {
    title: string;
    onPress: () => void;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    buttonStyle,
    textStyle,
    disabled = false,
}) => {
    return (
        <TouchableOpacity
            style={[styles.button, buttonStyle, disabled && styles.disabled]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        padding: 12,
        backgroundColor: '#2196F3',
        borderRadius: 12,
        alignItems: 'center',
        marginVertical: 16,
    },
    text: {
        color: '#fff',
        fontWeight: '600',
    },
    disabled: {
        backgroundColor: '#ccc',
    },
});
