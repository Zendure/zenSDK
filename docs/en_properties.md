<!--
 * @Author: dav1d wei.liu@zendure.com
 * @Date: 2025-03-05 18:45:36
 * @LastEditors: dav1dBoy 492664938@qq.com
 * @LastEditTime: 2026-01-04 14:40:33
 * @FilePath: /zenSDK/docs/en_properties.md
 * @Description: 
 * 
 * Copyright (c) 2025 by Zendure, All Rights Reserved. 
-->

# **SolarFlow 800** **SolarFlow 800 PRO/AC** **SolarFlow 800 PRO/AC** **SolarFlow 2400AC** 

## **Battery Pack Data Properties**

| Attribute   | Data Type | Description                                                                                                                                                                                                                                                              |
| ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| packType    | int       | Not used                                                                                                                                                                                                                                                                 |
| socLevel    | int       | Battery charge level                                                                                                                                                                                                                                                     |
| state       | int       | 0: Standby, 1: Charging, 2: Discharging                                                                                                                                                                                                                                  |
| power       | int       | Battery pack power                                                                                                                                                                                                                                                       |
| maxTemp     | int       | Maximum battery temperature (maxTemp) is stored as one-tenth of the Kelvin temperature. The conversion formula to Celsius (°C) is:`float maxTemp_Celsius = (maxTemp - 2731) / 10.0; // Unit: °C`                                                                     |
| totalVol    | int       | Total voltage                                                                                                                                                                                                                                                            |
| batcur      | int       | The raw batcur data is stored as a 16-bit two’s complement value in a uint8_t[2] array.During parsing, it needs to be converted into a signed 16-bit integer.According to the protocol definition, divide the value by 10 to obtain the actual current, in amperes (A). |
| maxVol      | int       | Maximum cell voltage, stored in units of 0.01V. The conversion formula to actual voltage:`maxVol / 100.0` (Unit: V)                                                                                                                                                    |
| minVol      | int       | Minimum cell voltage, stored in units of 0.01V. The conversion formula to actual voltage:`minVol / 100.0` (Unit: V)                                                                                                                                                    |
| softVersion | int       | Software version                                                                                                                                                                                                                                                         |

**Battery Current (batcur) Data Conversion Description**

The raw **batcur** data is stored as a **16-bit two’s complement** value in a **uint8_t[2]** array.

During parsing, it needs to be converted into a **signed 16-bit integer**.

According to the protocol definition, divide the value by **10** to obtain the actual current, in **amperes (A)**.

## **Device Data Properties - Read-Only**

| Attribute       | Data Type | Description                                                          |
| --------------- | --------- | -------------------------------------------------------------------- |
| heatState       | int       | 0: Not heating, 1: Heating                                           |
| packInputPower  | int       | Battery pack input power (discharging)                               |
| outputPackPower | int       | Output power to battery pack (charging)                              |
| outputHomePower | int       | Output power to home electricity                                     |
| remainOutTime   | int       | Remaining discharge time (unit: minutes)                             |
| packState       | int       | 0: Standby, 1: Charging, 2: Discharging                              |
| packNum         | int       | Number of battery packs                                              |
| electricLevel   | int       | Average battery pack charge level                                    |
| gridInputPower  | int       | Grid input power                                                     |
| solarInputPower | int       | Total solar input power                                              |
| solarPower1     | int       | Solar line 1 input power                                             |
| solarPower2     | int       | Solar line 2 input power                                             |
| pass            | int       | 0: No, 1: Yes                                                        |
| reverseState    | int       | 0: No, 1: Reverse flow                                               |
| socStatus       | int       | 0: No, 1: Calibrating                                                |
| hyperTmp        | int       | Enclosure temperature                                                |
| dcStatus        | int       | 0: Stopped, 1: Battery input, 2: Battery output                      |
| pvStatus        | int       | 0: Stopped, 1: Running                                               |
| acStatus        | int       | 0: Stopped, 1: Grid-connected operation, 2: Charging operation       |
| dataReady       | int       | 0: Not ready, 1: Ready                                               |
| gridState       | int       | 0: Not connected, 1: Connected                                       |
| FMVolt          | int       | Voltage activation - Voltage value                                   |
| socLimit        | int       | 0: Normal state, 1: Charge limit reached, 2: Discharge limit reached |

## **Device Data Properties - Read/Write**

| Attribute       | Data Type | Description                                                     |
| --------------- | --------- | --------------------------------------------------------------- |
| writeRsp        | N/A       | Read/write response acknowledgment                              |
| acMode          | int       | 1: Input, 2: Output                                             |
| inputLimit      | int       | AC charging power limit                                         |
| outputLimit     | int       | Output power limit                                              |
| socSet          | int       | 700-1000: 70%-100%                                              |
| minSoc          | int       | 0-500: 0%-50%                                                   |
| gridReverse     | int       | 0: Disabled, 1: Allowed reverse flow, 2: Forbidden reverse flow |
| inverseMaxPower | int       | Maximum output power limit                                      |
| gridStandard    | int       | Grid connection standard 0: Germany 1: France 2: Austria        |
| smartMode       | int       | 1: The setting parameter is not written to flash. After an unexpected power loss and restart, the device will use the value stored in flash.	0: The setting parameter is written to flash. If you frequently set device properties, set this to 1.      |
