#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// Configurações de Wi-Fi
const char* ssid = "S23 de Otavio";
const char* password = "tiricotico";
uint contPassos = 0;

// Endpoint e dados de autenticação
String loginUrl = "http://167.99.232.38:3000/auth/login";
String passosUrl = "http://167.99.232.38:3000/passos";
String email = "otavio.abreu96@gmail.com";
String senha = "1234";

// Token de autenticação
String accessToken = "";

// Instância de WiFiClient
WiFiClient client;

void setup() {
  Serial.begin(115200);

  // Conectar ao Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Conectando ao Wi-Fi...");
  }
  Serial.println("Wi-Fi conectado!");
}

void loop() {
  delay(1000);
  contPassos++;
  Serial.println(contPassos);
  if(contPassos==10) {
    if (login()) {
      enviarPassos();
    }
    contPassos = 0;
  }
}

// Função para fazer login e obter o token
bool login() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(client, loginUrl);  // Passando WiFiClient e URL
    http.addHeader("Content-Type", "application/json");

    // Corpo da requisição
    String requestBody = "{\"email\": \"" + email + "\", \"senha\": \"" + senha + "\"}";

    int httpResponseCode = http.POST(requestBody);
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Resposta de login: " + response);

      // Extrair o token de acesso da resposta (assumindo que o token está no campo "acess_token")
      int startIndex = response.indexOf("acess_token\":\"") + strlen("acess_token\":\"");
      int endIndex = response.indexOf("\"", startIndex);
      accessToken = response.substring(startIndex, endIndex);
      Serial.println("Token de acesso: " + accessToken);

      http.end();
      return true;
    } else {
      Serial.println("Erro no login, código HTTP: " + String(httpResponseCode));
    }
    http.end();
  }
  return false;
}

// Função para enviar passos usando o token de autenticação
void enviarPassos() {
  if (WiFi.status() == WL_CONNECTED && accessToken != "") {
    HTTPClient http;
    http.begin(client, passosUrl);  // Passando WiFiClient e URL
    http.addHeader("Authorization", "Bearer " + accessToken);

    // Enviar POST com um corpo vazio
    int httpResponseCode = http.POST("");  // Passa uma String vazia como corpo
    Serial.println("Código HTTP da resposta de passos: " + String(httpResponseCode));

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Resposta de passos: " + response);
    } else {
      Serial.println("Erro ao enviar passos, código HTTP: " + String(httpResponseCode));
    }
    http.end();
  } else {
    Serial.println("Falha na autenticação ou Wi-Fi desconectado.");
  }
}

