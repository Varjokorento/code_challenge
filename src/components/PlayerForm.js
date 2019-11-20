
import TextField from '@material-ui/core/TextField';
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';

export const PlayerForm = (props) => {

    const [name, setName] = useState("");
    const [score, setScore] = useState("");
    const [error, setError] = useState(false);
    
    const handleSubmit = () => {
      if (!error) {
        setName("");
        setScore("")
        props.addPlayer({name: name, score: score})
      }
    }

    return (
        <form noValidate autoComplete="off">
        <div>
          <h2>You think someone is missing? Add them!</h2>
          <TextField
            value={name}
            onChange = {event => setName(event.target.value)}
            id="standard-basic"
            label="Name"
            margin="normal"
          />
        </div>
        <div>
          <TextField
            onChange = {event => {
              if (!isNaN(event.target.value)) { 
                setError(false)
                setScore(event.target.value)
              } else {
                setError(true);
              }
            }
            }
            value={score}
            error={error}
            id="standard-basic"
            label="Score"
            helperText="Must be a number."
            margin="normal"
          />
        </div>
        <Button onClick={() => handleSubmit()}>Submit</Button>
        </form>
    )
}