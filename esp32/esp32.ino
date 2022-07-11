#include <WiFi.h> //Lib WiFi
#include <HTTPClient.h>
#include <ArduinoJson.h> //Lib para a manipulação de Json
#include <Adafruit_AHT10.h>



#define timerDelay 300000 //Intervalo entre cada leitura do sensor

//SSID e senha da rede WiFi onde o esp32 irá se conectar 
#define SSID "SSID"
#define PASSWORD "SENHA"

//Objeto que realiza a leitura da humidade e temperatura
Adafruit_AHT10 aht;

const char* server = "https://link-servidor.com.br/caminho-de-post";


//Variáveis que vão guardar o valor da temperatura e humidade
char t[8];
char h[8];
char sensorData[128];

//Marca quando foi feita a última leitura
uint32_t lastTimeRead = 0;




void setup()
{
  Serial.begin(115200);
  
  //Inicializa a conexão com a rede WiFi
  setupWiFi();

 
}


//Conexão com a rede WiFi
void setupWiFi()
{

   if (! aht.begin()) {
    //Serial.println("Could not find AHT10? Check wiring");
    while (1) delay(10);
  }

  
  WiFi.disconnect();
  WiFi.mode(WIFI_STA);

  //Tenta conectar à rede que possui este SSID e senha
  WiFi.begin(SSID, PASSWORD);
  Serial.println("");

  //Enquanto não estiver conectado à rede WiFi
  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }

  //Se chegou aqui está conectado
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(SSID);

  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}



void loop()
{
  //Tempo em millissegundos desde o boot do esp
  unsigned long now = millis();

  //Se passou o intervalo desde a última leitura
  if(now - lastTimeRead > timerDelay)
  {
    //Faz a leitura do sensor
    readSensor();

    //Envia para o Banco de Dados
    if (WiFi.status() == WL_CONNECTED) {
      
           
            HTTPClient client;
            client.begin(server);
            client.addHeader("Content-Type", "application/json");

            //Definindo tamanho do objeto json 
            const size_t capacity = JSON_OBJECT_SIZE(2) + 40;
            StaticJsonDocument<capacity> doc;
            //Criando objeto json
            JsonObject object = doc.to<JsonObject>();
            //Adicionando dados ao objeto 
            object["temperature"] = t; //Inserimos o atributo de temperatura
            object["humidity"] = h; //Inserimos o atributo de humidade
           
            //Formatando dados para json
            serializeJson(doc,sensorData);

            Serial.println(sensorData);
            
            //Realizando requisição post no servidor
            int responseCode = client.POST(String(sensorData));

            client.end();
            //Limpamos os buffers dos jsons
            doc.clear();
      

            
     }

    //Marca quando ocorreu a última leitura
    lastTimeRead = now;
  }
}


//Realiza a leitura da temperatura e humidade
void readSensor()
{
  sensors_event_t humidity, temp;
  aht.getEvent(&humidity, &temp);
  //Formatando para string os dados
  dtostrf(temp.temperature,5,2,t);
  dtostrf(humidity.relative_humidity,5,2,h);
  
  }
