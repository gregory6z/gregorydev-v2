import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import Cookies from "js-cookie";
import {
  JWT_TOKEN_NAME,
  REFRESH_BUFFER,
  getTokenExpiration,
} from "@/helpers/jwt";
import { refreshTokenFn } from "@/api/auth/mutations";

// ── Types ────────────────────────────────────────────────────────────────────

type AuthContextValue = {
  token: string | null;
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
};

// ── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ── Provider ─────────────────────────────────────────────────────────────────

// Note: useCallback and useMemo are intentionally kept here.
// Context providers need stable references to prevent all consumers from re-rendering.
// React Compiler optimizes components but doesn't handle context value stability automatically.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    () => Cookies.get(JWT_TOKEN_NAME) ?? null,
  );
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleRefresh = useCallback(
    (accessToken: string) => {
      clearTimer();

      const expirationTime = getTokenExpiration(accessToken);
      if (!expirationTime) return;

      const timeUntilRefresh = Math.max(
        0,
        expirationTime - Date.now() - REFRESH_BUFFER,
      );

      timerRef.current = window.setTimeout(async () => {
        try {
          const response = await refreshTokenFn();
          Cookies.set(JWT_TOKEN_NAME, response.access_token);
          setToken(response.access_token);
          scheduleRefresh(response.access_token);
        } catch {
          clearTimer();
          Cookies.remove(JWT_TOKEN_NAME);
          setToken(null);
        }
      }, timeUntilRefresh);
    },
    [clearTimer],
  );

  const login = useCallback(
    (accessToken: string) => {
      Cookies.set(JWT_TOKEN_NAME, accessToken);
      setToken(accessToken);
      scheduleRefresh(accessToken);
    },
    [scheduleRefresh],
  );

  const logout = useCallback(() => {
    clearTimer();
    Cookies.remove(JWT_TOKEN_NAME);
    setToken(null);
  }, [clearTimer]);

  // Schedule refresh once on mount if a token exists
  useEffect(() => {
    const storedToken = Cookies.get(JWT_TOKEN_NAME);
    if (storedToken) {
      scheduleRefresh(storedToken);
    }
    return clearTimer;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const value = useMemo<AuthContextValue>(
    () => ({ token, isAuthenticated: token !== null, login, logout }),
    [token, login, logout],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
};

// ── Hook ─────────────────────────────────────────────────────────────────────

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
