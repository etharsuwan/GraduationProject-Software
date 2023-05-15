
const io = require("socket.io")(8800, { cors: { origin: "*" } });

let Drivers = [];
let Customers = [];
let PackageDetails = {};

io.on("connection", (socket) => {
    // Add customer to the Customers array
    socket.on("addCustomer", (newUserId) => {
        if (!Customers.some((user) => user.userId === newUserId)) {
            Customers.push({ userId: newUserId, socketId: socket.id });
            socket.join("Customers");
            console.log("New Customer Connected", Customers);
            io.emit("get-Customers", Customers);

        }
    });

    // Add driver to the Drivers array
    // Add driver to the Drivers array
socket.on("addDriver", (newUserId) => {
  if (newUserId &&!Drivers.some((user) => user.userId === newUserId)) {
          Drivers.push({ userId: newUserId, socketId: socket.id });
          socket.join("drivers");
    console.log("New Driver Connected", Drivers);
    io.emit("get-drivers", Drivers);
  }
});

// Remove user from the respective array when disconnected
socket.on("disconnect", () => {
    let index = Drivers.findIndex((user) => user.socketId === socket.id);
    if (index >= 0) {
        Drivers.splice(index, 1);
        console.log("Driver Disconnected", Drivers);
        io.emit("get-drivers", Drivers);
    }

    let temp = Customers.findIndex((user) => user.socketId === socket.id);
    if (temp >= 0) {
        Customers.splice(temp, 1);
        console.log("Customer Disconnected", Customers);
        io.emit("get-customers", Customers);
    }
});
socket.on("send-deliveryReq", (data) => {
  PackageDetails[data.packageid] = {
    userId: data.userId,
    packageid: data.packageid,
    // other package details
  };
  console.log("New Package Request", data);
  io.to("drivers").emit("recieve-deliveryReq", data);
  socket.join(data.packageid);

});

socket.on("acceptDelivery", (data) => {
  console.log("accepted", data);

  // find the driver who accepted the delivery request
  let driver = Drivers.find((user) => user.socketId === socket.id);
  driver.location = data.driver_location;
  console.log("driver",driver.userId)
console.log('the driver after stor it',driver.location)
  // find the customer who made the delivery request
  let package = PackageDetails[data.packageid];
  if (package) {
    let customer = Customers.find((user) => user.userId === package.userId);
    console.log("ksjflskjdflksdjflksd")
    if (customer) {
      console.log("customer infos",customer)
      console.log("package.packageid",package.packageid)

      // send the driver's location, name, and ID to the customer
      io.to(customer.socketId).emit("driverAccepted", data);

      // join the driver and customer to a room with the package id as the room name
      socket.join(package.packageid);
    }
  }
});


socket.on("send-message", (data) => {
  console.log(data)
  if (!data) {
    console.log("Error: data is not provided");
    return;
  }
  const { receiverId } = data;
 
  let user;
  user = Customers.find((customer) => customer.userId === receiverId);
  console.log("user",user)
  if (!user) {
    user = Drivers.find((driver) => driver.userId === receiverId);
  }
  if (!user) {
    console.log("Error: user not found");
    return;
  }
  if(!user.socketId){
    console.log("Error: socketId is not exist");
    return;
  }
  console.log("Sending from socket to :", receiverId)
  console.log("Data: ", data)
  io.to(user.socketId).emit("recieve-message", data);
});


      });