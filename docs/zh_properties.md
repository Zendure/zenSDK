<!--
 * @Author: dav1d wei.liu@zendure.com
 * @Date: 2025-03-05 18:45:36
 * @LastEditors: dav1d wei.liu@zendure.com
 * @LastEditTime: 2025-03-05 19:34:42
 * @FilePath: /zenSDK/docs/properties.md
 * @Description: 
 * 
 * Copyright (c) 2025 by Zendure, All Rights Reserved. 
-->
# **SolarFlow 800**
## **电池包数据属性解析**
| 属性 | 值类型 | 备注 |
|------|--------|------|
| packType | int | 无用 |
| socLevel | int | 电池电量 |
| state | int | 0:待机, 1:充电, 2:放电 |
| power | int | 电池包功率 |
| maxTemp | int | 电池最高温度 (maxTemp) 采用开尔文温度的 0.1 倍进行存储，计算摄氏温度 (°C) 的公式如下： float maxTemp_Celsius = (maxTemp - 2731) / 10.0; // 单位: °C|
| totalVol | int | 总电压 |
| batcur | int | 总电流,数据转换 batcur 采用 32 位整数存储，其中高 16 位为符号扩展，因此需要进行符号位处理。计算公式如下：batcur_actual = ((int16_t)batcur) / 10.0; // 单位: A|
| maxVol | int | 最高单体电压，数据以 0.01V 为单位存储，转换为实际电压的计算方式：maxVol / 100.0 (单位: V)|
| minVol | int | 最低单体电压，数据以 0.01V 为单位存储，转换为实际电压的计算方式：minVol / 100.0 (单位: V)|
| softVersion | int | 软件版本 |
## **设备数据属性解析-只读**
| 属性 | 值类型 | 备注 |
|------|--------|------|
| heatState | int | 0:未加热, 1:加热中 |
| packInputPower | int | 电池包输入功率（放电） |
| outputPackPower | int | 输出到电池包功率（充电） |
| outputHomePower | int | 输出到家庭用电功率 |
| remainOutTime | int | 剩余放电时长（单位：分钟） |
| packState | int | 0:待机, 1:充电, 2:放电 |
| packNum | int | 电池包数量 |
| electricLevel | int | 电池包平均电量 |
| gridInputPower | int | 电网输入功率 |
| solarInputPower | int | 太阳能总输入功率 |
| solarPower1 | int | 太阳能线路1输入功率 |
| solarPower2 | int | 太阳能线路2输入功率 |
| pass | int | 0:否, 1:是 |
| reverseState | int | 0:否, 1:倒灌 |
| socStatus | int | 0:否, 1:校准中 |
| hyperTmp | int | 壳体温度 |
| dcStatus | int | 0:停止, 1:电池输入, 2:电池输出 |
| pvStatus | int | 0:停止, 1:运行 |
| acStatus | int | 0:停止, 1:并离网运行, 2:充电运行 |
| dataReady | int | 0:未准备好, 1:已准备好 |
| gridState | int | 0:未接入, 1:已接入 |
| FMVolt | int | 电压激活-电压值 |
| socLimit | int | 0:正常状态, 1:充电截止, 2:放电截止 |
## **设备数据属性解析-读写**
| 属性 | 值类型 | 备注 |
|------|--------|------|
| writeRsp | 无 | 读写响应回复 |
| acMode | int | 1:输入, 2:输出 |
| inputLimit | int | AC充电功率限制 |
| outputLimit | int | 输出功率限制 |
| socSet | int | 700-1000: 70%-100% |
| minSoc | int | 0-500: 0%-50% |
| gridReverse | int | 0:未启用, 1:允许倒灌, 2:禁止倒灌 |
| inverseMaxPower | int | 最大输出功率限制 |
| gridStandard | int | 请勿使用 |
| lampSwitch | int | 请勿使用 |
| IOTState | int | 请勿使用 |
| factoryModeState | int | 请勿使用 |
| OTAState | int | 请勿使用 |
| LCNState | int | 请勿使用 |
| oldMode | int | 请勿使用 |
| VoltWakeup | int | 请勿使用 |
| ts | int | 请勿使用 |
| bindstate | int | 请勿使用 |
| tsZone | int | 请勿使用 |
| chargeMaxLimit | int | 请勿使用 |
| smartMode | int | 请勿使用 |

