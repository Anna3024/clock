//view
function ClockViewDOM() {
    let myContainer = null;
    let secPointer = null;
    let minPointer = null;
    let hourPointer = null;

    function circle(r) {//функция для рисования круга
        this.style.height = r*2 + "px";//получить из div круг
        this.style.width = r*2 + "px";
        this.style.borderRadius = r + "px";//радиус
    }

    this.init = function(container) {
        myContainer = container;
    }

    this.showClock = function(radYellow,radGreen) {
        let yellow = document.createElement('div'); //создать жёлтый круг
        myContainer.append(yellow);
        yellow.className = 'yellowCircle';
        circle.call(yellow, radYellow);
        let i=1;
        for (let deg=30; deg<390; deg+=30) {//начиная с угла 30 через 30
            let green = document.createElement('div'); //создать элемент циферблата
            yellow.append(green);
            green.className = 'greenCircle';
            circle.call(green, radGreen);
            var angleRadians = deg/180*Math.PI;//перевод в радианы
            var greenCenterX = radYellow+(parseFloat(radYellow)*0.8)*Math.sin(angleRadians);//определить центр Х для зелёного
            var greenCenterY = radYellow-(parseFloat(radYellow)*0.8)*Math.cos(angleRadians);//определить центр Y для зелёного
            
            green.style.left = Math.round(greenCenterX-green.offsetWidth/2) + "px";//координаты для зелёного круга относительно верхнего левого угла
            green.style.top = Math.round(greenCenterY-green.offsetHeight/2) + "px";
            
            let greenH1 = document.createElement('h1');//создать h1 для ввода цифр
            green.append(greenH1);
            greenH1.innerText = i++;
            greenH1.style.fontSize = radGreen+"px";
            green.style.paddingTop = (green.offsetHeight - greenH1.offsetHeight)/2 + "px";
        }
    }

    this.createPointers = function(radYellow) {
        let yellow = myContainer.querySelector('.yellowCircle');
        secPointer = document.createElement('div');
        pointer.call(secPointer, 4, 0.9);
        
        minPointer = document.createElement('div');
        pointer.call(minPointer, 8 , 0.8);
        
        hourPointer = document.createElement('div');
        pointer.call(hourPointer, 12, 0.7);

        function pointer(pointerHeight, pointerLength) {
            yellow.prepend(this);
            this.className = 'pointer';//присвоить класс 'pointer'
            this.style.width = radYellow*pointerLength + "px";//уствновить длину стрелки относительно жёлтого круга
            this.style.height = pointerHeight + "px";//высота стрелки 
            this.style.borderRadius = this.offsetHeight + "px";//закруглённые края
            this.style.transformOrigin = "20px center";//трансформация относитьльно точки 20рх  и центра для каждой стрелки
            this.style.left = Math.round(radYellow)-parseFloat(this.style.transformOrigin) + "px"; 
            this.style.top = Math.round(radYellow) + "px";
        }
    }

    this.updatePointersMinSec = function(sec, min) {
        secPointer.style.transform = "rotate(" + (sec*6 - 90) + "deg)";//повернуть секундную стрелку
        minPointer.style.transform = "rotate(" + (min*6 - 90) + "deg)";//повернуть минутную стрелку
        secPointer.style.zIndex = 1;//показать стрелки
        minPointer.style.zIndex = 1;
    }

    this.updatePointerHour = function(hour) {
        hourPointer.style.transform = "rotate(" + (hour*30 - 90) + "deg)";//повернуть часовую стрелку
        hourPointer.style.zIndex = 1;
    }
}