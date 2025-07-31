# Système de Contrôle Local Zendure

---

<p align="center">
  <img src="https://zendure.com/cdn/shop/files/zendure-logo-infinity-charge_240x.png?v=1717728038" alt="Logo Zendure" width="240">
</p>

# 📖 Navigation dans la documentation

Ce projet propose une documentation multilingue ; choisissez votre langue :

* 🇨🇳 [中文](./zh.md)
* 🇬🇧 [English](../README.md)
* 🇩🇪 [Deutsch](./de.md)
* 🇫🇷 [Français](./fr.md)

---

# 🌟 Vue d’ensemble

Au cours de notre précédent projet [Device Data Report](https://github.com/Zendure/developer-device-data-report), nous avons constaté la nécessité d’une commande locale améliorée.Pour y répondre, nous avons créé le framework IoT **ZenSDK** et ouvrons maintenant son **API locale** afin de permettre aux développeurs de :

- Obtenir en temps réel l’état et les propriétés des appareils
- S’abonner aux flux de données des appareils
- Contrôler à distance les fonctions des appareils
- Intégrer des clients MQTT tiers (y compris [Home Assistant](https://www.home-assistant.io/integrations/mqtt/))
- Développer des fonctionnalités personnalisées via des API ouvertes pour améliorer l’expérience utilisateur

Une idée innovante autour des produits **Zendure** ? Contactez-nous !

---

# 📌 Produits pris en charge

| Modèle               | Version du firmware | Statut |
| --------------------- | ------------------- | ------ |
| SolarFlow800          | Dernière           |        |
| SolarFlow800 Pro      | Dernière           |        |
| SolarFlow2400 AC      | Dernière           |        |
| SmartMeter3CT         | Dernière           |        |
| (Bientôt disponible) | –                  |        |

---

# 🚀 Architecture principale

La commande locale repose sur la **découverte de service mDNS** associée à une **communication HTTP**.

## 1. Découverte des appareils (mDNS)

Après connexion au réseau, l’appareil diffuse via **mDNS** :

- Nom de service : `Zendure-<Modèle>-<12derniersMAC>`(ex. : `Zendure-SolarFlow800-WOB1NHMAMXXXXX3`)
- Adresse IP
- Port du service HTTP

Les clients du même réseau local peuvent écouter ces diffusions pour détecter automatiquement les appareils.

## 2. Interface de communication (API HTTP RESTful)

Chaque appareil embarque un serveur HTTP interne.

### Opérations de base

| Méthode | Objet                            | Exemple                                              |
| -------- | -------------------------------- | ---------------------------------------------------- |
| `GET`  | Lire l’état / les propriétés | `GET /properties/report` (toutes les propriétés) |
| `POST` | Envoyer des commandes / configs  | `POST /properties/write` (écrire une propriété) |

### Formats de données

- **GET** : pas de corps, réponse JSON.
- **POST** : corps JSON contenant obligatoirement le numéro de série `sn`.

#### Exemple 1 : lire les propriétés

```http
GET /properties/report
```

#### Exemple 2 : écrire une propriété / configurer

```http
POST /properties/write
Content-Type: application/json

{
  "sn": "WOB1NHMAMXXXXX3",      // Obligatoire
  "properties": {
    "acMode": 2                 // Propriété modifiable
  }
}
```

#### Exemple 3 : vérifier l’état MQTT

```http
GET /rpc?method=HA.Mqtt.GetStatus
```

#### Exemple 4 : obtenir la configuration MQTT

```http
GET /rpc?method=HA.Mqtt.GetConfig
```

#### Exemple 5 : définir la configuration MQTT

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

# 🛠️ Outils de développement

## Découverte mDNS au niveau système

| OS      | Commande exemple                                             | Description                               |
| ------- | ------------------------------------------------------------ | ----------------------------------------- |
| Windows | `Get-Service \| Where-Object { $_.Name -like "*Bonjour*" }` | Vérifier le service Bonjour              |
| macOS   | `dns-sd -B _zendure._tcp`                                  | Parcourir les appareils Zendure           |
| Linux   | `avahi-browse -r _zendure._tcp`                            | Découvrir les services `_zendure._tcp` |

## Exemples de code

- [C](../examples/C/demo.c)
- [C#](../examples/C%23/demo.cs)
- [Java](../examples/Java/demo.java)
- [JavaScript](../examples/JavaScript/demo.js)
- [PHP](../examples/PHP/demo.php)
- [Python](../examples/Python/demo.py)
- [Test en ligne de commande](#test-rapide-en-ligne-de-commande)

### Test rapide en ligne de commande

```bash
# Récupérer toutes les propriétés
curl -X GET "http://<ip-appareil>/properties/report"

# Vérifier l’état MQTT
curl -X GET "http://<ip-appareil>/rpc?method=HA.Mqtt.GetStatus"

# Définir la propriété acMode
curl -X POST "http://<ip-appareil>/properties/write" \
  -H "Content-Type: application/json" \
  -d '{"sn": "votre_sn_appareil", "properties": { "acMode": 2 }}'
```

---

# 📚 Référence des propriétés

Pour le détail des propriétés de chaque produit :
[Documentation des propriétés SolarFlow](./fr_properties.md)

---
