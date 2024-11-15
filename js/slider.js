const bl = document.querySelector(".brand-list");
firstImg = bl.querySelectorAll(".brand")[0];
arrowIcons = document.querySelectorAll(".container-00 i");

let isDragStart = false, isDragging = false,prevPageX, prevScrollLeft, positionDiff;
let firstImgWidth = firstImg.clientWidth + 5;
let scrollWidth = bl.scrollWidth - bl.clientWidth;


const showHideIcons = () =>{
    arrowIcons[0].style.display = bl.scrollLeft == 0 ? "none":"block";
    arrowIcons[1].style.display = bl.scrollLeft == 0 ? "none":"block";
}


arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        bl.scrollLeft += icon.id == "left" ? -firstImgWidth: firstImgWidth;
        setTimeout(() => showHideIcons(), 60)
    });
});


const autoSlide = () => {
    if(bl.scrollLeft == (bl.scrollWidth - bl.clientWidth)) return;

    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;
    if(bl.scrollLeft > prevScrollLeft){
        return bl.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    bl.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = () =>{
    isDragStart = true;
    prevPageX = e.pageX || e.touched[0].pageX;
    prevScrollLeft = bl.scrollLeft;
}


const dragging = (e) => {
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    bl.classList.add("dragging");
    positionDiff = (e.pageX || e.touched[0].pageX) - prevPageX;
    bl.scrollLeft = prevScrollLeft - positionDiff;
}

const dragStop = () =>{
    isDragStart = false;
    bl.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}


bl.addEventListener("mousedown", dragStart);
bl.addEventListener("touchstart", dragStart);

bl.addEventListener("mousemove", dragging);
bl.addEventListener("touchmove", dragging);

bl.addEventListener("mouseup", dragStop);
bl.addEventListener("mouseleave", dragStop);
bl.addEventListener("touchend", dragStop);