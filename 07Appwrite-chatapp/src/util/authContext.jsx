import {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { account } from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  });

  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();
    try {
      const response = await account.createEmailPasswordSession(
        credentials.email,
        credentials.password
      );

      const accountDetails = await account.get();

      setUser(accountDetails);

      navigate("/");
    } catch (error) {
      console, log(error);
    }
  };

  const handleUserRegister = async (e, credentials) => {
    e.preventDefault();

    if (credentials.password1 !== credentials.password2) {
      alert("password should be match");
      return;
    }
    try {
      const response = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password1,
        credentials.name
      );

      navigate("/login");
    } catch (error) {
      console, log(error);
    }
  };

  const handleUserLogout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
    handleUserRegister,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading.....</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
