const Student = require('../models/student'); // Replace with the actual path to your Student model 
 
exports.createStudent = async (req, res) => { 
  try { 
    console.log(req.body);
    const { ID, name, course, cgpa, mobilenumber, mail} = req.body; 
    const newStudent = await Student.create({ ID, name, course, cgpa, mobilenumber, mail })
    await newStudent.save(); 
    res.status(201).json(newStudent);
    //console.log(newStudent); 
  } catch (error) { 
    res.status(500).json({ message: 'Error creating student', error: error.toString() }); 
  } 
}; 
 
exports.getStudents = async (req, res) => { 
  try { 
    const students = await Student.find({}); 
    res.json(students); 
  } catch (error) { 
    res.status(500).json({ message: 'Error fetching students', error: error.toString() }); 
  } 
}; 
 
exports.getStudentById = async (req, res) => { 
  try { 
    const studentId = req.params.id; 
    const student = await Student.findOne({ ID: studentId }); 
    if (!student) { 
      res.status(404).json({ message: 'Student not found' }); 
    } else { 
      res.json(student); 
    } 
  } catch (error) { 
    res.status(500).json({ message: 'Error fetching student by id', error: error.toString() }); 
  } 
};
 
exports.updateStudent = async (req, res) => { 
  try { 
    const studentId = req.params.id; 
    const updatedData = req.body; 
    const filter = { ID: studentId }; // Filter based on the ID field
    const options = { new: true }; // Return the updated document
    const student = await Student.findOneAndUpdate(filter, updatedData, options); 
    if (!student) { 
      res.status(404).json({ message: 'Student not found' }); 
    } else { 
      res.json(student); 
    } 
  } catch (error) { 
    res.status(500).json({ message: 'Error updating student', error: error.toString() }); 
  } 
};

 
exports.deleteStudent = async (req, res) => { 
  try { 
    const studentId = req.params.id; 
    const filter = { ID: studentId }; // Filter based on the ID field
    const deletedStudent = await Student.findOneAndDelete(filter); 
    if (!deletedStudent) { 
      res.status(404).json({ message: 'Student not found' }); 
    } else { 
      res.json({ message: 'Student deleted successfully' }); 
    } 
  } catch (error) { 
    res.status(500).json({ message: 'Error deleting student', error: error.toString() }); 
  } 
};