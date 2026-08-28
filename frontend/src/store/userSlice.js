import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/utils/axios';

function getErrorMessage(error, fallback) {
  return error.response?.data?.message || error.message || fallback;
}

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/api/me');

      if (!data?.success || !data.user) {
        return rejectWithValue(data?.message || 'Unable to load your account.');
      }

      return data.user;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Unable to load your account.'));
    }
  },
  {
    condition: (options = {}, { getState }) => {
      if (options.force) return true;

      const { user } = getState();
      return user.status !== 'loading' && !user.current;
    },
  },
);

export const spendCoins = createAsyncThunk(
  'user/spendCoins',
  async ({ action, coins }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/api/auth/use-coins', { action, coins });

      if (!data?.success) {
        return rejectWithValue(data?.message || 'Unable to use interview coins.');
      }

      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Unable to use interview coins.'));
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: null,
    status: 'idle',
    coinStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.current = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unable to load your account.';
      })
      .addCase(spendCoins.pending, (state) => {
        state.coinStatus = 'loading';
        state.error = null;
      })
      .addCase(spendCoins.fulfilled, (state, action) => {
        state.coinStatus = 'succeeded';

        if (state.current) {
          state.current.interviewCoin = action.payload.interviewCoin;
        } else {
          state.current = { interviewCoin: action.payload.interviewCoin };
        }
      })
      .addCase(spendCoins.rejected, (state, action) => {
        state.coinStatus = 'failed';
        state.error = action.payload || 'Unable to use interview coins.';
      });
  },
});

export default userSlice.reducer;

