import { createAsyncThunk } from "@reduxjs/toolkit";

export const contribute = createAsyncThunk(
    "/contribute/contribute",
    async (data, { rejectWithValue }) => { 
        try {
            const response = await api.post("/contribute", data);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

