import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

function CreateArea(props) {

    const [inputNote, setInputNote] = useState({ title: "", content: "" })
    const [isExpanded, setIsExpanded] = useState(false);

    function onInputChange(event) {
        const { name, value } = event.target
        setInputNote(prevValue => {
            return { ...prevValue, [name]: value }
        })

    }

    function onClick(){
        setIsExpanded(true)
    }

    return (
        <div>
            <form className="create-note">
                {isExpanded && <input name="title" onChange={onInputChange} placeholder="Title" value={inputNote.title} />}
                <textarea name="content" onClick={onClick} onChange={onInputChange} placeholder="Take a note..." rows={isExpanded?3:1} value={inputNote.content} />
                <Zoom in={isExpanded}>
                    <Fab onClick={(event) => {
                        props.addNote(inputNote)
                        setInputNote({ title: "", content: "" })
                        event.preventDefault();

                    }}><AddIcon /></Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;
