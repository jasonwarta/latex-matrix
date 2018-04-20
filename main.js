addEvents = () => {
    document.getElementById('text-input').addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            document.getElementById("gen-latex-text").click();
        }
    });

    document.getElementById('text-input').addEventListener('keydown', (e) => {
        if (e.keyCode == 9) {
            console.log(this);
            let elem = document.getElementById('text-input');
            elem.value += "	";
            if (e.preventDefault)
                e.preventDefault();
            return false;
        }
    });
}

genTable = () => {
    let table = document.getElementById('table');
    let rows = document.getElementById('rows').value;
    let cols = document.getElementById('cols').value;

    table.innerHTML = "";

    let table_wip = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'text';
            input.style.width = "30px";
            input.value = `${String.fromCharCode(97+i)}_${j+1}`;
            input.addEventListener("keyup", function (event) {
                event.preventDefault();
                if (event.keyCode == 13) {
                    document.getElementById("gen-latex-table").click();
                }
            });
            td.appendChild(input);
            tr.appendChild(td);
        }
        table_wip.appendChild(tr);
    }
    table.appendChild(table_wip);
}

genLatexFromText = () => {
    let text = document.getElementById('text-input').value;
    let matrix_type = document.getElementById('matrix-value').value;
    let rows = text.split('\n');
    let latex = `$ \\begin{${matrix_type}}\n`;
    rows.forEach((r_val, r_idx) => {
        let cols = r_val.split('\t');
        cols.forEach((c_val, c_idx) => {
            let neg = false;
            if (c_val.indexOf('-') == 0) {
                neg = true;
                c_val = c_val.substr(1, c_val.length);
            }
            if (c_val.indexOf('/') != -1) {
                let vals = c_val.split('/');
                c_val = `\\frac{${vals[0]}}{${vals[1]}}`
            }
            latex += `${neg ? '-' : ''}${c_val}`;
            if (c_idx == cols.length - 1) {
                if (r_idx == rows.length - 1)
                    latex += " \n";
                else
                    latex += " \\\\\n";
            } else {
                latex += " & ";
            }
        });
    });
    latex += `\\end{${matrix_type}}  $`

    document.getElementById("latex").value = latex;
}

genLatex = () => {
    let table = document.getElementById('table').children[0];
    let matrix_type = document.getElementById('matrix-value').value;
    let latex = `$ \\begin{${matrix_type}}\n`;
    let rows = table.children;
    for (let row = 0; row < rows.length; row++) {
        let cols = rows[row].children;
        for (let col = 0; col < cols.length; col++) {
            let val = cols[col].children[0].value;
            let neg = false;
            if (val.indexOf('-') == 0) {
                neg = true;
                val = val.substr(1, val.length);
            }
            if (val.indexOf('/') != -1) {
                let vals = val.split('/');
                val = `\\frac{${vals[0]}}{${vals[1]}}`
            }
            latex += `${neg ? '-' : ''}${val}`;
            if (col == cols.length - 1) {
                if (row == rows.length - 1) {
                    latex += " \n";
                } else {
                    latex += " \\\\\n";
                }
            } else {
                latex += " & ";
            }
        }
    }
    latex += `\\end{${matrix_type}}  $`

    document.getElementById("latex").value = latex;
}