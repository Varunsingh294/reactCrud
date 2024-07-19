import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { addItem, updateItem, deleteItem, setItem, clearItem } from './actions';

function App() {
  const data = useSelector((state) => state.data);
  const currentItem = useSelector((state) => state.currentItem);
  const dispatch = useDispatch();

  const [name, setName] = useState(currentItem ? currentItem.name : '');
  const [price, setPrice] = useState(currentItem ? currentItem.price : '');

  useEffect(() => {
    if (currentItem) {
      setName(currentItem.name);
      setPrice(currentItem.price);
    } else {
      setName('');
      setPrice('');
    }
  }, [currentItem]);

  const handleEdit = (id) => {
    const item = data.find((item) => item.id === id);
    dispatch(setItem(item));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (name === '' || price === '') {
      alert('Name and Price are required.');
      return;
    }
    const newItem = {
      id: data.length + 1,
      name,
      price,
    };
    dispatch(addItem(newItem));
    handleClear();
  };

  const handleUpdate = () => {
    const updatedItem = {
      id: currentItem.id,
      name,
      price,
    };
    dispatch(updateItem(updatedItem));
    handleClear();
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  const handleClear = () => {
    dispatch(clearItem());
    setName('');
    setPrice('');
  };

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '10px' }}>
        <div>
          <label>Name:
            <input type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} />
          </label>
        </div>
        <div>
          <label>Price:
            <input type="text" name="price" onChange={(e) => setPrice(e.target.value)} value={price} />
          </label>
        </div>
        <div>
          {currentItem ? (
            <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
          ) : (
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
          )}
          <button className="btn btn-danger" onClick={handleClear}>Clear</button>
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Price</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
