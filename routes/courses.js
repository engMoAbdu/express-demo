const Joi = require("joi");
const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extends: true })); // MW function

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" }
];

router.get("/:id", (req, res) => {
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send(`No Courses with id ${req.params.id}`);
  else return res.send(course);
});

router.get("/", (req, res) => {
  res.send(courses);
});

router.post("/", (req, res) => {
  const { error } = validationCourse(req.body);

  if (error) return res.status(400).send(result.error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send(`No Courses with id ${req.params.id}`);

  const { error } = validationCourse(req.body);

  if (error) return res.status(400).send(result.error.details[0].message);

  course.name = req.body.name;

  courses.push(course);
  res.send(course);
});

router.delete("/:id", (req, res) => {
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send(`No Courses with id ${req.params.id}`);

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validationCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required() // .alphanum()
  });

  return schema.validate(course);
}

module.exports = router;
