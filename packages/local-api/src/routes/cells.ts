import express from "express";
import fs from "fs/promises"; //standard library provided by node used to handle files
import path from "path"; //standard library provided by node used for resolve dir paths

interface Cell {
    id: string;
    content: string;
    type: "code" | "text"
}

export const createCellsRouter = (filename: string, dir: string) =>{

    const fullPath = path.join(dir, filename);

    const router = express.Router();

    router.use(express.json());

    router.get("/cells", async (req, res) =>{
        try {
            const result = await fs.readFile(fullPath, { encoding: "utf-8" } );
            res.send(JSON.parse(result));
        }catch(err: any){
            if(err.code === "ENOENT"){
                await fs.writeFile(fullPath, "[]", "utf-8");
                res.send([]);
            }else{
                throw err;
            }
        }

    });

    router.post("/cells", async (req, res) =>{
        const { cells }: { cells: Cell[] } = req.body;

        await fs.writeFile(fullPath,JSON.stringify(cells),"utf-8");

        res.send({status: "OK"});

    });

    return router;
};