import axiosInstance from "./axios";


export const searchByGenre = async (genre: string) => {
  try {
    const response = await axiosInstance.get(`/genre/${genre}`);
    console.log('Base URL:', axiosInstance);

    return response.data;
  } catch (error) {
    console.error('Error fetching genre:', error);
    throw error;
  }
};

export const searchByActor = async (actor: string) => {
  try {
    const response = await axiosInstance.get(`/actor/${actor}`);
    console.log('Base URL:', axiosInstance);

    return response.data;
  } catch (error) {
    console.error('Error fetching actor:', error);
    throw error;
  }
};


