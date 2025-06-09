import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
    label: string;
    isSelected: boolean;
    disabled?: boolean;
    onPress: () => void;
};

const SelectableButton: React.FC<Props> = ({ label, isSelected, disabled = false, onPress}) => {
    return (
        <TouchableOpacity
            onPress={disabled ? undefined : onPress}
            style={[
                styles.button,
                isSelected && styles.selected,
                disabled && styles.disabled,
            ]}
            activeOpacity={disabled ? 1 : 0.7} // no visual feedback when disabled
            disabled={disabled}
        >
            <Text
                style={[
                    styles.label,
                    isSelected && styles.selectedLabel,
                    disabled && styles.disabledLabel,
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        backgroundColor: '#F2F2F7',
        marginVertical: 6,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#C7C7CC',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    selected: {
        backgroundColor: '#4cAF50',
        borderColor: '#4cAF50',
    },
    disabled: {
        backgroundColor: '#E5E5EA',
        borderColor: '#C7C7CC',
        shadowOpacity: 0, // remove shadow for disabled
    },
    label: {
        fontSize: 16,
        color: '#1C1C1E',
    },
    selectedLabel: {
        color: '#fff',
        fontWeight: '600',
    },
    disabledLabel: {
        color: '#A1A1A6',
    },
});

export default SelectableButton;
