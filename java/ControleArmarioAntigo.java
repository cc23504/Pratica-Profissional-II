import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandler;
import java.net.http.HttpResponse.BodyHandlers;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ControleArmarioAntigo {

    // Método para verificar se a porta está livre
    public boolean verificarPortaLivre(int numeroPorta) {
        // Assume que você já tem uma conexão com o banco de dados
        try (Connection connection = DriverManager
                .getConnection("jdbc:sqlserver://regulus.cotuca.unicamp.br/?useSSL=false", "BD23507", "BD23507")) {
            String sql = "SELECT pedido_id FROM Armario WHERE numero_porta = ?";

            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setInt(1, numeroPorta);

                try (ResultSet resultSet = statement.executeQuery()) {
                    if (resultSet.next()) {
                        int pedidoId = resultSet.getInt("pedido_id");

                        // Se há um pedido associado à porta, ela está ocupada
                        return pedidoId == 0;
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Trate a exceção adequadamente na sua aplicação
        }

        // Retorna false se houver algum problema na verificação
        return false;
    }

    // Método para enviar informações para o Arduino
    public void enviarInformacoesParaArduino(boolean portaLivre) {
        if (portaLivre) {
            // Código para acender a luz verde no Arduino
            System.out.println("Luz verde acesa no Arduino");
        } else {
            // Código para acender a luz vermelha no Arduino
            System.out.println("Luz vermelha acesa no Arduino");
        }
    }

    public static void main(String[] args) throws IOException, InterruptedException {
        // Criar uma instância do ControleArmario
        ControleArmarioAntigo controleArmario = new ControleArmarioAntigo();

        // Número da porta que você deseja verificar
        int numeroPorta = 1;

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://pokeapi.co/api/v2/pokemon/ditto"))
                .build();

        HttpResponse response = client.send(request, BodyHandlers.ofString());
        System.out.println(response.statusCode());        
        System.out.println(response.body());

        // Verificar o status da porta no banco de dados
        // boolean portaLivre = controleArmario.verificarPortaLivre(numeroPorta);

        // Enviar informações para o Arduino com base no status da porta
        // controleArmario.enviarInformacoesParaArduino(portaLivre);
    }
}
