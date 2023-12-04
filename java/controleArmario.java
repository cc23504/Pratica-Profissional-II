import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

public class ControleArmario {
    Serial serial;

    public ControleArmario() throws IOException {
        String portaSerialArduino = "COM11";  //Selecionar a porta que o arduino esta conectado
        this.serial = new Serial(portaSerialArduino, this);
    }

    // Método para enviar informações para o Arduino
    public void enviarInformacoesParaArduino(ArrayList<Armario> armarios) throws IOException, InterruptedException {
        for (Armario armario : armarios) {
            //Serial.println("1P")
            if(armario.status.equals("Aguardando")) {
                serial.enviarMensagem(armario.id_armario+"P\n"); // P = LED Piscando
            } else if (armario.status.equals("Ocupado")) {
                serial.enviarMensagem(armario.id_armario+"D\n"); // D = LED Desligado
            }else{
                serial.enviarMensagem(armario.id_armario+"L\n"); // L = LED Ligado
            }
            Thread.sleep(2000);
        }
    }

    public ArrayList<Armario> buscaEstadoArmarios() throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:3000/interface/armarios"))
                .build();

        // a resposta vem no formato "1,Aguardando;2,Ocupado;3,Livre"
        HttpResponse<String> response = client.send(request, BodyHandlers.ofString());  

        System.out.print("Resposta: ");
        System.out.println(response.body()); 

        String stringsArmarios[] = response.body().split(";");

        
        ArrayList<Armario> armarios = new ArrayList<Armario>();

        for (String stringArmario : stringsArmarios) {
            String dadosArmario[] = stringArmario.split(",");

            Armario armario = new Armario(dadosArmario[0], dadosArmario[1]);
            armarios.add(armario);

            System.out.print("Armario ");
            System.out.print(armario.id_armario);            
            System.out.print(": ");
            System.out.println(armario.status);
        }

        return armarios;

    }

    public void atualizaStatusCarregamento(String mensagem) {
        HttpClient client = HttpClient.newHttpClient();
        
        StringBuilder formBodyBuilder = new StringBuilder();
        formBodyBuilder.append(URLEncoder.encode("msg", StandardCharsets.UTF_8));
        formBodyBuilder.append("=");
        formBodyBuilder.append(URLEncoder.encode(mensagem, StandardCharsets.UTF_8));

        HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("http://localhost:3000/interface/AtualizaStatusCarregamento"))
        .header("Content-Type", "application/x-www-form-urlencoded")
        .POST(HttpRequest.BodyPublishers.ofString(formBodyBuilder.toString()))
        .build();

         try {
            HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }  
    }
}