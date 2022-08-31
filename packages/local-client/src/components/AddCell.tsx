import { useActions } from "../hooks/use-actions";
import "./css/AddCell.css";

interface AddCellProps {
    newCellId: string | null;
    forceVisible?: boolean
}

const AddCell: React.FC<AddCellProps> = ({newCellId, forceVisible}) =>{

    const { insertCellAfter } = useActions();
    return(
        <div className={`add-cell ${forceVisible ? 'force-visible' : '' }`} >
            <div className="add-buttons">
                <button className="button is-rounded is-primary is-small" onClick={() => insertCellAfter(newCellId, "code") }>
                    <span className="icon is-small">
                        <i className="fa fa-plus"></i>
                    </span>
                    <span>Code</span>
                </button>
                <button className="button is-rounded is-primary is-small" onClick={() => insertCellAfter(newCellId, "text") }>
                    <span className="icon is-small">
                        <i className="fa fa-plus"></i>
                    </span> 
                    <span>Text</span>
                </button>
            </div>
            <div className="divider"></div>
        </div>
    )
};
export default AddCell;