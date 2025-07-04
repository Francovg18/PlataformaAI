import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCourse } from '../../redux/actions/course';

const CourseForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    language: 'Español',
    estimated_duration: '',
    xp_reward: 100
  });

  const { title, description, category, language, estimated_duration, xp_reward } = formData;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createCourse(formData));
    setFormData({ title: '', description: '', category: '', language: 'Español', estimated_duration: '', xp_reward: 100 });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded border max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Crear Curso</h2>
      
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="Título"
        className="w-full mb-3 border p-2 rounded"
        required
      />

      <textarea
        name="description"
        value={description}
        onChange={handleChange}
        placeholder="Descripción"
        className="w-full mb-3 border p-2 rounded"
        required
      />

      <input
        type="text"
        name="category"
        value={category}
        onChange={handleChange}
        placeholder="Categoría"
        className="w-full mb-3 border p-2 rounded"
      />

      <input
        type="text"
        name="language"
        value={language}
        onChange={handleChange}
        placeholder="Idioma"
        className="w-full mb-3 border p-2 rounded"
      />

      <input
        type="number"
        name="estimated_duration"
        value={estimated_duration}
        onChange={handleChange}
        placeholder="Duración (minutos)"
        className="w-full mb-3 border p-2 rounded"
      />

      <input
        type="number"
        name="xp_reward"
        value={xp_reward}
        onChange={handleChange}
        placeholder="XP otorgado"
        className="w-full mb-3 border p-2 rounded"
      />

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Guardar Curso
      </button>
    </form>
  );
};

export default CourseForm;
