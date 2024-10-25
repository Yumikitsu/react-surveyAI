import { useState, useEffect } from "react";
import AnswersList from "./AnswersList";

function Survey() {
  const [answers, setAnswers] = useState([]);
  const [formState, setFormState] = useState({
    username: "",
    colour: "",
    timeSpent: [],
    review: ""
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/answers")
      .then((response) => response.json())
      .then((data) => setAnswers(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormState((prevState) => {
      const timeSpent = checked
        ? [...prevState.timeSpent, name]
        : prevState.timeSpent.filter((item) => item !== name);
      return { ...prevState, timeSpent };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);

    if (editIndex !== null) {
      const updatedAnswers = answers.map((answer, index) =>
        index === editIndex ? formState : answer
      );
      setAnswers(updatedAnswers);
      fetch(`http://localhost:3000/answers/${answers[editIndex].id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      });
    } else {
      fetch("http://localhost:3000/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      })
        .then((response) => response.json())
        .then((newAnswer) => setAnswers((prevAnswers) => [...prevAnswers, newAnswer]));
    }

    setFormState({
      username: "",
      colour: "",
      timeSpent: [],
      review: ""
    });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setFormState(answers[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const answerId = answers[index].id;
    const updatedAnswers = answers.filter((_, i) => i !== index);
    setAnswers(updatedAnswers);
    fetch(`http://localhost:3000/answers/${answerId}`, {
      method: "DELETE"
    });
  };

  return (
    <main className="survey">
      <section className="survey__list">
        <h2>Answers list</h2>
        <AnswersList
          answersList={answers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
      <section className="survey__form">
        <form onSubmit={handleSubmit} className="form">
          <h2>Survey Form</h2>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formState.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Colour:
            <input
              type="text"
              name="colour"
              value={formState.colour}
              onChange={handleChange}
            />
          </label>
          <fieldset>
            <legend>How do you like to spend time with your rubber duck?</legend>
            <label>
              <input
                type="checkbox"
                name="swimming"
                checked={formState.timeSpent.includes("swimming")}
                onChange={handleCheckboxChange}
              />
              Swimming
            </label>
            <label>
              <input
                type="checkbox"
                name="bathing"
                checked={formState.timeSpent.includes("bathing")}
                onChange={handleCheckboxChange}
              />
              Bathing
            </label>
            <label>
              <input
                type="checkbox"
                name="chatting"
                checked={formState.timeSpent.includes("chatting")}
                onChange={handleCheckboxChange}
              />
              Chatting
            </label>
            <label>
              <input
                type="checkbox"
                name="noTime"
                checked={formState.timeSpent.includes("noTime")}
                onChange={handleCheckboxChange}
              />
              I don't like to spend time with it
            </label>
          </fieldset>
          <label>
            Review:
            <textarea
              name="review"
              value={formState.review}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="form__submit">Submit</button>
        </form>
      </section>
    </main>
  );
}

export default Survey;
