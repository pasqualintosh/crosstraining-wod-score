import React from 'react';
import { Link } from 'react-router-dom';
import { useWodProviderContext, Score } from '../providers/WodProvider';
import { wods } from '../data/wods';
import { wodAlreadyExist } from '../helpers/saveData';

interface IProps {}
interface IState {}

const getWodFromSamples = (samples: Array<string>): Array<string> => {
  let i = Math.floor(Math.random() * samples.length);
  let content = samples[i];
  content = content.replaceAll('"', '');
  return content.split(/\\r\\n/g);
};

const fetchRandomWod = (): Array<String> => {
  return getWodFromSamples([...wods]);
};

const Home: React.FC<IProps> = (): JSX.Element => {
  const [randomWod, setRandomWod] = React.useState<Array<String>>([]);
  const { setCurrentScores, getCurrentScores } = useWodProviderContext();

  const initialize = (): void => {
    const sample_wod = fetchRandomWod();
    setRandomWod(sample_wod);
  };

  React.useEffect(() => {
    initialize();
  }, [randomWod.length]);

  const handleSave = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    let new_score: Score = {
      id: Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 5),

      wod: randomWod.join(','),
      reps: 0,
      time: {
        minutes: 0,
        seconds: 0,
      },
    };
    let currentScores = getCurrentScores();
    if (!wodAlreadyExist(currentScores, new_score.wod)) {
      setCurrentScores([...currentScores, new_score]);
      alert('wod saved');
    } else {
      alert('wod already exist, refresh');
    }
  };

  return (
    <div>
      <p>
        {randomWod.map((line, index) => {
          return (
            <span key={index}>
              {line}
              <br />
            </span>
          );
        })}
      </p>
      <span
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <button>
          <Link to={'/'}>generate</Link>
        </button>
        <button onClick={handleSave}>save</button>
      </span>
    </div>
  );
};

export default Home;
