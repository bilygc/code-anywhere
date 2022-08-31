import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) =>{
    
    return useTypedSelector((state) => {
        const showFunc = `
        import _React from "react";
        import _ReactDOM from "react-dom";
        
        var show = (value) =>{

            const root = document.getElementById("root");

            if(typeof value === "object"){
                if (value.$$typeof && value.props ){
                    _ReactDOM.render(value, root);
                }else{
                 root.innerHTML = JSON.stringify(value);
                }
            }else{

                root.innerHTML = value;
            }
        }
        `;

        const showFuncNoOp = "var show = () => {}";

        let cumulativeCode = [];

        const orderedCells = state.cells?.order.map((id) => state.cells?.data[id])
        
        if(orderedCells){
            for(let c of orderedCells){
                if(c?.type === "code"){
                    if (c.id === cellId){
                        cumulativeCode.push(showFunc)
                    }
                    else{
                        cumulativeCode.push(showFuncNoOp);
                    }

                    cumulativeCode.push(c.content);
                }

                if(c?.id === cellId){
                    break;
                }
            }

        }
        
        return cumulativeCode.join("\n");
        
    });    
};