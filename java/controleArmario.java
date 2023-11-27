import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.ArrayList;

public class ControleArmario {
    // Método para enviar informações para o Arduino
    public void enviarInformacoesParaArduino(ArrayList<Armario> armarios) {
        // Falta implementar a biblioteca da porta Serial e enviar as mensagens.
        for (Armario armario : armarios) {
            //Serial.println("1P")
            if(armario.status.equals("Aguardando")) {
                System.out.println(armario.id_armario+"P"); // P = LED Piscando
                //Serial.println(armario.id_armario+"D")
            } else if (armario.status.equals("Ocupado")) {
                System.out.println(armario.id_armario+"D"); // D = LED Desligado
                //Serial.println(armario.id_armario+"D")
            }else{
                System.out.println(armario.id_armario+"L"); // L = LED Ligado
                //Serial.println(armario.id_armario+"D")
            }
            
        }
    }

    public ArrayList<Armario> buscaEstadoArmarios() throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .header("Accept", "application/json")
                .uri(URI.create("http://localhost:3000/interface/armarios"))
                .build();

        // A resposta do Node vem no formato "1,Aguardando;2,Ocupado;3,Livre"
        HttpResponse<String> response = client.send(request, BodyHandlers.ofString());  

        System.out.print("Resposta: ");
        System.out.println(response.body()); 

        // Separa a string por ";". Cada string nova formada possui informações de um armário
        // ex: ["1,Ocupado", "2,Livre"]
        String stringsArmarios[] = response.body().split(";");

        // Inicializa Arraylist (arraylist é mais fácil de lidar do que array comum [])
        ArrayList<Armario> armarios = new ArrayList<Armario>();

        for (String stringArmario : stringsArmarios) {
            // Separa agora a string do armário por ","
            // Cada string criada é um dado do armario
            // Ex: ["8", "Livre"]
            String dadosArmario[] = stringArmario.split(",");

            // Instancia a classe Armario, passando o primeiro e segundo valores no array (id e estado)
            Armario armario = new Armario(dadosArmario[0], dadosArmario[1]);
            // Adiciona o armario ao arraylist de armarios
            armarios.add(armario);

            // Mostra informações do armário na tela
            System.out.print("Armario ");
            System.out.print(armario.id_armario);            
            System.out.print(": ");
            System.out.println(armario.status);
        }

        return armarios;

    }
}