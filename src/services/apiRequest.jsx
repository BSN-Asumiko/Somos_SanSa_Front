/* import axios from 'axios';

export const apiRequest = async (endpoint, method = "GET", data = null, headers = {}) => {
    try {
        
        const response = await axios({
            url: endpoint,   
            method,          
            data,            
            headers,         
        });
        
        return response.data;
    } catch (error) {
        console.error("API request error:", error);

        if (error.response) {
            throw new Error(error.response.data.message || "Something went wrong");
        } else if (error.request) {
            throw new Error("No response received from server");
        } else {
            throw new Error(error.message);
        }
    }
}; */


import axios from 'axios';

export const apiRequest = async (endpoint, method = "GET", data = null, headers = {}) => {
    try {
        const response = await axios({
            url: endpoint,   
            method,          
            data,            
            headers,         
        });
        
        return response.data;
    } catch (error) {
        console.error("API request error:", error);

        if (error.response) {
            // Error response from the server
            const { status, data } = error.response;
            let errorMessage = data.message || "Something went wrong";
            
            // Handle different status codes
            if (status === 400) {
                errorMessage = "Bad Request: " + errorMessage;
            } else if (status === 401) {
                errorMessage = "Unauthorized: " + errorMessage;
            } else if (status === 403) {
                errorMessage = "Forbidden: " + errorMessage;
            } else if (status === 404) {
                errorMessage = "Not Found: " + errorMessage;
            } else if (status === 500) {
                errorMessage = "Internal Server Error: " + errorMessage;
            }
            
            throw new Error(errorMessage);
        } else if (error.request) {
            // No response received
            throw new Error("No response received from server");
        } else {
            // Other errors
            throw new Error(error.message);
        }
    }
};
