function mouseOver1(){
    const osBox = document.getElementById('OSbox')
    const svgObject2 = document.getElementById('OSsvg2')
    const svgObject3 = document.getElementById('OSsvg3')
    const svgObject1 = document.getElementById('OSsvg1')
    
    svgObject1.style.filter = 'grayscale(0)'
    svgObject1.style.top = '1%'

    svgObject2.style.top ='37%'
    svgObject3.style.top = '37%'

    osBox.style.gridTemplateColumns = '3fr 1fr 1fr'
}
function mouseOver2(){
    const osBox = document.getElementById('OSbox')
    const svgObject1 = document.getElementById('OSsvg1')
    const svgObject3 = document.getElementById('OSsvg3')
    const svgObject2 = document.getElementById('OSsvg2')
    svgObject2.style.filter = 'grayscale(0)'
    svgObject2.style.top = '1%'

    svgObject1.style.top = '37%'
    svgObject3.style.top = '37%'

    osBox.style.gridTemplateColumns = '1fr 3fr 1fr'
}
function mouseOver3(){
    const osBox = document.getElementById('OSbox')
    const svgObject1 = document.getElementById('OSsvg1')
    const svgObject2 = document.getElementById('OSsvg2')
    const svgObject3 = document.getElementById('OSsvg3')
    svgObject3.style.filter = 'grayscale(0)'
    svgObject3.style.top = '1%'

    svgObject1.style.top = '37%'
    svgObject2.style.top = '37%'

    osBox.style.gridTemplateColumns = '1fr 1fr 3fr'
}
function mouseOut(){
    const osBox = document.getElementById('OSbox')
    const svgObject1 = document.getElementById('OSsvg1')
    const svgObject2 = document.getElementById('OSsvg2')
    const svgObject3 = document.getElementById('OSsvg3')

    osBox.style.gridTemplateColumns = '1fr 1fr 1fr'
    svgObject1.style.top = '30%'
    svgObject2.style.top = '30%'
    svgObject3.style.top = '30%'
    svgObject1.style.filter = 'grayscale(100%)'
    svgObject2.style.filter = 'grayscale(100%)'
    svgObject3.style.filter = 'grayscale(100%)'
}