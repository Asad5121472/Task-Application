

let burgerBtn = document.querySelector('.burgerBtn')
let partTwo = document.querySelector('.partTwo');



let flag = 0

burgerBtn.addEventListener('click', () => {
    if (flag == 0) {
      partTwo.style.transform = "translateX(0)"
      partTwo.style.display = "flex"
      flag = 1
    } else {
      partTwo.style.transform = "translateX(100%)"
      partTwo.style.display = "none"
      flag = 0
    }
})

