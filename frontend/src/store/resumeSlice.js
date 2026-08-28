import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/utils/axios';

const STORAGE_KEY = 'yugent.resume.analysis';

function getErrorMessage(error, fallback) {
  return error.response?.data?.message || error.message || fallback;
}

function getInitialAnalysis() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
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

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    analysis: getInitialAnalysis(),
    status: 'idle',
    error: null,
    hasFetched: false,
    lastFetchedAt: null,
  },
  reducers: {
    clearAnalysis: (state) => {
      state.analysis = null;
      state.status = 'idle';
      state.error = null;
      state.hasFetched = true;
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
        state.analysis = action.payload;
        state.hasFetched = true;
        state.lastFetchedAt = Date.now();
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

export const { clearAnalysis } = resumeSlice.actions;
export default resumeSlice.reducer;

export { STORAGE_KEY };
