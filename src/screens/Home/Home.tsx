import React from 'react';
import { useWodProviderContext, Score } from './../../providers/WodProvider';

interface IProps {}
interface IState {}

const getWodFromSamples = (samples: Array<string>): Array<string> => {
  let i = Math.floor(Math.random() * samples.length);
  let content = samples[i];
  content = content.replaceAll('"', '');
  return content.split(/\\r\\n/g);
};

const fetchRandomWod = async (): Promise<Array<String>> => {
  const config: RequestInit = {
    method: 'get',
  };

  const data = await fetch(
    'https://dgurkaynak.github.io/wod-generator/',
    config,
  );
  const text = await data.text();

  let start = text.indexOf('<script>');
  let end = text.indexOf('</script>');
  let js_script = text.substr(start, end - start + '</script>'.length);

  let samples_start =
    js_script.indexOf('var samples = [') + 'var samples = ['.length;
  let samples_end = js_script.indexOf('];');
  let samples = js_script
    .substr(samples_start, samples_end - samples_start)
    .split(',');

  return getWodFromSamples([...samples]);
};

const Home: React.FC<IProps> = (): JSX.Element => {
  const [randomWod, setRandomWod] = React.useState<Array<String>>([]);
  const { setCurrentScores, getCurrentScores } = useWodProviderContext();

  const initialize = async (): Promise<void> => {
    const sample_wod = await fetchRandomWod();
    setRandomWod(sample_wod);
  };

  React.useEffect(() => {
    initialize();
  }, [randomWod.length]);

  const handleGenerate = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {};

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
    setCurrentScores([...currentScores, new_score]);
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
        <button onClick={() => {}} disabled={true}>
          genera
        </button>
        <button onClick={handleSave}>salva</button>
      </span>
    </div>
  );
};

export default Home;
