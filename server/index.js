const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 4000

// novu package
const { Novu } = require('@novu/node')
const novu = new Novu('8181abab20885c73d75eb1e474879354')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/api', (req,res) => {
    res.json({ message: 'Hello World' })
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

// An array containing all the users
const users = []

// Generates a random string as the ID
const generateID = () => Math.random().toString(36).substring(2, 10)

app.post('/api/register', (req,res) => {
    // Get the user's credentials
    const { email, password, tel, username } = req.body

    // Check if there is an existing user with the same email or password
    let result = users.filter((user) => user.email === email || user.tel === tel)

    // If none
    if (result.length === 0) {
        // creates the structure for the user
        const newUser = { id: generateID(), email, password, username, tel }
        // adds the user to the array of users
        users.push(newUser)
        // returns a message
        return res.json({
            message: "Account created successfully!",
        })
    }
    // runs if a user exists
    res.json({
        error_message: "User already exists",
    })
})

// variable that holds the generated code
let code;

app.post("/api/login", (req,res) => {
    // accepts the user's credentials
    const { email, password } = req.body
    // checks for user(s) with the same email and password
    let result = users.filter(
        (user) => user.email === email && user.password === password
    )

    // if no user exists, it returns an error message
    if(result.length !== 1) {
        return res.json({
            error_message: "Incorrect Credentials",
        })
    }
    code = generateCode();

    //👇🏻 Send the SMS via Novu
    sendNovuNotification(result[0].tel, code);

    // return the username of the user after a successful login
    res.json({
        message: "Login successfully",
        data: {
            username: result[0].username,
        },
    })
})

// Generates the code to be sent via SMS
const generateCode = () => Math.random().toString(36).substring(2, 12);

const sendNovuNotification = async (recipient, verificationCode) => {
    try {
        let response = await novu.trigger(novu, {
            to: {
                subscriberId: "63e97e108ce4830a1914bd1d",
                phone: +18456812803,
            },
            payload: {
                code: verificationCode,
            },
        });
        console.log(response);
    } catch (err) {
        console.error(err);
    }
};

app.post("/api/verification", (req, res) => {
    if (code === req.body.code) {
        return res.json({ message: "You're verified successfully" });
    }
    res.json({
        error_message: "Incorrect credentials",
    });
});