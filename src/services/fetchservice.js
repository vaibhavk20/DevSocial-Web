import axios from "axios";

const appFetch = async (url, options = {}) => {
    try {
        const response = await axios(url, {
            ...options,
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log("Fetch error:", error);
    }
};

export default appFetch;
