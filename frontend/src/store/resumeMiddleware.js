import {
  clearAnalysis,
  clearResumeSession,
  fetchResume,
  resetGeneratedResume,
  setBuilderStep,
  setShowPreview,
  updateGeneratedResume,
  uploadResume,
} from './resumeSlice.js';
import { spendCoins } from './userSlice.js';
import {
  cancelPendingDebouncedWrite,
  removeStoredAnalyzedResume,
  removeStoredGeneratedResume,
  saveStoredAnalyzedResume,
  saveStoredGeneratedResumeDebounced,
} from './resumeStorage.js';

export const resumePersistenceMiddleware = (storeApi) => (next) => (action) => {
  const result = next(action);
  const state = storeApi.getState();
  const { activeUserId, isHydrated } = state.resume;

  if (clearResumeSession.match(action)) {
    cancelPendingDebouncedWrite();
    return result;
  }

  if (!activeUserId || !isHydrated) {
    return result;
  }

  if (uploadResume.fulfilled.match(action)) {
    if (state.resume.analysis) {
      saveStoredAnalyzedResume(activeUserId, state.resume.analysis);
    }

    storeApi.dispatch(spendCoins({ action: 'resume-analysis' }));
  } else if (fetchResume.fulfilled.match(action)) {
    if (action.payload && state.resume.analysis) {
      saveStoredAnalyzedResume(activeUserId, state.resume.analysis);
    }
  } else if (clearAnalysis.match(action)) {
    removeStoredAnalyzedResume(activeUserId);
  } else if (
    updateGeneratedResume.match(action) ||
    setBuilderStep.match(action) ||
    setShowPreview.match(action)
  ) {
    saveStoredGeneratedResumeDebounced(activeUserId, {
      data: state.resume.generated,
      currentStep: state.resume.builderStep,
      showPreview: state.resume.showPreview,
    });
  } else if (resetGeneratedResume.match(action)) {
    removeStoredGeneratedResume(activeUserId);
  }

  return result;
};

export default resumePersistenceMiddleware;
