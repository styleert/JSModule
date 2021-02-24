const cElem = (tagName, className, text) => {
    let elem = document.createElement(tagName);
    elem.className = className || '';
    elem.innerText = text || '';
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

        this.clearBoard();

        // sort by start time
        this.sortToDos();

        this.renderToDos();
    }

    sortToDos() {
        console.log("before sort", this.todos);
        this.todos.sort((a, b) => a.startTime - b.startTime);

        for(let i = 0; i < this.todos.length - 1; i++) {
            if (!this.todos[i].splitLeft && (this.todos[i+1].startTime > this.todos[i].startTime && this.todos[i+1].startTime < this.todos[i].endTime)) {
                console.log("Splitting");
                this.todos[i+1].splitLeft = true;
            }

            console.log('a', this.todos[i], 'b', this.todos[i+1]);
        }
        console.log("after sort", this.todos);
    }

    renderToDos() {
        this.todos.forEach((item) => {
            let taskText;

            taskText = cElem("div", "task", this.trimString(item.title));
            taskText.style.top = `${item.startTime}px`;
            taskText.style.height = `${(item.startTime + (item.minDuration - item.startTime))}px`;
            taskText.style.width = `200px`;
            taskText.onclick = function(){
                taskText.remove();
                // todo remove from array
            };

            if ((item.splitLeft)) {
                // taskText.style.left = `calc(50%+65px)`;
                taskText.style.right = `0`;
            } else {
                taskText.style.left = `65px`;
            }

            document.getElementById("raw-task").append(taskText);
        });
    }

    clearBoard() {
        document.getElementById("raw-task").innerHTML = '';
    }


    trimString(s) {
        return s.substring(0, 15) + "...";
    }

    static renderTimeLine() {
        console.log(this.from, this.to);
        for(let fromTime = this.from; fromTime <= this.to; fromTime++) {
            let timeRowCntEl = cElem("div", "time-row-cnt");

            for(let mm = 0; mm < 60; mm += 30) {
                if(fromTime === 17 && mm === 30) {
                    break;
                }

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
        if(typeof startTime == "string") {

            this.startTime = this.calcDuration("8:00", startTime);
            this.minDuration = this.calcDuration(startTime, endTime);
        } else {
            this.startTime = startTime;
            this.minDuration = endTime;
        }

        this.splitLeft = false;
        this.endTime = this.startTime + this.minDuration;

        // this.endTime = endTime;
        this.title = title;

        console.log(this);
    }

    calcDuration(startTime, endTime) {
        const fromSpl = String(startTime).split(':');
        const toSpl = String(endTime).split(':');
        let diffH = toSpl[0]-fromSpl[0];
        let diffM = toSpl[1]-fromSpl[1];

        return (diffH * 60) + diffM;
    }
}

ToDoManager.renderTimeLine();

const toDoManager = new ToDoManager();

document.getElementById("btn").addEventListener("click", function (e) {
    e.preventDefault();
    console.log('onclick');

    let htmlStartTime = document.getElementById("start-time-field").value;
    let htmlEndTime = document.getElementById("end-time-field").value;
    let htmlTask = document.getElementById("task-field").value;

    let newToDo = new ToDo(htmlStartTime, htmlEndTime, htmlTask);
    console.log('data', newToDo, htmlStartTime, htmlEndTime, htmlTask);
    toDoManager.addToBoard(newToDo);
})

