import * as api from "../api";

export const getApps = (userId) => async (dispatch) => {
  try {
    const { data } = await api.fetchApps(userId);
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createApp = (post) => async (dispatch) => {
  try {
    const { data } = await api.createApp(post);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.getUser(user);
    console.log(data);
    dispatch({ type: "AUTH", payload: data });
  } catch (error) {
    console.log(error);
  }
};
