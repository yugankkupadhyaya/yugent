import initialResumeBuilderData from '../components/resume-builder/initialData.js';

export const getAnalyzedResumeKey = (userId) =>
  userId ? `resume-service:${userId}:analyzed-resume` : 'resume-service:anonymous:analyzed-resume';

export const getGeneratedResumeKey = (userId) =>
  userId ? `resume-service:${userId}:generated-resume` : 'resume-service:anonymous:generated-resume';

export const LEGACY_ANALYZED_KEY = 'yugent.resume.analysis';
export const LEGACY_GENERATED_KEY = 'yugent.resume.builder.draft';

let debounceTimeoutId = null;
let pendingWrite = null;

export function flushPendingDebouncedWrite() {
  if (debounceTimeoutId) {
    clearTimeout(debounceTimeoutId);
    debounceTimeoutId = null;
  }

  if (pendingWrite) {
    const { userId, payload } = pendingWrite;
    pendingWrite = null;
    saveStoredGeneratedResumeImmediate(userId, payload);
  }
}

export function cancelPendingDebouncedWrite() {
  if (debounceTimeoutId) {
    clearTimeout(debounceTimeoutId);
    debounceTimeoutId = null;
  }

  pendingWrite = null;
}

export function saveStoredGeneratedResumeDebounced(userId, payload, delayMs = 300) {
  if (!userId || !payload) return;
  pendingWrite = { userId, payload };

  if (debounceTimeoutId) {
    clearTimeout(debounceTimeoutId);
  }

  debounceTimeoutId = setTimeout(() => {
    flushPendingDebouncedWrite();
  }, delayMs);
}

export function saveStoredGeneratedResumeImmediate(userId, payload) {
  if (typeof window === 'undefined' || !window.localStorage || !userId) return;

  try {
    const key = getGeneratedResumeKey(userId);

    if (!payload || !payload.data) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(
        key,
        JSON.stringify({
          data: payload.data,
          currentStep: payload.currentStep ?? 1,
          showPreview: Boolean(payload.showPreview),
          updatedAt: Date.now(),
        })
      );
    }
  } catch (error) {
    console.warn('Failed to save generated resume to localStorage:', error);
  }
}

export function loadStoredAnalyzedResume(userId) {
  if (typeof window === 'undefined' || !window.localStorage) return null;

  try {
    const key = getAnalyzedResumeKey(userId);
    const stored = window.localStorage.getItem(key);

    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }

    if (userId) {
      const legacyStored = window.localStorage.getItem(LEGACY_ANALYZED_KEY);
      if (legacyStored) {
        const parsedLegacy = JSON.parse(legacyStored);
        if (parsedLegacy && typeof parsedLegacy === 'object') {
          saveStoredAnalyzedResume(userId, parsedLegacy);
          return parsedLegacy;
        }
      }
    }

    return null;
  } catch (error) {
    console.warn('Failed to load analyzed resume from localStorage:', error);
    return null;
  }
}

export function saveStoredAnalyzedResume(userId, analysis) {
  if (typeof window === 'undefined' || !window.localStorage || !userId) return;

  try {
    const key = getAnalyzedResumeKey(userId);

    if (!analysis) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, JSON.stringify(analysis));
    }
  } catch (error) {
    console.warn('Failed to save analyzed resume to localStorage:', error);
  }
}

export function removeStoredAnalyzedResume(userId) {
  if (typeof window === 'undefined' || !window.localStorage || !userId) return;

  try {
    const key = getAnalyzedResumeKey(userId);
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to remove analyzed resume from localStorage:', error);
  }
}

export function loadStoredGeneratedResume(userId) {
  const fallback = {
    data: initialResumeBuilderData,
    currentStep: 1,
    showPreview: false,
  };

  if (typeof window === 'undefined' || !window.localStorage) return fallback;

  try {
    const key = getGeneratedResumeKey(userId);
    const stored = window.localStorage.getItem(key);

    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === 'object') {
        if (parsed.data && typeof parsed.data === 'object') {
          return {
            data: { ...initialResumeBuilderData, ...parsed.data },
            currentStep: Number.isInteger(parsed.currentStep) ? parsed.currentStep : 1,
            showPreview: Boolean(parsed.showPreview),
          };
        }

        return {
          data: { ...initialResumeBuilderData, ...parsed },
          currentStep: 1,
          showPreview: false,
        };
      }
    }

    if (userId) {
      const legacyStored = window.localStorage.getItem(LEGACY_GENERATED_KEY);
      if (legacyStored) {
        const parsedLegacy = JSON.parse(legacyStored);
        if (parsedLegacy && typeof parsedLegacy === 'object') {
          const migrated = {
            data: { ...initialResumeBuilderData, ...parsedLegacy },
            currentStep: 1,
            showPreview: false,
          };
          saveStoredGeneratedResumeImmediate(userId, migrated);
          return migrated;
        }
      }
    }

    return fallback;
  } catch (error) {
    console.warn('Failed to load generated resume from localStorage:', error);
    return fallback;
  }
}

export function removeStoredGeneratedResume(userId) {
  cancelPendingDebouncedWrite();

  if (typeof window === 'undefined' || !window.localStorage || !userId) return;

  try {
    const key = getGeneratedResumeKey(userId);
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to remove generated resume from localStorage:', error);
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', flushPendingDebouncedWrite);
  window.addEventListener('pagehide', flushPendingDebouncedWrite);
}
