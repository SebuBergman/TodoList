import './App.css';
import TodoList from './components/TodoList';
import Home from './Home';
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function App() {
    const [value, setValue] = useState('home');
    const handleTabChange = (event, value) => {
        setValue(value);
    };

    return (
    <div className="App">
        <Tabs value={value} onChange={handleTabChange}>
            <Tab value="home" label="Home" />
            <Tab value="todolist" label="TodoList" />
        </Tabs>
        {value === 'home' && <Home />}
        {value === 'todolist' && <TodoList />}
    </div>);
}