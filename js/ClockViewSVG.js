//view
function ClockViewSVG() {
    let myContainer = null;
    let secPointer = null;
    let minPointer = null;
    let hourPointer = null;
    let svg = null;
    let r = null;

    this.init = function(container) {
        myContainer = container;//привязать контейнер
        svg = myContainer.querySelector('svg');
        svg.setAttributeNS(null,"width", clockWidth);
        svg.setAttributeNS(null,"height", clockWidth);
    }

    this.showClock = function(radYellow,radGreen) {
        let yellowCircle = document.createElementNS(svgNS,"circle");
        yellowCircle.setAttributeNS(null,"cx", radYellow); //нарисовать жёлтый круг
        yellowCircle.setAttributeNS(null,"cy", radYellow); 
        yellowCircle.setAttributeNS(null,"r", radYellow);
        yellowCircle.setAttributeNS(null,"fill","#bf6673");//цвет заливки
        yellowCircle.setAttributeNS(null,"stroke","none");//без границы
        svg.appendChild(yellowCircle);
        let i = 1; //знaчения циферблата
        for (let deg=30; deg<390; deg+=30) {
            let green = document.createElementNS(svgNS,"circle"); //нарисовать зелёный круг 
            var angleRadians = deg/180*Math.PI;
            green.setAttributeNS(null,"cx", radYellow+radYellow*0.8*Math.sin(angleRadians));
            green.setAttributeNS(null,"cy", radYellow-radYellow*0.8*Math.cos(angleRadians));
            green.setAttributeNS(null,"r", radGreen);
            green.setAttributeNS(null,"fill","#f0d5bf");
            green.setAttributeNS(null,"stroke","none");
            svg.appendChild(green);
            let textGreen = document.createElementNS(svgNS,"text"); //вставить текст поверх зелёного круга
            textGreen.setAttributeNS(null,"x", radYellow+radYellow*0.8*Math.sin(angleRadians));
            textGreen.setAttributeNS(null,"y", radYellow-radYellow*0.8*Math.cos(angleRadians)+radGreen/3);
            textGreen.setAttributeNS(null,"font-size", radGreen);
            textGreen.setAttributeNS(null,"text-anchor", "middle");
            textGreen.innerHTML = i++;
            svg.appendChild(textGreen);
        }   
    }

    this.createPointers = function(radYellow) {
        r = radYellow;
        secPointer = document.createElementNS(svgNS, "line"); //создать секундную стрелку
        drawPointer.call(secPointer, 4);

        minPointer = document.createElementNS(svgNS, "line"); //создать минутную стрелку
        drawPointer.call(minPointer, 8);

        hourPointer = document.createElementNS(svgNS, "line"); //создать часовую стрелку
        drawPointer.call(hourPointer, 12);

        function drawPointer (strokeWidth) {
            this.setAttributeNS(null,"stroke", "black");
            this.setAttributeNS(null,"stroke-linecap", "round");
            this.setAttributeNS(null,"stroke-width", strokeWidth);//толщина стрелки
            svg.appendChild(this); 
        }    
    }

    this.updatePointersMinSec = function(sec, min) {
        function roundPointer(pointerLength,minOrSec) { //pointerLength - относительная длина стрелки
            this.setAttributeNS(null,"x1", r-r*0.1*Math.sin(minOrSec*6/180*Math.PI)); //координаты маленькой части стрелки
            this.setAttributeNS(null,"y1", r+r*0.1*Math.cos(minOrSec*6/180*Math.PI));
            this.setAttributeNS(null,"x2", r+r*pointerLength*Math.sin(minOrSec*6/180*Math.PI)); //координаты основной части стрелки
            this.setAttributeNS(null,"y2", r-r*pointerLength*Math.cos(minOrSec*6/180*Math.PI));
        }
        roundPointer.call(secPointer, 0.8, sec);
        roundPointer.call(minPointer, 0.7, min);
    }

    this.updatePointerHour = function(hour) {
        hourPointer.setAttributeNS(null,"x1", r-r*0.1*Math.sin(hour*30/180*Math.PI));
        hourPointer.setAttributeNS(null,"y1", r+r*0.1*Math.cos(hour*30/180*Math.PI));
        hourPointer.setAttributeNS(null,"x2", r+r*0.6*Math.sin(hour*30/180*Math.PI));
        hourPointer.setAttributeNS(null,"y2", r-r*0.6*Math.cos(hour*30/180*Math.PI));
    }
}