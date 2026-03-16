const express = require("express")
const axios = require("axios")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

const API_URL = "https://n8n.axadcapital.com/webhook/67c68825-eef7-424f-874b-4cb3e3908ef1"

app.post("/submit-lead", async (req, res) => {

    try {

        const {
            phone,
            state,
            firstName,
            lastName,
            email,
            zip,
            street,
            city,
            dateOfBirth
        } = req.body

        const apiUrl =
            `${API_URL}?state=${state}&phone=${phone}&firstName=${firstName}&lastName=${lastName}&email=${email}&zip=${zip}&street=${street}&city=${city}&dateOfBirth=${dateOfBirth}`

        const response = await axios.get(apiUrl)

        const data = response.data

        if (data.status === "no-target") {
            return res.json({
                success: false,
                message: "Lead already exists or not qualified."
            })
        }

        if (data.agent_count === 0) {
            return res.json({
                success: false,
                message: "Agent not available. Try later."
            })
        }

        return res.json({
            success: true,
            message: "Agent available. You can transfer the call."
        })

    } catch (error) {

        console.error(error)

        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`)
})