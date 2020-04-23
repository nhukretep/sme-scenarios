window.onbeforeunload = function(e) {
  return 'Please press the Logout button to logout.';
};

//LIST WITH FACTORS
var factors = ["Personal", "Fertigung", "Verwaltung", "Auftragseingang", "Materiallieferung", "Liquidität"];
var scenarios = ["Faktor", "Szenario 1", "Szenario 2", "Szenario 3", "Szenario 4"];

function makeList(array) {
  var list = document.createElement('ul');
  list.setAttribute('id', 'list');

  for (var i = 0; i < array.length; i++) {
    var item = document.createElement('li');
    item.setAttribute('id', i);
    item.setAttribute('draggable', 'true')
    item.appendChild(document.createTextNode(array[i]));
    list.appendChild(item);
  }


  return list;
}

function updateList() {
  var list = document.getElementById('thelist')
  list.innerHTML = "";
  list.appendChild(makeList(factors));
}

function addItemToList() {
  var candidate = document.getElementById("candidate");
  if (!!candidate.value) {
    factors.push(candidate.value);
    updateList();
    updateTable();
  }
}

function removeItemFromList() {
  if (!!factors) {
    for (var i = 0; i < selected.length; i++) {
      factors.splice(selected[i], 1);
      updateList();
      updateTable();
    }
  }
}

updateList();

// TABLE WITH FACTORS AND SCENARIOS

function makeTable(array) {
  tbl = document.createElement('table');
  tbl.setAttribute('class', 'table table-bordered table-responsive-md table-striped')
  tbl.setAttribute('id', 'tbl')
  let thead = tbl.createTHead();
  let row = thead.insertRow();
  for (let key of scenarios) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }

  for (let element of factors) {
    let row = tbl.insertRow();
    var i = 0;
    for (; i < scenarios.length; i++) {
      let cell = row.insertCell();
      if (i == 0) {
        let text = document.createTextNode(element);
        cell.appendChild(text);
      }
      else {
        cell.setAttribute('contenteditable', 'true');
      }
    }
  }
  return tbl;
}


function updateTable() {
  var list = document.getElementById('thetable')
  list.innerHTML = "";
  list.appendChild(makeTable(factors));
  
}

updateTable();

matrix = [];
function updateMatrix(){
  var table = document.getElementById("tbl");
  for (let row of table.rows) 
  {
    var rowcells=[];
    for(let cell of row.cells) 
    {
      let val = cell.innerText; 
      rowcells.push(val);
    }
    matrix.push(rowcells)
  }
}
updateMatrix();

// SELECTION OF FACTORS IN LIST
var selected = []

function updateSelected() {
  items = document.getElementsByClassName('selected');
  var i;
  selected = []
  for (i = 0; i < items.length; i++) {
    selected.push(items[i].id);
  }
}

var ulDiv = document.getElementById('thelist')
ulDiv.onclick = function (event) {
  if (event.target.tagName != "LI") return;

  if (event.ctrlKey || event.metaKey) {
    toggleSelect(event.target);
    updateSelected();
  } else {
    singleSelect(event.target);
    updateSelected();
  }

}

ulDiv.onmousedown = function () {
  return false;
};

function toggleSelect(li) {
  li.classList.toggle('selected');
}

function singleSelect(li) {
  let selected = ulDiv.querySelectorAll('.selected');
  for (let elem of selected) {
    elem.classList.remove('selected');
  }
  li.classList.add('selected');
}

//PDF DOWNLOAD
function PDFonClick() {

  var pdf = new jsPDF('p', 'pt', 'letter');
  pdf.canvas.height = 72 * 11;
  pdf.canvas.width = 72 * 8.5;

  pdf.fromHTML(document.body);

  pdf.save('report.pdf');
};

var element = document.getElementById("pdfDownload");
element.addEventListener("click", PDFonClick);

//JSON DOWNLOAD
function JSONonClick() {
  updateMatrix();
  var element = document.createElement('a');
  text = JSON.stringify(matrix)
  filename = "analyse.json"
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

var element = document.getElementById("jsonDownload");
element.addEventListener("click", JSONonClick);
