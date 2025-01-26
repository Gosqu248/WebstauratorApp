import { create } from 'zustand';

type SelectedOptionState = {
    selectedOption: string; // Stores "Jak najszybciej" or the selected time (e.g., "15:00")
    setSelectedOption: (option: string) => void; // Updates the selected option
};

export const useSelectedOptionStore = create<SelectedOptionState>((set) => ({
    selectedOption: '', // Default is empty
    setSelectedOption: (option) => set({ selectedOption: option }),
}));
