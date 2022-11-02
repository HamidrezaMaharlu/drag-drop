const images = [
    {id: 1, name: "pic1", src: "./images/1-200x200.webp"},
    {id: 2, name: "pic2", src: "./images/2-200x200.webp"},
    {id: 3, name: "pic3", src: "./images/3-200x200.webp"},
    {id: 4, name: "pic4", src: "./images/4-200x200.webp"},
    {id: 5, name: "pic5", src: "./images/5-200x200.webp"},
    {id: 6, name: "pic6", src: "./images/6-200x200.webp"},
    {id: 7, name: "pic7", src: "./images/7-200x200.webp"},
    {id: 8, name: "pic8", src: "./images/8-200x200.webp"},
    {id: 9, name: "pic9", src: "./images/9-200x200.webp"},
    {id: 10, name: "pic10", src: "./images/10-200x200.webp"},
]
const speedInput = document.getElementById("speed");
const img = document.querySelector('#image');
const display = document.getElementById("display")
const start = document.getElementById("start");

let numberOfImgShowed = 1
let TimeOutIdOuter;
let TimeOutIdInner;
let count = 0;

function setSpeed() {
    document.querySelectorAll(".innerBox").forEach(box => box.innerHTML = "");
    document.querySelector("#display").innerHTML = "";
    document.querySelector("#counter").innerHTML = "0";
    count=0
    let sec;
    if (speedInput.value > 0 && speedInput.value < 6) {
        switch (speedInput.value) {
            case "1":
                sec = 1000
                break;
            case "2":
                sec = 800;
                break;
            case "3":
                sec = 600;
                break;
            case "4":
                sec = 500;
                break;
            case "5":
                sec=200;
                break;
        }
        TimeOutIdOuter = setTimeout(function showImage() {
            if (numberOfImgShowed <= images.length - 1) {
                document.querySelector(".image").id = images[numberOfImgShowed].id;
                document.querySelector(".image").ariaLabel = images[numberOfImgShowed].name;
                document.querySelector(".image").src = images[numberOfImgShowed].src;
                start.disabled = true;
                numberOfImgShowed++;
                TimeOutIdInner = setTimeout(showImage, sec)
            } else {
                document.getElementById("10").style.display = "none"
                document.getElementById("end").style.display = "block"
                start.disabled = false;
                speedInput.value = 0;
            }
        }, sec);
    }

}

function resetNumberOfImgShowed() {
    numberOfImgShowed = 0;
    document.querySelector(".image").src = "./images/ready.jpg";
    document.querySelector(".image").style.display = "block";
    document.querySelector(".image").id = "image";
    document.getElementById("end").style.display = "none";
    document.getElementById("start").disabled = false;
    clearTimeout(TimeOutIdInner)
}


// attach the dragstart event handler
img.addEventListener('dragstart', dragStart);

// handle the dragstart
function dragStart(e) {
    console.log('drag starts...');
    e.dataTransfer.setData('text/plain', e.target.id);
}

const dropes = document.querySelectorAll('.innerBox');

dropes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
});


function dragEnter(event) {
    event.preventDefault();
    event.target.classList.add("hi")
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add("hi")
}

function dragLeave(e) {
    e.target.classList.remove("hi")
}

function drop(e) {
    e.target.classList.remove("hi")
    ++count
    document.getElementById("counter").innerText = `${count}`
    // get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    const img = document.createElement("img")
    const findImage = images.find(image => image.id == id)
    img.className = "addImage"
    img.src = findImage.src
    // add it to the drop target
    e.target.appendChild(img);
    switch (e.target.id) {
        case "nameImg":
            display.innerHTML = `<p>The name of image is:${findImage.name}</p>`;
            break;
        case "tag" :
            display.innerHTML = ` Tag of element is: ${e.target.lastChild.tagName}`;
            break;
        case "idImg":
            display.innerHTML = `Id of element is: ${findImage.id}`;
            break;
        case "dimension":
            display.innerHTML = `The dimension of element is ${e.target.lastChild.naturalWidth}x${e.target.lastChild.naturalHeight}`;
            break
    }
}