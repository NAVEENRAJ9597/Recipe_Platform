import React, { useState } from 'react';

function UploadForm({ refreshRecipes }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [categoryId, setCategoryId] = useState(1); // Default to first category
  const [ingredients, setIngredients] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = () => {
    const userId = 1; // In a real app, this would come from auth/session
    
    fetch('http://localhost:5000/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title, 
        description, 
        instructions, 
        user_id: userId, 
        category_id: categoryId,
        image_url: imageUrl,
        ingredients: ingredients.split('\n').filter(i => i.trim()) // Simple split by newline
      })
    }).then(() => {
      alert('Recipe uploaded!');
      setTitle('');
      setDescription('');
      setInstructions('');
      setIngredients('');
      setImageUrl('');
      refreshRecipes();
    }).catch(err => {
      console.error('Upload failed:', err);
      alert('Upload failed. Please try again.');
    });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5>Upload a Recipe</h5>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></textarea>
        <textarea
          className="form-control mb-2"
          placeholder="Ingredients (one per line)"
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
        ></textarea>
        <textarea
          className="form-control mb-2"
          placeholder="Instructions"
          value={instructions}
          onChange={e => setInstructions(e.target.value)}
        ></textarea>
        <select 
          className="form-control mb-2"
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
        >
          <option value="1">Breakfast</option>
          <option value="2">Lunch</option>
          <option value="3">Dinner</option>
          <option value="4">Snacks</option>
          <option value="5">Sweets</option>
        </select>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadForm;