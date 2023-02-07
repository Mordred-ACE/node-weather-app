const weatherform = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'

weatherform.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = searchElement.value
    messageOne.textContent = "Loading"
    messagetwo.textContent = "Loading"
    fetch('http://localhost:3000/weather/?address=' + location).then((response)=>{
        response.json().then((data)=>{
            console.log(data)
            messageOne.textContent = data.location
            messagetwo.textContent = data.weather
        })
    })
})