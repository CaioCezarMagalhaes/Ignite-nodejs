//netflix & spotify
//conceito de stream - a gnt consegue ouvir ou ver (executar) pequenas partes
//de alguma coisa mesmo antes de ler o arquivo completo

//importação de clientes via CSV(Excel)
//1gb- 1 000 000
//POST/upload import.csv

//10 mb/s

//100s - para acabar as insercoes no banco de dandos
//10mb/s --> 10.000

//streams -->  um modo de a gnt trabalhar com os dados antes deles estarem completos
// process.stdin -- stream de leitura
// process.stdout -- stream de saida
//pipe encaminha pra uma saida

//process.stdin.pipe(process.stdout);

import { Readable, Transform, Writable } from "node:stream";
class oneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;
    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}

//chunk -- pedaço que a gnt leu da stream de leitura  tudo q e enviado na stream de leitura pelo this.push

//encoding -- como que essa informação esta codificada
//callback -- função que a stream de escrita  precisa chamar quando ela termina de  usar a informaçao
// dentro de uma stream de escrita a gnt nunca retorna nada , ela somente processa dado .. nunca transforma o dado
class MultplyByStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

new oneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultplyByStream());
