const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  graduationYear: { type: Number, required: true },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
