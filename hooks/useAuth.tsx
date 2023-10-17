import React, { createContext, useContext, useEffect, useState } from "react";
import { UserCreation, UserLoginCredentials } from "../types/models/Auth";
import * as SecureStore from "expo-secure-store";
import { get, post, put } from "../services/utils.service";

interface UserInfo {
  accessToken: string;
  email: string;
  profession: string;
}

interface IAuthContext extends UserInfo {
  loaded: boolean;
  login: (
    user: UserLoginCredentials
  ) => Promise<{ success: boolean; temporaryPassword: boolean | null }>;
  logout: () => Promise<void>;
  register: (user: UserCreation) => Promise<{ success: boolean }>;
  refetchInfo: () => Promise<{ email: string; profession: string }>;
  validateJwt: () => Promise<boolean>;
  forgottenPassword: (email: string) => Promise<void>;
  changePassword: (
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) => Promise<{ success: boolean }>;
  resetPassword: (
    pwd1: string,
    pwd2: string,
    accessToken: string
  ) => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
  accessToken: "",
  email: "",
  profession: "",
  loaded: false,
  login: async (user: UserLoginCredentials) => ({
    success: false,
    temporaryPassword: false,
  }),
  logout: async () => {},
  register: async (user: UserCreation) => ({ success: false }),
  refetchInfo: async () => ({ email: "", profession: "" }),
  validateJwt: async () => false,
  forgottenPassword: async () => {},
  changePassword: async () => ({ success: false }),
  resetPassword: async () => {},
});

export const AuthProvider: React.FC<IAuthContext> = ({ children }: any) => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);
  const [profession, setProfession] = useState<string>("");

  useEffect(() => {
    const initialize = async () => {
      await retrieveUserInfoFromStorage();
      setLoaded(true);
    };

    initialize();
  }, []);

  const login = async (user: UserLoginCredentials) => {
    const result = await post("/auth/signin", user);

    if (!result) {
      throw new Error("Login failed.");
    }
    const data = result.data ?? result;
    saveUserInfo({
      ...data,
      accessToken: data.accessToken,
      email: data.email,
    });

    return {
      success: !!data.accessToken,
      temporaryPassword: data.temporaryPassword,
    };
  };

  const logout = async () => {
    setAccessToken("");
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("email");
    await SecureStore.deleteItemAsync("profession");
  };

  const register = async ({
    email,
    name,
    password,
    profession,
  }: UserCreation) => {
    const res = await post(`/auth/register`, {
      email,
      name,
      password,
      profession,
    });

    if (!res) {
      throw new Error("Register failed.");
    }
    const data = res.data;
    await saveUserInfo({
      email: data.email,
      accessToken: data.accessToken,
      profession: data.profession,
    });
    return { success: !!data.accessToken };
  };

  const forgottenPassword = async (email: string) => {
    const res = await post(`/auth/forgotten-password`, {
      email,
    });

    if (!res) {
      // throw no error to avoid giving information to the user
    }
    const data = res.data ?? res;
  };

  const changePassword = async (
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) => {
    const res = await put(`/auth/update/password`, {
      oldPassword,
      newPassword,
      confirmNewPassword,
    });

    if (!res) {
      throw new Error("Update password failed.");
    }
    const { status } = res;
    return { success: status === 200 };
  };

  const resetPassword = async (
    pwd1: string,
    pwd2: string,
    accessToken: string
  ) => {
    const res = await put(`/public/changeforgotpwd`, {
      pwd1,
      pwd2,
      accessToken,
    });
  };

  const validateJwt = async () => {
    try {
      await get("/v1/prestataire/ca");
      return true;
    } catch (e) {
      return JSON.parse(JSON.stringify(e)).status === 401 ? false : true;
    }
  };

  const refetchInfo = async () => {
    const res = await get("/users/me");
    if (!res) return { email: "", profession: "" };
    const data = res.data;
    if (!data)
      return {
        email: "",
        profession: "",
      };
    setEmail(data.email);
    setProfession(data.profession);
    await SecureStore.setItemAsync("email", data.email);
    await SecureStore.setItemAsync("profession", data.profession);
    return data;
  };

  const retrieveUserInfoFromStorage = async () => {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    const email = await SecureStore.getItemAsync("email");
    const profession = await SecureStore.getItemAsync("profession");
    if (accessToken) {
      setAccessToken(accessToken);
    }
    if (email) {
      setEmail(email);
    }
    if (profession) {
      setProfession(profession);
    }
  };

  const saveUserInfo = async (data: UserInfo) => {
    try {
      setAccessToken(data.accessToken);
      setEmail(data.email);
      setProfession(data.profession);
      await SecureStore.setItemAsync("accessToken", data.accessToken);
      await SecureStore.setItemAsync("email", data.email);
      await SecureStore.setItemAsync("profession", data.profession);
    } catch (e) {
      console.error("ERROR in saveUserInfo:", JSON.stringify(e));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        email,
        profession,
        loaded,
        login,
        logout,
        register,
        refetchInfo,
        validateJwt,
        forgottenPassword,
        changePassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
