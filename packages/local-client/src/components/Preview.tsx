import "./css/Preview.css";
import { useRef, useEffect } from "react";

interface PreviewProps {
    code: string;
    err: string
}

const html = `
        <html>
            <head>
                <style>
                    html{
                        background:white;
                    }
                </style>
            </head>
            <body>
            <div id="root"></div>
                <script>
                    const handleError = (err) =>{

                        const root = document.getElementById("root");
                        root.innerHTML = '<div style="color: red; padding: 10px; background: pink; text-decoration: underline;"><h4>Runtime Error: </h4>'+err+'</div>';
    
                        console.error(err);
                    }

                    window.addEventListener("error", (event) =>{
                        event.preventDefault();
                        handleError(event.error);
                    });

                    window.addEventListener("message", (event) => {
                        try{
                            eval(event.data);
                        }catch(err){
                            handleError(err);
                        }
                    }, false);
                </script>
            </body>
        </html>`;


const Preview: React.FC<PreviewProps> = ({code, err}) =>{
    const iframe = useRef<any>();

    useEffect(() =>{
        iframe.current.srcdoc = html;
        
        setTimeout(() =>{
            iframe.current.contentWindow.postMessage(code, "*");
        }, 100);
        
    },[code]);


    return (
        <div className="preview-wrapper">
            <iframe title="preview" ref={iframe} sandbox="allow-scripts" srcDoc={html}/>
            {err && <div className="preview-error" ><h4>Runtime Error:</h4>{err}</div>}
        </div>        
    );
};
export default Preview;