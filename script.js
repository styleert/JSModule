document.getElementById("btn").addEventListener("click", function (e) {
    e.preventDefault();
    let htmlStartTime = document.getElementById("start-time-field").value;
    let htmlEndTime = document.getElementById("end-time-field").value;
    let htmlTask = document.getElementById("task-field").value;

    console.log(getTimeDiff(htmlStartTime, htmlEndTime));
    let newToDo = new ToDo(htmlStartTime, htmlEndTime, htmlTask);

    console.log('data', newToDo, htmlStartTime, htmlEndTime, htmlTask);
})

const getTimeDiff = (from, to) => {
    const fromSpl = from.split(':');
    const toSpl = from.split(':');
    let diffH = fromSpl[0]-toSpl[0];
    let diffM = fromSpl[1]-toSpl[1];
    return (diffH/60) + diffM
}

const cElem = (tagName, className, text) => {
    const elem = document.createElement(tagName);
    elem.className = className || '';
    elem.innerText = text || '';
    return elem;
}

const gElem = param => {
    const elem = document.querySelector(param);
    elem.clear = function() {
        this.innerHTML = '';
        return this;
    }
    elem.add = function (listOfElems) {
        this.append(...listOfElems);
        return this;
    }
    return elem;
}

class ToDoManager {
    static from = 8;
    static to = 17;

    constructor() {
        this.todos = [];

        // on load add default todos
        this.loadOnStart();
    }

    loadOnStart() {
        tasks.forEach((elem) => {
            this.addToBoard(new ToDo(elem.start, elem.duration, elem.title));
        });
    }

    addToBoard(newToDo) {
        this.todos.push(newToDo);
        // todo: render
    }

    static renderTimeLine() {
        console.log(this.from, this.to);
        for(let fromTime = this.from; fromTime <= this.to; fromTime++) {
            let timeRowCntEl = cElem("div", "time-row-cnt");

            for(let mm = 0; mm < 60; mm += 30) {
                const timeText = (mm === 0 ? `${fromTime}:${mm}0` : `${fromTime}:${mm}`);
                const timeTextEl = cElem("div", "time-text", timeText);
                const taskCntEl = cElem("div", "task-cnt");

                const timeRowEl = cElem("div", "time-row");
                timeRowEl.appendChild(timeTextEl);
                timeRowEl.appendChild(taskCntEl);

                // add time row 00/30
                timeRowCntEl.appendChild(timeRowEl);
            }

            document.getElementById("task-cnt").append(timeRowCntEl);
        }
    }
}

class ToDo {
    constructor(startTime, endTime, title) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.title = title;

        this.duration = startTime - endTime;
    }
}

ToDoManager.renderTimeLine();

const toDoManager = new ToDoManager();