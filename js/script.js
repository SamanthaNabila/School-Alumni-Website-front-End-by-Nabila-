/* =========================================================
   HDSSS ALUMNI – COMPLETE FRONTEND SCRIPT (DROP-IN)
   Works with: Home, About, Directory, Gallery, Events, Event Details,
               News, Memories, Login, Register, Admin Panel
   (localStorage based demo)
   ========================================================= */

/* =========================
   Utility
   ========================= */
function escapeHtml(str){
  return String(str ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
function $(id){ return document.getElementById(id); }

/* =========================
   Sample Data
   ========================= */
const alumniData = [
  {name:'Anik Rahman', batch:'2010', location:'Dhaka', job:'Software Engineer'},
  {name:'Mahmud Hossain', batch:'2012', location:'Khulna', job:'Doctor'},
  {name:'Nadia Islam', batch:'2011', location:'Chittagong', job:'Teacher'},
  {name:'Rafiq Ahmed', batch:'2009', location:'Dhaka', job:'Entrepreneur'},
  {name:'Sadia Akter', batch:'2010', location:'Sylhet', job:'Lawyer'},
  {name:'Alice Rahman', batch:'2010', location:'Dhaka', job:'Software Engineer'},
  {name:'Anik Rahman', batch:'2010', location:'Dhaka', job:'Software Engineer'},
  {name:'Mahmud Hossain', batch:'2012', location:'Khulna', job:'Doctor'},
  {name:'Nadia Islam', batch:'2011', location:'Chittagong', job:'Teacher'},
  {name:'Rafiq Ahmed', batch:'2009', location:'Dhaka', job:'Entrepreneur'},
  {name:'Sadia Akter', batch:'2010', location:'Sylhet', job:'Lawyer'},
  {name:'Alice Rahman', batch:'2010', location:'Dhaka', job:'Software Engineer'},
  {name:'Anik Rahman', batch:'2010', location:'Dhaka', job:'Software Engineer'},
  {name:'Mahmud Hossain', batch:'2012', location:'Khulna', job:'Doctor'},
  {name:'Nadia Islam', batch:'2011', location:'Chittagong', job:'Teacher'},
  {name:'Rafiq Ahmed', batch:'2009', location:'Dhaka', job:'Entrepreneur'},
  {name:'Sadia Akter', batch:'2010', location:'Sylhet', job:'Lawyer'},
  {name:'Alice Rahman', batch:'2010', location:'Dhaka', job:'Software Engineer'},
  {name:'Anik Rahman', batch:'2010', location:'Dhaka', job:'Software Engineer'},
  {name:'Mahmud Hossain', batch:'2012', location:'Khulna', job:'Doctor'},
  {name:'Nadia Islam', batch:'2011', location:'Chittagong', job:'Teacher'},
  {name:'Rafiq Ahmed', batch:'2009', location:'Dhaka', job:'Entrepreneur'},
  {name:'Sadia Akter', batch:'2010', location:'Sylhet', job:'Lawyer'},
  {name:'Alice Rahman', batch:'2010', location:'Dhaka', job:'Software Engineer'},
  {name:'Anik Rahman', batch:'2010', location:'Dhaka', job:'Software Engineer'},
  {name:'Mahmud Hossain', batch:'2012', location:'Khulna', job:'Doctor'},
  {name:'Nadia Islam', batch:'2011', location:'Chittagong', job:'Teacher'},
  {name:'Rafiq Ahmed', batch:'2009', location:'Dhaka', job:'Entrepreneur'},
  {name:'Sadia Akter', batch:'2010', location:'Sylhet', job:'Lawyer'},
  {name:'Alice Rahman', batch:'2010', location:'Dhaka', job:'Software Engineer'},
  {name:'Anik Rahman', batch:'2010', location:'Dhaka', job:'Software Engineer'},
  {name:'Mahmud Hossain', batch:'2012', location:'Khulna', job:'Doctor'},
  {name:'Nadia Islam', batch:'2011', location:'Chittagong', job:'Teacher'},
  {name:'Rafiq Ahmed', batch:'2009', location:'Dhaka', job:'Entrepreneur'},
  {name:'Sadia Akter', batch:'2010', location:'Sylhet', job:'Lawyer'},
  {name:'Alice Rahman', batch:'2010', location:'Dhaka', job:'Software Engineer'},
  {name:'Anik Rahman', batch:'2010', location:'Dhaka', job:'Software Engineer'},
  {name:'Mahmud Hossain', batch:'2012', location:'Khulna', job:'Doctor'},
  {name:'Nadia Islam', batch:'2011', location:'Chittagong', job:'Teacher'},
  {name:'Rafiq Ahmed', batch:'2009', location:'Dhaka', job:'Entrepreneur'},
  {name:'Sadia Akter', batch:'2010', location:'Sylhet', job:'Lawyer'},
  {name:'Alice Rahman', batch:'2010', location:'Dhaka', job:'Software Engineer'}
];

const eventsData = [
  {
    id: "reunion-2026",
    title: "Annual Reunion",
    date: "2026-01-20",
    description: "Reconnect with batchmates and teachers.",
    location: "HDSSS School Campus",
    time: "10:00 AM – 4:00 PM",
    details: "Program includes welcome speech, cultural show, batch-wise photo session, and lunch. Registration desk opens at 9:30 AM."
  },
  {
    id: "career-seminar",
    title: "Career Seminar",
    date: "2026-03-15",
    description: "Guidance from alumni mentors.",
    location: "School Auditorium",
    time: "11:00 AM – 1:30 PM",
    details: "Topics: CV writing, interview preparation, career roadmap, and Q&A session with alumni working in top industries."
  },
  {
    id: "foundation-day",
    title: "Foundation Day",
    date: "2026-07-01",
    description: "Celebration of school history.",
    location: "Main Ground",
    time: "9:00 AM – 2:00 PM",
    details: "Includes parade, student performances, prize giving, and special speech by teachers and invited guests."
  }
];

const newsData = [
  {title:'Scholarship Program Launched', date:'2025-12-01', description:'New scholarship for students.'},
  {title:'HDSSS Ranked Top 5', date:'2025-11-15', description:'Ranked among top institutions.'},
  {title:'Alumni Sports Meet', date:'2025-10-05', description:'Highlights from sports meet.'}
];

/* =========================
   Auth & Users
   ========================= */
function getUsers(){
  try { return JSON.parse(localStorage.getItem("users") || "[]"); }
  catch(e){ return []; }
}
function saveUsers(users){
  localStorage.setItem("users", JSON.stringify(users));
}
function getCurrentUser(){
  return localStorage.getItem("currentUser");
}

function registerUser(e){
  e.preventDefault();
  const uEl = $("regUsername");
  const pEl = $("regPassword");
  const aEl = $("regAlert");
  if(!uEl || !pEl || !aEl) return;

  const u = uEl.value.trim();
  const p = pEl.value.trim();
  aEl.textContent = "";

  if(!u || !p){
    aEl.textContent = "Fill in all fields.";
    return;
  }

  const users = getUsers();
  if(users.some(x => x.username === u)){
    aEl.textContent = "Username already exists.";
    return;
  }

  users.push({username:u, password:p});
  saveUsers(users);
  alert("Registration successful! Please login.");
  location.href = "login.html";
}

function loginUser(e){
  e.preventDefault();
  const uEl = $("loginUsername");
  const pEl = $("loginPassword");
  const aEl = $("loginAlert");
  if(!uEl || !pEl || !aEl) return;

  const u = uEl.value.trim();
  const p = pEl.value.trim();
  aEl.textContent = "";

  const user = getUsers().find(x => x.username === u && x.password === p);
  if(!user){
    aEl.textContent = "Invalid credentials.";
    return;
  }

  localStorage.setItem("currentUser", u);
  location.href = "index.html";
}

function logoutUser(){
  localStorage.removeItem("currentUser");
  location.href = "index.html";
}

/* Navbar update for all pages */
function updateNav(){
  const navUser = $("navUser");
  if(!navUser) return;

  const user = getCurrentUser();
  if(user){
    navUser.innerHTML = `
      <span class="me-2 text-light">Hi, ${escapeHtml(user)}</span>
      <button class="btn btn-sm btn-light" onclick="logoutUser()">Logout</button>
    `;
  } else {
    navUser.innerHTML = `
      <a href="login.html" class="btn btn-sm btn-light me-2">Login</a>
      <a href="register.html" class="btn btn-sm btn-outline-light">Register</a>
    `;
  }

  // Active link highlight (optional)
  const page = location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link").forEach(a=>{
    const href = a.getAttribute("href");
    a.classList.toggle("active", href === page);
  });
}

