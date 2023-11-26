
// variáveis para controle de estado de pinos dos armarios
int numeroPinoSENSORArmarios[] = {7, 6, 5, 4}; //armazena o numero dos pinos dos SENSORES de carregamento dos armarios no arduino
int numeroPinoArmarios[] = {13, 12, 11, 10}; //armazena o numero dos pinos dos armarios no arduino
char estadoArmarios[] = {'D', 'D', 'D', 'D'}; //armazena o estado dos armários D=Desligado, P=Piscando e L=Ligado
int estadoPinoArmarios[] = {LOW, LOW, LOW, LOW}; //armazena o estado dos pinos dos armários (LOW=desligado) (HIGH=ligado)
int estadoPinoSENSORArmarios[] = {LOW, LOW, LOW, LOW}; //armazena o estado dos pinos dos SENSORES dos armários (LOW=desligado) (HIGH=ligado)

// Variáveis para o controle do piscar
unsigned long anteriorMillis = 0; //armazena 
const long intervaloPiscar = 1000; //intervalo em milissegundos

void setup()
{
  pinMode(numeroPinoArmarios[0], OUTPUT);
  pinMode(numeroPinoArmarios[1], OUTPUT);
  pinMode(numeroPinoArmarios[2], OUTPUT);
  pinMode(numeroPinoArmarios[3], OUTPUT); 
  
  pinMode(numeroPinoSENSORArmarios[0], INPUT);
  pinMode(numeroPinoSENSORArmarios[1], INPUT);
  pinMode(numeroPinoSENSORArmarios[2], INPUT);
  pinMode(numeroPinoSENSORArmarios[3], INPUT);
  
  Serial.begin(9600); //inicia a comunicação por serial
}

void atualizarPinoArmarios() { //atualiza valor do pino para todos os armários
  for (int i = 0; i < sizeof(estadoPinoArmarios) / 2; ++i) {
	  verificaAlteraEstado(i); //verifica e aplica o estado correto o armário
  }
}

void verificaAlteraEstado(int indiceArmario) {
  if (estadoArmarios[indiceArmario] == 'L') //se o estado do armário for LIGADO, liga o Pino
  {
    digitalWrite(numeroPinoArmarios[indiceArmario], HIGH);
    return;
  }

  if (estadoArmarios[indiceArmario] == 'D') //se o estado do armário for DESLIGADO, desliga o Pino
  {
    digitalWrite(numeroPinoArmarios[indiceArmario], LOW);
    return;
  }

  if (estadoArmarios[indiceArmario] == 'P') //se o estado do armário for PISCANTE, pisca o Pino
  {
    atualizaPiscante(indiceArmario);
    return;
  }
}

void atualizaPiscante(int indiceArmario) { //se o estado atual for HIGH, então troca para LOW e vice versa (fazendo piscar)
  if (estadoPinoArmarios[indiceArmario] == HIGH) { 
    estadoPinoArmarios[indiceArmario] = LOW;
    digitalWrite(numeroPinoArmarios[indiceArmario], LOW);
  } else {
    estadoPinoArmarios[indiceArmario] = HIGH;
    digitalWrite(numeroPinoArmarios[indiceArmario], HIGH);
  } 
}

void mostrarEstadoArmarios() { // apenas envia para o Serial o estado das variaveis
  for (int i = 0; i < sizeof(estadoPinoArmarios) / 2; ++i) {
    Serial.print(i);
    Serial.print("|pino ");
    Serial.print(numeroPinoArmarios[i]);
    Serial.print("|estado ");
    Serial.print(estadoArmarios[i]);
    Serial.print("|energia ");
    Serial.println(estadoPinoArmarios[i]);
  }  	
}

void lerSerialAtualizarEstadoArmarios() {
    // Lendo a entrada serial e salvar na variavel comando
    String comando = Serial.readStringUntil('\n');
    
    // enviar para o Serial que recebeu o comando
    Serial.print("Recebeu ");    
    Serial.println(comando);
    
    //o comando tem o primeiro char como numero do armario e o segundo como o novo estado. ex: 1P, 2L, 3D
    //reconhece o armario e salva o novo estado no estado do armario
    if (comando.startsWith("1")) {
      estadoArmarios[0] = comando.charAt(1);
    } else if (comando.startsWith("2")) {
      estadoArmarios[1] = comando.charAt(1);
    } else if (comando.startsWith("3")) {
      estadoArmarios[2] = comando.charAt(1);
    } else if (comando.startsWith("4")) {
      estadoArmarios[3] = comando.charAt(1);
    }
    
    mostrarEstadoArmarios(); // chama o metodo para mostrar estado dos armarios
}

void verificaSensoresCarregamento() {
  for (int i = 0; i < sizeof(estadoPinoArmarios) / 2; ++i) {
    int valorLido = digitalRead(numeroPinoSENSORArmarios[i]);
    if(estadoPinoSENSORArmarios[i] != valorLido) {
      Serial.print("C");
      Serial.print(i+1);
      Serial.println(valorLido);
      estadoPinoSENSORArmarios[i] = valorLido;
    }
  }
}

void loop()
{
  if (Serial.available() > 0) { //se houver mensagem não lida na Serial, le e atualiza estados
    lerSerialAtualizarEstadoArmarios();
  }

  unsigned long atualMillis = millis();
  if ((atualMillis - anteriorMillis) >= intervaloPiscar) {  //se passou n segundos, atualiza os pinos
    atualizarPinoArmarios();
    verificaSensoresCarregamento();
    anteriorMillis = atualMillis;
  }

}
