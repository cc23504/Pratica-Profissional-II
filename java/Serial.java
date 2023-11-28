import java.io.IOException;
import com.fazecast.jSerialComm.SerialPort;
import com.fazecast.jSerialComm.SerialPortDataListener;
import com.fazecast.jSerialComm.SerialPortEvent;

public class Serial {
	private SerialPort serialPort;

	public Serial(String porta) {

	//	comando para mostrar nome das portas
		for (SerialPort port : SerialPort.getCommPorts()) {
		System.out.println(port.getDescriptivePortName());
		}

		this.serialPort = SerialPort.getCommPort(porta);

		serialPort.setComPortParameters(9600, 8, 1, 0); // valores padrões Arduino
		serialPort.setComPortTimeouts(SerialPort.TIMEOUT_WRITE_BLOCKING, 0, 0); // block until bytes can be written

		if (serialPort.openPort()) {
			System.out.println("Porta Serial " + porta + " Conectada");
		} else {
			System.out.println("Falha ao abrir a porta serial " + porta);
			return;
		}

		// "Escutador" que fica esperando o arduino enviar mensagens para então fazer
		// ações
		serialPort.addDataListener(new SerialPortDataListener() {
			@Override
			public int getListeningEvents() {
				return SerialPort.LISTENING_EVENT_DATA_RECEIVED;
			}

			@Override
			public void serialEvent(SerialPortEvent event) {
				byte[] newData = event.getReceivedData();
				String response = new String(newData, 0, newData.length);
				System.out.print("Arduino: " + response);
			}
		});
	}

	public void enviarMensagem(String mensagem) throws IOException {
		serialPort.getOutputStream().write(mensagem.getBytes());
		serialPort.getOutputStream().flush();
		System.out.println("Mensagem enviada: " + mensagem);
	}

}