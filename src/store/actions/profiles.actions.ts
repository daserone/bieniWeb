import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProfileService } from "@services/models/profiles.service";

export const fetchProfile = createAsyncThunk(
  "profile/get",
  async (idPatient: string) => {
    try {
      const response = await ProfileService.getProfile(idPatient);

      return { profile: response.data };
    } catch (error: any) {
      console.log("Error fetching profile", error.response.data);
      return { message: error.response?.data?.detail };
    }
  }
);

export interface FetchProfilesPayload {
  idPatient: string;
  idUser: string;
  familiarity?: string;
}

export const fetchProfiles = createAsyncThunk(
  "profiles/get",
  async ({ idPatient, idUser, familiarity = "" }: FetchProfilesPayload) => {
    try {
      const response = await ProfileService.getProfilesList(
        idUser,
        idPatient,
        familiarity
      );

      return { profiles: response.data };
    } catch (error: any) {
      console.log("Error fetching profiles", error.response.data);
      return { message: error.response?.data?.detail };
    }
  }
);
