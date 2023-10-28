import { useState } from "react";
import { fetchData } from "../api/fetchSynonyms";

export const useGetSynonyms = () => {
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getSynonyms = (word) => {
        setIsLoading(true);
        return fetchData(word)
            .then(setResult)
            .then(() => setIsLoading(false));
    };
    return { isLoading, getSynonyms, result };
};
