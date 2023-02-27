'use strict';

const table = document.querySelector('#table');
const result = document.querySelector('#result');
const newGameBtn = document.querySelector('#new-game');

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

createTable();
selectCells();

const cells = document.querySelectorAll('.table-cell');
let num = 8;

table.addEventListener('click', (event) => cellClick(event));

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
                            result.textContent = 'Victory!';
                            result.style.backgroundColor = '#cefe5d';
                            newGameBtn.style.display = 'block';

                            newGameBtn.addEventListener('click', () => {
                                cells.forEach( item => {
                                    item.classList.remove('selected', 'selected-style', 'empty-style');
                                    item.textContent = '';
                                });
                                selectCells();
                                num = 8;
                                result.textContent = '';
                                result.style.backgroundColor = '#fff';
                                newGameBtn.style.display = 'none';
                            });
                        }
                    } else {
                        console.log('empty');
                        item.classList.add('empty-style');
                    } 
                }
                
            }
        });

    }
}

