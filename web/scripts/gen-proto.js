import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_DIR = path.join(__dirname, '../src/proto');
const OUTPUT_DIR = path.join(__dirname, '../src/proto');

const command = `pbjs -t static-module -w commonjs -o ${OUTPUT_DIR}/wireless.js ${PROTO_DIR}/wireless.proto && \
                pbts -o ${OUTPUT_DIR}/wireless.d.ts ${OUTPUT_DIR}/wireless.js`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行出错: ${error}`);
    return;
  }
  console.log('Proto 文件生成成功！');
});