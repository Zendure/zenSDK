# Zendure Local Control System

---

<p align="center">
  <img src="https://zendure.com/cdn/shop/files/zendure-logo-infinity-charge_240x.png?v=1717728038" alt="Zendure Logo" width="240">
</p>

# 📖 Documentation Navigator

This project offers documentation in multiple languages. Choose the one you need:

* 🇨🇳 [中文 ](./docs/zh.md)
* 🇬🇧 [English](./README.md)
* 🇩🇪 [Deutsch](./docs/de.md)
* 🇫🇷 [Français](./docs/fr.md)

---

# 🌟 Overview

During the development of our previous [Device Data Report Project](https://github.com/Zendure/developer-device-data-report) we identified a strong need for improved local control.As a response, the team created the IoT framework **ZenSDK** and is now opening the **Local API** to help developers achieve:

- Real-time device status & property retrieval
- Event stream subscription
- Remote function control
- Integration of third-party MQTT clients (including [Home Assistant](https://www.home-assistant.io/integrations/mqtt/))
- Custom feature development through open APIs to enhance user experience

Have an innovative idea for **Zendure** products? Feel free to reach out!

---

# 🆕 Updates

- Update ZenSDK MQTT client connection to comply with EN 18031, using TLS to connect to the Zendure MQTT server.
- Provide a user-configurable MQTT client that supports non-TLS only; port 8883 and mqtts:// are not supported.
- Set local API receive length to 512 bytes.
- Update and fix known issues.
- Under EN 18031, HTTP requests are not supported by default.
- To enable the local API, add HEMS and then exit to apply.

---

# 📌 Supported Products

| Model              | Firmware Version | Status |
| ------------------ | ---------------- | ------ |
| SolarFlow800       | Latest           |        |
| SolarFlow800 Pro   | Latest           |        |
| SolarFlow2400 AC   | Latest           |        |
| SmartMeter3CT      | Latest           |        |
| (More coming soon) | –               |        |

---

# 🚀 Core Architecture

Local control is achieved via a combination of **mDNS service discovery** and **HTTP server communication**:

## 1. Device Discovery (mDNS)

After connecting to the network, the device broadcasts its service information through **mDNS**:

- Service name: `Zendure-<Model>-<Last12MAC>`(e.g. `Zendure-SolarFlow800-WOB1NHMAMXXXXX3`)
- IP address
- HTTP service port

Clients on the same LAN can listen for these broadcasts to automatically discover devices.

## 2. Device Communication (HTTP RESTful API)

Each device hosts an internal HTTP server.

### Basic Operations

| Method   | Purpose                        | Example                                     |
| -------- | ------------------------------ | ------------------------------------------- |
| `GET`  | Query device status/properties | `GET /properties/report` (all properties) |
| `POST` | Send control/config commands   | `POST /properties/write` (set properties) |

### Data Format

- **GET**: No body, response in JSON.
- **POST**: JSON body must include device serial number `sn` (required).

#### Example 1: Get device properties

```http
GET /properties/report
```

#### Example 2: Send control/config command

```http
POST /properties/write
Content-Type: application/json

{
  "sn": "WOB1NHMAMXXXXX3",      // Required
  "properties": {
    "acMode": 2                 // Writable property
  }
}
```

#### Example 3: Check MQTT status

```http
GET /rpc?method=HA.Mqtt.GetStatus
```

#### Example 4: Get MQTT configuration

```http
GET /rpc?method=HA.Mqtt.GetConfig
```

#### Example 5: Set MQTT configuration

```http
POST /rpc
Content-Type: application/json

{
  "sn": "WOB1NHMAMXXXXX3",
  "method": "HA.Mqtt.SetConfig",
  "params": {
    "config": {
      "enable": true,
      "server": "192.168.50.48",
      "port":1883,
      "protocol":"mqtt",
      "username": "zendure",
      "password": "zendure"
    }
  }
}
```

---

# 🛠️ Development Tools

## System-level mDNS discovery commands

| OS      | Command example                                              | Description                         |
| ------- | ------------------------------------------------------------ | ----------------------------------- |
| Windows | `Get-Service \| Where-Object { $_.Name -like "*Bonjour*" }` | Check Bonjour service               |
| macOS   | `dns-sd -B _zendure._tcp`                                  | Browse Zendure devices              |
| Linux   | `avahi-browse -r _zendure._tcp`                            | Discover `_zendure._tcp` services |

## Multi-language Samples

- [C](./examples/C/demo.c)
- [C#](./examples/C%23/demo.cs)
- [Java](./examples/Java/demo.java)
- [JavaScript](./examples/JavaScript/demo.js)
- [PHP](./examples/PHP/demo.php)
- [Python](./examples/Python/demo.py)
- [CLI quick test](#command-line-quick-test)

### Command-line quick test

```bash
# Get all properties
curl -X GET "http://<device-ip>/properties/report"

# Query MQTT status
curl -X GET "http://<device-ip>/rpc?method=HA.Mqtt.GetStatus"

# Set acMode property
curl -X POST "http://<device-ip>/properties/write" \
  -H "Content-Type: application/json" \
  -d '{"sn": "your_device_sn", "properties": { "acMode": 2 }}'
```

---

# 📚 Property Reference

Detailed property definitions for each product:
[SolarFlow Series Property Doc](./docs/en_properties.md)

---
