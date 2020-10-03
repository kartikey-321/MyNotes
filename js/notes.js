let result = localStorage.getItem('result');
let titleNotes = localStorage.getItem('titleNotes');
if(result!=null && titleNotes==null){
    localStorage.removeItem(result);
}
else if(result==null && titleNotes!=null){
    localStorage.removeItem(titleNotes);
}
showNotes();
document.getElementById('but').addEventListener('click', function (e) {
    let text = document.getElementById('text');
    let title = document.getElementById('title');
    let result = localStorage.getItem('result');
    let titleNotes = localStorage.getItem('titleNotes');
    if ((text.value != "") && (title.value != "")) {
        if (result == null && titleNotes == null) {
            var a = [];
            var t = [];
        }
        else {
            a = JSON.parse(result);
            t = JSON.parse(titleNotes);
        }
        a.push(text.value);
        t.push(title.value);
        localStorage.setItem('result', JSON.stringify(a));
        localStorage.setItem('titleNotes', JSON.stringify(t));
        text.value = "";
        title.value = "";
        showNotes();
    }
    else if ((text.value == "") && (title.value == "")) {
        alert('please fill both the fields');
    }
    else if (text.value == "") {
        alert('please enter notes to add');
    }
    else {
        alert('please enter title');
    }


})

function showNotes() {
    let result = localStorage.getItem('result');
    let titleNotes = localStorage.getItem('titleNotes');
    if (result != null && titleNotes != null) {
        let array = JSON.parse(result);
        let t_array = JSON.parse(titleNotes);
        let card = '';
        for (let i = 0; i < array.length; i++) {
            for (let j = i; j < t_array.length; j++) {

                card += `<div class="card" style="width: 18rem;">
                        <div class="card-body">
                        <h5 class="card-title">${t_array[j]}</h5>
                        <p class="card-text">${array[i]}</p>
                        <button id="${i}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete</a>
                        </div>
                    </div>`;
                break;
            }


        }

        let element = document.getElementById('notes');
        element.innerHTML = card;
        document.getElementById('wrapper').style.height = "";
        if (result == "[]") {
            document.getElementById('wrapper').style.height = "100vh";
        }
    }
    else {
        document.getElementById('wrapper').style.height = "100vh";
    }

}
function deleteNotes(i) {
    let result = localStorage.getItem('result');
    let titleNotes = localStorage.getItem('titleNotes');
    let a = JSON.parse(result);
    let t = JSON.parse(titleNotes);
    a.splice(i, 1);
    t.splice(i, 1);
    localStorage.setItem('result', JSON.stringify(a));
    localStorage.setItem('titleNotes', JSON.stringify(t));
    showNotes();
}
let searchTxt = document.getElementById('searchText');
searchTxt.addEventListener('input', function (e) {
    // console.log(searchTxt.value);
    if (searchTxt.value == "") {
        showNotes();
    }
    else {
        let titleNotes = localStorage.getItem('titleNotes');
        if (titleNotes != null) {
            let array = JSON.parse(titleNotes);
            for (let i = 0; i < array.length; i++) {
                let cardElement = document.getElementsByClassName('card')[i];
                let text = cardElement.getElementsByTagName('h5')[0].innerText;
                // console.log(text);

                if (text.includes(searchText.value)) {
                    cardElement.style.display = "block";
                }
                else {
                    cardElement.style.display = "none";

                }


            }
        }

    }

})
document.getElementById('delete').addEventListener('click', function (e) {
    let result = localStorage.getItem('result');
    let titleNotes = localStorage.getItem('titleNotes');
    if (result != null && titleNotes != null) {
        if (result == "[]") {
            alert('no notes available to delete');
        }
        else {
            let r = confirm('Press ok to delete all notes');
            if (r == true) {
                let a = JSON.parse(result);
                let t = JSON.parse(titleNotes);
                a.splice(0, a.length);
                t.splice(0, t.length);
                localStorage.setItem('result', JSON.stringify(a));
                localStorage.setItem('titleNotes', JSON.stringify(t));
                showNotes();
            }
        }
    }
    else {
        alert('no notes available to delete');
    }

})