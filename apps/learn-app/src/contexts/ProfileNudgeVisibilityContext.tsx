import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type ProfileNudgeVisibilityContextValue = {
  isProfileNudgeVisible: boolean;
  setIsProfileNudgeVisible: (visible: boolean) => void;
};

const ProfileNudgeVisibilityContext =
  createContext<ProfileNudgeVisibilityContextValue | null>(null);

export function ProfileNudgeVisibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isProfileNudgeVisible, setIsProfileNudgeVisibleState] = useState(false);

  const setIsProfileNudgeVisible = useCallback((visible: boolean) => {
    setIsProfileNudgeVisibleState(visible);
  }, []);

  const value = useMemo(
    () => ({ isProfileNudgeVisible, setIsProfileNudgeVisible }),
    [isProfileNudgeVisible, setIsProfileNudgeVisible],
  );

  return (
    <ProfileNudgeVisibilityContext.Provider value={value}>
      {children}
    </ProfileNudgeVisibilityContext.Provider>
  );
}

export function useProfileNudgeVisibility(): ProfileNudgeVisibilityContextValue {
  const ctx = useContext(ProfileNudgeVisibilityContext);
  if (!ctx) {
    return {
      isProfileNudgeVisible: false,
      setIsProfileNudgeVisible: () => {},
    };
  }
  return ctx;
}

