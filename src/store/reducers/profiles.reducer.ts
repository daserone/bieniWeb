import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile, fetchProfiles } from "@store/actions/profiles.actions";
import { Profiles, Profile, newDependent } from "@models/profiles.model";

interface ProfileState {
  profiles: Profiles[];
  currentProfile: Profile;
  loading: boolean;
}

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profiles: [] as Profiles[],
    currentProfile: {} as Profile,

    loading: false,
  } as ProfileState,

  reducers: {
    setCurrentProfile: (state, action) => {
      state.currentProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetchProfiles
    builder.addCase(fetchProfiles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProfiles.fulfilled, (state, action) => {
      state.loading = false;
      //   add new profiles to the list
      let addNewProfile = newDependent;
      let profiles = action.payload.profiles;
      profiles.push(addNewProfile);
      state.profiles = profiles;
    });
    builder.addCase(fetchProfiles.rejected, (state) => {
      state.loading = false;
    });
    // fetchProfile
    builder.addCase(fetchProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.loading = false;

      state.currentProfile = action.payload.profile;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { setCurrentProfile } = profileSlice.actions;
export default profileSlice.reducer;
