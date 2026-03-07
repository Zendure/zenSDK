// Configuration
let CONFIG = {
    url: "http://<server-ip>/properties/write",
    sn: "your_device_sn",
    maxChargePower: 1200,
    maxDischargePower: 600,
    delayMs: 500
};

// Internal state: Positive = Discharging, Negative = Charging
let currentBatteryPower = 0; 

function send(prop, delay) {
    Timer.set(delay, false, function() {
        Shelly.call("HTTP.POST", {
            url: CONFIG.url,
            header: { "Content-Type": "application/json" },
            body: JSON.stringify({ sn: CONFIG.sn, properties: prop })
        });
    });
}

function checkPower() {
    Shelly.call("EM.GetStatus", { id: 0 }, function (result) {
        if (!result) return;

        let gridPower = result.a_act_power + result.b_act_power + result.c_act_power;
        let nextBatteryPower = gridPower + currentBatteryPower;
        let d = CONFIG.delayMs;

        if (nextBatteryPower < 0) {
            // Charge
            let chargePower = Math.min(Math.abs(Math.round(nextBatteryPower)), CONFIG.maxChargePower);
            console.log("Grid: " + gridPower + "W -> Charging: " + chargePower + "W");
            
            send({ inputLimit: chargePower }, 0);
            send({ acMode: 1 }, d);
            send({ outputLimit: 0 }, d * 2);
            
            currentBatteryPower = -chargePower;
        } 
        else if (nextBatteryPower > 0) {
            // Discharge
            let dischargePower = Math.min(Math.round(nextBatteryPower), CONFIG.maxDischargePower);
            console.log("Grid: " + gridPower + "W -> Discharging: " + dischargePower + "W");
            
            send({ outputLimit: dischargePower }, 0);
            send({ acMode: 2 }, d);
            send({ inputLimit: 0 }, d * 2);
            
            currentBatteryPower = dischargePower;
        }
    });
}

// 15s Interval
Timer.set(15000, true, checkPower);
