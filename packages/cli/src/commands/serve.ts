import path from "path";
import { Command } from "commander";
import { serve } from "@reactanywhere/local-api";

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
.command("serve [filename]")
.option("-p, --port <number>", "port to run server on", "4005")
.description("Open a file for editing")
.action( async (filename =  "notebook.js", options: {port: string}) =>{
    try{
        const dir = path.join(process.cwd(), path.dirname(filename))
        await serve(path.basename(filename), parseInt(options.port), dir, !isProduction);

        console.log(`
        Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file`);
    }catch(err: any){
        if(err.code === "EADDRINUSE"){
            console.log("Port is in use. Try running on different port");
        }else {            
            console.error(`there was an error: ${err.message}`);
        }

        process.exit(1);
    }
});