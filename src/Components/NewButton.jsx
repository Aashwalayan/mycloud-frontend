import "./NewButton.css";
import { Plus } from "lucide-react";

function NewButton(){
    return(
        <div>
            <button className="add-button">
                <Plus size= {24} /> New
            </button>
        </div>
    )
}

export default NewButton