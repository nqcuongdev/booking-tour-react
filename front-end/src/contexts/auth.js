import { createContext } from "react";

const AuthContext = createContext({ user: {}, books: [] });

export default AuthContext;
