import api from "../../utils/common.js";
import {
  familyFetchStart,
  familyFetchSuccess,
  familyFetchFailure,
  familySuccess,
  memberFetchSuccess,
} from "../slices/familyMemberSlice.js";

const token = localStorage.getItem("token");

// ✅ Create Family Member
export const createFamilyMember = (formData) => async (dispatch) => {
  try {
    dispatch(familyFetchStart());

    const res = await api.post("/family/create", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (res.data.success) {
      dispatch(familySuccess());
    }

    return res.data.message; // return created member
  } catch (error) {
    console.error("Create Family Member Error:", error);
    dispatch(familyFetchFailure(error));
    throw error
  }
};

// ✅ Get All Family Members
export const getFamilyMembers = () => async (dispatch) => {
  try {
    dispatch(familyFetchStart());

    const res = await api.get("/family", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (res.data.success) {
      dispatch(familyFetchSuccess(res.data.data));
    }

    return res.data.data;
  } catch (error) {
    console.error("Get Family Members Error:", error);
    dispatch(familyFetchFailure(error.message));
  }
};

export const getSingleFamilyMember = (id) => async (dispatch) => {
  try {
    dispatch(familyFetchStart());
    console.log(id);
    
    const res = await api.get(`/family/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (res.data.success) {
      dispatch(memberFetchSuccess(res.data.data));
    }

    return res.data.data;
  } catch (error) {
    console.error("Get Family Member Error:", error);
    dispatch(familyFetchFailure(error.message));
  }
};
