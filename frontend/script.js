
function Clicar() {
    var buttonS = document.getElementsByClassName('buttonSelect')
    document.querySelector('h1').style.display = 'flex'
    for (let index = 0; index < buttonS.length; index++) {
        buttonS[index].style.display = 'flex'
    }
    document.getElementById('init').style.display = 'none'
}