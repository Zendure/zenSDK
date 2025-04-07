<!--
 * @Author: dav1d wei.liu@zendure.com
 * @Date: 2025-03-04 14:39:17
 * @LastEditors: dav1d wei.liu@zendure.com
 * @LastEditTime: 2025-03-05 19:40:00
 * @FilePath: /zenSDK/docs/zh.md
 * @Description: 
 * 
 * Copyright (c) 2025 by Zendure, All Rights Reserved. 
-->

# 征拓产品本地控制系统 v1.0.0

---

<p align="center">
  <img src="https://zendure.com/cdn/shop/files/zendure-logo-infinity-charge_240x.png?v=1717728038" alt="Logo">
</p>

# 📖 文档说明

本项目包含多语言版本的说明文档，请选择您的语言：

* 🇨🇳 [中文](./zh.md)
* 🇬🇧 [English](../README.md)
* 🇩🇪 [Deutsch](./de.md)
* 🇫🇷 [Français](./fr.md)

---

# 概述

我是**大卫**，负责 **Zendure** 产品的物联网开发工程师，同时对**Zendure物联网产品**充满热情。

在过去的[项目](https://github.com/Zendure/developer-device-data-report)中，我们遇到了一些挑战。为此，我致力于开发全新物联网架构ZenSDK，并在希望聆听各位建议，优化用户体验，现在开放**本地 API 接口**，让开发者能够：

* 获取自身设备信息
* 接收设备数据
* 接口控制设备
* 基于 API 进行创意二次开发，优化用户体验

如果你对 **Zendure** 产品有 **创新想法**，欢迎随时与我联系！我会在空闲时间持续优化，

为每一位热爱 **Zendure** 的你，带来更加 **极致的产品体验**！ 🚀

---

# 📌 项目简介

该文档目前支持产品：

| 产品名称      | 固件版本 | 备注 |
| ------------- | -------- | ---- |
| SolarFlow 800 | 1.0.2    |      |
| 待更新        |          |      |

# **🚀 主要功能**

本地控制功能通过 **mDNS 服务** 与 **HTTP Server 服务** 协同完成，实现设备的自动发现与高效通信。

> 1. **设备发现**：使用 **mDNS（Multicast DNS）** 协议，自动发现同一局域网内的设备，并动态获取设备的服务信息（如 IP 地址、服务端口等）。
> 2. **设备通信**：基于 **HTTP 协议**，设备之间可以通过 **RESTful API** 进行数据交互，实现高效、稳定的本地控制与协作。

## **📖 名称解释**

| 名称                                          | 说明                                                                                                              |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **mDNS（Multicast DNS）**               | 一种局域网内的**零配置网络发现协议**，允许设备在没有中央 DNS 服务器的情况下，自动解析和发现其他设备。       |
| **HTTP（HyperText Transfer Protocol）** | 一种基于**请求/响应** 模型的通信协议，广泛用于客户端与服务器之间的数据交换，适用于局域网设备通信。          |
| **RESTful API**                         | 一种基于**HTTP** 的 API 设计风格，提供统一的资源访问接口，具备良好的 **扩展性** 和 **简洁性**。 |

---

## **设备发现机制**

* **mDNS广播** ：设备在启动并连接网络时，通过mDNS广播自身的服务名称和类型，主机名始终采用 格式 `Zendure-<model>-XXXXXXXXXXXX`，并提供设备的IP地址和HTTP服务端口。其他设备监听局域网中的mDNS广播，获取新设备的相关信息。
* **服务名称规范** ：设备名称可以包含设备类型、设备SN等信息，以便其他设备根据名称快速判断设备的功能或角色。例如：
* 示例：`Zendure-<model>-XXXXXXXXXXXX`

## **设备通信机制**

* **HTTP API通信** ：每个设备都在局域网内提供一个HTTP服务器，其他设备通过HTTP接口与其通信。通过RESTful风格的API设计，支持以下常见操作：
  * **GET请求** ：查询设备状态或获取数据。例如，获取设备的全部属性。
  * **POST请求** ：发送控制指令。例如，控制设备的开关状态。

API示例：

```HTTP
GET  /properties/report     # 获取设备当前全部属性
POST /properties/write      # 发送控制指令，如开关控制
```

* **通信消息格式** ：POST方法使用JSON作为数据传输格式，便于解析和跨平台兼容。每个设备应遵循统一的JSON数据结构，保证设备间的通信兼容性。

```
{
    "sn": "WOB1NHMAMXXXXX3",//必须设置
    "properties": {
        "acMode": 2//对应读写属性
    }
}
```

## **Windows/MacOS/Linux mDNS 服务发现**
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

## **调用示例**

* [C Example](../examples/C/demo.c)
* [C# Example](../examples/C#/demo.cpp)
* [Java Example](../examples/Java/demo.java)
* [JavaScript Example](../examples/JavaScript/demo.js)
* [PHP Example](../examples/PHP/demo.php)
* [Python Example](../examples/Python/demo.py)
* **Windows/MacOS/Linux 命令行**

```sh
curl -X GET "http://<server-ip>/properties/report"
curl -X POST "http://<server-ip>/properties/write" -H "Content-Type: application/json" -d '{"sn": "your_device_sn","properties":{"acMode":2}}'
```

## 产品属性解释说明
* [SolarFlow 800](./zh_properties.md)