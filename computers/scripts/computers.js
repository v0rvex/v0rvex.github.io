function showInfo() {
    var preElement = document.getElementById('preText');
    var paraElement = document.getElementById('paraText');
    var svgElement = document.getElementById('Layer_1')
    svgElement.style.opacity = 0
    preElement.style.opacity = 0;
    setTimeout(()=>{preElement.style.display = 'none';
    svgElement.style.display = 'none'
    paraElement.style.display = 'block';}, 300)
    setTimeout(()=>{paraElement.style.opacity = 1}, 400)
}
function hideInfo() {
    var preElement = document.getElementById('preText');
    var paraElement = document.getElementById('paraText');
    var svgElement = document.getElementById('Layer_1')
    paraElement.style.opacity = 0;
    setTimeout(()=>{preElement.style.display = 'block';
    svgElement.style.display = 'block'
    paraElement.style.display = 'none';}, 300)
    setTimeout(()=>{preElement.style.opacity = 1;
    svgElement.style.opacity = 1}, 400)
}