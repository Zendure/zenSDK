# Zendure Lokales Steuerungssystem v1.0.0

---

<p align="center">
  <img src="https://zendure.com/cdn/shop/files/zendure-logo-infinity-charge_240x.png?v=1717728038" alt="Logo">
</p>

# 📖 Dokumentationsanleitung

Dieses Projekt enthält mehrsprachige Dokumentationen. Bitte wählen Sie Ihre Sprache:

* 🇨🇳 [中文](./zh.md)
* 🇬🇧 [English](../README.md)
* 🇩🇪 [Deutsch](./de.md)
* 🇫🇷 [Français](./fr.md)

---

# Übersicht

Ich bin **David**, ein IoT-Entwicklungsingenieur bei **Zendure**, und ich bin begeistert von **Zendure IoT-Produkten**.

In vergangenen [Projekten](https://github.com/Zendure/developer-device-data-report) standen wir vor mehreren Herausforderungen. Um diese zu bewältigen, habe ich die neue IoT-Architektur ZenSDK entwickelt. Ich freue mich auf Ihr Feedback zur Verbesserung der Benutzererfahrung. Jetzt stelle ich die **Lokale API-Schnittstelle** zur Verfügung, damit Entwickler:

* Eigene Geräteinformationen abrufen können
* Gerätedaten empfangen können
* Geräte über die API steuern können
* Kreative Weiterentwicklungen durchführen können, um die Benutzererfahrung zu optimieren

Wenn Sie **innovative Ideen** für **Zendure**-Produkte haben, kontaktieren Sie mich gerne! In meiner Freizeit werde ich weiter daran arbeiten, jedem **Zendure-Enthusiasten** ein **außergewöhnliches Produkterlebnis** zu bieten! 🚀

---

# 📌 Projektbeschreibung

Dieses Dokument unterstützt derzeit die folgenden Produkte:

| Produktname       | Firmware-Version | Anmerkungen |
| ----------------- | ---------------- | ----------- |
| SolarFlow 800     | 1.0.2            |             |
| Wird aktualisiert |                  |             |

# **🚀 Hauptfunktionen**

Die lokale Steuerung wird durch die Kombination von **mDNS-Dienst** und **HTTP-Server-Dienst** ermöglicht, wodurch eine automatische Geräteerkennung und effiziente Kommunikation realisiert wird.

> 1. **Geräteerkennung**: Durch das **mDNS (Multicast DNS)**-Protokoll werden Geräte im gleichen lokalen Netzwerk automatisch erkannt, wodurch Dienstinformationen wie IP-Adresse und Port dynamisch abgerufen werden können.
> 2. **Gerätekommunikation**: Basierend auf dem **HTTP-Protokoll** können Geräte über **RESTful APIs** Daten austauschen, um eine effiziente und stabile lokale Steuerung und Zusammenarbeit zu gewährleisten.

## **📖 Begriffserklärungen**

| Begriff                                      | Beschreibung                                                                                                                                                                                                                 |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **mDNS (Multicast DNS)**               | Ein**Zero-Configuration-Netzwerkerkennungsprotokoll** für lokale Netzwerke, das es Geräten ermöglicht, sich gegenseitig ohne zentralen DNS-Server aufzulösen und zu entdecken.                                     |
| **HTTP (HyperText Transfer Protocol)** | Ein**Anfrage-/Antwort**-Kommunikationsprotokoll, das weit verbreitet für den Datenaustausch zwischen Clients und Servern verwendet wird und sich für die Kommunikation zwischen Geräten im lokalen Netzwerk eignet. |
| **RESTful API**                        | Ein**HTTP-basiertes** API-Design, das eine einheitliche Ressourcen-Schnittstelle bietet und sich durch **Skalierbarkeit** und **Einfachheit** auszeichnet.                                                 |

---

## **Geräteerkennungsmechanismus**

* **mDNS-Broadcast**: Wenn ein Gerät startet und sich mit dem Netzwerk verbindet, sendet es seinen Dienstnamen und -typ über mDNS aus. Der Hostname folgt stets dem Format `Zendure-<model>-XXXXXXXXXXXX` und gibt die IP-Adresse sowie den HTTP-Server-Port des Geräts an. Andere Geräte lauschen auf mDNS-Broadcasts im lokalen Netzwerk, um Informationen über neue Geräte zu erhalten.
* **Namenskonvention für Dienste**: Gerätenamen können den Gerätetyp und die Seriennummer (SN) enthalten, um anderen Geräten eine schnelle Identifikation ihrer Funktion oder Rolle zu ermöglichen.
* Beispiel: `Zendure-<model>-XXXXXXXXXXXX`

## **Gerätekommunikationsmechanismus**

* **HTTP-API-Kommunikation**: Jedes Gerät betreibt einen HTTP-Server im lokalen Netzwerk, sodass andere Geräte über HTTP mit ihm kommunizieren können. Mit einem RESTful-API-Design werden folgende Operationen unterstützt:
  * **GET-Anfragen**: Abrufen des Gerätestatus oder von Daten. Zum Beispiel das Abrufen aller Geräteeigenschaften.
  * **POST-Anfragen**: Senden von Steuerbefehlen. Zum Beispiel das Ein- und Ausschalten eines Geräts.

API-Beispiel:

```HTTP
GET  /properties/report     # Alle aktuellen Geräteeigenschaften abrufen
POST /properties/write      # Steuerbefehle senden, z. B. Gerät ein-/ausschalten
```

* **Nachrichtenformat der Kommunikation**: Die POST-Methode verwendet JSON zur Datenübertragung, um eine einfache Analyse und plattformübergreifende Kompatibilität zu gewährleisten. Jedes Gerät sollte eine einheitliche JSON-Datenstruktur verwenden, um die Kommunikationskompatibilität zwischen Geräten sicherzustellen.

```
{
    "sn": "WOB1NHMAMXXXXX3", // Erforderlich
    "properties": {
        "acMode": 2 // Entsprechendes Lese-/Schreibattribut
    }
}
```
## **Windows/MacOS/Linux mDNS-Diensterkennung**
### Windows (PowerShell)
```powershell
Get-Service | Where-Object { $_.Name -like "*Bonjour*" }
```
### MacOS
```sh
dns-sd -B _zendure._tcp
```    
### Linux
```sh
avahi-browse -r _zendure._tcp
```  


## **Beispielaufrufe**

* [C Example](../examples/C/demo.c)
* [C# Example](../examples/C#/demo.cpp)
* [Java Example](../examples/Java/demo.java)
* [JavaScript Example](../examples/JavaScript/demo.js)
* [PHP Example](../examples/PHP/demo.php)
* [Python Example](../examples/Python/demo.py)
* **Windows/MacOS/Linux Kommandozeile**

```sh
curl -X GET "http://<server-ip>/properties/report"
curl -X POST "http://<server-ip>/properties/write" -H "Content-Type: application/json" -d '{"sn": "your_device_sn","properties":{"acMode":2}}'
```

## Beschreibung der Produkteigenschaften
* [SolarFlow 800](./en_properties.md)