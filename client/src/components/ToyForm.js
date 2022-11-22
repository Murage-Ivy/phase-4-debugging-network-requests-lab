import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  const [errors, setErrors] = useState([]);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newToy = {
      ...formData,
      likes: 0,
    };

    const response = await fetch("/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    });

    const data = await response.json();
    if (response.ok) {
      setFormData({
        name: "",
        image: "",
      });
      onAddToy(data);
      setErrors([]);
    } else {
      setErrors(data.errors);
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="add-toy-form">
        <h3> Create a toy! </h3>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          type="text"
          name="image"
          onChange={handleChange}
          value={formData.image}
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />

        {errors.length > 0 && (
          <ul style={{ color: "red" }}>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
