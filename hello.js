const creatingNote = document.getElementById("creating-note-page");
const createNote = document.getElementById("create-note");
const date = document.getElementById("date")
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const save = document.getElementById("save")
const list = document.getElementById("list");
const title = document.getElementById("title")
const content = document.getElementById("content")


document.getElementById("cancel").addEventListener('click', function () {
    creatingNote.style.display = "none";

})

createNote.onclick = function () {
    creatingNote.style.display = "flex";
    title.focus()

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]


    day.innerHTML = new Date().getDate();
    month.innerHTML = months[new Date().getMonth()];
    year.innerHTML = new Date().getFullYear();
}


save.addEventListener('click', function () {


    const div = document.createElement("div");

    const heading = document.createElement("h1");
    heading.textContent = title.value;

    const noteContent = document.createElement("p");
    noteContent.textContent = content.value;

    const postDate = document.createElement("p");
    postDate.textContent = `${day.innerHTML}/${month.innerHTML}/${year.innerHTML}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-note";
    deleteBtn.onclick = function () {
        div.remove();
    };

    div.appendChild(heading);
    div.appendChild(noteContent);
    div.appendChild(postDate);
    div.appendChild(deleteBtn);

    list.insertBefore(div, list.firstChild);

    creatingNote.style.display = "none";

    title.value = ""
    content.value = ""

});

document.getElementById("about").addEventListener('click', function () {
    document.getElementById("about-div").style.display = "block";
    document.getElementById("name").innerHTML = "About"
    createNote.style.display = "none";
    document.querySelector("body").style.background = "#8080800e";
    list.style.display = "none";

    document.getElementById("aboutCancel").addEventListener('click', function () {
        document.getElementById("about-div").style.display = "none";
        document.getElementById("name").innerHTML = "My Note"
        createNote.style.display = "block";
        document.querySelector("body").style.background = "white";
        list.style.display = "block";
    })
})