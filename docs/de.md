# Zendure Lokales Steuersystem

---

<p align="center">
  <img src="https://zendure.com/cdn/shop/files/zendure-logo-infinity-charge_240x.png?v=1717728038" alt="Zendure Logo" width="240">
</p>

# 📖 Dokumenten­navigation

Dieses Projekt stellt mehrsprachige Dokumente bereit. Wählen Sie Ihre Sprache :

* 🇨🇳 [中文](./zh.md)
* 🇬🇧 [English](../README.md)
* 🇩🇪 [Deutsch](./de.md)
* 🇫🇷 [Français](./fr.md)

---

# 🌟 Überblick

In unserem vorherigen [Device-Data-Report-Projekt](https://github.com/Zendure/developer-device-data-report) zeigte sich ein klarer Bedarf an optimierter lokaler Steuerung.Daraufhin entwickelte das Team das IoT-Framework **ZenSDK** und veröffentlicht nun seine **lokale API**, mit der Entwickler Folgendes realisieren können :

- Abruf von Gerätestatus und -eigenschaften in Echtzeit
- Abonnieren von Geräte-Datenströmen
- Fernsteuerung von Gerätefunktionen
- Anbindung beliebiger MQTT-Clients (u. a. [Home Assistant](https://www.home-assistant.io/integrations/mqtt/))
- Entwicklung individueller Features über offene APIs zur Steigerung des Benutzererlebnisses

Haben Sie innovative Ideen zu **Zendure**-Produkten? Kontaktieren Sie uns gern!

---

# 📌 Unterstützte Produkte

| Modell           | Firmware-Version | Status         |
| ---------------- | ---------------- | -------------- |
| SolarFlow800     | Neueste          | Einsatzbereit  |
| SolarFlow800 Pro | Neueste          | In Entwicklung |
| SolarFlow2400 AC | Neueste          | In Entwicklung |
| SmartMeter3CT    | Neueste          | In Entwicklung |
| (Weitere folgen) | –               | Demnächst     |

---

# 🚀 Kernarchitektur

Die lokale Steuerung basiert auf der Kombination aus **mDNS-Service­-Discovery** und **HTTP-Server-Kommunikation**.

## 1. Geräteerkennung (mDNS)

Nach dem Netzstart sendet das Gerät mittels **mDNS** folgende Informationen :

- Service-Name: `Zendure-<Modell>-<letzte12Mac>`(z. B. `Zendure-SolarFlow800-WOB1NHMAMXXXXX3`)
- IP-Adresse
- HTTP-Port

Clients im selben LAN können diese Broadcasts empfangen und Geräte automatisch entdecken.

## 2. Geräteschnittstelle (HTTP-RESTful API)

Jedes Gerät betreibt einen internen HTTP-Server.

### Grundoperationen

| Methode  | Zweck                               | Beispiel                                          |
| -------- | ----------------------------------- | ------------------------------------------------- |
| `GET`  | Gerätestatus / Eigenschaften lesen | `GET /properties/report` (alle Eigenschaften)   |
| `POST` | Steuer- oder Konfig-Befehle senden  | `POST /properties/write` (Eigenschaften setzen) |

### Datenformate

- **GET**: Kein Request-Body, Antwort in JSON
- **POST**: JSON-Body, Pflichtfeld `sn` (Seriennummer)

#### Beispiel 1: Eigenschaften abfragen

```http
GET /properties/report
```

#### Beispiel 2: Steuer-/Konfig­-Befehl senden

```http
POST /properties/write
Content-Type: application/json

{
  "sn": "WOB1NHMAMXXXXX3",      // Pflicht
  "properties": {
    "acMode": 2                 // Schreibbare Eigenschaft
  }
}
```

#### Beispiel 3: MQTT-Status prüfen

```http
GET /rpc?method=HA.Mqtt.GetStatus
```

#### Beispiel 4: MQTT-Konfiguration abrufen

```http
GET /rpc?method=HA.Mqtt.GetConfig
```

#### Beispiel 5: MQTT-Konfiguration setzen

```http
POST /rpc
Content-Type: application/json

{
  "sn": "WOB1NHMAMXXXXX3",
  "method": "HA.Mqtt.SetConfig",
  "params": {
    "config": {
      "enable": true,
      "server": "mqtt://192.168.50.48:1883",
      "username": "zendure",
      "password": "zendure"
    }
  }
}
```

---

# 🛠️ Entwicklungswerkzeuge

## mDNS-Erkennung auf Systemebene

| Betriebssystem | Beispielbefehl                                               | Beschreibung                         |
| -------------- | ------------------------------------------------------------ | ------------------------------------ |
| Windows        | `Get-Service \| Where-Object { $_.Name -like "*Bonjour*" }` | Bonjour-Dienst prüfen               |
| macOS          | `dns-sd -B _zendure._tcp`                                  | Zendure-Geräte durchsuchen          |
| Linux          | `avahi-browse -r _zendure._tcp`                            | Services `_zendure._tcp` entdecken |

## Code-Beispiele

- [C](../examples/C/demo.c)
- [C#](../examples/C%23/demo.cs)
- [Java](../examples/Java/demo.java)
- [JavaScript](../examples/JavaScript/demo.js)
- [PHP](../examples/PHP/demo.php)
- [Python](../examples/Python/demo.py)
- [CLI-Schnelltest](#cli-schnelltest)

### CLI-Schnelltest

```bash
# Alle Eigenschaften abrufen
curl -X GET "http://<gerät-ip>/properties/report"

# MQTT-Status prüfen
curl -X GET "http://<gerät-ip>/rpc?method=HA.Mqtt.GetStatus"

# acMode-Eigenschaft setzen
curl -X POST "http://<gerät-ip>/properties/write" \
  -H "Content-Type: application/json" \
  -d '{"sn": "your_device_sn", "properties": { "acMode": 2 }}'
```

---

# 📚 Eigenschaftsreferenz

Detaillierte Eigenschaftsbeschreibungen je Produkt finden Sie hier :
[SolarFlow-Serien-Eigenschaften](./de_properties.md)

---
