import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function TabApp() {
    const [value, setValue] = useState('one');
    const handleTabChange = (event, value) => {
        setValue(value);
    };

    return (
    <div>
        <Tabs value={value} onChange={handleTabChange}>
            <Tab value="/home" label="Home" />
            <Tab value="/todolist" label="TodoList" />
        </Tabs>
        {value === '/home' && <div>Home page</div>}
        {value === '/todolist' && <div>Todolist</div>}
    </div>);
}
    
export default TabApp;