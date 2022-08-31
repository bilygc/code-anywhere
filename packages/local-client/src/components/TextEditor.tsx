import "./css/TextEditor.css";
import MDEditor from "@uiw/react-md-editor";
import {useState, useEffect, useRef} from "react";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface TextEditorProps{
    cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) =>{

    const [editing, setEditing] = useState<boolean>(false)
    const divRef = useRef<HTMLDivElement | null>(null)

    const{ updateCell } = useActions();

    useEffect(() =>{
        const listener = (event: MouseEvent) =>{
            if(divRef.current && event.target && divRef.current.contains(event.target as Node )  ){
                return;
            }

            setEditing(false);
        };

        document.addEventListener("click", listener, {capture:true});

        return () =>{
            document.removeEventListener("click", listener, {capture:true});
        }
    },[]);
    
    if(!editing){
        return(
            <div className="text-editor card" onClick={() => setEditing(true)} >
                <div className="card-content" >
                    <MDEditor.Markdown source={cell.content || "# Click to edit"}   />
                </div>
            </div>
        );
    }
    return(
        <div className="text-editor" ref={divRef}>
            <MDEditor value={cell.content} onChange={(value) => updateCell(cell.id, value || "")} />
        </div>
    )
};

export default TextEditor;