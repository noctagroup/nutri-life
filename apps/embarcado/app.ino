#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "S23 de Otavio";
const char* password = "tiricotico";
const char* mqtt_server = "167.99.232.38";
const char* mqtt_user = "nutrilife_passos";
const char* mqtt_password = "5!gg0TTxNOVt";

int passos = 0;

WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Conectando-se a ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("Conectado à rede WiFi");
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Conectando ao broker MQTT...");
    if (client.connect("ESP32Client", mqtt_user, mqtt_password)) {
      Serial.println("Conectado!");
    } else {
      Serial.print("falha, rc=");
      Serial.print(client.state());
      Serial.println(" tentando novamente em 5 segundos");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  if (passos === 100) {
    String message = "andou 10 passos";
    client.publish("steps/topic", message.c_str());
    passos = 0;
  } else {
    passos++;
  }

  delay(1000);
}

