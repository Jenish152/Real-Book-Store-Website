import { React, createContext, useEffect, useState, useContext } from "react";
import shared from "../utils/shared";
import { RoutePaths } from "../utils/enum";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
const initialUserValue = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    roleId: 0,
    role: "",
    password: "",
};

const initialState = {
    setUser: () => { },
    user: initialUserValue,
    signOut: () => { },
};

export const authContext = createContext(initialState);

export const AuthWrapper = ({ children }) => {
    const [user, _setUser] = useState(initialUserValue);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const setUser = (user) => {
        localStorage.setItem(shared.localStorageKeys.USER, JSON.stringify(user));
        _setUser(user);
        // window.location.reload();
        navigate(RoutePaths.home);
    };

    const signOut = () => {
        localStorage.removeItem(shared.localStorageKeys.USER);
        _setUser(initialUserValue);
        navigate(RoutePaths.login);
    };

    useEffect(() => {
        const cache = (JSON.parse(localStorage.getItem(shared.localStorageKeys.USER))) || initialUserValue;
        console.log(cache);
        if (cache.id) {
            _setUser(cache);
            // console.log(user);
             navigate(RoutePaths.home);
        } else {
            navigate(RoutePaths.login);
        }
    },[]);
    useEffect(() => {
        if (pathname === RoutePaths.login && user.id) {
            navigate(RoutePaths.home);
        }
        if (!user.id) {
            return;
        }
        const access = shared.hasAccess({ pathname, user });
        if (!access) {
            toast.warning("Sorry, you are not authorized to access this page");
            navigate(RoutePaths.home);
            return;
        }
    }, [pathname, user]);

    const value = {
        user,
        setUser,
        signOut,
    };
    return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuthContext = () => {
    return useContext(authContext);
};