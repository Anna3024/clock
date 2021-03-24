function ClockViewCanvas() {
    let myContainer = null;
    let canvas = null;
    let ctx = null;
    let r = null;//радиус большого круга
    let rGreen = null;//радиус круга циферблата
    let hourNow = null;

    this.init = function(container) {
        myContainer = container;//привязать контейнер
        canvas = myContainer.querySelector('canvas');//найти поле для канвас
        canvas.setAttribute("width", clockWidth);//установить ширину 
        canvas.setAttribute("height", clockWidth);//установить высоту 
        ctx = canvas.getContext('2d');
    }

    this.showClock = function(radYellow,radGreen) {
        r = radYellow;//радиус большой
        rGreen = radGreen;//радиус маленький
        this.updateClock();//преобразовать часы
    }

    this.updateClock = function() {
        ctx.beginPath();//нарисовать большой круг
        ctx.arc(r,r,r,0, 2*Math.PI);
        ctx.fillStyle = "#bf6673";
        ctx.fill();
        let i=1;
        for (let deg=30; deg<390; deg+=30) {//нарисовать циферблат
            var angleRadians = deg/180*Math.PI;
            ctx.fillStyle = "#f0d5bf";
            ctx.beginPath();
            ctx.arc(r+r*0.8*Math.sin(angleRadians), r-r*0.8*Math.cos(angleRadians), rGreen , 0 , 2*Math.PI);
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.font = `${rGreen}px Calibri`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(i, r+r*0.8*Math.sin(angleRadians), r-r*0.8*Math.cos(angleRadians));
            i++;
        }
    }

    this.createPointers = function(radYellow) {
        ctx.strokeStyle = "black";//цвет стрелок
        ctx.lineCap = "round";//форма стрелок
    }

    this.updatePointersMinSec = function(sec, min) {

        this.updateClock(); //нарисовать часы

        ctx.lineWidth = 4;
        roundPointer.call(ctx, 0.8 , sec*6); //нарисовать секундную стрелку

        ctx.lineWidth = 8;
        roundPointer.call(ctx, 0.7 , min*6); //нарисовать минутную стрелку

        ctx.lineWidth = 12;
        roundPointer.call(ctx, 0.6 , hourNow*30); //нарисовать часовую стрелку

        function roundPointer(pointerLength,minSecHour) {//нарисовать линию
            ctx.beginPath();
            ctx.moveTo(r-r*0.1*Math.sin(minSecHour/180*Math.PI), r+r*0.1*Math.cos(minSecHour/180*Math.PI));
            ctx.lineTo(r+r*pointerLength*Math.sin(minSecHour/180*Math.PI), r-r*pointerLength*Math.cos(minSecHour/180*Math.PI));
            ctx.stroke();        
        }
    }

    this.updatePointerHour = function(hour) {
        hourNow = hour;//перезаписать значение часа
    }
}
