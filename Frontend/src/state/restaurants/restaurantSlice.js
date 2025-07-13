import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api"; // Adjust the import path as necessary

export const fetchRestaurant = createAsyncThunk(
    "/restaurants/fetchRestaurant",
    async (query, { rejectWithValue }) => {
        console.log("Fetching restaurants with query:", query);
        try {
            const response = await api.get("/restaurants", {
                params: {
                    locality: query.locality?.trim().toLowerCase(),
                    min_cleanliness: query.min_cleanliness,
                    price_range: query.price_range,
                    city: query.city?.trim().toLowerCase(),
                    restaurant_id: query.restaurant_id
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return rejectWithValue("No restaurants found for your search.");
            }
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
                state.restaurants = []; // clear old data
            });
    }
});

export default restaurantSlice.reducer;