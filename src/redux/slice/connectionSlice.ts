import { createSlice } from '@reduxjs/toolkit';
import { setSelectConnectState } from '../action/connectionAction';
import {
  integrationsAccountCards,
  integrationsEcommerceCards,
  integrationsERPCards,
  integrationsMarketplaceCards,
  integrationsPaymentCards
} from '../../utils/staticObject';

const initialState: any = {
  data: {
    integrationsAccountCards,
    integrationsEcommerceCards,
    integrationsERPCards,
    integrationsPaymentCards,
    integrationsMarketplaceCards,
    connectionCount: 2
  },
  isLoading: false,
  error: null
};

const Connection = createSlice({
  name: 'setSelectConnectState',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setSelectConnectState.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  }
});
export default Connection;
//
