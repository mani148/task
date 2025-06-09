import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {GameStackParamList} from '../../navigation/games/GameStackNavigator';
import {GAME_STATUS, Team} from '../../model/model';
import SelectableButton from '../common/SelectableButton';
import CustomButton from '../common/CustomButton';
import {ScrollView} from 'react-native-gesture-handler';
import {usePrediction} from '../../context/PredictionContext';
import strings from '../../constants/strings';

type Props = {
  route: RouteProp<GameStackParamList, 'GameDetail'>;
};

const GameDetailScreen: React.FC<Props> = ({route}) => {
  const options = ['Home Team Wins', 'Away Team Wins', 'Cover the Spread'];

  const {game} = route.params;
  const {homeTeam, awayTeam} = game;

  const [selection, setSelection] = useState<string>();
  const [team, setTeam] = useState<string>();

  const {prediction, makePrediction, resetPrediction} = usePrediction();

  const handlePredict = () => {
    if (!selection) {
      Alert.alert('Please make a prediction first');
      return;
    }
    handleSubmit();
  };

  const getPredictionType = (selectionType: string) => {
    let type = '';
    switch (selectionType) {
      case 'Home Team Wins':
        type = 'home';
        break;
      case 'Away Team Wins':
        type = 'away';
        break;
      case 'Cover the Spread':
        type = 'away';
        break;
      default:
        type = 'away';
    }

    return type;
  };

  const handleSubmit = async () => {
    try {
      const predictionData = {
        gameId: game.id,
        selectedTeam: team,
      };
      makePrediction(
        predictionData.gameId,
        predictionData.selectedTeam!,
        getPredictionType(selection!),
      );
    } catch (error) {
      console.error('Submit failed:', error);
    }
  };

  const status = game.status.toLowerCase();

  return (
    <ScrollView>
      <View style={styles.topContainer}>
        <TeamDetail team={homeTeam} />
        <Text style={styles.vs}>{strings.gameDetailScreen.vs}</Text>
        <TeamDetail team={awayTeam} />
        <View style={styles.oddsContainer}>
          <Text style={styles.oddsText}>{strings.gameDetailScreen.odds}</Text>
          <Text style={styles.spreadText}>{strings.gameDetailScreen.spread} {game.odds?.spread}</Text>
          <Text style={styles.containerWidth}>
            {strings.gameDetailScreen.favorite} {game.odds?.favorite}
          </Text>
        </View>
        <View style={styles.containerWidth}>
          {prediction ? (
            <Text style={styles.predictionText}>{strings.gameDetailScreen.predicted}</Text>
          ) : (
              <Text style={styles.predictionText}>{strings.gameDetailScreen.makePrediction}</Text>
          )}
          {prediction ? (
            <TouchableOpacity onPress={resetPrediction}>
              <Text style={styles.spreadText}>
                {prediction?.selectedTeam} for Game ID {prediction?.gameId}
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              {options.map(option => (
                <SelectableButton
                  key={option}
                  label={option}
                  disabled={status !== GAME_STATUS.IN_PROGRESS}
                  isSelected={selection === option}
                  onPress={() => {
                    setSelection(option);
                    if (option.toLowerCase().includes('spread')) {
                      setTeam('Cover the Spread');
                    } else if (option.toLowerCase().includes('home')) {
                      setTeam(homeTeam.name);
                    } else {
                      setTeam(awayTeam.name);
                    }
                  }}
                />
              ))}
              {status === GAME_STATUS.IN_PROGRESS && (
                <CustomButton
                  title="Submit Prediction"
                  onPress={handlePredict}
                />
              )}
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const TeamDetail = ({team}: {team: Team}) => {
  return (
    <View style={styles.teamDetails}>
      <Text style={styles.nameText}>
        {team.name} {`(${team.abbreviation})`}
      </Text>
      <Text style={styles.textRecord}>{`Record: ${team.record}`}</Text>
    </View>
  );
};

export default GameDetailScreen;

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  predictionText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 16,
  },
  teamDetails: {
    flexDirection: 'column',
  },
  vs: {
    padding: 16,
  },
  oddsContainer: {
    flexDirection: 'column',
    width: '95%',
    paddingVertical: 16,
  },
  oddsText: {
    fontSize: 24,
    fontWeight: '600',
  },
  spreadText: {
    fontSize: 20,
    paddingTop: 8,
  },
  containerWidth: {
    width: '95%',
  },
  textRecord: {
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'center',
  },
});
