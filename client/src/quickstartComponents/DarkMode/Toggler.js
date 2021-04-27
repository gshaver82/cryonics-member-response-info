import React from 'react'
import { func, string } from 'prop-types';


const Toggle = ({theme,  toggleTheme }) => {
    const isDark = theme === 'dark';
    return (
        
        <div className="form-check form-switch mt-1 ml-2">
            <input 
                defaultChecked={isDark}
                className="form-check-input" 
                onClick={toggleTheme} 
                type="checkbox" 
                id="flexSwitch">
            </input>
            <label 
                className="form-check-label" 
                htmlFor="flexSwitch">
                    {theme === 'light' ? <i className='fas fa-sun'></i> : <i className='fas fa-moon'></i>}
            </label>
        </div>
    );
};

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default Toggle;