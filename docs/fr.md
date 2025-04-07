# Système de contrôle local Zendure v1.0.0

---

<p align="center">
  <img src="https://zendure.com/cdn/shop/files/zendure-logo-infinity-charge_240x.png?v=1717728038" alt="Logo">
</p>

# 📖 Guide de documentation

Ce projet contient des documents en plusieurs langues. Veuillez choisir votre langue :

* 🇨🇳 [中文](./zh.md)
* 🇬🇧 [English](../README.md)
* 🇩🇪 [Deutsch](./de.md)
* 🇫🇷 [Français](./fr.md)

---

# Présentation

Je suis **David**, ingénieur en développement IoT chez **Zendure**, et je suis passionné par les **produits IoT de Zendure**.

Dans les [projets précédents](https://github.com/Zendure/developer-device-data-report), nous avons rencontré plusieurs défis. Afin d’y remédier, j’ai développé une nouvelle architecture IoT, ZenSDK. J’aimerais recueillir vos suggestions pour améliorer l’expérience utilisateur. Désormais, l’**API locale** est disponible, permettant aux développeurs de :

* Récupérer les informations de leurs appareils
* Recevoir les données des appareils
* Contrôler les appareils via l’API
* Effectuer un développement créatif secondaire pour optimiser l’expérience utilisateur

Si vous avez des **idées innovantes** pour les produits **Zendure**, n’hésitez pas à me contacter ! Pendant mon temps libre, je continuerai à optimiser cette solution pour offrir à chaque passionné de **Zendure** une **expérience produit exceptionnelle** ! 🚀

---

# 📌 Présentation du projet

Ce document prend actuellement en charge les produits suivants :

| Nom du produit          | Version du firmware | Remarques |
| ----------------------- | ------------------- | --------- |
| SolarFlow 800           | 1.0.2               |           |
| Mise à jour en attente |                     |           |

# **🚀 Fonctionnalités principales**

Le contrôle local est réalisé grâce à la combinaison des **services mDNS** et du **serveur HTTP**, permettant la découverte automatique des appareils et une communication efficace.

> 1. **Découverte des appareils** : Grâce au protocole **mDNS (Multicast DNS)**, les appareils du même réseau local peuvent être découverts automatiquement et leurs informations de service (adresse IP, port, etc.) peuvent être récupérées dynamiquement.
> 2. **Communication entre appareils** : Basé sur le **protocole HTTP**, les appareils peuvent échanger des données via **RESTful API**, garantissant un contrôle local efficace et stable.

## **📖 Explication des termes**

| Terme                                        | Description                                                                                                                                                                                                             |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **mDNS (Multicast DNS)**               | Un**protocole de découverte réseau sans configuration** qui permet aux appareils de s’identifier sans serveur DNS central.                                                                                     |
| **HTTP (HyperText Transfer Protocol)** | Un protocole de communication basé sur un**modèle requête/réponse**, largement utilisé pour l’échange de données entre clients et serveurs, adapté à la communication entre appareils en réseau local. |
| **RESTful API**                        | Un style d’API basé sur**HTTP**, offrant une interface d’accès aux ressources unifiée avec **simplicité** et **extensibilité**.                                                                |

---

## **Mécanisme de découverte des appareils**

* **Diffusion mDNS** : Lorsqu’un appareil démarre et se connecte au réseau, il diffuse son nom et son type de service via mDNS. Le nom d’hôte suit toujours le format `Zendure-<model>-XXXXXXXXXXXX`, fournissant l’adresse IP et le port du service HTTP. Les autres appareils du réseau écoutent ces diffusions mDNS pour récupérer les informations sur les nouveaux appareils.
* **Convention de nommage des services** : Le nom des appareils peut contenir le type d’appareil et son numéro de série (SN), permettant aux autres appareils d’identifier rapidement leur fonction ou rôle.
* Exemple : `Zendure-<model>-XXXXXXXXXXXX`

## **Mécanisme de communication entre appareils**

* **Communication via API HTTP** : Chaque appareil héberge un serveur HTTP sur le réseau local, permettant aux autres appareils d’interagir avec lui via HTTP. Grâce à un design d’API RESTful, les opérations suivantes sont prises en charge :
  * **Requêtes GET** : Récupérer l’état de l’appareil ou obtenir des données, comme l’ensemble des propriétés de l’appareil.
  * **Requêtes POST** : Envoyer des commandes de contrôle, comme allumer ou éteindre un appareil.

Exemple d’API :

```HTTP
GET  /properties/report     # Obtenir toutes les propriétés actuelles de l’appareil
POST /properties/write      # Envoyer des commandes de contrôle, comme activer/désactiver un appareil
```

* **Format des messages de communication** : La méthode POST utilise JSON comme format de transmission des données, facilitant l’analyse et assurant une compatibilité multiplateforme. Chaque appareil doit suivre une structure JSON unifiée pour garantir une compatibilité entre appareils.

```
{
    "sn": "WOB1NHMAMXXXXX3", // Obligatoire
    "properties": {
        "acMode": 2 // Propriété en lecture/écriture
    }
}
```
## **Windows/MacOS/Linux Découverte de service mDNS**
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

## **Exemples d’appel**

* [C Example](../examples/C/demo.c)
* [C# Example](../examples/C#/demo.cpp)
* [Java Example](../examples/Java/demo.java)
* [JavaScript Example](../examples/JavaScript/demo.js)
* [PHP Example](../examples/PHP/demo.php)
* [Python Example](../examples/Python/demo.py)
* **Ligne de commande Windows/MacOS/Linux**

```sh
curl -X GET "http://<server-ip>/properties/report"
curl -X POST "http://<server-ip>/properties/write" -H "Content-Type: application/json" -d '{"sn": "your_device_sn","properties":{"acMode":2}}'
```

## Explication des propriétés des produits
* [SolarFlow 800](./en_properties.md)