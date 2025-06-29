export const searchLocation = createAsyncThunk("/search/searchLocation",
    async (location, { rejectWithValue }) => {
        try {
            // Simulating an API call to search for locations
            const response = await api.get(API_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data; // Assuming the API returns an array of locations
            } catch (error) {
                return rejectWithValue(error.message);
            }
        }
    );

const initialState = {
    locations: [],
    loading: false,
    error: null
};

const searchSlice = createSlice({
    name : 'search',
    initialState ,
    reducers : {
        clearSearchResults : (state) => {
            state.locations = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.locations = action.payload;
            })
            .addCase(searchLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }});

export default searchSlice.reducer ;