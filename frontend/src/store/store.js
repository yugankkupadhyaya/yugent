import { configureStore } from '@reduxjs/toolkit';

import resumeSlice, { STORAGE_KEY } from './resumeSlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    resume: resumeSlice,
    user: userSlice,
  },
});

store.subscribe(() => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(store.getState().resume.analysis),
    );
  } catch {
    // Persistence is best effort; the server remains the source of truth.
  }
});
