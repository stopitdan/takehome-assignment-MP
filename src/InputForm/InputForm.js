import { useEffect, useCallback } from 'react';
import { TextField, Button } from '@mui/material';

const InputForm = ({ inputString, handleInputChange, handleClick}) => {
  // handle enter keypress only when input is selected
  const handleUserKeyPress = useCallback(event => {
    const { key, keyCode } = event;
    if(keyCode === 13 && document.activeElement === document.getElementById('input-string-textfield')){
      handleClick()
    }
  }, [inputString]);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);
  return (
    <div className="input-wrapper">
      <TextField
        style={{
          marginRight: '10px',
          width: '50%',
          maxWidth: '600px',
          minWidth: '50px'
        }}
        id="input-string-textfield"
        placeholder="Input any string..."
        variant="outlined"
        value={inputString}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Submit
      </Button>
    </div>
  )
}

export default InputForm;
