import axiosInstance from "./axios";


interface RecommendRequest {
  prompt: string;
  top_k: number;
  min_rating: number;
  enhance_prompt: boolean;
}

export const getRecommendations = async (data: RecommendRequest) => {
  try {
    const response = await axiosInstance.post('/recommend', data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log('Base URL:', axiosInstance);

    return response.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};

