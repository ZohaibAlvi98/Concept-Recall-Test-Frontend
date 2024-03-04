import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
import CoreHttpHandler from 'src/http/services/CoreHttpHandler';

// ----------------------------------------------------------------------

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null
};

const handlers = {
    INITIALIZE: (state, action) => {
        const { isAuthenticated, user } = action.payload;
        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user
        };
    },
    LOGIN: (state, action) => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user
        };
    },
    LOGOUT: (state) => ({
        ...state,
        isAuthenticated: false,
        user: null
    }),
    REGISTER: (state, action) => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
        };
    }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
    ...initialState,
    method: 'jwt',
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve()
});

AuthProvider.propTypes = {
    children: PropTypes.node
};

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const initialize = async () => {
            try {
                const token = window.localStorage.getItem('token');
                if (token && isValidToken(token)) {
                    setSession(token);
                    await CoreHttpHandler.request(
                        'user',
                        'fetch',
                        {},
                        (response) => {
                            const user = response.data;
                            setSession(token);
                            dispatch({
                                type: 'INITIALIZE',
                                payload: {
                                    isAuthenticated: true,
                                    user
                                }
                            });
                        },
                        (failure) => {
                            dispatch({
                                type: 'INITIALIZE',
                                payload: {
                                    isAuthenticated: false,
                                    user: null
                                }
                            });
                        }
                    );
                } else {
                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: false,
                            user: null
                        }
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: false,
                        user: null
                    }
                });
            }
        };

        initialize();
    }, []);

    const login = async (token, user) => {
        user.photoURL =
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngmart.com%2Fimage%2F330641&psig=AOvVaw0-iWHUWiyXM-WvyXbE-To_&ust=1691229213574000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKCDwoHewoADFQAAAAAdAAAAABAq';
        setSession(token);
        dispatch({
            type: 'LOGIN',
            payload: {
                user
            }
        });

        return true;
    };

    const register = async (email, password, firstName, lastName) => {
        const response = await axios.post('/api/account/register', {
            email,
            password,
            firstName,
            lastName
        });
        const { token, user } = response.data;

        window.localStorage.setItem('token', token);
        dispatch({
            type: 'REGISTER',
            payload: {
                user
            }
        });
    };

    const logout = async () => {
        setSession(null);
        dispatch({ type: 'LOGOUT' });
    };

    const resetPassword = () => {};

    const updateProfile = () => {};

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'jwt',
                login,
                logout,
                register,
                resetPassword,
                updateProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
