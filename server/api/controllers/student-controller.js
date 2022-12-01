import * as studentService from '../services/student-service.js';

// set status and send response
const setResponse = (res, status, data) => {
    res.status(status).json(data);
}

// get all students
export const getStudents = async (req, res) => {
    try {
        const student = await studentService.get();
        setResponse(res, 200, student);
    }
    catch (e) {
        setResponse(res, 400, { message: e.message });
    }
}

// get student by id
export const getStudentById = async (req, res) => {
    try {
        const student = await studentService.getById(req.params.id);
        setResponse(res, 200, student);
    }
    catch (e) {
        setResponse(res, 400, { message: e.message });
    }
}

// create a student
export const createStudent = async (req, res) => {
    try {
        const savedStudent = await studentService.save(req.body);
        setResponse(res, 201, savedStudent);
    }
    catch (e) {
        setResponse(res, 409, { message: e.message });
    }
}

// update a student
export const updateStudent = async (req, res) => {
    try {
        const updatedStudent = await studentService.update(req);
        setResponse(res, 200, updatedStudent);
    }
    catch (e) {
        setResponse(res, 409, { message: e.message });
    }
}

// delete an student
export const deleteStudent = async (req, res) => {
    try {
         //TODO @DELETE ALL THE QUESTIONS ASSOCIATED WITH THIS EXAM
        const deletedStudent = await studentService.remove(req.params.id);
        setResponse(res, 200, deletedStudent);
    }
    catch (e) {
        setResponse(res, 409, { message: e.message });
    }
}

// add student history
export const addTestHistory = async (req, res) => {
    try {
        const updatedStudent = await studentService.addHistory(req.params.id, req.body);
        setResponse(res, 200, updatedStudent);
    }
    catch (e) {
        setResponse(res, 409, { message: e.message });
    }
}
