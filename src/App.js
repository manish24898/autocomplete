import React from 'react';
import AutoDropdown from './Component';
import { Provider } from 'react-redux';
import { store } from './Store';

function App() {
    return (
        <Provider store={store}>
            <AutoDropdown />
        </Provider>
    );
}

export default App;
