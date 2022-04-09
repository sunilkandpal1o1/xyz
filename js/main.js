const changePage = (dir) => {100
    console.log('scroll')
    const div = document.querySelector('.book');
    console.log(div.scrollWidth, div.scrollWidth, div.scrollLeft, div)
    const maxWidth = div.clientWidth;
    const scrollAmount = Math.floor( (20 * maxWidth ) / 100 );
    let scrollCompleted = 0;
    // alert(div.scrollLeft);
    let slideTimer = setInterval(()=>{
        console.log('timer')
        if(dir == 'left') {
            div.scrollLeft -= div.scrollLeft - 0 < scrollAmount ? maxWidth - div.scrollLeft : scrollAmount;
            // alert(`${div.scrollLeft} ${scrollAmount}`)
        } else {
            div.scrollLeft += maxWidth - div.scrollLeft < scrollAmount ? maxWidth - div.scrollLeft : scrollAmount;
            // alert(`${maxWidth} ${div.scrollLeft} ${scrollAmount}`)

        }
        scrollCompleted += 100;
        if(Math.round( div.scrollLeft) >= maxWidth || div.scrollLeft == 0) {
            // alert( div.scrollLeft);
            clearInterval(slideTimer);
        }
    }, 50);
    // div.scrollLeft = 800;
}

const buttonClicked = (id,dir) => {
    const button = document.querySelector('#'+id);
    const currentActiveButtons = document.getElementsByClassName('active-button') //document.querySelector('.active-button');

    console.log('->',currentActiveButtons);
    if(currentActiveButtons.length > 0) {
        for(let i = 0; i<currentActiveButtons.length; i++) {
            currentActiveButtons[i].classList.remove('active-button');

        }
        
        // currentActiveButtons.classList.remove('active-button');
    }
    button.classList.add('active-button');
    changePage(dir);
}

const touchableElement = document.querySelector('.book');
touchableElement.addEventListener('touchstart', function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

touchableElement.addEventListener('touchend', function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false);


function handleGesture() {
    if (touchendX < touchstartX) {
        console.log('Swiped Left');
        // changePage('right');
        buttonClicked('second','right');
    }

    if (touchendX > touchstartX) {
        console.log('Swiped Right');
        buttonClicked('first','left');
        // changePage('left');
    }

    if (touchendY < touchstartY) {
        console.log('Swiped Up');
    }

    if (touchendY > touchstartY) {
        console.log('Swiped Down');
    }

    if (touchendY === touchstartY) {
        console.log('Tap');
    }
}