/* =========================
   Directory Page
   ========================= */
function loadDirectory(){
  updateNav();
  const body = $("alumniTableBody");
  const searchInput = $("searchInput");
  if(!body) return;

  function render(list){
    body.innerHTML = "";
    list.forEach(x=>{
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${escapeHtml(x.name)}</td>
        <td>${escapeHtml(x.batch)}</td>
        <td>${escapeHtml(x.location)}</td>
        <td>${escapeHtml(x.job)}</td>
      `;
      body.appendChild(tr);
    });
  }

  render(alumniData);

  if(searchInput){
    searchInput.addEventListener("input", ()=>{
      const q = searchInput.value.trim().toLowerCase();
      const filtered = alumniData.filter(x =>
        x.name.toLowerCase().includes(q) ||
        String(x.batch).toLowerCase().includes(q) ||
        x.location.toLowerCase().includes(q) ||
        x.job.toLowerCase().includes(q)
      );
      render(filtered);
    });
  }
}

/* =========================
   Events Page (clickable -> details page)
   ========================= */
function loadEvents(){
  updateNav();
  const container = $("eventsList");
  if(!container) return;

  container.innerHTML = "";

  eventsData.forEach(ev=>{
    const col = document.createElement("div");
    col.className = "col-12";

    col.innerHTML = `
      <a class="event-link text-decoration-none" href="event-details.html?id=${encodeURIComponent(ev.id)}">
        <div class="card-soft event-card h-100">
          <h5 class="fw-bold mb-2">${escapeHtml(ev.title)}</h5>
          <small class="text-secondary d-block mb-2">${escapeHtml(ev.date)}</small>
          <p class="text-secondary mb-0">${escapeHtml(ev.description)}</p>
        </div>
      </a>
    `;
    container.appendChild(col);
  });
}

/* Event Details Page */
function loadEventDetails(){
  updateNav();

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const ev = eventsData.find(x => x.id === id) || eventsData[0];

  if($("evTitle")) $("evTitle").textContent = ev?.title || "Event";
  if($("evDate")) $("evDate").textContent = ev?.date || "";
  if($("evDesc")) $("evDesc").textContent = ev?.description || "";

  if($("evLocation")) $("evLocation").textContent = ev?.location || "—";
  if($("evTime")) $("evTime").textContent = ev?.time || "—";
  if($("evDetails")) $("evDetails").textContent = ev?.details || "—";
}

/* =========================
   News Page
   ========================= */
function loadNews(){
  updateNav();
  const box = $("newsList");
  if(!box) return;

  box.innerHTML = "";
  newsData.forEach(n=>{
    const col = document.createElement("div");
    col.className = "col-12";
    col.innerHTML = `
      <div class="card-soft news-card h-100">
        <h5 class="fw-bold mb-2">${escapeHtml(n.title)}</h5>
        <small class="text-secondary d-block mb-2">${escapeHtml(n.date)}</small>
        <p class="text-secondary mb-0">${escapeHtml(n.description)}</p>
      </div>
    `;
    box.appendChild(col);
  });
}

/* =========================
   Contact Form (if any page uses it)
   IDs expected: contactName, contactEmail, contactMessage, contactForm
   ========================= */
function submitContact(e){
  e.preventDefault();

  const n = $("contactName")?.value.trim();
  const em = $("contactEmail")?.value.trim();
  const msg = $("contactMessage")?.value.trim();

  if(!n || !em || !msg){
    alert("Please fill in all fields.");
    return;
  }

  const messages = JSON.parse(localStorage.getItem("messages") || "[]");
  messages.push({name:n, email:em, message:msg, date:new Date().toISOString()});
  localStorage.setItem("messages", JSON.stringify(messages));

  alert("Thank you for your message!");
  $("contactForm")?.reset();
}

/* =========================
   GALLERY PAGE (your HTML IDs)
   IDs used:
   galLoginGate, galSearch, galCategory, galFile, galPreviewWrap, galPreview,
   galleryGrid, addPhotoModal, viewPhotoModal, viewTitle, viewMeta, viewImg, viewCaption,
   galTitle, galCat, galCaption
   ========================= */
function getGallery(){
  try { return JSON.parse(localStorage.getItem("galleryItems") || "[]"); }
  catch(e){ return []; }
}
function saveGallery(items){
  localStorage.setItem("galleryItems", JSON.stringify(items));
}

function seedGalleryDemoIfEmpty(){
  const items = getGallery();
  if(items.length) return;

  const makeDemoSvg = (text)=> {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="900" height="650">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#243f52"/>
            <stop offset="1" stop-color="#2f6f6d"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g)"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
              font-family="Arial" font-size="48" fill="white" font-weight="700">${escapeHtml(text)}</text>
      </svg>`;
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg.trim());
  };

  const demo = [
    {id:String(Date.now()-3), title:"School Memories", category:"School", caption:"A special day at school.", img:makeDemoSvg("HDSSS Gallery"), uploader:"admin", createdAt:new Date().toISOString()},
    {id:String(Date.now()-2), title:"Sports Moment", category:"Sports", caption:"Team spirit!", img:makeDemoSvg("Sports Day"), uploader:"admin", createdAt:new Date().toISOString()},
    {id:String(Date.now()-1), title:"Friends Forever", category:"Friends", caption:"Best friends, best time.", img:makeDemoSvg("Friends"), uploader:"admin", createdAt:new Date().toISOString()},
  ];
  saveGallery(demo);
}

function previewGallery(){
  const input = $("galFile");
  const wrap = $("galPreviewWrap");
  const img = $("galPreview");
  if(!input || !wrap || !img) return;

  const file = input.files && input.files[0];
  if(!file){
    wrap.classList.add("d-none");
    return;
  }

  const r = new FileReader();
  r.onload = ()=> {
    img.src = r.result;
    wrap.classList.remove("d-none");
  };
  r.readAsDataURL(file);
}

function addGalleryItem(e){
  e.preventDefault();

  const user = getCurrentUser();
  if(!user){
    alert("Please login first to add photos.");
    location.href = "login.html";
    return;
  }

  const titleEl = $("galTitle");
  const catEl   = $("galCat");
  const capEl   = $("galCaption");
  const fileEl  = $("galFile");
  if(!titleEl || !catEl || !capEl || !fileEl) return;

  const title = titleEl.value.trim();
  const category = catEl.value.trim() || "Other";
  const caption = capEl.value.trim() || "";

  if(!title){
    alert("Title is required.");
    return;
  }
  if(!fileEl.files || !fileEl.files[0]){
    alert("Please choose a photo.");
    return;
  }

  const r = new FileReader();
  r.onload = ()=>{
    const items = getGallery();
    items.unshift({
      id: String(Date.now()),
      title,
      category,
      caption,
      img: r.result,
      uploader: user,
      createdAt: new Date().toISOString()
    });
    saveGallery(items);

    e.target.reset();
    $("galPreviewWrap")?.classList.add("d-none");

    const modalEl = $("addPhotoModal");
    if(modalEl && window.bootstrap){
      const inst = bootstrap.Modal.getInstance(modalEl);
      if(inst) inst.hide();
    }

    renderGallery();
  };
  r.readAsDataURL(fileEl.files[0]);
}

function openGalleryItem(id){
  const item = getGallery().find(x => x.id === id);
  if(!item) return;

  if($("viewTitle")) $("viewTitle").textContent = item.title || "Photo";
  if($("viewMeta")){
    const dt = item.createdAt ? new Date(item.createdAt).toLocaleString() : "";
    $("viewMeta").textContent = `By ${item.uploader || "Member"} • ${item.category || "Other"}${dt ? " • " + dt : ""}`;
  }
  if($("viewImg")) $("viewImg").src = item.img;
  if($("viewCaption")) $("viewCaption").textContent = item.caption || "";

  const modalEl = $("viewPhotoModal");
  if(modalEl && window.bootstrap){
    new bootstrap.Modal(modalEl).show();
  }
}

function deleteGalleryItem(id){
  const user = getCurrentUser();
  if(!user){
    alert("Please login.");
    return;
  }
  if(!confirm("Delete this photo?")) return;

  const items = getGallery().filter(x => x.id !== id);
  saveGallery(items);
  renderGallery();
}

function renderGallery(){
  const grid = $("galleryGrid");
  if(!grid) return;

  const q = ($("galSearch")?.value || "").trim().toLowerCase();
  const cat = ($("galCategory")?.value || "").trim();

  const items = getGallery()
    .filter(x => !cat || (x.category || "") === cat)
    .filter(x => !q || (String(x.title) + " " + String(x.caption||"") + " " + String(x.uploader||"") + " " + String(x.category||""))
      .toLowerCase().includes(q));

  if(items.length === 0){
    grid.innerHTML = `<div class="col-12"><div class="text-center text-secondary py-4">No photos found.</div></div>`;
    return;
  }

  grid.innerHTML = items.map(x => {
    const dt = x.createdAt ? new Date(x.createdAt).toLocaleDateString() : "";
    return `
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="gal-card">
          <img class="gal-thumb" src="${x.img}" alt="photo"
               onclick="openGalleryItem('${x.id}')" style="cursor:pointer;">
          <div class="gal-body">
            <div class="gal-title">${escapeHtml(x.title || "Photo")}</div>
            <div class="gal-meta">By <b>${escapeHtml(x.uploader || "Member")}</b> • ${escapeHtml(x.category || "Other")}${dt ? " • " + dt : ""}</div>
            <div class="gal-actions mt-2">
              <button class="btn btn-sm btn-outline-primary" onclick="openGalleryItem('${x.id}')">View</button>
              <button class="btn btn-sm btn-outline-danger" onclick="deleteGalleryItem('${x.id}')">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function loadGallery(){
  updateNav();
  $("galLoginGate")?.classList.toggle("d-none", !!getCurrentUser());
  seedGalleryDemoIfEmpty();

  $("galSearch")?.addEventListener("input", renderGallery);
  $("galCategory")?.addEventListener("change", renderGallery);
  $("galFile")?.addEventListener("change", previewGallery);

  renderGallery();
}

/* =========================
   MEMORIES PAGE
   IDs: memLoginGate, memTitle, memYear, memStory, memSearch, memList
   Functions: addMemory(event), renderMemories(), loadMemories()
   ========================= */
function getMemories(){
  try { return JSON.parse(localStorage.getItem("memories") || "[]"); }
  catch(e){ return []; }
}
function saveMemories(items){
  localStorage.setItem("memories", JSON.stringify(items));
}

function seedMemoriesDemoIfEmpty(){
  const items = getMemories();
  if(items.length) return;

  const demo = [
    {
      id: String(Date.now()-3),
      title: "Our Sports Day",
      year: "2017",
      story: "We played football and everyone cheered loudly. Unforgettable day!",
      author: "admin",
      createdAt: new Date(Date.now()-1000*60*60*24*12).toISOString()
    },
    {
      id: String(Date.now()-2),
      title: "Class Picnic",
      year: "2015",
      story: "We visited a beautiful place with teachers and took lots of photos.",
      author: "admin",
      createdAt: new Date(Date.now()-1000*60*60*24*7).toISOString()
    },
    {
      id: String(Date.now()-1),
      title: "Best Friends",
      year: "",
      story: "Those corridor talks and laughter… still miss the school days!",
      author: "admin",
      createdAt: new Date(Date.now()-1000*60*60*24*3).toISOString()
    }
  ];

  saveMemories(demo);
}

function addMemory(e){
  e.preventDefault();

  const user = getCurrentUser();
  if(!user){
    alert("Please login first to publish a memory.");
    location.href = "login.html";
    return;
  }

  const titleEl = $("memTitle");
  const yearEl  = $("memYear");
  const storyEl = $("memStory");
  if(!titleEl || !storyEl) return;

  const title = titleEl.value.trim();
  const year  = (yearEl?.value || "").trim();
  const story = storyEl.value.trim();

  if(!title || !story){
    alert("Please fill required fields.");
    return;
  }

  const items = getMemories();
  items.unshift({
    id: String(Date.now()),
    title,
    year,
    story,
    author: user,
    createdAt: new Date().toISOString()
  });
  saveMemories(items);

  e.target.reset();
  renderMemories();
}

function deleteMemory(id){
  const user = getCurrentUser();
  if(!user){
    alert("Please login.");
    return;
  }
  if(!confirm("Delete this memory?")) return;

  const items = getMemories().filter(x => x.id !== id);
  saveMemories(items);
  renderMemories();
}

function renderMemories(){
  const listEl = $("memList");
  if(!listEl) return;

  $("memLoginGate")?.classList.toggle("d-none", !!getCurrentUser());
  seedMemoriesDemoIfEmpty();

  const q = ($("memSearch")?.value || "").trim().toLowerCase();
  const items = getMemories().filter(x => {
    if(!q) return true;
    const hay = `${x.title} ${x.year || ""} ${x.story} ${x.author}`.toLowerCase();
    return hay.includes(q);
  });

  if(items.length === 0){
    listEl.innerHTML = `<div class="text-center text-secondary py-4">No memories found.</div>`;
    return;
  }

  listEl.innerHTML = items.map(x=>{
    const dt = x.createdAt ? new Date(x.createdAt).toLocaleString() : "";
    return `
      <div class="card-soft mb-3 memory-card">
        <div class="d-flex justify-content-between gap-2">
          <div>
            <div class="fw-bold">${escapeHtml(x.title)}</div>
            <div class="text-secondary small">
              By <b>${escapeHtml(x.author || "Member")}</b>
              ${x.year ? ` • Batch/Year: ${escapeHtml(x.year)}` : ""}
              ${dt ? ` • ${escapeHtml(dt)}` : ""}
            </div>
          </div>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteMemory('${x.id}')">Delete</button>
        </div>
        <div class="text-secondary mt-2" style="white-space:pre-wrap;">${escapeHtml(x.story)}</div>
      </div>
    `;
  }).join("");
}

function loadMemories(){
  updateNav();
  $("memLoginGate")?.classList.toggle("d-none", !!getCurrentUser());
  $("memSearch")?.addEventListener("input", renderMemories);
  renderMemories();
}

/* =========================
   ADMIN PANEL (localStorage demo)
   IDs: adminGate, adminPanel, kpiUsers, kpiAlumni, kpiMessages,
        usersTableBody, messagesBox
   Buttons: refreshAdmin(), clearUsers(), clearMessages()
   ========================= */
function isAdminUser(){
  return (getCurrentUser() || "").toLowerCase() === "admin";
}
function getMessages(){
  try { return JSON.parse(localStorage.getItem("messages") || "[]"); }
  catch(e){ return []; }
}
function setText(id, value){
  const el = $(id);
  if(el) el.textContent = value;
}

function loadAdminPanel(){
  updateNav();

  const gate = $("adminGate");
  const panel = $("adminPanel");
  if(!gate && !panel) return;

  if(!isAdminUser()){
    gate?.classList.remove("d-none");
    panel?.classList.add("d-none");
    return;
  }

  gate?.classList.add("d-none");
  panel?.classList.remove("d-none");

  const users = getUsers();
  const msgs = getMessages();

  setText("kpiUsers", users.length);
  setText("kpiAlumni", (typeof alumniData !== "undefined" ? alumniData.length : 0));
  setText("kpiMessages", msgs.length);

  // Users table
  const tbody = $("usersTableBody");
  if(tbody){
    tbody.innerHTML = "";
    if(users.length === 0){
      tbody.innerHTML = `<tr><td colspan="2" class="text-center text-secondary">No users found.</td></tr>`;
    } else {
      users.forEach(u=>{
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${escapeHtml(u.username || "")}</td>
          <td>${escapeHtml(u.password || "")}</td>
        `;
        tbody.appendChild(tr);
      });
    }
  }

  // Messages box
  const box = $("messagesBox");
  if(box){
    if(msgs.length === 0){
      box.innerHTML = "No messages yet.";
    } else {
      box.innerHTML = msgs.map(m=>{
        const dt = m.date ? new Date(m.date).toLocaleString() : "";
        return `
          <div class="border rounded-3 p-3 mb-2 bg-white">
            <div class="fw-semibold">${escapeHtml(m.name || "Unknown")}</div>
            <div class="small text-secondary">${escapeHtml(m.email || "")}${dt ? " • " + escapeHtml(dt) : ""}</div>
            <div class="mt-2">${escapeHtml(m.message || "")}</div>
          </div>
        `;
      }).join("");
    }
  }
}

function refreshAdmin(){
  loadAdminPanel();
}

function clearUsers(){
  if(!isAdminUser()){
    alert("Admin only.");
    return;
  }
  if(!confirm("Clear all registered users? (demo)")) return;

  localStorage.removeItem("users");
  loadAdminPanel();
}

function clearMessages(){
  if(!isAdminUser()){
    alert("Admin only.");
    return;
  }
  if(!confirm("Clear all contact messages? (demo)")) return;

  localStorage.removeItem("messages");
  loadAdminPanel();
}

/* =========================
   Auto-init (safe)
   ========================= */
document.addEventListener("DOMContentLoaded", ()=>{
  // Always try to update nav (safe if nav doesn't exist)
  updateNav();

  // Auto-init Admin Panel if the page has those elements
  if($("adminGate") || $("adminPanel")){
    loadAdminPanel();
  }
});
