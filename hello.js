// 📌 DOM references
const $ = id => document.getElementById(id);
const creatingNote = $("creating-note-page");
const createNote = $("create-note");
const save = $("save");
const list = $("list");
const title = $("title");
const content = $("content");
const day = $("day");
const month = $("month");
const year = $("year");

// 📅 Month names
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

// 🛑 Cancel note creation
$("cancel").onclick = () => creatingNote.style.display = "none";

// ➕ Create new note
createNote.onclick = () => {
  creatingNote.style.display = "flex";
  title.focus();

  const now = new Date();
  day.innerHTML = now.getDate();
  month.innerHTML = months[now.getMonth()];
  year.innerHTML = now.getFullYear();
};

// 💾 Save note
save.onclick = () => {
  const note = {
    title: title.value,
    content: content.value,
    date: `${day.innerHTML}/${month.innerHTML}/${year.innerHTML}`
  };
  renderNote(note);
  saveList();

  creatingNote.style.display = "none";
  title.value = "";
  content.value = "";
};

// 🧱 Render a note
function renderNote(note) {
  const div = document.createElement("div");
  const heading = document.createElement("h1");
  heading.textContent = note.title;
  const noteContent = document.createElement("p");
  noteContent.textContent = note.content;
  const postDate = document.createElement("p");
  postDate.textContent = note.date;

  const end = document.createElement("span");
  end.className = "end";

  const collapseNote = () => {
    document.querySelectorAll("#list > div").forEach(n => n.classList.remove("hidden-note"));
    div.classList.remove("expanded-note");
    heading.classList.remove("p-expanded");
    noteContent.style.whiteSpace = "nowrap";
    const backBtn = end.querySelector(".back");
    if (backBtn) backBtn.remove();
    div.appendChild(end);
    $("name").style.display = "block";
    $("home").style.paddingTop = "80px";
    createNote.style.display = "block";
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="ri-delete-bin-5-line"></i>';
  deleteBtn.className = "deleteBtn";
  deleteBtn.onclick = e => {
    e.stopPropagation();
    if (div.classList.contains("expanded-note")) {
      collapseNote();
    }
    div.remove();
    saveList(); // update localStorage after deletion
  };

  end.append(postDate, deleteBtn);
  div.append(heading, noteContent, end);
  list.prepend(div);

  div.onclick = () => {
    createNote.style.display = "none";
    document.querySelectorAll("#list > div").forEach(n => {
      if (n !== div) n.classList.add("hidden-note");
    });

    $("name").style.display = "none";
    $("home").style.paddingTop = "0px";

    if (!end.querySelector(".back")) {
      const back = document.createElement("button");
      back.innerHTML = '<i class="ri-arrow-left-line"></i>';
      back.className = "back";
      back.onclick = e => {
        e.stopPropagation();
        collapseNote();
      };
      end.prepend(back);
      end.style.gap = "30px";
    }

    div.classList.add("expanded-note");
    heading.classList.add("p-expanded");
    noteContent.style.whiteSpace = "pre-wrap";
    div.prepend(end);
  };
}

// 💾 Save all notes to localStorage
function saveList() {
  const notes = [];
  list.querySelectorAll("#list > div").forEach(note => {
    const title = note.querySelector("h1")?.textContent.trim() || "";
    const content = note.querySelector("p")?.textContent.trim() || "";
    const date = note.querySelector(".end p")?.textContent.trim() || "";
    notes.push({ title, content, date });
  });
  localStorage.setItem("tasks", JSON.stringify(notes));
}

// 📥 Load notes from localStorage
function loadList() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(renderNote);
}

// 📖 About section
$("about").onclick = () => {
  $("about-div").style.display = "block";
  $("name").innerHTML = "About";
  createNote.style.display = "none";
  document.body.style.background = "#8080800e";
  list.style.display = "none";

  $("aboutCancel").onclick = () => {
    $("about-div").style.display = "none";
    $("name").innerHTML = "My Note";
    createNote.style.display = "block";
    document.body.style.background = "white";
    list.style.display = "block";
  };
};

// 🚀 Load notes on startup
loadList();
