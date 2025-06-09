import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {fetchGames} from '../../service/services';
import Badge from '../common/Badge';
import dayjs from 'dayjs'
import { Game, GAME_STATUS, Team } from '../../model/model';
import { StackNavigationProp } from '@react-navigation/stack';
import { GameStackParamList } from '../../navigation/games/GameStackNavigator';
import { useNavigation } from '@react-navigation/native';

const GameScreen = () => {
  const [games, setGames] = useState<Game[]>([]);
  const gamesData = useCallback(async () => {
    try {
      const response = await fetchGames();
      setGames(response);
    } catch (e) {
      console.error('Error fetching games: ', e);
    } finally {
    }
  }, []);

  useEffect(() => {
    gamesData();
  }, []);

    type GameNavigationProp = StackNavigationProp<GameStackParamList, 'GameList'>;
    const navigation = useNavigation<GameNavigationProp>();

    const handlePress = (item: Game) => {
        navigation.navigate('GameDetail', { game: item, userId: "" });
    };

    const renderItem = ({ item }: { item: Game }) => {
        return (
            <TouchableOpacity onPress={() => handlePress(item)}>
                <GameItem item={item} />
            </TouchableOpacity>
        );
      };

  return (
    <View style={styles.parent}>
      <FlatList
        data={games}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item)=> item.id}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

const findWinnerName = (game: Game) => {
  if (game.winner === game.awayTeam.abbreviation) {
    return game.awayTeam.name;
  } else {
    return game.homeTeam.name;
  }
};

const getOdds = (game: Game) => {
  return game.status === GAME_STATUS.FINAL
    ? `Winner: ${findWinnerName(game)}`
      : `Odds: Spread ${game.odds?.spread}        Favorite: ${game.odds?.favorite}`;
};

const getDateTime = (game: Game) => {
  let status = '';
  switch (game.status.toLocaleLowerCase()) {
    case GAME_STATUS.IN_PROGRESS:
          status = `${game.period} Q - ${game.clock}`;
      break;
    case GAME_STATUS.SCHEDULED:
          status = dayjs(game.startTime).format('MMM D, h:mm A');
      break;
    case GAME_STATUS.FINAL:
      status = '';
      break;
  }
  return status;
};

const ItemSeparator = () => <View style={styles.separator}></View>;

const RecordRow = ({ team }: { team: Team }) => {
  return (
      <View style={styles.row}>
          <Text style={styles.abbreviation}>{team.abbreviation}</Text>
          <Text>{`(${team.record})`}</Text>
          {typeof team.score === 'number' && <Text style={styles.score}>{team.score}</Text>}
    </View>
  );
};

const RenderStatusBadge = (status: { status: string }) => {
    switch (status.status) {
        case GAME_STATUS.IN_PROGRESS:
            return (
                <View style={styles.liveContainer}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveText}>LIVE</Text>
                </View>
            );
        case GAME_STATUS.SCHEDULED:
            return <Badge color="gray" label="Scheduled" />;
        case GAME_STATUS.FINAL:
        default:
            return <Badge color="blue" label="Final" />;
    }
  };

const GameItem = ({ item }: { item: Game }) => {
    const status = item.status.toLowerCase();

  return (
    <View style={styles.gameItem}>
          <View style={[styles.container, styles.marginTop]}>
              <Text style={status === GAME_STATUS.SCHEDULED? styles.datetime  : status === GAME_STATUS.FINAL? styles.finalLabel: styles.liveClock}>{getDateTime(item)}</Text>
              <RenderStatusBadge status = {status}/>
      </View>
      <View
              style={styles.container}>
              <RecordRow team={item.homeTeam} />
              <Text style={styles.vs}>VS</Text>
              <RecordRow team={item.awayTeam} />
      </View>
      <View style={styles.textOdds}>
              <Text style={[styles.odds, status === GAME_STATUS.FINAL && styles.winnerText]}>{getOdds(item)}</Text>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  parent: {
    flex:1,
  },
  gameItem: {
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 16,
      marginBottom: 12, // Spacing between cards
      ...Platform.select({
          ios: {
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 6,
          },
          android: {
              elevation: 3,
          },
      }),
  },
  separator: {
      marginBottom: 12,
    backgroundColor: '#ccc',
  },
    container: {
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'space-between',
    },
    marginTop: {
        marginTop: 8
    },
    vs: {
        fontWeight: '600',
        color: '#999',
        paddingHorizontal: 8,
      },
    odds: {
        marginTop: 8,
        fontSize: 13,
        color: '#555',
        fontWeight: '600',
      },
    liveClock: {
        fontSize: 13,
        color: '#d00',
        fontWeight: '500',
      },
    datetime: {
        fontSize: 12,
        color: '#888',
      },
    finalLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#007AFF',
      },
    liveContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fdecea',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#d00',
        marginRight: 6,
    },
    liveText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#d00',
      },
    winnerText: { fontWeight: 'bold' },
    row: { flexDirection: 'row' },
    abbreviation: { paddingEnd: 10 },
    score: { paddingLeft: 20 },
  textOdds: { flexDirection: 'row', marginTop: 16 },
});


