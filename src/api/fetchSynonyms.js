const BASE_URL = "https://api.datamuse.com" ?? import.meta.env.VITE_API_URL;

export const fetchData = async (word) => {
    try {
        const response = await fetch(`${BASE_URL}/words?ml=${word}&max=10`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data;
    } catch (err) {
        return null;
    }
};
