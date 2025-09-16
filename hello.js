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
  // Create note container and its elements
  const div = document.createElement("div");
  const heading = document.createElement("h1");
  heading.textContent = title.value;
  const noteContent = document.createElement("p");
  noteContent.textContent = content.value;
  const postDate = document.createElement("p");
  postDate.textContent = `${day.innerHTML}/${month.innerHTML}/${year.innerHTML}`;

  // Collapse helper: undo “expanded” state and show all notes
  const collapseNote = () => {
    document.querySelectorAll("#list > div")
      .forEach(n => n.classList.remove("hidden-note"));
    div.classList.remove("expanded-note");
    heading.classList.remove("p-expanded");
    noteContent.style.whiteSpace = "nowrap";
    const backBtn = end.querySelector(".back");
    if (backBtn) backBtn.remove();
    div.appendChild(end);
    $("name").style.display = "block";
    $("home").style.paddingTop = "80px";
    createNote.style.display = "block"; // show it again

  };

  // Delete button: collapse if expanded, then remove the note
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="ri-delete-bin-5-line"></i>';
  deleteBtn.className = "deleteBtn";
  deleteBtn.onclick = e => {
    e.stopPropagation();
    if (div.classList.contains("expanded-note")) {
      collapseNote();
    }
    div.remove();
  };

  // “End” bar with date and delete icon
  const end = document.createElement("span");
  end.className = "end";
  end.append(postDate, deleteBtn);

  // Assemble and prepend the new note
  div.append(heading, noteContent, end);
  list.prepend(div);

  // Reset the create-note form
  creatingNote.style.display = "none";
  title.value = "";
  content.value = "";

  // Expand-note handler
  div.onclick = () => {
    // Hide all other notes

    createNote.style.display = "none"; // hide create button

    document.querySelectorAll("#list > div")
      .forEach(note => {
        if (note !== div) note.classList.add("hidden-note");
      });

    $("name").style.display = "none";
    $("home").style.paddingTop = "0px";
    

    // Add back button if missing
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

    // Apply expanded styles
    div.classList.add("expanded-note");
    heading.classList.add("p-expanded");
    noteContent.style.whiteSpace = "pre-wrap";
    div.prepend(end);
  };
};


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
