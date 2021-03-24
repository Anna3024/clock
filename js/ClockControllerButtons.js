//controller
function ClockControllerButtons() {
    let myContainer = null;
    let myModel = null;

    this.init = function(model,container) {
        myContainer = container;//привязать контейнер
        myModel = model;//привязать модель
        let btnArr = container.getElementsByTagName("button");//найти кнопки в контейнере
        btnArr[0].addEventListener('click', this.start);//по клику на первую кнопку запустить метод старт
        btnArr[1].addEventListener('click', this.stop);//по клику на вторую кнопку запустить метод стоп
        this.start();
    }

    this.start = function() {
        myModel.start();
    }

    this.stop = function() {
        myModel.stop();
    }
}