"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
// A generic array to store all types of vehicles
const listOfVehicles = [];
app.get("/hello", (req, res) => {
    res.send("Hello world");
});
app.post("/vehicle/add", (req, res) => {
    const receivedVehicle = req.body;
    console.log(receivedVehicle);
    if ("bodyType" in receivedVehicle && "wheelCount" in receivedVehicle) {
        const newCar = receivedVehicle;
        listOfVehicles.push(newCar);
        res.status(201).send("Vehicle added");
    }
    else if ("draft" in receivedVehicle) {
        const newBoat = receivedVehicle;
        listOfVehicles.push(newBoat);
        res.status(201).send("Vehicle added");
    }
    else if ("wingspan" in receivedVehicle) {
        const newPlane = receivedVehicle;
        listOfVehicles.push(newPlane);
        res.status(201).send("Vehicle added");
    }
    else {
        const newVehicle = receivedVehicle;
        listOfVehicles.push(newVehicle);
        res.status(201).send("Vehicle added");
    }
});
app.get("/vehicle/search/:model", (req, res) => {
    const model = req.params.model;
    const searchArr = listOfVehicles.filter(vehicle => vehicle.model === model); // Creates an array with vehicles matching model
    if (searchArr.length !== 0) {
        res.status(200).send(searchArr[0]); // Send the first vehicle matching model back to the client
    }
    else {
        res.status(404).send("Vehicle doesn't exist");
    }
});
app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
});
