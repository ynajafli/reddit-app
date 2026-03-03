import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchPopularPosts = createAsyncThunk(
    'posts/fetchPopularPosts',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(
                // 'https://www.reddit.com/r/popular.json'
                'https://jsonplaceholder.typicode.com/posts'
            );

            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const json = await response.json();
            return json;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
  postsById: {},
  allPostIds: [],
  
  // lifecycle: idle, loading, succeeded, failed
  postsStatus: 'idle',
  postsError: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,

  extraReducers: (builder) => {
    builder
        .addCase(fetchPopularPosts.pending, (state) => {
            state.postsStatus = 'loading'
            state.postsError = null;
        })
        .addCase(fetchPopularPosts.fulfilled, (state, action) => {
            state.postsStatus = 'succeeded';
            state.postsError = null;

            state.postsById = {};
            state.allPostIds = [];

            action.payload.forEach(post => {
                state.postsById[post.id] = post;
                state.allPostIds.push(post.id);
            })
        })
        .addCase(fetchPopularPosts.rejected, (state, action) => {
            state.postsStatus = 'failed';
            state.postsError = action.payload;
        })
  }
});

export { fetchPopularPosts }
export default postsSlice.reducer

export const selectAllPostIds = (state) => state.posts.allPostIds;
export const selectPostById = (postId) => (state) => state.posts.postsById[postId];
export const selectPostsStatus = (state) => state.posts.postsStatus;
export const selectPostsError = (state) => state.posts.postsError;