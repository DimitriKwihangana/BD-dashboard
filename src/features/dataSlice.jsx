import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    projects: [], //dataorg
    clients: [], //dataset
 
  },
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setClients: (state, action) => {
      state.clients = action.payload;
    },
  
  },
});

export const fetchProjects = () => async (dispatch) => {
  try {
    
    const response = await axios.get(
      "http://127.0.0.1:8000/bd/project/list/"
    );

    dispatch(setProjects(response.data));
    console.log(response)
    
  } catch (error) {
    console.log("Axios error:", error.message);
  }
};
export const fetchClients = () => async (dispatch) => {
  try {
    
    const response = await axios.get(
      "http://127.0.0.1:8000/bd/client/list/"
    );

    dispatch(setClients(response.data));

    console.log(response)
  } catch (error) {
    console.log("Axios error:", error.message);
  }
};



export const {
  setProjects,
setClients,

} = dataSlice.actions;

export default dataSlice.reducer;
