import { configureStore } from '@reduxjs/toolkit';

import resumeSlice from './resumeSlice.js';
import userSlice from './userSlice.js';
import { resumePersistenceMiddleware } from './resumeMiddleware.js';

export const store = configureStore({
  reducer: {
    resume: resumeSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(resumePersistenceMiddleware),
});

export default store;
