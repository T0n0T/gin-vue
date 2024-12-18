import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_DIR = path.join(__dirname, '../src/proto');
const OUTPUT_DIR = path.join(__dirname, '../src/proto');

// 获取所有 .proto 文件
const protoFiles = fs.readdirSync(PROTO_DIR).filter(file => file.endsWith('.proto'));

// 遍历每个 .proto 文件并生成同名的 .js 文件
protoFiles.forEach(protoFile => {
    const protoFilePath = path.join(PROTO_DIR, protoFile);
    const jsFileName = protoFile.replace('.proto', '.js');
    const jsFilePath = path.join(OUTPUT_DIR, jsFileName);
    const command = `pbjs -t static-module -w es6 -o ${jsFilePath} ${protoFilePath}`;
    console.log(`Running command: ${command}`);

    // 执行命令
    execSync(command, { stdio: 'inherit' });
});
