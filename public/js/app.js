console.log('Client side js file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const forecastIcon = document.querySelector('#forecastIcon')

//messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    forecastIcon.src = ''

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = 'ERROR'
                messageTwo.textContent = data.error
                //                console.log(data.error)
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                forecastIcon.src = data.forecastIcon
//                    console.log(data.location)
//                    console.log(data.forecast)
            }
        })
    })
    

//    console.log('Testing! '+location)
})