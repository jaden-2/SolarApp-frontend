//---------------Request body payload------------------
export interface SystemParams {
  preferredPanel: solarPanel;
  daysOfBackup: number;
  psh: number;
  loadOnBattery: number;
  arraySeriesLength: number;
  systemVolt: number;
  batteryType: batteryCategories;
}
export type solarPanel = {
  brand: string,
  type: string,
  power: number
}
export type batteryCategories = "LITHIUM"|"AGM"|"FLOODED"|"";

export interface Payload extends SystemParams{
  energy_wh: number,
  load_w: number
}

//----------------end----------------------


//---------------Report interface--------------
export interface reportInterface{
    reportId: number,
    title: string|null,
    batteryBank: {
        batteryId: number,
        brand: string,
        batteryCurrentCapacityAh: number,
        batteryVoltage: number,
        batteryEnergyCapacityAh: number,
        requiredBankCapacityAh: number,
        batteryType: batteryCategories, 
        configuration: configuration
    },

    solarArray:{
        arrayId: number,
        brand: string, 
        model: string,
        mechanicalProperties:{
            length_m: number,
            width_m: number
        },
        electricalProperties: {
            power_w: number,
            Vmax: number,
            type: "MONO"|"POLY",
            Imp: number,
            Isc: number,
            Voc: number
        },
        configuration: configuration,
        calculatePanelCapacity: number
    },
    dcBreaker: {
        breakerId: number,
        model: string,
        current: number,
        maximumVoltage: number,
        type: "DC"|"AC",
        calculatedCapacity: string
    },

    wireDetails: [
        wireDetail, wireDetail
    ],
    inverter:{
        inverterId: number,
        name: string,
        model: string,
        capacityKva: number,
        systemVoltage: number,
        type: string,
        calculatedInverterCapacityKva: number,
        configuration: configuration
    },
    chargeController:{
        controllerId: number,
        brand: string, 
        model: string, 
        type: string, 
        maximumChargeCurrent: number,
        minimumVolts: number, 
        maximumVolts: number,
        calculatedCapacity: number,
        configuration: configuration
    },
    createdAt: string,
    updatedAt: string|null
}

interface configuration{
    series: number,
    parallel: number,
    total: number
}
interface wireSpecification{
    SWG: string,
    diameter_mm: number,
    maxCurrent: number
}
export interface wireDetail{
    type: "COPPER"|"ALUMINUM",
    maximumAllowedWireLength_m: number,
    powerLoss: number,
    wireSpecification: wireSpecification,
    lengthtType: string,
    recommendation: string
}
