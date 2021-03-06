import { TextField } from '@material-ui/core';

export default function InputComponent ({ label, name, ...rest }) {
    return (
        <div className="input-block">
            <span>{label || ''}</span>
            
            <textarea 
                label={label} 
                id={name} 
                { ...rest } 
            />
        </div>
    )
}