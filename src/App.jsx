import { useState } from "react";
import "./App.css";
import { useGetSynonyms } from "./hooks/useGetSynonyms";

function App() {
    const [word, setWord] = useState("");
    const { isLoading, result, getSynonyms } = useGetSynonyms();

    const findWord = () => {
        getSynonyms(word);
        setWord(word);
    };

    const handleSynonymClicked = (newWord) => {
        getSynonyms(newWord);
        setWord(newWord);
    };

    return (
        <>
            <div className="container">
                <form
                    className="search_box"
                    onSubmit={(e) => {
                        e.preventDefault();
                        findWord();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Find me word..."
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                    />
                    <input type="submit" value="Find" />
                </form>
                <div className="tag">
                    <p>Synonym for the word {word.toUpperCase()}</p>
                </div>
            </div>
            {!isLoading ? (
                <div className="output_card">
                    {result.map((res, key) => (
                        <li key={key}>
                            <h3>
                                synonym:{" "}
                                <span
                                    onClick={() =>
                                        handleSynonymClicked(res.word)
                                    }
                                >
                                    {res.word}
                                </span>
                            </h3>
                            <h4>score: {res.score}</h4>
                            {res.tags.map((tag, key) => (
                                <div key={key} className="min">
                                    {tag}
                                </div>
                            ))}
                        </li>
                    ))}
                </div>
            ) : (
                <div>
                    <p>Waiting for Search . . . </p>
                </div>
            )}
        </>
    );
}

export default App;
