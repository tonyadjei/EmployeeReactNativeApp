// require dependencies
const express = require('express');
const app = express();
const bodyParsrer = require('body-parser');
const mongoose = require('mongoose');

// mongoDB connection string
const mongoURI =
  'mongodb+srv://tonyadjei:Grace2402@cluster0.zcyre.mongodb.net/EmployeeApp?retryWrites=true&w=majority';

// connect to mongoDB database
const connectDB = async () => {
  const conn = await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};
connectDB();

// register middleware
app.use(bodyParsrer.json());

// require models
require('./models/Employee');
const Employee = mongoose.model('employee');

// create routes
app.get('/employees', async (req, res) => {
  const employees = await Employee.find();
  if (employees) {
    res.status(200).json({ count: employees.length, data: employees });
  }
});

app.post('/employees', async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    picture: req.body.picture,
    salary: req.body.salary,
    position: req.body.position,
  });
  createdEmployee = await employee.save();
  if (createdEmployee) {
    res.status(200).json(createdEmployee);
    console.log(createdEmployee);
  } else {
    console.log('An error occured: Could not save to database.');
  }
});

app.delete('/employees/:id', async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (employee) {
    console.log(employee);
    res.status(200).json({
      success: true,
      message: 'Employee' + employee.name + ' has been deleted succesfully',
    });
  }
});

app.put('/employees/:id', async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (employee) {
    res.status(200).json({ message: 'Employee updated', data: employee });
  }
});

// server listening
app.listen(3000, () => {
  console.log('Server is running');
});
