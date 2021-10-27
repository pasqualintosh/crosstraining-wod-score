import React from 'react';
import { useWodProviderContext, Score } from './../../providers/WodProvider';

interface IProps {}
interface IState {}

const Scores: React.FC<IProps> = (): JSX.Element => {
  const { setCurrentScores, getCurrentScores } = useWodProviderContext();
  const [scores, setScores] = React.useState<Array<Score> | undefined>();
  const [showEditModal, setShowEditModal] = React.useState<boolean>(false);
  const [editableScore, setEditableScore] = React.useState<Score | undefined>(
    undefined,
  );

  const initialize = (): void => {
    const currentScores = getCurrentScores();
    setScores([...currentScores]);
  };

  React.useEffect(() => {
    initialize();
  }, [scores?.length, showEditModal]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { value, name } = event.target;
    if (name == 'seconds' || name == 'minutes') {
      const time: Score['time'] = {
        ...editableScore?.time,
        [name]: value,
      };
      if (editableScore)
        setEditableScore({
          ...editableScore,
          time: { ...editableScore.time, ...time },
        });
    } else {
      if (editableScore)
        setEditableScore({
          ...editableScore,
          [name]: value,
        });
    }
  };

  const editScoreModal = (): JSX.Element => {
    if (editableScore)
      return (
        <div className={'editScoreModal'} style={{}}>
          <span
            onClick={() => {
              setEditableScore(undefined);
              setShowEditModal(false);
            }}>
            x
          </span>
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'self-end',
            }}>
            <span>
              <p>{editableScore.wod}</p>
            </span>
            <span>
              <label htmlFor={'reps'}>Reps</label>
              <input
                name={'reps'}
                type={'number'}
                placeholder={editableScore.reps?.toString()}
                onChange={handleInputChange}
              />
            </span>
            <span>
              <label htmlFor={'minutes'}>Minutes</label>
              <input
                name={'minutes'}
                type={'number'}
                placeholder={editableScore.time?.minutes?.toString()}
                onChange={handleInputChange}
              />
              <label htmlFor={'seconds'}>Seconds</label>
              <input
                name={'seconds'}
                type={'number'}
                placeholder={editableScore.time?.seconds?.toString()}
                onChange={handleInputChange}
              />
            </span>
            <span>
              <button
                onClick={() => {
                  let currentScores = [...getCurrentScores()];
                  const index = currentScores.findIndex(
                    score => score.id == editableScore.id,
                  );
                  currentScores.splice(index, 1);

                  setCurrentScores([...currentScores, { ...editableScore }]);
                  setEditableScore(undefined);
                  setShowEditModal(false);
                }}>
                save
              </button>
            </span>
          </span>
        </div>
      );
    return <></>;
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>wod</td>
            <td>time</td>
            <td>rep</td>
          </tr>
        </thead>
        <tbody>
          {scores?.map(score => (
            <tr
              key={score.id}
              onClick={() => {
                const currentEditableScore = scores?.find(
                  clickedScore => clickedScore.id == score.id,
                );

                if (currentEditableScore) {
                  setEditableScore({ ...currentEditableScore });
                  setShowEditModal(true);
                }
              }}>
              <td>{score.wod}</td>
              <td>
                {score.time?.seconds
                  ? `${score.time.minutes}'${score.time.seconds}"`
                  : `/`}
              </td>
              <td>{score.reps ? score.reps : '/'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditModal && editScoreModal()}
    </>
  );
};

export default Scores;
