"use strict";

let table = document.getElementById('table');

let colors = ["#81F781", "#9FF781", "#BEF781", "#D8F781", "#F3F781", "#F5DA81", "#F7BE81", "#F79F81", "#F78181"];

let ch = 1;

table.onclick = function(e) {
    if (e.target.className === 'nosort')
        return;
    if (ch % 2 === 0)
        sorttable(e.target.parentNode.rowIndex, 0);
    else
        sorttable(e.target.parentNode.rowIndex, 1);
    ch++;
};

function my_sort(A, count_of_row, count_of_col, rowNum, param) {
    for (let i = 0; i < count_of_col-1; i++) {
        for (let j = 1; j < count_of_col-1-i; j++) {
            if (param === 1) {
                if (+A[rowNum].cells[j+1].innerText < +A[rowNum].cells[j].innerText) {
                    for (let k = 0; k < count_of_row; k++) {
                        A[k].insertBefore(A[k].cells[j+1], A[k].cells[j]);
                    }
                }
            }
            else {
                if (+A[rowNum].cells[j+1].innerText > +A[rowNum].cells[j].innerText) {
                    for (let k = 0; k < count_of_row; k++) {
                        A[k].insertBefore(A[k].cells[j+1], A[k].cells[j]);
                    }
                }
            }
        }
    }
    return A;
}

function set_color(A, rowNum) {
    let j = 0, k = 0;
    for (let i = 1; i < A[0].cells.length; i++) {
        if (i < A[0].cells.length-1) {
            if (+A[rowNum].cells[i].innerText === +A[rowNum].cells[i + 1].innerText) {
                A[rowNum].cells[i].style.backgroundColor = colors[j];
                k++;
            }
            else {
                A[rowNum].cells[i].style.backgroundColor = colors[j];
                j += k; j++; k = 0;
            }
        }
        else {
            j += k;
            A[rowNum].cells[i].style.backgroundColor = colors[j];
            for (let k = 0; k < A[0].cells.length; k++) {
                if (+A[rowNum].cells[i].innerText === +A[rowNum].cells[i - 1].innerText) {
                    A[rowNum].cells[i-1].style.backgroundColor = colors[j];
                    i--;
                }
                else {
                    i = A[0].cells.length;
                    break;
                }
            }
        }
    }
    return A;
}

function summ(A, B, count_of_col, count_of_row) {
    for (let i = 1; i < count_of_col; i++) {
        A[count_of_row - 1].cells[i].innerText = "";
        let k = i;
        let number = 0;
        for (let j = 2; j < count_of_row-1; j++) {
            number += +B[k].value;
            k += 9;
        }
        A[count_of_row - 1].cells[i].innerText = number;
    }
    return A;
}

function reset() {
    let val = table.getElementsByTagName('input');
    for (let i = 1; i < val.length; i++) {
        val[i].value = 0;
    }
}

function sorttable(rowNum, param) {
    let tbody = table.getElementsByTagName('tbody')[0];
    let val = table.getElementsByTagName('input');
    let rowsArray = [].slice.call(tbody.rows);

    const count_of_row = rowsArray.length;
    const count_of_col = rowsArray[0].cells.length;

    rowsArray = my_sort(rowsArray, count_of_row, count_of_col, rowNum, param);
    rowsArray = set_color(rowsArray, rowNum);
    rowsArray = summ(rowsArray, val, count_of_col, count_of_row);

    table.removeChild(tbody);
    for (let i = 0; i < rowsArray.length; i++) {
        tbody.appendChild(rowsArray[i]);
    }
    table.appendChild(tbody);
}
