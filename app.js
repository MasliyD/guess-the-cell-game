'use strict';

const table = document.querySelector('#table'),
      result = document.querySelector('#result'),
      newGameBtn = document.querySelector('#new-game');
let   num = 7;

// Timer
const milisecondElement = document.querySelector('#timer-ms'),
      secondElement = document.querySelector('#timer-s'),
      minuteElement = document.querySelector('#timer-m'),
      stop = document.querySelector('#stop'),
      timerBox = document.querySelector('.timer-box');

let   milisecond = 0,
      second = 0,
      minute = 0,
      interval;

function createTable() {
    for (let i = 0; i < 10; i++) {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        tr.classList.add('table-row');
        for (let j = 0; j < 10; j++) {
            let td = document.createElement('td');
            tr.appendChild(td);
            td.classList.add(`table-cell-${i}${j}`, 'empty', 'table-cell');
        }
    }
}

function selectCells() {
    let setRandom = new Set();

    while (setRandom.size !== 10) {
        let random = String(Math.floor(Math.random() * 101));
            if (random < 10) {
                random = `0${random}`;
            }
        setRandom.add(random);
    }
    
    let arrFromSet = Array.from(setRandom);
    
    for (let i = 0; i < 10; i++) {
        let temporaryCell = document.querySelector(`.table-cell-${arrFromSet[i]}`);
        temporaryCell.classList.add('selected');
        temporaryCell.classList.remove('empty');
    }
}

function cellClick(event) {
    const target = event.target;
    
    if (target && target.classList.contains('table-cell')) {
        cells.forEach( item => {

            if (target == item) {
                if (!item.classList.contains('selected-style')) {
                    if (item.classList.contains('selected')) {
                        console.log('selected');
                        item.classList.add('selected-style');
                        item.textContent = '✔';
                        num++;
                        console.log(num);
                        if (num == 10) {
                            result.textContent = `Victory! Time is ${timerBox.textContent}`;
                            stopTimer();
                            result.style.backgroundColor = '#cefe5d';
                            newGameBtn.style.display = 'block';
                            table.style.pointerEvents='none';

                            newGameBtn.addEventListener('click', () => {
                                cells.forEach( item => {
                                    item.classList.remove('selected', 'selected-style', 'empty-style');
                                    item.textContent = '';
                                });
                                selectCells();
                                num = 7;
                                result.textContent = '';
                                result.style.backgroundColor = '#fff';
                                newGameBtn.style.display = 'none';
                                table.style.pointerEvents='auto';
                            });
                        }
                    } else {
                        item.classList.add('empty-style');
                    } 
                }
                
            }
        });
    }
}

function startTimer() {
    milisecond++;

    if (milisecond < 9) {
        milisecondElement.innerText = `0${milisecond}`;
    }
    if (milisecond > 9) {
        milisecondElement.innerText = milisecond;
    }
    if (milisecond > 99) {
        second++;
        secondElement.innerText = `0${second}`;
        milisecond = 0;
        milisecondElement.innerText = `0${milisecond}`;
    }

    if (second > 9) {
        secondElement.innerText = second;
    }
    if (second > 59) {
        minute++;
        minuteElement.innerText = `0${minute}`;
        second = 0;
        secondElement.innerText = `0${second}`;
    }

    if (minute < 9) {
        minuteElement.innerText = `0${minute}`;
    }
    if (minute > 9) {
        minuteElement.innerText = minute;
    }
}

function stopTimer() {
    clearInterval(interval);
    minute = 0;
    second = 0;
    milisecond = 0;
    minuteElement.textContent = '00';
    secondElement.textContent = '00';
    milisecondElement.textContent = '00';
}

createTable();
selectCells();

const cells = document.querySelectorAll('.table-cell');

table.addEventListener('click', () => {
    clearInterval(interval);
    interval = setInterval(startTimer, 10);
});

table.addEventListener('click', (event) => cellClick(event));