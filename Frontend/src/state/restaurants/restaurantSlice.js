import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {api} from "../../config/api"; // Adjust the import path as necessary

export const fetchRestaurant = createAsyncThunk(
    "/restaurants/fetchRestaurant",
    async (query, { rejectWithValue }) => {
        console.log("Fetching restaurants with query:", query);
        try {
            const response = await api.get("/restaurants", {
                params: {
                    locality: query.locality,
                    min_cleanliness: query.min_cleanliness,
                    price_range: query.price_range,
                    city : query.city
                }
            });
            console.log(response.data); 
            return response.data;
        } catch (error) {
            console.log("Error fetching restaurants:", error);
            return rejectWithValue(error.message);
        }
    }
)


const restaurantSlice = createSlice({
    name: "restaurants",
    initialState: {
        restaurants: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurant.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRestaurant.fulfilled, (state, action) => {
                state.loading = false;
                state.restaurants = action.payload;
            })
            .addCase(fetchRestaurant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default restaurantSlice.reducer;