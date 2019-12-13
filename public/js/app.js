console.log('Client side java script file is running')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector("#message-two")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = ''
                messageTwo.textContent = data.error
                return console.log(data.error)
            }

            console.log(data)
            messageOne.textContent = '' + data.location
            messageTwo.textContent = data.forecast.summary +
                ' The temperature is ' + data.forecast.temperature + 'F with a ' +
                data.forecast.precipProb + '% chance of rain.'
        })
    })
})





// messageOne.textContent = 'From JavaScript'

// fetch('/weather').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             return console.log(data.error)
//         }

//         console.log(data)
//     })
// })