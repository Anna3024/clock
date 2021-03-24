//model
function Clock() {
    let myView = null; //view
    const rYellow = clockWidth/2; //радиус жёлтого круга
    const rGreen = rYellow/7; //радиус зелёного круга
    let timeDifference = 0; //поправка по Гринвичу
    let timerIdMinSec = null; //таймер для минут и секунд
    let timerIdHour = null; //таймер для часов
    let now = null; //сейчас
    
    this.init = function(view, dif) { //инициализация 
        myView = view;//привязка к view
        timeDifference = dif; 
        myView.showClock(rYellow, rGreen); //вызвать метод view
        myView.createPointers(rYellow); //вызвать метод view
    }

    this.start = function() {
        if (!timerIdMinSec && !timerIdHour) { //если не запущена анимация минут, секунд и часов
            timerIdHour = setTimeout(function hour(){//запустить таймер
                now = new Date(); //узнать текущее время
                let hourUpdate = now.getUTCHours()+timeDifference; //определить часы по Гринвичу + поправка
                if (hourUpdate>24) hourUpdate = hourUpdate-24;//если больше 24, отнять 24
                if (hourUpdate<0) hourUpdate = hourUpdate+24;//если меньше 24, добавить 24
                myView.updatePointerHour(((hourUpdate>12?(hourUpdate-12):hourUpdate)*60+now.getMinutes())/60); //вызвать метод view
                timerIdHour = setTimeout(hour, 60000);
            },0)

            timerIdMinSec = setTimeout(function secMin() {
                now = new Date();
                myView.updatePointersMinSec(now.getSeconds(), (now.getMinutes()*60+now.getSeconds())/60); //вызвать метод view
                timerIdMinSec = setTimeout(secMin, 1000);
            }, 0);
        }
    }

    this.stop = function() {
        clearInterval(timerIdMinSec); //остановить таймер
        clearInterval(timerIdHour);
        timerIdMinSec = null;
        timerIdHour = null;
    }
}