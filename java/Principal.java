import java.io.IOException;
import java.util.ArrayList;

public class Principal {
  public static void main(String[] args) throws IOException, InterruptedException {
    // instancia Classe ControleArmario
    ControleArmario controleArmario = new ControleArmario();

    while (true) {
      System.out.println("===============================BUSCA DADOS===============================");
      // Busca lista de armarios com seus estados no Node
      ArrayList<Armario> armarios = controleArmario.buscaEstadoArmarios();

      System.out.println("===============================ENVIA PARA ARDUINO===============================");
      // Enviar informações para o Arduino com base no status da porta
      controleArmario.enviarInformacoesParaArduino(armarios);

     // FALTA IMPLEMENTAR A LEITURA DE INFORMAÇÕES DO CARREGAMENTO QUE VIRÃO DA SERIAL 

      // Aguarda 2 segundos
      Thread.sleep(2000);

      // Limpa terminal
      System.out.print("\033\143");
    }
  }
}
