function animateToPosition(domElement, timeInMilliseconds, originalPosition, destinationPosition, callback){
    var isEnded = false;

    var originalX = typeof originalPosition.x === 'number' ? originalPosition.x : undefined,
        originalY = typeof originalPosition.y === 'number' ? originalPosition.y : undefined,
        destinationX = typeof destinationPosition.x === 'number' ? destinationPosition.x : undefined,
        destinationY = typeof destinationPosition.y === 'number' ? destinationPosition.y : undefined,
        intervalX,
        intervalY;


    //origin and destination
    if(typeof originalX === 'number' && typeof destinationX === 'number'){
        intervalX = (destinationX - originalX)/timeInMilliseconds;
    } else if(typeof originalY === 'number' && typeof destinationY === 'number'){
        intervalY = (destinationY - originalY)/timeInMilliseconds;
    } else {
        console.log('You do not have enough coordinates to animate object');
        return;
    }

    var currentX = originalX, currentY = originalY
        ,timerCount = 0;

    var animationIntervalId = setInterval(function(){
        if(timerCount === timeInMilliseconds){
            clearInterval(animationIntervalId);

            if(callback && typeof callback === 'function'){
                callback();
            }

            return;
        }

        domElement.classList.add('hide');

        //get interval
        if(typeof currentX === 'number' && typeof intervalX === 'number'){
            currentX = currentX + intervalX;
            domElement.setAttribute('style', 'left:' + currentX + 'px; position:absolute');
        }

        if(typeof currentY === 'number' && typeof intervalY === 'number'){
            currentY = currentX + intervalY;
            domElement.setAttribute('style', 'top:' + currentY + 'px; position:absolute');
        }

        domElement.classList.remove('hide');
        timerCount++;

    }, 1);
}

function playHadouken(){
    var hadoukenSound = document.getElementById('haouken-sound');

    hadoukenSound.volume = 0.5;
    hadoukenSound.load();
    hadoukenSound.play();
}

document.addEventListener("DOMContentLoaded", function() {
    // code…
    var ryu = document.getElementById('ryu'),
        ryuReady = document.getElementById('ryu-ready'),
        ryuStill = document.getElementById('ryu-still'),
        ryuThrowing = document.getElementById('ryu-throwing'),
        hadouken = document.getElementById('hadouken'),
        ryuCool = document.getElementById('ryu-cool');

    ryuReady.classList.add('hide');
    ryuThrowing.classList.add('hide');
    hadouken.classList.add('hide');
    ryuCool.classList.add('hide');

    ryu.addEventListener("mouseover", function(e){
        ryuStill.classList.add('hide');
        ryuReady.classList.remove('hide');
    });

    ryu.addEventListener('mouseleave', function(){
        ryuStill.classList.remove('hide');
        ryuReady.classList.add('hide');
    });

    var mouseDownProcessing = false;
    ryu.addEventListener('mousedown', function(){
        if(!mouseDownProcessing ){
            mouseDownProcessing = true;
            playHadouken();

            //change the states
            ryuStill.classList.add('hide');
            ryuReady.classList.add('hide');
            ryuThrowing.classList.remove('hide');
            hadouken.classList.remove('hide');


            //animate the hadouken
            animateToPosition(hadouken, 500, { x: hadouken.getBoundingClientRect().left }, { x: 1020 }, function(){
                hadouken.classList.add('hide');
                hadouken.setAttribute('style', 'top: 520px; position:absolute');
                mouseDownProcessing = false;
            });
        }


    });

    ryu.addEventListener('mouseup', function(){
        ryuThrowing.classList.add('hide');
        ryuReady.classList.remove('hide');
    });


    var ryuState = null;
    window.addEventListener('keydown', function(event){
        if(event.which === 88){
            if(!ryuStill.classList.contains('hide')){
                ryuState = 'still';
            } else if(!ryuReady.classList.contains('hide')){
                ryuState = 'ready'
            } else if(!ryuState.classList.contains('hide')){
                ryuState = 'throwing'
            }

            ryuStill.classList.add('hide');
            ryuReady.classList.add('hide');
            ryuThrowing.classList.add('hide');
            ryuCool.classList.remove('hide');
        }
    });

    window.addEventListener('keyup', function(){
        switch(ryuState){
            case 'still':
                ryuState.classList.remove('hide');
            break;
            case 'ready':
                ryuReady.classList.remove('hide');
            break;

            case 'throwing':
                ryuThrowing.classList.remove('hide');
            break;
        }

        ryuCool.classList.add('hide');
    });




});



