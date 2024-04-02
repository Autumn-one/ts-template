import {defineConfig} from "rollup";
import json from "@rollup/plugin-json";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import {glob} from "glob";
import fs from "node:fs";
import dts from "rollup-plugin-dts";
import ts from "rollup-plugin-ts";
import terser from '@rollup/plugin-terser';
// 运行之前删除map文件
glob.glob("**/*.js.map", {
    ignore: ["node_modules/**/*"]
}, (err, files) =>
{
    files.forEach(file =>
    {
        fs.rmSync(file);
    });
});


const plugins = [json(), nodeResolve(), ts(), {
    writeBundle()
    {
        console.log('Build finished, execute your code...')
        // 创建package.json
        const cjs_package_json = "dist/cjs/package.json";
        if (!fs.existsSync(cjs_package_json))
        {
            fs.writeFileSync(cjs_package_json, `{
    "type": "commonjs",
    "types": "../index.d.ts"
}`)
        }
        const es_package_json = "dist/es/package.json";
        if (!fs.existsSync(es_package_json))
        {
            fs.writeFileSync(es_package_json, `{
    "type": "module",
    "types": "../index.d.ts"
}`)
        }
    }
}];


if (process.env.build === "dev")
{

} else if (process.env.build === "build")
{
    plugins.push(terser({
        compress: {
            unsafe: true
        },
        format: {
            comments: false
        }
    }));
}

export default defineConfig([
    {
        input: "./src/index.ts",
        output: [
            {
                file: "dist/es/index.js",
                format: "es",
            },
            {
                file: "dist/cjs/index.js",
                format: "cjs",
            },
            {
                file: "dist/browser/index.js",
                format: "iife",
                name: "test", // 浏览器中的全局名称
                sourcemap: process.env.build === "dev",
            }
        ],
        plugins
    },
    {
        input: "./src/index.ts",
        output: [{file: "dist/index.d.ts", format: "es"}],
        plugins: [dts()],
    },

]);
