function startButton(){
    const button = document.getElementById('startButton')
    const canvas = document.getElementsByTagName('canvas')
    const text = document.getElementsByTagName('h1')

    console.log(button)
    console.log(canvas[0])

    button.style.opacity = 0

    setTimeout(()=>{
        canvas[0].classList.toggle('hidden')
        text[0].classList.toggle('hidden')
        button.remove()
    }, 200)
}