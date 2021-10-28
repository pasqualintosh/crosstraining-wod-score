import { Score } from '../providers/WodProvider';

export const wodAlreadyExist = (scores: Array<Score>, wod: string): boolean => {
  const find = scores.find(score => score.wod === wod);
  if (find) return true;
  return false;
};
