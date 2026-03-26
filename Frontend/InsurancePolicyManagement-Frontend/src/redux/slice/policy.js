import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosinstance";

export const fetchPolicies = createAsyncThunk("policy/fetch", async () => {
  const response = await axiosInstance.get("/policy");
  return response.data.data;
});

export const addPolicy = createAsyncThunk("policy/add", async (policyData) => {
  const response = await axiosInstance.post("/policy", policyData);
  return response.data.data;
});

export const getPolicyById = createAsyncThunk(
  "policy/getById",
  async (id) => {
    const response = await axiosInstance.get(`/policy/${id}`);
    return response.data.data;
  }
);

export const editPolicy = createAsyncThunk(
  "policy/edit",
  async ({ id, data }) => {
    const response = await axiosInstance.put(`/policy/${id}`, data);
    return response.data.data;
  }
);

const policySlice = createSlice({
  name: "policy",
  initialState: {
    list: [],
    selectedPolicy: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolicies.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addPolicy.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editPolicy.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(getPolicyById.fulfilled, (state, action) => {
        state.selectedPolicy = action.payload;
      });
  },
});

export const selectAllPolicies = (state) => state.policy.list;
export const selectPolicyById = (state) => state.policy.selectedPolicy;

export default policySlice.reducer;