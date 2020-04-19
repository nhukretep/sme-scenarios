function PDFonClick() {
  var pdf = new jsPDF('p', 'pt', 'letter');
  pdf.canvas.height = 72 * 11;
  pdf.canvas.width = 72 * 8.5;

  pdf.fromHTML(document.body);

  pdf.save('report.pdf');
};

var element = document.getElementById("pdfDownload");
element.addEventListener("click", PDFonClick);

var factors = ["Personal", "Fertigung", "Verwaltung", "Auftragseingang", "Materiallieferung", "Liquidität"];
var scenarios = ["Faktor", "Szenario 1", "Szenario 2", "Szenario 3", "Szenario 4"];

function makeUL(array) {
  // Create the list element:
  var list = document.createElement('ul');
  list.setAttribute('id', 'list');

  for (var i = 0; i < array.length; i++) {
    // Create the list item:
    var item = document.createElement('li');

    // var span = document.createElement("span");
    // span.appendChild(document.createTextNode(':: '));
    // item.appendChild(span)

    item.setAttribute('id', i);
    item.setAttribute('draggable', 'true')
    // Set its contents:
    item.appendChild(document.createTextNode(array[i]));

    // Add it to the list:
    list.appendChild(item);
  }

  // Finally, return the constructed list:
  return list;
}

function updateList() {
  var list = document.getElementById('thelist')
  list.innerHTML = "";
  list.appendChild(makeUL(factors));
}

function makeTable(array) {
  tbl = document.createElement('table');
  tbl.setAttribute('class', 'table table-bordered table-responsive-md table-striped')
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

updateList();
updateTable();

function addItem() {
  var candidate = document.getElementById("candidate");
  if (!!candidate.value) {
    factors.push(candidate.value);
    updateList();
    updateTable();
  }
}

function removeItem() {
  if (!!factors) {
    for (var i = 0; i < selected.length; i++) {
      factors.splice(selected[i], 1);
      updateList();
      updateTable();
    }
  }
}

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

// prevent unneeded selection of list elements on clicks
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

