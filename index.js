import express from "express"
import { configDotenv } from "dotenv"

configDotenv()
const app = express()
const port = process.env.PORT || 5000
app.use(express.json())

let teaData = []
let nextId = 1

// create a new tea
app.post('/teas', (req, res) => {
    const { name, price } = req.body
    const newTea = { id: nextId++, name, price }
    teaData.push(newTea)
    res.status(200).send(newTea)
})

// get all teas
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})

// get tea by id
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id)
    )

    if(!tea){
        return res.status(404).send('Tea not found')
    } else {
        return res.status(201).send(tea)
    }
})

// update tea
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found')
    } 
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    return res.status(201).send(tea)
})

// delete tea 
app.delete('/teas/:id', (req, res) => {
    const index = teaData.find(t => t.id === parseInt(req.params.id))

    if(index === -1) {
        return res.status(404).send("Tea not found")
    }

    teaData.splice(index, 1)
    return res.status(201).send("Tea deleted")
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);

})