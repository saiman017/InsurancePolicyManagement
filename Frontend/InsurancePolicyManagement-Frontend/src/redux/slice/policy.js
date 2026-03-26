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

export const fetchPolicySummary = createAsyncThunk(
  "policy/fetchSummary",
  async () => {
    const response = await axiosInstance.get("/policy/summary");
    return response.data.data;
  }
);

export const fetchPolicyCountByType = createAsyncThunk(
  "policy/fetchCountByType",
  async () => {
    const response = await axiosInstance.get("/policy/count-by-type");
    return response.data.data;
  }
);

export const fetchSumInsuredByType = createAsyncThunk(
  "policy/fetchSumInsuredByType",
  async () => {
    const response = await axiosInstance.get("/policy/sum-insured-by-type");
    return response.data.data;
  }
);

const policySlice = createSlice({
  name: "policy",
  initialState: {
    list: [],
    selectedPolicy: null,
    summary: null,
    countByType: [],
    sumInsuredByType: [],
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
      })
      // Analytics reducers
      .addCase(fetchPolicySummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      })
      .addCase(fetchPolicyCountByType.fulfilled, (state, action) => {
        state.countByType = action.payload;
      })
      .addCase(fetchSumInsuredByType.fulfilled, (state, action) => {
        state.sumInsuredByType = action.payload;
      });
  },
});

export const selectAllPolicies = (state) => state.policy.list;
export const selectPolicyById = (state) => state.policy.selectedPolicy;
export const selectPolicySummary = (state) => state.policy.summary;
export const selectPolicyCountByType = (state) => state.policy.countByType;
export const selectSumInsuredByType = (state) => state.policy.sumInsuredByType;

export default policySlice.reducer;