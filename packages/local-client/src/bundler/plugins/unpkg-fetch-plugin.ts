import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const repoCache = localForage.createInstance({
    name:"repoCache"
});

export const unpkgFetchPlugin = (inputCode: string) =>{
    return{
        name: "unpkg-fetch-plugin",
        setup(build: esbuild.PluginBuild){

            build.onLoad({filter:/(^index\.js$)/}, () =>{
                return {
                    loader: 'jsx',
                    contents: inputCode,
                };                
            });

            build.onLoad({filter: /.*/}, async (args: any) =>{
                //search for file cached
                const cachedFile = await repoCache.getItem<esbuild.OnLoadResult>(args.path);
        
                
                if(cachedFile){
                    
                    return cachedFile;
                }
                
            });

            build.onLoad({filter: /.css$/}, async (args: any) =>{
        
                const { data,request } = await axios.get(args.path);

                const escaped = data
                .replace(/\n/g, "")
                .replace(/"/g, '\\"')
                .replace(/'/g, "\\'");
                
                const contents = `
                const style = document.createElement('style');
                style.innerText = '${escaped}';
                document.head.appendchild(style);`;
        
                const result: esbuild.OnLoadResult ={
                loader:"jsx",
                contents,//whenever the attribute have the same name as value we don put colon
                resolveDir: new URL("./", request.responseURL).pathname
                }
                
                await repoCache.setItem(args.path, result);
                return result;
            });
            
            build.onLoad({ filter: /.*/ }, async (args: any) => {
        
                const { data,request } = await axios.get(args.path);
        
                const result: esbuild.OnLoadResult ={
                loader:"jsx",
                contents: data,//whenever the attribute have the same name as value we don put colon
                resolveDir: new URL("./", request.responseURL).pathname
                }
                
                await repoCache.setItem(args.path, result);
                return result;
        
            });
        }
    }
};