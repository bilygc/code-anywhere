import * as esbuild from 'esbuild-wasm';
 
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {

      //handle root file index.js
      build.onResolve({filter: /(^index\.js$)/}, () => {
        return {path: "index.js", namespace: "a"}
      });

      //handle relative paths in amodule
      build.onResolve({filter: /^\.+\//}, (args: any) =>{
        
      let path = new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href;
  
        return {
          path: path,
          namespace:"a"
        }

      });


      //handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {

        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: "a"
        }

      }); 
      
    },
  };
};