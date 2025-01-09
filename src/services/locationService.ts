import api from "@/src/api";

export const fetchSuggestions = async (partialName) => {
    try {
        const response = await fetch(`${api.backendUrl}/suggestions/get?partialName=${encodeURIComponent(partialName)}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        throw error;
    }
};

export const fetchCoordinates = async (location) => {
    try {
        const response = await fetch(`${api.backendUrl}/suggestions/getCoordinates?address=${encodeURIComponent(location)}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
};
