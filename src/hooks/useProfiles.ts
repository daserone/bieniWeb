import {
  fetchProfile,
  fetchProfiles,
  FetchProfilesPayload,
} from "@store/actions/profiles.actions";
import { setCurrentProfile } from "@store/reducers/profiles.reducer";
import { RootState, useAppDispatch } from "@store/store";
import { useCallback } from "react";
import { useSelector } from "react-redux";

function useProfiles() {
  const { profiles, currentProfile, loading } = useSelector(
    (state: RootState) => state.profiles
  );
  const dispatch = useAppDispatch();

  const setCurrentProfileAction = useCallback(
    (profile: any) => {
      dispatch(setCurrentProfile(profile));
    },
    [dispatch]
  );

  const fetchProfileAction = useCallback(
    (id: string) => {
      dispatch(fetchProfile(id));
    },
    [dispatch]
  );

  const fetchProfilesAction = useCallback(
    (req: FetchProfilesPayload) => {
      dispatch(fetchProfiles(req));
    },
    [dispatch]
  );

  return {
    profiles,
    currentProfile,
    setCurrentProfileAction,
    fetchProfileAction,
    fetchProfilesAction,
    loading,
  };
}

export default useProfiles;
