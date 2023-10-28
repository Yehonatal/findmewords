import { useState } from "react";
import "./App.css";

const BASE_URL = "https://api.datamuse.com" ?? import.meta.env.VITE_API_URL;

function App() {
    const [word, setWord] = useState("");
    const [result, setResult] = useState([]);

    const findWord = async () => {
        try {
            const response = await fetch(`${BASE_URL}/words?ml=${word}&max=10`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            return null;
        }
        setWord("");
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
            {result.length ? (
                <div className="output_card">
                    {result.map((res, key) => (
                        <li key={key}>
                            <h3>
                                synonym: <span>{res.word}</span>
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
