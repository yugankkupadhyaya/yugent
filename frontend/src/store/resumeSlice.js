import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '../utils/axios.js';
import initialResumeBuilderData from '../components/resume-builder/initialData.js';
import { LEGACY_ANALYZED_KEY } from './resumeStorage.js';

const STORAGE_KEY = LEGACY_ANALYZED_KEY;

function getErrorMessage(error, fallback) {
  return error.response?.data?.message || error.message || fallback;
}

export const fetchResume = createAsyncThunk(
  'resume/fetchResume',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/api/resume');
      return data?.success && data.data ? data.data : null;
    } catch (error) {
      if (error.response?.status === 404) return null;
      return rejectWithValue(getErrorMessage(error, 'Unable to load your resume.'));
    }
  },
  {
    condition: (options = {}, { getState }) => {
      if (options.force) return true;

      const { resume } = getState();
      return !resume.hasFetched && resume.status !== 'loading' && resume.status !== 'uploading';
    },
  },
);

export const uploadResume = createAsyncThunk(
  'resume/uploadResume',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('resume', file);
      const { data } = await api.post('/api/resume/upload', formData);

      if (!data?.success || !data.data) {
        return rejectWithValue(data?.message || 'Resume analysis failed.');
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Unable to analyze your resume.'));
    }
  },
);

const initialState = {
  activeUserId: null,
  isHydrated: false,
  analysis: null,
  status: 'idle',
  error: null,
  hasFetched: false,
  lastFetchedAt: null,
  generated: initialResumeBuilderData,
  builderStep: 1,
  showPreview: false,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    hydrateForUser: (state, action) => {
      const {
        userId,
        analysis,
        generated,
        builderStep,
        showPreview,
      } = action.payload || {};

      state.activeUserId = userId || null;
      state.isHydrated = true;

      if (analysis) {
        state.analysis = analysis;
      }

      if (generated) {
        state.generated = { ...initialResumeBuilderData, ...generated };
      }

      if (Number.isInteger(builderStep)) {
        state.builderStep = builderStep;
      }

      if (typeof showPreview === 'boolean') {
        state.showPreview = showPreview;
      }
    },
    clearResumeSession: (state) => {
      state.activeUserId = null;
      state.isHydrated = false;
      state.analysis = null;
      state.status = 'idle';
      state.error = null;
      state.hasFetched = false;
      state.lastFetchedAt = null;
      state.generated = initialResumeBuilderData;
      state.builderStep = 1;
      state.showPreview = false;
    },
    clearAnalysis: (state) => {
      state.analysis = null;
      state.status = 'idle';
      state.error = null;
      state.hasFetched = true;
    },
    updateGeneratedResume: (state, action) => {
      state.generated = action.payload;
    },
    setBuilderStep: (state, action) => {
      state.builderStep = action.payload;
    },
    setShowPreview: (state, action) => {
      state.showPreview = Boolean(action.payload);
    },
    resetGeneratedResume: (state) => {
      state.generated = initialResumeBuilderData;
      state.builderStep = 1;
      state.showPreview = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResume.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchResume.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hasFetched = true;
        state.lastFetchedAt = Date.now();

        // Preserve client-side hydrated analysis if the server returns 404/null
        if (action.payload) {
          state.analysis = action.payload;
        }
      })
      .addCase(fetchResume.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unable to load your resume.';
        state.hasFetched = true;
      })
      .addCase(uploadResume.pending, (state) => {
        state.status = 'uploading';
        state.error = null;
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.analysis = action.payload;
        state.hasFetched = true;
        state.lastFetchedAt = Date.now();
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unable to analyze your resume.';
      });
  },
});

export const {
  hydrateForUser,
  clearResumeSession,
  clearAnalysis,
  updateGeneratedResume,
  setBuilderStep,
  setShowPreview,
  resetGeneratedResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;

export { STORAGE_KEY };
