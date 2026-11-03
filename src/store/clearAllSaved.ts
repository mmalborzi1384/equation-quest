import { usePreferences } from './usePreferences';
import { useLevelProgress } from './useLevelProgress';
import { useWorkshopProgress } from './useWorkshopProgress';
import { useFractionPractice } from './useFractionPractice';
/** Reset only the four application-owned persisted stores. Never clear the origin. */
export function clearAllSaved() {
  useLevelProgress.getState().reset();
  useWorkshopProgress.getState().reset();
  useFractionPractice.getState().reset();
  usePreferences.getState().reset();
}
