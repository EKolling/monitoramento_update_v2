import Copiador from "./ComparaeCopia.js";
import Encerrador from "./EncerraeInstala.js";
import Monitor from "./monitoramento.js";
import Reiniciador from "./reiniciar.js";

const monitor = new Monitor();
const copiador = new Copiador();
const encerrador = new Encerrador();
const reiniciador = new Reiniciador();

async function main() {
  await monitor.start_monitorar();

  setInterval(async () => {
    if (await copiador.copiar()) {
      await monitor.stop_monitorar();
      if (await encerrador.encerrar()) {
        await monitor.start_monitorar();
      }
    }
  }, 60 * 1000);

  setInterval(() => {
    reiniciador.reiniciar();
    //}, 7 * 24 * 60 * 60 * 1000);
  }, 5 * 60 * 1000);

  console.log("Script principal iniciado.");
}

main();
