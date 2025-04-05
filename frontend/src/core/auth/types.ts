export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: "SUPERADMIN" | "ADMIN";
}

export interface AuthContextType {
  user: any;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  role: string | null;
}
