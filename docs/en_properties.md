<!--
 * @Author: dav1d wei.liu@zendure.com
 * @Date: 2025-03-05 18:45:36
 * @LastEditors: dav1d wei.liu@zendure.com
 * @LastEditTime: 2025-03-05 19:38:46
 * @FilePath: /zenSDK/docs/en_properties.md
 * @Description: 
 * 
 * Copyright (c) 2025 by Zendure, All Rights Reserved. 
-->
# **SolarFlow 800**
## **Battery Pack Data Properties**
| Attribute | Data Type | Description |
|-----------|----------|-------------|
| packType | int | Not used |
| socLevel | int | Battery charge level |
| state | int | 0: Standby, 1: Charging, 2: Discharging |
| power | int | Battery pack power |
| maxTemp | int | Maximum battery temperature (maxTemp) is stored as one-tenth of the Kelvin temperature. The conversion formula to Celsius (°C) is: `float maxTemp_Celsius = (maxTemp - 2731) / 10.0; // Unit: °C` |
| totalVol | int | Total voltage |
| batcur | int | Total current, stored as a 32-bit integer where the upper 16 bits are sign-extended. The conversion formula is: `batcur_actual = ((int16_t)batcur) / 10.0; // Unit: A` |
| maxVol | int | Maximum cell voltage, stored in units of 0.01V. The conversion formula to actual voltage: `maxVol / 100.0` (Unit: V) |
| minVol | int | Minimum cell voltage, stored in units of 0.01V. The conversion formula to actual voltage: `minVol / 100.0` (Unit: V) |
| softVersion | int | Software version |

## **Device Data Properties - Read-Only**
| Attribute | Data Type | Description |
|-----------|----------|-------------|
| heatState | int | 0: Not heating, 1: Heating |
| packInputPower | int | Battery pack input power (discharging) |
| outputPackPower | int | Output power to battery pack (charging) |
| outputHomePower | int | Output power to home electricity |
| remainOutTime | int | Remaining discharge time (unit: minutes) |
| packState | int | 0: Standby, 1: Charging, 2: Discharging |
| packNum | int | Number of battery packs |
| electricLevel | int | Average battery pack charge level |
| gridInputPower | int | Grid input power |
| solarInputPower | int | Total solar input power |
| solarPower1 | int | Solar line 1 input power |
| solarPower2 | int | Solar line 2 input power |
| pass | int | 0: No, 1: Yes |
| reverseState | int | 0: No, 1: Reverse flow |
| socStatus | int | 0: No, 1: Calibrating |
| hyperTmp | int | Enclosure temperature |
| dcStatus | int | 0: Stopped, 1: Battery input, 2: Battery output |
| pvStatus | int | 0: Stopped, 1: Running |
| acStatus | int | 0: Stopped, 1: Grid-connected operation, 2: Charging operation |
| dataReady | int | 0: Not ready, 1: Ready |
| gridState | int | 0: Not connected, 1: Connected |
| FMVolt | int | Voltage activation - Voltage value |
| socLimit | int | 0: Normal state, 1: Charge limit reached, 2: Discharge limit reached |

## **Device Data Properties - Read/Write**
| Attribute | Data Type | Description |
|-----------|----------|-------------|
| writeRsp | N/A | Read/write response acknowledgment |
| acMode | int | 1: Input, 2: Output |
| inputLimit | int | AC charging power limit |
| outputLimit | int | Output power limit |
| socSet | int | 700-1000: 70%-100% |
| minSoc | int | 0-500: 0%-50% |
| gridReverse | int | 0: Disabled, 1: Allowed reverse flow, 2: Forbidden reverse flow |
| inverseMaxPower | int | Maximum output power limit |
| gridStandard | int | **Do not use** |
| lampSwitch | int | **Do not use** |
| IOTState | int | **Do not use** |
| factoryModeState | int | **Do not use** |
| OTAState | int | **Do not use** |
| LCNState | int | **Do not use** |
| oldMode | int | **Do not use** |
| VoltWakeup | int | **Do not use** |
| ts | int | **Do not use** |
| bindstate | int | **Do not use** |
| tsZone | int | **Do not use** |
| chargeMaxLimit | int | **Do not use** |
| smartMode | int | **Do not use** |

