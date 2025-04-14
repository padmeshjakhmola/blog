import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment {
  id: string;
  comment: string;
  createdAt: string;
  user?: {
    fullName: string;
    profileImage: string;
  };
}

interface CommentsState {
  items: Comment[];
}

const initialState: CommentsState = {
  items: [],
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },
  },
});

// console.log("commentSlice || commenSlice.ts", commentsSlice);

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
