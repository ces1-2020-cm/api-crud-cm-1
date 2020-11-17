const {Router} = require("express")
const router = Router()
const fs = require("fs")
const FileEstudiantes = fs.readFileSync('./estudiantes.json', 'utf-8')
const JSONEstudiantes = JSON.parse(FileEstudiantes)

router.get("/", (req, res) => {
  res.send("API REST Estudianetes")
})

router.get("/estudiantes", (req, res) => {
  res.json(JSONEstudiantes)
})

router.post("/estudiantes", (req, res) => {
  let id = JSONEstudiantes.length + 1
  let {correo, nombre, apellido, html} = req.body
  let nuevoEstudiante = {
    "id" : id,
    "nombre" : nombre,
    "apellido" : apellido,
    "correo" : correo,
    "html" : html
  } 
  JSONEstudiantes.push(nuevoEstudiante)
  fs.writeFileSync('./estudiantes.json', JSON.stringify(JSONEstudiantes), 'utf-8')
  res.status(201).json(nuevoEstudiante)
})

router.get("/estudiantes/:id", (req,res) => {
  let id = req.params.id
  let estudianteEncontrado = JSONEstudiantes.find(estudiante => estudiante.id == id)

  if(estudianteEncontrado != undefined)
    res.status(200).json(estudianteEncontrado)
  else
    res.json(`El ID ${id} no existe`)
})

router.put("/estudiantes/:id", (req,res) => {
  let id = req.params.id 
  let {correo, nombre, apellido, html} = req.body

  let estudianteModifcado = JSONEstudiantes.find(estudiante => {
    if(estudiante.id == id){
      estudiante.nombre = nombre
      estudiante.apellido = apellido
      estudiante.correo = correo
      estudiante.html = nombre
      estudiante.nombre = nombre
    }
  })

})

module.exports = router