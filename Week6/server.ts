import express, {Express, Request, Response} from "express"

const app: Express = express()
app.use(express.json())

const port = 3000

// Common properties for all vehicles
type Vehicle = {
  model: string;
  color: string;
  year: number;
  power: number;
};

// Car-specific properties
type Car = Vehicle & {
  bodyType: string;
  wheelCount: number;
};

// Boat-specific properties
type Boat = Vehicle & {
  draft: number;
};

// Plane-specific properties
type Plane = Vehicle & {
  wingspan: number;
};

// A generic array to store all types of vehicles
const listOfVehicles: (Car | Boat | Plane | Vehicle)[] = []

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello world")
})

app.post("/vehicle/add", (req: Request, res: Response) => {
  const receivedVehicle = req.body
  console.log(receivedVehicle)
  if ("bodyType" in receivedVehicle && "wheelCount" in receivedVehicle) {
    const newCar: Car = receivedVehicle as Car
    listOfVehicles.push(newCar);
    res.status(201).send("Vehicle added")

  } else if ("draft" in receivedVehicle) {
    const newBoat: Boat = receivedVehicle as Boat
    listOfVehicles.push(newBoat);
    res.status(201).send("Vehicle added")

  } else if ("wingspan" in receivedVehicle) {
    const newPlane: Plane = receivedVehicle as Plane;
    listOfVehicles.push(newPlane);
    res.status(201).send("Vehicle added")
  } else {
    const newVehicle: Vehicle = receivedVehicle as Vehicle
    listOfVehicles.push(newVehicle)
    res.status(201).send("Vehicle added")
  }})

app.get("/vehicle/search/:model", (req: Request, res: Response) => {
  const model = req.params.model
  const searchArr = listOfVehicles.filter(vehicle => vehicle.model === model) // Creates an array with vehicles matching model

  if(searchArr.length !== 0) {
    res.status(200).send(searchArr[0]) // Send the first vehicle matching model back to the client
  } else {
    res.status(404).send("Vehicle doesn't exist")
  }
  })

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`)
})

