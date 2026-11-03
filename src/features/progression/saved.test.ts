import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { solution } from '../equation-engine/equation';
import { parseRational } from '../equation-engine/rational';
import { stages } from '../level-manager/stages';
import { emptyRewards } from './rewards';
import {
  emptyLevelRecord,
  emptyPracticeRecord,
  recordPractice,
  recordStage,
  safeLevelRecord,
  safePracticeRecord,
} from './saved';
import { LEVEL_KEY, useLevelProgress } from '../../store/useLevelProgress';
import { WORKSHOP_KEY, useWorkshopProgress } from '../../store/useWorkshopProgress';
import { PRACTICE_KEY, useFractionPractice } from '../../store/useFractionPractice';
import { PREFERENCES_KEY, usePreferences } from '../../store/usePreferences';
import { clearAllSaved } from '../../store/clearAllSaved';
import { challenges } from '../level-manager/workshop';

beforeEach(() => {
  clearAllSaved();
  localStorage.clear();
});
afterEach(() => {
  clearAllSaved();
  localStorage.clear();
});
const firstAnswer = solution(stages[0].problems.at(-1)!.equation);

describe('validated persisted progress and owner-requested deletion', () => {
  it('grants a verified stage once, derives XP and crystals from completed IDs, records best attempts and canonical answer', () => {
    const first = recordStage(emptyLevelRecord(), '01', 3, firstAnswer);
    expect(first.rewards.points).toBe(stages[0].points);
    expect(first.lastLevelId).toBe('01');
    expect(first.verifiedAnswers['01']).toEqual({ numerator: '3', denominator: '1' });
    expect(recordStage(first, '01', 1, firstAnswer).rewards).toBe(first.rewards);
    expect(recordStage(first, '01', 1, firstAnswer).bestAttempts['01']).toBe(1);
    expect(
      recordStage(emptyLevelRecord(), '08', 0, solution(stages[7].problems.at(-1)!.equation)),
    ).toEqual(emptyLevelRecord());
    expect(recordStage(emptyLevelRecord(), '01', 0, parseRational('4'))).toEqual(
      emptyLevelRecord(),
    );
  });
  it('rejects forged/out-of-order IDs, inflated points, malformed rational and unsafe metrics when loading', () => {
    const record = safeLevelRecord({
      rewards: { completedIds: ['01', '03', '08'], earnedIds: ['08'], points: 999999 },
      bestAttempts: { '01': -4, '08': 3 },
      verifiedAnswers: { '01': { numerator: '4', denominator: '1' } },
      lastLevelId: '08',
    });
    expect(record.rewards.completedIds).toEqual([]);
    expect(record.rewards.points).toBe(0);
    expect(record.bestAttempts).toEqual({});
    expect(record.verifiedAnswers).toEqual({});
    expect(record.lastLevelId).toBeNull();
    expect(safeLevelRecord(null)).toEqual(emptyLevelRecord());
    expect(
      safePracticeRecord({ verifiedCount: -1, lastAnswer: { numerator: '1', denominator: '0' } }),
    ).toEqual(emptyPracticeRecord());
  });
  it('serializes exact fractional results without raw BigInt and resumes progress after rehydrate/migration', async () => {
    useLevelProgress.getState().grantVerifiedStage('01', 2, firstAnswer);
    useWorkshopProgress.getState().grantVerified(challenges[0].id);
    useFractionPractice.getState().markVerified(0, parseRational('1'));
    usePreferences.getState().toggleMotion();
    for (const key of [LEVEL_KEY, WORKSHOP_KEY, PRACTICE_KEY, PREFERENCES_KEY]) {
      expect(localStorage.getItem(key)).toContain('"version":1');
      expect(localStorage.getItem(key)).not.toContain('BigInt');
    }
    expect(useFractionPractice.getState().record.lastAnswer).toEqual({
      numerator: '1',
      denominator: '1',
    });
    const previous = useLevelProgress.getState().record;
    useLevelProgress.setState({ record: emptyLevelRecord() });
    localStorage.setItem(
      LEVEL_KEY,
      JSON.stringify({
        version: 0,
        state: {
          record: {
            ...previous,
            rewards: { completedIds: ['01'], points: 900 },
          },
        },
      }),
    );
    await useLevelProgress.persist.rehydrate();
    expect(useLevelProgress.getState().record.rewards.completedIds).toEqual(['01']);
    expect(useLevelProgress.getState().record.rewards.points).toBe(stages[0].points);
    expect(useLevelProgress.getState().record.bestAttempts['01']).toBe(2);
  });
  it('recovers corrupted JSON without inventing completion, then permits a new save', async () => {
    localStorage.setItem(WORKSHOP_KEY, '{not json');
    await useWorkshopProgress.persist.rehydrate();
    expect(useWorkshopProgress.getState().rewards).toEqual(emptyRewards);
    expect(localStorage.getItem(WORKSHOP_KEY)).toBeNull();
    useWorkshopProgress.getState().grantVerified(challenges[0].id);
    expect(useWorkshopProgress.getState().rewards.points).toBe(10);
  });
  it('clears each category independently and globally, in memory and storage, without deleting unrelated keys', async () => {
    useLevelProgress.getState().grantVerifiedStage('01', 1, firstAnswer);
    useWorkshopProgress.getState().grantVerified(challenges[0].id);
    useFractionPractice.getState().markVerified(0, parseRational('1'));
    usePreferences.getState().toggleMotion();
    localStorage.setItem('other-app-data', 'keep');
    useLevelProgress.getState().reset();
    expect(useLevelProgress.getState().record).toEqual(emptyLevelRecord());
    expect(localStorage.getItem(LEVEL_KEY)).toBeNull();
    expect(useWorkshopProgress.getState().rewards.points).toBe(10);
    expect(useFractionPractice.getState().record.verifiedCount).toBe(1);
    clearAllSaved();
    clearAllSaved();
    for (const key of [LEVEL_KEY, WORKSHOP_KEY, PRACTICE_KEY, PREFERENCES_KEY])
      expect(localStorage.getItem(key)).toBeNull();
    expect(usePreferences.getState().reduceMotion).toBe(false);
    expect(useWorkshopProgress.getState().rewards).toEqual(emptyRewards);
    expect(useFractionPractice.getState().record).toEqual(emptyPracticeRecord());
    expect(localStorage.getItem('other-app-data')).toBe('keep');
    await Promise.all([
      useLevelProgress.persist.rehydrate(),
      useWorkshopProgress.persist.rehydrate(),
      useFractionPractice.persist.rehydrate(),
      usePreferences.persist.rehydrate(),
    ]);
    expect(useLevelProgress.getState().record).toEqual(emptyLevelRecord());
    expect(useFractionPractice.getState().record).toEqual(emptyPracticeRecord());
  });
  it('counts fraction practice only for the correct sequential answer, and canonicalizes a fractional result', () => {
    const first = recordPractice(emptyPracticeRecord(), 0, parseRational('1'));
    expect(recordPractice(emptyPracticeRecord(), 0, parseRational('2/4'))).toEqual(
      emptyPracticeRecord(),
    );
    expect(recordPractice(first, 0, parseRational('1'))).toBe(first);
    expect(recordPractice(first, 3, parseRational('1/2'))).toBe(first);
    const second = recordPractice(first, 1, parseRational('2'));
    const third = recordPractice(second, 2, parseRational('2/4'));
    expect(third).toEqual({ verifiedCount: 3, lastAnswer: { numerator: '1', denominator: '2' } });
    expect(
      safePracticeRecord({ verifiedCount: 3, lastAnswer: { numerator: '1', denominator: '2' } }),
    ).toEqual(third);
    expect(
      safePracticeRecord({ verifiedCount: 3, lastAnswer: { numerator: '9', denominator: '2' } }),
    ).toEqual(emptyPracticeRecord());
  });
});
