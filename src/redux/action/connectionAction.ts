import { createAsyncThunk } from '@reduxjs/toolkit';
export const setSelectConnectState: any = createAsyncThunk(
  'setSelectConnectState',
  async (data) => data
);
