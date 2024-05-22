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
      "https://bdashboard-1c6c04306519.herokuapp.com/bd/project/list/"
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
      "https://bdashboard-1c6c04306519.herokuapp.com/bd/client/list/"
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
