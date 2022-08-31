import { Fragment } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";
import "./css/CellList.css";
import { useActions } from "../hooks/use-actions";
import { useEffect } from "react";

const CellList: React.FC = () =>{
    
    const { fetchCells } = useActions();
    
    useEffect(() =>{
        fetchCells();
    },[]);

    const cellsState = useTypedSelector(({ cells }) => cells  );

    const cells = cellsState?.order.map((id: string) => cellsState.data[id] );

    const renderedCells =  cells?.map((cell) => (
        <Fragment key={cell.id}>
            <CellListItem cell={cell} /> 
            <AddCell newCellId={cell.id}/>
        </Fragment>
        ) 
    )

    return <div className="cell-list">
        <AddCell forceVisible={cells?.length === 0}  newCellId={null}/>
        {renderedCells}
    </div>
}; export default CellList