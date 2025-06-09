import React, { use, useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TextStyle } from 'react-native';
import { fetchProfile } from '../../service/services';
import { User } from '../../model/model';
import { usePrediction } from '../../context/PredictionContext';

// const user = {
//     id: 'usr123',
//     username: 'sportsfan42',
//     balance: 1000,
//     predictions: [
//         {
//             gameId: 'gm1003',
//             pick: 'MIA',
//             amount: 100,
//             result: 'win',
//             payout: 190,
//         },
//         {
//             gameId: 'gm1002',
//             pick: 'DAL',
//             amount: 50,
//             result: 'pending',
//         },
//     ],
//     stats: {
//         wins: 7,
//         losses: 4,
//         pending: 1,
//     },
// };

const ProfileScreen = () => {

    const [user, setUser] = useState<User>();

    const userData = useCallback(async () => {
        try {
          const response = await fetchProfile();
          setUser(response);
        } catch (e) {
          console.error('Error fetching games: ', e);
        } finally {
        }
      }, []);
    
      useEffect(() => {
          userData();
      }, []);

      const {prediction} = usePrediction();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.username}>@{user?.username}</Text>

                <View style={styles.card}>
                    <Stat label="💰 Balance" value={`$${user?.balance}`} />
                    <Stat label="🏆 Wins" value={user?.stats.wins} />
                    <Stat label="💔 Losses" value={user?.stats.losses} />
                    <Stat label="⏳ Pending" value={prediction?1:0} />
                </View>

                <Text style={styles.sectionTitle}>Prediction History</Text>

                <FlatList
                    data={user?.predictions}
                    keyExtractor={(item) => item.gameId}
                    contentContainerStyle={styles.historyList}
                    renderItem={({ item }) => (
                        <View style={styles.predictionCard}>
                            <Text style={styles.gameId}>Game ID: {item.gameId}</Text>
                            <Text style={styles.text}>Pick: {item.pick}</Text>
                            <Text style={styles.text}>Amount: ${item.amount}</Text>
                            <Text style={[styles.text, getResultStyle(item.result)]}>
                                Result: {item.result.toUpperCase()}
                            </Text>
                            {item.payout && (
                                <Text style={styles.text}>Payout: ${item.payout}</Text>
                            )}
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

const Stat = ({ label, value }: { label: string; value: string | number | undefined }) => (
    <View style={styles.statRow}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
    </View>
);

const getResultStyle = (result: string | number | undefined): TextStyle => {
    switch (result) {
        case 'win':
            return { color: '#34C759', fontWeight: '600' as TextStyle['fontWeight'] };
        case 'loss':
            return { color: '#FF3B30', fontWeight: '600' as TextStyle['fontWeight'] };
        default:
            return { color: '#8E8E93', fontStyle: 'italic' };
    }
  };
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    container: {
        padding: 20,
        flex: 1,
    },
    username: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        color: '#111',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 14,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
        marginBottom: 28,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 6,
    },
    statLabel: {
        fontSize: 16,
        color: '#666',
    },
    statValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
    historyList: {
        paddingBottom: 20,
    },
    predictionCard: {
        backgroundColor: '#FFF',
        padding: 14,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
    },
    gameId: {
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 4,
        color: '#000',
    },
    text: {
        fontSize: 15,
        color: '#444',
        marginBottom: 2,
    },
});

export default ProfileScreen;
