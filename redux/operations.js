import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../config";

export const signin = createAsyncThunk(
  "signin",
  async ({ email, password }, thunkAPI) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return credentials.user;
    } catch {
      (error) => {
        if (error.code == "auth/multi-factor-auth-required") {
          resolver = getMultiFactorResolver(auth, error);
          multiFactorHints = resolver.hints;
        }
      };
    }
  }
);
export const signup = createAsyncThunk(
  "signup",
  async ({ email, password }, thunkAPI) => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return credentials.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signout = createAsyncThunk("signout", async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateuser = createAsyncThunk(
  "updateuser",
  async ({ login, photoUri }, thunkAPI) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const data = await updateProfile(user, {
          displayName: login,
          photoURL: photoUri,
        });

        return data.user;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const createpost = createAsyncThunk(
  "createpost",
  async (
    { name, location, photo, locationName, likes, comments, owner, date },
    thunkAPI
  ) => {
    try {
      await addDoc(collection(db, "posts"), {
        name,
        location,
        photo,
        locationName,
        likes,
        comments,
        owner,
        date,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getposts = createAsyncThunk("getposts", async (_, thunkAPI) => {
  try {
    const snapshot = await getDocs(collection(db, "posts"));
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return posts;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addcomment = createAsyncThunk(
  "addcomment",
  async ({ docId, comment }, thunkAPI) => {
    try {
      const ref = doc(db, "posts", docId);

      await updateDoc(ref, {
        comments: [...comment],
      });
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
