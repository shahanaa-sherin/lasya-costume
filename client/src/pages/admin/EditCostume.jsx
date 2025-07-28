import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditCostume = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    size: '',
    price: '',
    available: 'Yes',
    image:''
  });

  useEffect(() => {
    const fetchCostume = async () => {
      const res = await axios.get(`http://localhost:5000/api/costumes/${id}`);
      setFormData(res.data);
    };
    fetchCostume();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/costumes/${id}`, formData);
    navigate('/admin/costumes');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Costume</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'category', 'size', 'price'].map((field) => (
          <input
            key={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full p-2 border rounded"
            required
          />
        ))}
        <select
          name="available"
          value={formData.available}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
      </form>
    </div>
  );
};

export default EditCostume;
