<!--
 * @Author: dav1d wei.liu@zendure.com
 * @Date: 2025-03-04 14:39:17
 * @LastEditors: dav1d wei.liu@zendure.com
 * @LastEditTime: 2025-07-30 19:24:24
 * @FilePath: /zenSDK/docs/zh.md
 * @Description: 征拓产品本地控制系统技术文档（v1.0.0）
 * 
 * Copyright (c) 2025 by Zendure, All Rights Reserved. 
-->

# 征拓产品本地控制系统 v1.0.0

---

<p align="center">
  <img src="https://zendure.com/cdn/shop/files/zendure-logo-infinity-charge_240x.png?v=1717728038" alt="Zendure Logo" width="240">
</p>

# 📖 文档导航

本项目提供多语言版本文档，选择您需要的语言：

- 🇨🇳 [中文](./zh.md)
- 🇬🇧 [English](../README.md)
- 🇩🇪 [Deutsch](./de.md)
- 🇫🇷 [Français](./fr.md)

---

# 🌟 概述

在过往的[设备数据上报项目](https://github.com/Zendure/developer-device-data-report)实践中，我们发现了本地化控制的优化需求。为此，团队自主研发了物联网架构 **ZenSDK**，现开放**本地 API 接口**，助力开发者实现以下能力：

- 实时获取设备状态与属性
- 监听设备数据流
- 远程控制设备功能
- 集成第三方 MQTT 客户端（支持 [Home Assistant](https://www.home-assistant.io/integrations/mqtt/)）
- 基于 API 开发个性化功能，提升用户体验

如果您对 **Zendure** 产品有创新想法，欢迎随时联系我们！

---

# 📌 支持产品列表

当前文档覆盖的产品及固件版本信息如下：

| 产品型号           | 固件版本 | 备注     |
| ------------------ | -------- | -------- |
| solarFlow800       | 升级最新版本   |          |
| solarFlow800Pro    | 升级最新版本   | 开发中   |
| solarFlow2400AC    | 升级最新版本   | 开发中   |
| smartMeter3CT      | 升级最新版本   | 开发中   |
| （更多产品待更新） | -        | 敬请期待 |

---

# 🚀 核心功能架构

本地控制功能通过 **mDNS 服务发现** 与 **HTTP Server 通信** 协同实现，核心流程如下：

## 1. 设备发现机制（mDNS）

设备联网启动后，通过 **mDNS（多播 DNS）协议** 广播自身服务信息，包括：

- 服务名称：`Zendure-<型号>-<MAC后12位>`（例：`Zendure-SolarFlow800-WOB1NHMAMXXXXX3`）
- IP 地址
- HTTP 服务端口

其他设备/客户端通过监听局域网 mDNS 广播，自动发现新设备并获取连接信息。

## 2. 设备通信机制（HTTP RESTful API）

设备内置 HTTP 服务器，支持以下通信方式：

### 基础操作类型

| 方法     | 用途                  | 示例                                       |
| -------- | --------------------- | ------------------------------------------ |
| `GET`  | 查询设备状态/属性     | `GET /properties/report`（获取全量属性） |
| `POST` | 发送控制指令/配置参数 | `POST /properties/write`（设置设备属性） |

### 数据格式规范

- **GET 请求**：无请求体，响应为 JSON 格式设备属性。
- **POST 请求**：需携带 JSON 格式请求体，字段需包含设备序列号 `sn`（必填）。

#### 示例 1：获取设备属性

```http
GET /properties/report
```
#### 示例 2：发送控制指令/配置参数

```http
POST /properties/write
Content-Type: application/json

{
    "sn": "WOB1NHMAMXXXXX3", // Required
    "properties": {
        "acMode": 2 // Corresponding readable/writable attribute
    }
}
```

#### 示例 3：获取MQTT连接情况

```http
GET /rpc?method=HA.Mqtt.GetStatus
```

#### 示例 4：获取MQTT配置参数

```http
GET /rpc?method=HA.Mqtt.GetConfig
```

#### 示例 5：设置 MQTT 配置（POST）

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

# 🛠️ 开发工具支持

## 系统级 mDNS 服务发现

| 操作系统 | 命令示例                          | 说明                                          |
| -------- | --------------------------------- | --------------------------------------------- |
| Windows  | `Get-Service                      | Where-Object { $_.Name -like "*Bonjour*" }` |
| macOS    | `dns-sd -B _zendure._tcp`       | 浏览局域网 Zendure 设备                       |
| Linux    | `avahi-browse -r _zendure._tcp` | 发现 _zendure._tcp 服务                       |

## 多语言调用示例

- [C 语言示例](../examples/C/demo.c)
- [C# 示例](../examples/C%23/demo.cs)
- [Java 示例](../examples/Java/demo.java)
- [JavaScript 示例](../examples/JavaScript/demo.js)
- [PHP 示例](../examples/PHP/demo.php)
- [Python 示例](../examples/Python/demo.py)
- [命令行测试](#命令行快速测试)

### 命令行快速测试

```bash
# 获取设备全量属性
curl -X GET "http://<server-ip>/properties/report"

# 查询 MQTT 配置状态
curl -X GET "http://<ip>/rpc?method=HA.Mqtt.GetStatus"

# 设置 设备 acMode属性
curl -X POST "http://<server-ip>/properties/write" \
  -H "Content-Type: application/json" \
  -d '{"sn": "your_device_sn","properties":{"acMode":2}}'
```

---

# 📚 产品属性详解

各产品具体属性定义及说明，详见：
[SolarFlow系列属性文档](./zh_properties.md)

---
