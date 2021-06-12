const mongoose=require("mongoose");

const icdrateSchema=mongoose.Schema({
    Carrier: {
        type: String,
        // required: true
    },
    RateType: {
        type: String,
        // required: true
    },
    ContractNumber: {
        type: String,
        // required: true
    },
    Service: {
        type: String,
        // required: true
    },
    EffectiveFrom: {
        type: String,
        // required: true
    },
    ExpiryDate: {
        type: String,
        // required: true
    },
    Customer: {
        type: String,
        // required: true
    },
    Source: {
        type: String,
        // required: true
    },
    AgentOffice: {
        type: String,
        // required: true
    },
    TypeOfMove: {
        type: String,
        // required: true
    },
    ShipmentType: {
        type: String,
        // required: true
    },
    Commodities: {
        type: String,
        // required: true
    },
    Notes: {
        type: String,
        // required: true
    },
    Pol: {
        type: String,
        // required: true
    },
    TranshipmentPort: {
        type: String,
        // required: true
    },
    Pod: {
        type: String,
        // required: true
    },
    TransitTimeMin: {
        type: String,
        // required: true
    },
    TransitTimeMax: {
        type: String,
        // required: true
    },
    FreeTime: {
        type: String,
        // required: true
    },
    ContainerType: {
        type: String,
        // required: true
    },
    MaxpayLoad: {
        type: String,
        // required: true
    },
    MaxpayLoadUnit: {
        type: String,
        // required: true
    },
    FreightCurrency: {
        type: String,
        // required: true
    },
    BaseFreight: {
        type: String,
        // required: true
    },
    SellingFreight: {
        type: String,
        // required: true
    },
    CsfBuying: {
        type: String,
        // required: true
    },
    CsfSelling: {
        type: String,
        // required: true
    },
    ThdBuying: {
        type: String,
        // required: true
    },
    ThdSelling: {
        type: String,
        // required: true
    },


})

module.exports=mongoose.model("fcl_rate",icdrateSchema)