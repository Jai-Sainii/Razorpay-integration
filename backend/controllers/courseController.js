const Course = require("../models/Course")

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch courses" });
    }
}

exports.addCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to add course" });
    }
}