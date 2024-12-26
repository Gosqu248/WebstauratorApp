import config from "@/src/config";

export const fetchSuggestions = async (partialName) => {
    try {
        const response = await fetch(`${config.backendUrl}/suggestions/get?partialName=${encodeURIComponent(partialName)}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        throw error;
    }
};

export const fetchCoordinates = async (location) => {
    try {
        const response = await fetch(`${config.backendUrl}/suggestions/getCoordinates?address=${encodeURIComponent(location)}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
};
