import { create } from 'zustand';

interface CoordinatesState {
    coordinates: {
        latitude: number;
        longitude: number;
    };
    setCoordinates: (newCoordinates: { latitude: number; longitude: number }) => void;
}


export const useCoordinatesStore = create<CoordinatesState>((set) => ({
    coordinates: { latitude: 0, longitude: 0 },
    setCoordinates: (newCoordinates) => set({ coordinates: newCoordinates }),
}));
