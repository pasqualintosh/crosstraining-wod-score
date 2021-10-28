import { Score } from '../../providers/WodProvider';
import { wodAlreadyExist } from './../../helpers/saveData';
const mockScores: Array<Score> = [
  {
    id: 'gzvtc',
    reps: 0,
    time: { minutes: 0, seconds: 0 },
    wod: '10 rounds for time,300 mt row,20 air squat',
  },
  {
    id: 'sfbzp',
    reps: 0,
    time: { minutes: 0, seconds: 0 },
    wod: '5 rounds for time,20 double under,10 pull-up,15 thruster',
  },
];

const mockWod: string =
  '5 rounds for time,20 double under,10 pull-up,15 thruster';

describe('checkIfWodExist', () => {
  beforeEach(() => {});
  afterEach(() => {});

  it('should return true if scores contains given wod', () => {
    expect(wodAlreadyExist(mockScores, mockWod)).toBe(true);
  });
});
