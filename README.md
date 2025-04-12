# Zendure Local Control System v1.0.0

---

<p align="center">
  <img src="https://zendure.com/cdn/shop/files/zendure-logo-infinity-charge_240x.png?v=1717728038" alt="Logo">
</p>

# 📖 Documentation Guide

This project contains multilingual documentation. Please select your language:

* 🇨🇳 [中文 ](./docs/zh.md)
* 🇬🇧 [English](./README.md)
* 🇩🇪 [Deutsch](./docs/de.md)
* 🇫🇷 [Français](./docs/fr.md)

---

# Overview

I am **David**, an IoT development engineer at **Zendure**, and I am passionate about **Zendure IoT products**.

In past [projects](https://github.com/Zendure/developer-device-data-report), we encountered several challenges. To address these, I have been dedicated to developing a new IoT architecture, ZenSDK. I am eager to hear your suggestions to enhance the user experience. Now, I am opening up the **Local API Interface**, allowing developers to:

* Retrieve their own device information
* Receive device data
* Control devices via API
* Perform creative secondary development to optimize user experience

If you have **innovative ideas** for **Zendure** products, feel free to contact me! In my spare time, I will continue optimizing to provide every **Zendure enthusiast** with an **exceptional product experience**! 🚀

---

# 📌 Project Introduction

This document currently supports the following products:

| Product Name      | Firmware Version | Notes |
| ----------------- | ---------------- | ----- |
| SolarFlow 800     | 1.0.2            |       |
| SolarFlow 2400 AC | TBD              |       |
| SolarFlow 800 Pro | TBD              |       |
| To be updated |                  |       |

# **🚀 Key Features**

Local control is achieved through a combination of **mDNS service** and **HTTP Server service**, enabling automatic device discovery and efficient communication.

> 1. **Device Discovery**: Utilizing the **mDNS (Multicast DNS)** protocol, devices within the same local network are automatically discovered, dynamically retrieving service information such as IP address and service port.
> 2. **Device Communication**: Based on the **HTTP protocol**, devices can exchange data through **RESTful APIs**, ensuring efficient and stable local control and collaboration.

## **📖 Terminology**

| Term                                         | Description                                                                                                                                                    |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **mDNS (Multicast DNS)**               | A**zero-configuration network discovery protocol** for local networks, allowing devices to resolve and discover each other without a central DNS server. |
| **HTTP (HyperText Transfer Protocol)** | A**request/response** communication protocol widely used for data exchange between clients and servers, suitable for local network device communication. |
| **RESTful API**                        | A**HTTP-based** API design style that provides a uniform resource access interface with excellent **scalability** and **simplicity**.        |

---

## **Device Discovery Mechanism**

* **mDNS Broadcast**: When a device starts and connects to the network, it broadcasts its service name and type via mDNS. The hostname always follows the format `Zendure-<model>-XXXXXXXXXXXX`, providing the device's IP address and HTTP service port. Other devices listen for mDNS broadcasts within the local network to obtain new device information.
* **Service Name Convention**: Device names can include device type and serial number (SN) to help other devices quickly identify their function or role.
* Example: `Zendure-<model>-XXXXXXXXXXXX`

## **Device Communication Mechanism**

* **HTTP API Communication**: Each device runs an HTTP server within the local network, allowing other devices to communicate via HTTP. With a RESTful API design, the following operations are supported:
  * **GET Requests**: Retrieve device status or data. For example, obtain all device attributes.
  * **POST Requests**: Send control commands. For example, toggle device power.

API Example:

```HTTP
GET  /properties/report     # Retrieve all current device properties
POST /properties/write      # Send control commands, such as switching the device on/off
```

* **Communication Message Format**: The POST method uses JSON for data transmission, ensuring easy parsing and cross-platform compatibility. Each device should follow a unified JSON data structure for seamless communication.

```
{
    "sn": "WOB1NHMAMXXXXX3", // Required
    "properties": {
        "acMode": 2 // Corresponding readable/writable attribute
    }
}
```

## **Windows/MacOS/Linux mDNS Service Discovery**

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

## **Usage Examples**

* [C Example](./examples/C/demo.c)
* [C# Example](./examples/C#/demo.cpp)
* [Java Example](./examples/Java/demo.java)
* [JavaScript Example](./examples/JavaScript/demo.js)
* [PHP Example](./examples/PHP/demo.php)
* [Python Example](./examples/Python/demo.py)
* **Windows/MacOS/Linux Command Line**

```sh
curl -X GET "http://<server-ip>/properties/report"
curl -X POST "http://<server-ip>/properties/write" -H "Content-Type: application/json" -d '{"sn": "your_device_sn","properties":{"acMode":2}}'
```

## Product Properties Descriptions

* [SolarFlow 800](./docs/en_properties.md)
