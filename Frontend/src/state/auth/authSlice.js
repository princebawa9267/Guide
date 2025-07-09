// Firebase Setup
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { auth, db } from "../../register";

import { toast } from "react-toastify";

export const createAccountWithEmailAndPassword = createAsyncThunk("auth/createAccountWithEmailAndPassword",
    async ({ values, navigate }, { rejectWithValue }) => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = auth.currentUser;

            // send verification link
            await sendEmailVerification(user);
            alert("📩 Verification email sent! Please check your inbox.");

            // Update user details on Firestore
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: values.fName,
                    lastName: values.lName,
                })
                toast.success("Verification link sent successfully");

                // React-router navigate function
                navigate("/user-verification")
            }
            console.log("Hello ", user);
            return {
                uid: user.uid,
                email: user.email,
                displayName: `${values.fName} ${values.lName}`,
                emailVerified: user.emailVerified,
                photoURL: user.photoURL
            };
        }
        catch (error) {
            console.log("Error ", error.message);
            toast.error(error.message)
            return rejectWithValue(error.message);
        }
    }
);


export const loginUserWithEmailAndPassword = createAsyncThunk("/auth/loginUserWithEmailAndPassword",
    async ({ values, navigate }, { rejectWithValue }) => {
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "Users", String(user.uid));
                const docSnap = await getDoc(docRef);
                console.log(docSnap.data());
                navigate("/");
                console.log("User logged in successfully");
                toast.success("User logged in successfully");
                return {
                    uid: user.uid,
                    email: user.email,
                    displayName: `${docSnap.data().firstName} ${docSnap.data().lastName}`,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL
                }
            }
        }
        catch (error) {
            toast.error(error.message)
            return rejectWithValue(error.message);
        }
    }
)

// Signin With Google Method 
export const signInWithGoogle = createAsyncThunk("/auth/signInWithGoogle",
    async ({ navigate }, { rejectWithValue }) => {
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
            const user = auth.currentUser;
            navigate("/")
            if (user) {
                return {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL
                }
            }
        }
        catch (error) {
            toast.error(error.message);
            return rejectWithValue(error.message);
        }
    }
)

export const logoutUser = createAsyncThunk("/auth/logoutUser",
    async ({ dispatch }, { rejectWithValue }) => {
        try {
            await signOut(auth);
            dispatch(setUser(null));
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const authenticate = createAsyncThunk("/auth/authenticate",
    async ({navigate,dispatch}, { rejectWithValue }) => {
        try {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    if (!user.emailVerified) {
                        console.log("User email id is not verified yet");
                    }
                    else {
                        const providerId = user.providerData[0]?.providerId;
                        if (providerId === "google.com") {
                            console.log("User Details with google", user);
                            dispatch(setUser({
                                uid: user?.uid,
                                email: user?.email,
                                displayName: user?.displayName,
                                emailVerified: user?.emailVerified,
                                photoURL: user?.photoURL
                            }))
                        }
                        else if (providerId === "password") {
                            console.log("User Details ", user);
                            const docRef = doc(db, "Users", String(user.uid));
                            const docSnap = await getDoc(docRef);
                            dispatch(setUser({
                                uid: user.uid,
                                email: user.email,
                                displayName: `${docSnap.data().firstName} ${docSnap.data().lastName}`,
                                emailVerified: user.emailVerified,
                                photoURL: user.photoURL
                            }))
                        }
                    }
                }
            })
        }
        catch (error) {

        }
    }
)

const initialState = {
    isLoggedIn: false,
    user: null,
    loading: false,
    error: null,
    notLoadedDataYet : true, // This will be set to false once the user data is loaded
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = !!action.payload;
            state.error = null;
            state.loading = false;
            console.log("User set successfully")
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAccountWithEmailAndPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAccountWithEmailAndPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(createAccountWithEmailAndPassword.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isLoggedIn = false;
                state.error = action.payload
            })
            .addCase(loginUserWithEmailAndPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUserWithEmailAndPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
                console.log("User Logged in ", action.payload);
            })
            .addCase(loginUserWithEmailAndPassword.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isLoggedIn = false;
                state.error = action.payload;
            })
            .addCase(signInWithGoogle.pending, (state) => {

            })
            .addCase(signInWithGoogle.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                console.log("User detail ", action.payload);
            })
            .addCase(signInWithGoogle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
        .addCase(authenticate.pending,(state) => {
            state.loading = true;
            state.error = null;
            state.isLoggedIn = false;
            state.user = null;
            console.log("Authenticating user...");
        })
        .addCase(authenticate.fulfilled, (state,action) => {
            state.isLoggedIn = true;
            state.error = null;
            state.loading = false;
            state.user = action.payload;

            state.notLoadedDataYet = false; // Set to false once the user data is loaded
            console.log(action.payload);
        })
        .addCase(authenticate.rejected, (state,action) => {
            state.isLoggedIn = false;
            state.error = action.payload;
            state.loading = false;
            state.dataLoaded = false;
            state.user = null;
        })
    }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;