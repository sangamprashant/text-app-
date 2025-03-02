import CryptoJS from "crypto-js";
import React, { createContext, useContext, useLayoutEffect, useState } from "react";
import { ENV } from "../(keys)";
import _env from "../utilities/env";
import { apiRequest } from "../utilities/api/apiRequest";

const SECRET_KEY = ENV.secretKey;

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
    authLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Encrypt function
const encryptData = (data: any) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt function
const decryptData = async (ciphertext: string) => {
    try {
        const bytes = await CryptoJS.AES.decrypt(ciphertext, _env.SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        return null;
    }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [authLoading, setAuthLoading] = useState<boolean>(false);

    useLayoutEffect(() => {
        checkMe()
    }, []);

    const checkMe = async () => {
        setAuthLoading(true)
        const savedUser = sessionStorage.getItem("user");
        const savedToken = sessionStorage.getItem("token");

        if (savedUser && savedToken) {
            const decryptedUser: User = await decryptData(savedUser);
            const decryptedToken = await decryptData(savedToken);

            if (
                decryptedUser &&
                typeof decryptedUser === "object" &&
                decryptedUser.email && decryptedUser.name && decryptedUser.role && decryptedToken
            ) {
                try {
                    const { data }: { data: User } = await apiRequest("/auth/me", "GET", undefined, { Authorization: `Bearer ${decryptedToken}` });
                    if (decryptedUser.email === data.email && decryptedUser.role === data.role) {
                        setUser(decryptedUser);
                        setToken(decryptedToken);
                    }
                } catch (error) {
                    console.error(error);
                    alert("Wrong attempt try again!")
                    logout();
                } finally {
                    setAuthLoading(false)
                }
            } else {
                console.warn("Invalid or tampered authentication data. Logging out...");
                logout();
            }
        }
        setAuthLoading(false)
    }

    const login = (userData: User, authToken: string) => {
        const encryptedUser = encryptData(userData);
        const encryptedToken = encryptData(authToken);

        setUser(userData);
        setToken(authToken);

        sessionStorage.setItem("user", encryptedUser);
        sessionStorage.setItem("token", encryptedToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        window.history.replaceState(null, "", "/");
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, authLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
