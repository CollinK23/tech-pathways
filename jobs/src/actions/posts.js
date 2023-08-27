import * as api from "../api";

export const getApps = () => async (dispatch) => {
  try {
    const { data } = await api.fetchApps();
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
