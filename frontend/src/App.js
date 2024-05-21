import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [newQuestion, setNewQuestion] = useState('');
    const [yesAnswer, setYesAnswer] = useState('');
    const [noAnswer, setNoAnswer] = useState('');

    useEffect(() => {
        fetchCurrentQuestion();
    }, []);

    const fetchCurrentQuestion = async () => {
        const response = await axios.get('/current');
        setCurrentQuestion(response.data.question);
    };

    const handleAnswer = async (answer) => {
        await axios.post('/answer', { answer });
        fetchCurrentQuestion();
    };

    const handleAddQuestion = async () => {
        await axios.post('/add_question', {
            question: newQuestion,
            yes_answer: yesAnswer,
            no_answer: noAnswer
        });
        setNewQuestion('');
        setYesAnswer('');
        setNoAnswer('');
        fetchCurrentQuestion();
    };

    return (
        <div className="App">
            <h1>Troubleshooter</h1>
            <p>{currentQuestion}</p>
            <button onClick={() => handleAnswer('yes')}>Yes</button>
            <button onClick={() => handleAnswer('no')}>No</button>
            <div>
                <h2>Add a new question</h2>
                <input
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="New question"
                />
                <input
                    type="text"
                    value={yesAnswer}
                    onChange={(e) => setYesAnswer(e.target.value)}
                    placeholder="Yes answer"
                />
                <input
                    type="text"
                    value={noAnswer}
                    onChange={(e) => setNoAnswer(e.target.value)}
                    placeholder="No answer"
                />
                <button onClick={handleAddQuestion}>Add Question</button>
            </div>
        </div>
    );
}

export default App;
