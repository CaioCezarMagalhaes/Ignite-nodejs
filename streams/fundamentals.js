//netflix & spotify
//conceito de stream - a gnt consegue ouvir ou ver (executar) pequenas partes
//de alguma coisa mesmo antes de ler o arquivo completo

//importação de clientes via CSV(Excel)
//1gb- 1 000 000
//POST/upload import.csv

//10 mb/s

//100s - para acabar as insercoes no banco de dandos
//10mb/s --> 10.000

//streams -->
// process.stdin -- stream de leitura
// process.stdout -- stream de saida
//pipe encaminha pra uma saida

//process.stdin.pipe(process.stdout);

import { Readable } from "node:stream";
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
new oneToHundredStream().pipe(process.stdout);
