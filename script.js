const state={
 page:"dashboard", theme:localStorage.getItem("schoolhub-theme")||"light",
 students:[
  {id:"ST-1001",name:"Ayesha Khan",class:"Grade 10",section:"A",parent:"Imran Khan",phone:"+92 300 1234567",status:"Active",attendance:"96%",fee:"Paid"},
  {id:"ST-1002",name:"Hamza Ali",class:"Grade 9",section:"B",parent:"Sadia Ali",phone:"+92 301 8765432",status:"Active",attendance:"91%",fee:"Pending"},
  {id:"ST-1003",name:"Maham Ahmed",class:"Grade 8",section:"A",parent:"Usman Ahmed",phone:"+92 333 7654321",status:"Active",attendance:"98%",fee:"Paid"},
  
 ],
 teachers:[
  {name:"Dr. Fatima Noor",role:"Principal",subject:"Administration",status:"Active"},
  {name:"Usman Tariq",role:"Senior Teacher",subject:"Mathematics",status:"Active"},
  
 ],
 inventory:[
  {item:"HP ProBook 450",cat:"IT Equipment",qty:12,status:"In Stock",value:"Rs. 1,560,000"},
  {item:"Epson Projector",cat:"AV Equipment",qty:4,status:"In Stock",value:"Rs. 480,000"},
 
 ],
 activities:[
  ["₨","Fee payment received","Hamza Ali paid Grade  tuition."," min ago"],
  ["✓","Attendance submitted","Grade attendance completed."," min ago"],
  ["▣","Inventory updated","12 laptops assigned to Computer Lab."," hr ago"],
  ["★","Exam result published","Grade  Mathematics results published."," hrs ago"],
  ["✉","Announcement sent","Parent meeting reminder sent to Grade ."," hrs ago"]
 ]
};

const pages={
 dashboard:"Dashboard",students:"Students",teachers:"Teachers & Staff",academics:"Academics",attendance:"Attendance",exams:"Exams & Grades",
 finance:"Finance",inventory:"Inventory",library:"Library",communication:"Communication",events:"Events",documents:"Documents",reports:"Reports",settings:"Settings"
};
const app=document.getElementById("app");

function esc(v){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function toast(title,msg="Action completed successfully."){const t=document.createElement("div");t.className="toast";t.innerHTML=`<b>${esc(title)}</b><small>${esc(msg)}</small>`;document.getElementById("toastStack").appendChild(t);setTimeout(()=>t.remove(),3200)}
function avatar(name){return name.split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase()}
function badge(text){let c=/paid|active|in stock|available|completed|present/i.test(text)?"green":/pending|low|on leave/i.test(text)?"orange":/overdue|inactive|absent/i.test(text)?"red":"blue";return `<span class="badge ${c}">${esc(text)}</span>`}
function button(text,action=""){return `<button class="btn ${action?"primary":""}" data-action="${action}">${esc(text)}</button>`}

function render(){
 document.getElementById("pageTitle").textContent=pages[state.page];
 document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===state.page));
 const views={dashboard:dashboardView,students:studentsView,teachers:teachersView,academics:academicsView,attendance:attendanceView,exams:examsView,finance:financeView,inventory:inventoryView,library:libraryView,communication:communicationView,events:eventsView,documents:documentsView,reports:reportsView,settings:settingsView};
 app.innerHTML=(views[state.page]||dashboardView)();
}

function hero(title,sub,actions=""){return `<div class="hero"><div><h1>${title}</h1><p>${sub}</p></div><div class="hero-actions">${actions}</div></div>`}
function kpi(icon,cls,label,value,trend,foot){return `<div class="card kpi"><div class="kpi-top"><div class="kpi-icon ${cls}">${icon}</div><span class="trend ${trend.startsWith("+")?"up":"down"}">${trend}</span></div><label>${label}</label><h2>${value}</h2><div class="kpi-foot">${foot}</div></div>`}
function dashboardView(){
 const bars=[44,57,48,68,62,76,70,82,74,91,84,96];
 const rows=state.students.slice(0,5).map(s=>`<tr><td><div class="person"><div class="avatar">${avatar(s.name)}</div><div><b>${esc(s.name)}</b><small>${s.id}</small></div></div></td><td>${s.class}-${s.section}</td><td>${s.attendance}</td><td>${badge(s.fee)}</td><td>${badge(s.status)}</td></tr>`).join("");
 const acts=state.activities.map(a=>`<div class="activity"><div class="activity-icon">${a[0]}</div><div><b>${a[1]}</b><p>${a[2]}</p><small>${a[3]}</small></div></div>`).join("");
 return hero("Good morning, Admin 👋","Friday, September 4, 2026 · Here’s what’s happening at SOUL Academy today.",button("+ Add Student","add-student")+button("Record Payment","payment")+button("Take Attendance","attendance"))+
 `<div class="kpis">
 ${kpi("♙","blue","Total Students","1,148","+8.2%","vs. last year")}
 ${kpi("✓","green","Attendance Today","84.6%","+2.4%","1,181 present · 123 absent")}
 ${kpi("₨","purple","Fees Collected","Rs. 8.42k","+12.7%","of Rs. 10.1k expected")}
 ${kpi("▣","orange","Inventory Value","Rs. 4.86k","-3.1%","14 items need attention")}
 </div>
 <div class="grid-2">
  <div class="card panel"><div class="panel-head"><div><h3>Fee Collection</h3><p>Monthly collection performance</p></div><select class="field"><option>2026</option><option>2025</option></select></div><div class="chart"><div class="bars">${bars.map((h,i)=>`<div class="bar" style="height:${h}%"><em>${["Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"][i]}</em></div>`).join("")}</div></div></div>
  <div class="card panel"><div class="panel-head"><div><h3>Attendance Overview</h3><p>Today by class</p></div><button class="btn" data-action="attendance">View details</button></div><div class="donut-wrap"><div class="donut"><div class="donut-center"><b>94.6%</b><span>present</span></div></div><div class="legend-list"><div><span><i class="dot" style="background:#4f46e5"></i>Present</span><b>94.6%</b></div><div><span><i class="dot" style="background:#22c55e"></i>Late</span><b>2.8%</b></div><div><span><i class="dot" style="background:#f59e0b"></i>Absent</span><b>2.1%</b></div><div><span><i class="dot" style="background:#d1d5db"></i>Excused</span><b>0.5%</b></div></div></div></div>
 </div>
 <div class="grid-3">
  <div class="card panel"><div class="panel-head"><div><h3>Recent Students</h3><p>Latest records</p></div><button class="btn" data-action="students">View all</button></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Student</th><th>Class</th><th>Attendance</th><th>Fees</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div></div>
  <div class="card panel"><div class="panel-head"><div><h3>Quick Actions</h3><p>Common tasks</p></div></div><div class="quick-grid"><button class="quick" data-action="add-student"><b>+ Student</b><small>New admission</small></button><button class="quick" data-action="teacher"><b>+ Teacher</b><small>Add staff</small></button><button class="quick" data-action="inventory-add"><b>+ Inventory</b><small>New item</small></button><button class="quick" data-action="announcement"><b>✉ Message</b><small>Send update</small></button></div></div>
  <div class="card panel"><div class="panel-head"><div><h3>Recent Activity</h3><p>Live school updates</p></div></div>${acts}</div>
 </div>`;
}

function tablePage(title,sub,tools,table){return hero(title,sub,button("+ Add New","add-generic"))+`<div class="page-tools">${tools}</div><div class="card table-card"><div class="table-wrap">${table}</div></div>`}
function studentsView(){
 const search=document.getElementById("globalSearch").value.toLowerCase();
 const data=state.students.filter(s=>Object.values(s).join(" ").toLowerCase().includes(search));
 const rows=data.map(s=>`<tr><td><div class="person"><div class="avatar">${avatar(s.name)}</div><div><b>${esc(s.name)}</b><small>${s.id} · ${esc(s.parent)}</small></div></div></td><td>${s.class}-${s.section}</td><td>${esc(s.phone)}</td><td>${s.attendance}</td><td>${badge(s.fee)}</td><td>${badge(s.status)}</td><td><button class="btn" data-action="view-student" data-id="${s.id}">View</button></td></tr>`).join("");
 return tablePage("Students","Manage admissions, profiles, attendance and fee status.",
 `<input class="field tool-search" id="studentSearch" placeholder="⌕ Search students..." value="${esc(search)}"><select class="field"><option>All Classes</option><option>Grade 10</option><option>Grade 9</option><option>Grade 8</option></select><select class="field"><option>All Status</option><option>Active</option><option>Inactive</option></select>`,
 `<table class="data-table"><thead><tr><th>Student</th><th>Class</th><th>Phone</th><th>Attendance</th><th>Fees</th><th>Status</th><th></th></tr></thead><tbody>${rows||`<tr><td colspan="7"><div class="empty">No students found.</div></td></tr>`}</tbody></table>`);
}
function teachersView(){
 const rows=state.teachers.map(t=>`<tr><td><div class="person"><div class="avatar">${avatar(t.name)}</div><div><b>${t.name}</b><small>${t.role}</small></div></div></td><td>${t.subject}</td><td>${badge(t.status)}</td><td><button class="btn" data-action="profile">View profile</button></td></tr>`).join("");
 return tablePage("Teachers & Staff","Staff directory, roles, subjects and leave status.",
 `<input class="field tool-search" placeholder="⌕ Search staff..."><select class="field"><option>All Departments</option><option>Teaching</option><option>Administration</option></select>`,
 `<table class="data-table"><thead><tr><th>Staff member</th><th>Department / Subject</th><th>Status</th><th></th></tr></thead><tbody>${rows}</tbody></table>`);
}
function academicsView(){return hero("Academics","Classes, sections, subjects and timetable management.",button("+ Create Class","class-add"))+`<div class="page-grid">${["Grade 10 — Section A","Grade 9 — Section B","Grade 8 — Section A","Grade 7 — Section C","Grade 6 — Section A","Grade 5 — Section B"].map((x,i)=>`<div class="card mini-card"><h3>${x}</h3><p>${38+i} students · ${6+i%2} subjects</p><div class="metric">${["A","B","A","C","A","B"][i]}</div><small>Section · <span class="up">92% attendance</span></small></div>`).join("")}</div><div class="card panel" style="margin-top:14px"><div class="panel-head"><div><h3>Today's Timetable</h3><p>Friday schedule</p></div><button class="btn" data-action="timetable">Edit timetable</button></div><table class="data-table"><thead><tr><th>Time</th><th>Grade 10-A</th><th>Grade 9-B</th><th>Grade 8-A</th></tr></thead><tbody>${[["08:00","Mathematics","English","Biology"],["09:00","Physics","Mathematics","English"],["10:00","Break","Break","Break"],["10:30","Computer Science","Physics","Mathematics"],["11:30","English","Biology","Computer Science"]].map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`}
function attendanceView(){return hero("Attendance","Daily attendance tracking with class-wise insights.",button("Export Report","export"))+`<div class="kpis">${kpi("✓","green","Present","1,181","+2.4%","today")}${kpi("!","orange","Late","35","-1.1%","today")}${kpi("×","red","Absent","32","-4.8%","today")}${kpi("◷","blue","Not Marked","0","+100%","all classes complete")}</div><div class="card panel"><div class="panel-head"><div><h3>Class Attendance</h3><p>Friday, September 4</p></div><button class="btn primary" data-action="attendance-mark">Mark attendance</button></div><table class="data-table"><thead><tr><th>Class</th><th>Students</th><th>Present</th><th>Absent</th><th>Rate</th><th>Status</th></tr></thead><tbody>${["Grade 10-A","Grade 10-B","Grade 9-A","Grade 9-B","Grade 8-A","Grade 8-B"].map((x,i)=>`<tr><td><b>${x}</b></td><td>${38+i}</td><td>${36+i}</td><td>${2}</td><td>${96-i}%</td><td>${badge("Completed")}</td></tr>`).join("")}</tbody></table></div>`}
function examsView(){return hero("Exams & Grades","Create exams, publish results and track academic performance.",button("+ New Exam","exam-add"))+`<div class="grid-2"><div class="card panel"><div class="panel-head"><div><h3>Upcoming Exams</h3><p>Academic calendar</p></div></div>${["Mathematics — Grade 10","Physics — Grade 9","English — Grade 8","Biology — Grade 10"].map((x,i)=>`<div class="activity"><div class="activity-icon">★</div><div><b>${x}</b><p>${["Sep 12","Sep 14","Sep 16","Sep 18"][i]} · 09:00 AM</p></div>${badge("Scheduled")}</div>`).join("")}</div><div class="card panel"><div class="panel-head"><div><h3>Performance</h3><p>Average grade by subject</p></div></div><div class="line-chart"><svg viewBox="0 0 500 170" preserveAspectRatio="none"><polyline points="0,135 70,110 140,122 210,78 280,92 350,54 420,65 500,35" fill="none" stroke="#6366f1" stroke-width="4"/><polyline points="0,145 70,130 140,136 210,115 280,118 350,92 420,98 500,76" fill="none" stroke="#22c55e" stroke-width="3"/></svg></div><div class="legend"><span>● Average score</span><span>● Pass rate</span></div></div></div>`}
function financeView(){return hero("Finance","Fees, payments, expenses and cash-flow overview.",button("Record Payment","payment")+button("Add Expense","expense"))+`<div class="kpis">${kpi("₨","green","Collected","Rs. 8.42M","+12.7%","this academic year")}${kpi("◷","orange","Outstanding","Rs. 1.68M","-6.4%","across 214 invoices")}${kpi("↗","blue","Income","Rs. 12.9M","+9.8%","all income sources")}${kpi("↘","purple","Expenses","Rs. 7.2M","+4.1%","this academic year")}</div><div class="grid-2"><div class="card panel"><div class="panel-head"><div><h3>Cash Flow</h3><p>Income vs expenses</p></div></div><div class="chart"><div class="bars">${[58,66,61,76,70,84,77,91,82,95,88,98].map((h,i)=>`<div class="bar" style="height:${h}%"><em>${["Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"][i]}</em></div>`).join("")}</div></div></div><div class="card panel"><div class="panel-head"><div><h3>Fee Status</h3><p>Current billing cycle</p></div></div><div class="donut-wrap"><div class="donut" style="background:conic-gradient(#22c55e 0 72%,#f59e0b 72% 89%,#ef4444 89% 100%)"><div class="donut-center"><b>72%</b><span>paid</span></div></div><div class="legend-list"><div><span>Paid</span><b>72%</b></div><div><span>Pending</span><b>17%</b></div><div><span>Overdue</span><b>11%</b></div></div></div></div></div>`}
function inventoryView(){const rows=state.inventory.map(x=>`<tr><td><b>${x.item}</b></td><td>${x.cat}</td><td>${x.qty}</td><td>${badge(x.status)}</td><td>${x.value}</td><td><button class="btn" data-action="inventory-view">History</button></td></tr>`).join("");return tablePage("Inventory","Track assets, stock levels, suppliers and movements.",`<input class="field tool-search" placeholder="⌕ Search inventory..."><select class="field"><option>All Categories</option><option>IT Equipment</option><option>Stationery</option><option>Furniture</option></select>`, `<table class="data-table"><thead><tr><th>Item</th><th>Category</th><th>Qty</th><th>Status</th><th>Total Value</th><th></th></tr></thead><tbody>${rows}</tbody></table>`)}
function libraryView(){return hero("Library","Books, lending activity, overdue returns and members.",button("+ Add Book","book-add"))+`<div class="kpis">${kpi("▤","blue","Total Books","8,642","+4.6%","catalogued")}${kpi("↗","green","Issued","1,284","+8.1%","currently borrowed")}${kpi("!","orange","Overdue","86","-12.4%","needs attention")}${kpi("♙","purple","Members","1,516","+6.2%","active students & staff")}</div><div class="card panel"><div class="panel-head"><div><h3>Recent Library Transactions</h3><p>Latest issues and returns</p></div><button class="btn" data-action="library-return">Process return</button></div><table class="data-table"><thead><tr><th>Member</th><th>Book</th><th>Issued</th><th>Due</th><th>Status</th></tr></thead><tbody>${[["Ayesha Khan","Oxford Mathematics 10","Sep 1","Sep 15","Issued"],["Hamza Ali","Physics Fundamentals","Aug 28","Sep 11","Issued"],["Maham Ahmed","English Literature","Aug 20","Sep 3","Overdue"],["Sara Raza","World History","Aug 25","Sep 8","Returned"]].map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${badge(r[4])}</td></tr>`).join("")}</tbody></table></div>`}
function communicationView(){return hero("Communication","Announcements, parent messages and school-wide updates.",button("New Announcement","announcement"))+`<div class="grid-2"><div class="card panel"><div class="panel-head"><div><h3>Recent Announcements</h3><p>Messages sent to your school community</p></div></div>${["Parent–Teacher Meeting — September 20","Midterm examination schedule","School transport route update","Fee deadline reminder"].map((x,i)=>`<div class="activity"><div class="activity-icon">✉</div><div><b>${x}</b><p>${["All parents","Students & parents","Parents","Grade 9–10 parents"][i]} · Sent ${i+1} day${i?"s":""} ago</p></div>${badge("Sent")}</div>`).join("")}</div><div class="card panel"><div class="panel-head"><div><h3>Audience Reach</h3><p>Delivery analytics</p></div></div><div class="metric">96.8%</div><p style="color:var(--muted);font-size:9px">Messages successfully delivered</p><div class="progress"><i style="width:96.8%"></i></div><div class="legend-list"><div><span>Parents</span><b>1,094</b></div><div><span>Students</span><b>1,248</b></div><div><span>Staff</span><b>126</b></div></div></div></div>`}
function eventsView(){return hero("Events","School calendar, activities, meetings and important dates.",button("+ Add Event","event-add"))+`<div class="card panel"><div class="panel-head"><div><h3>September 2026</h3><p>School calendar</p></div><div>${button("Today","today")}</div></div><div class="calendar">${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(x=>`<div class="day-name">${x}</div>`).join("")}${Array.from({length:35},(_,i)=>{let n=i-1;return `<div class="day ${n<1?"muted":""} ${[8,12,20,24].includes(n)?"event":""}"><b>${n>0&&n<=30?n:""}</b>${n===8?'<div class="event-dot">★ Sports Day</div>':n===12?'<div class="event-dot">★ Math Exam</div>':n===20?'<div class="event-dot">★ PT Meeting</div>':n===24?'<div class="event-dot">★ Holiday</div>':""}</div>`}).join("")}</div></div>`}
function documentsView(){return hero("Documents","Certificates, reports, student files and shared school documents.",button("Upload Document","document-add"))+`<div class="page-grid">${["Student Certificates","Academic Reports","Fee Receipts","Staff Documents","School Policies","Templates"].map((x,i)=>`<div class="card mini-card"><div class="kpi-icon ${["blue","green","purple","orange"][i%4]}">${["□","▤","₨","◉"][i%4]}</div><h3 style="margin-top:12px">${x}</h3><p>${[328,842,1248,96,24,18][i]} files</p><button class="btn" data-action="open-docs">Open folder</button></div>`).join("")}</div>`}
function reportsView(){return hero("Reports & Analytics","Turn school data into clear, actionable reports.",button("Export PDF","export")+button("Export CSV","export"))+`<div class="page-grid">${["Student Performance","Attendance Analysis","Fee Collection","Inventory Valuation","Teacher Workload","Library Analytics"].map((x,i)=>`<div class="card mini-card"><h3>${x}</h3><p>Updated today · ${["1,248","94.6%","Rs. 8.42M","Rs. 4.86M","126 staff","1,284 issued"][i]}</p><button class="btn primary" data-action="report-view">Generate report</button></div>`).join("")}</div>`}
function settingsView(){return hero("Settings","Manage school profile, security, roles, preferences and branding.",button("Save Changes","save"))+`<div class="grid-2"><div class="card panel"><div class="panel-head"><div><h3>School Profile</h3><p>Basic information displayed across SchoolHub</p></div></div><div class="form-grid"><div class="form-group"><label>School name</label><input class="field" style="width:100%" value="Al Noor Academy"></div><div class="form-group"><label>Academic year</label><input class="field" style="width:100%" value="2026–27"></div><div class="form-group"><label>Phone</label><input class="field" style="width:100%" value="+92 42 1234567"></div><div class="form-group"><label>Email</label><input class="field" style="width:100%" value="admin@alnoor.edu.pk"></div></div></div><div class="card panel"><div class="panel-head"><div><h3>Security</h3><p>Account and access controls</p></div></div>${["Two-factor authentication","Login alerts","Automatic session timeout","Audit log retention"].map((x,i)=>`<div class="activity"><div><b>${x}</b><p>${["Extra protection for admin accounts","Notify admins about new logins","Lock after 30 minutes of inactivity","Keep records for 12 months"][i]}</p></div><span class="badge green">Enabled</span></div>`).join("")}</div></div>`}

function openModal(type,data={}){
 const wrap=document.getElementById("modalWrap"), title=document.getElementById("modalTitle"), sub=document.getElementById("modalSubtitle"), form=document.getElementById("modalForm");
 const configs={
  "add-student":["Add Student","Create a new student profile.",[["Full name","name","text"],["Student ID","id","text"],["Class","class","text"],["Section","section","text"],["Parent / Guardian","parent","text"],["Phone","phone","text"]]],
  "teacher":["Add Teacher","Create a staff profile.",[["Full name","name","text"],["Role","role","text"],["Subject / Department","subject","text"],["Email","email","email"]]],
  "inventory-add":["Add Inventory Item","Add an item to your stock register.",[["Item name","item","text"],["Category","cat","text"],["Quantity","qty","number"],["Total value","value","text"]]],
  "payment":["Record Payment","Record a student fee payment.",[["Student","student","text"],["Amount","amount","text"],["Payment method","method","text"],["Reference","reference","text"]]],
  "announcement":["New Announcement","Send a message to your school community.",[["Title","title","text"],["Audience","audience","text"],["Message","message","textarea"]]],
  "attendance-mark":["Mark Attendance","Record today's class attendance.",[["Class","class","text"],["Present","present","number"],["Absent","absent","number"],["Notes","notes","textarea"]]],
  "event-add":["Add Event","Add an event to the school calendar.",[["Event name","name","text"],["Date","date","date"],["Time","time","time"],["Location","location","text"]]],
  "book-add":["Add Book","Add a new title to the library catalog.",[["Book title","title","text"],["Author","author","text"],["ISBN","isbn","text"],["Copies","copies","number"]]],
  "expense":["Add Expense","Record a school expense.",[["Description","description","text"],["Amount","amount","text"],["Category","category","text"],["Date","date","date"]]],
  "class-add":["Create Class","Create a new class or section.",[["Class name","class","text"],["Section","section","text"],["Room","room","text"],["Class teacher","teacher","text"]]],
  "generic":["Create Record","Enter the requested information.",[["Name","name","text"],["Description","description","text"]]]
 };
 const cfg=configs[type]||configs.generic; title.textContent=cfg[0];sub.textContent=cfg[1];
 form.innerHTML=`<div class="form-grid">${cfg[2].map(f=>`<div class="form-group" style="${f[2]==="textarea"?"grid-column:1/-1":""}"><label>${f[0]}</label>${f[2]==="textarea"?`<textarea class="field" name="${f[1]}" rows="4" style="width:100%;padding-top:9px"></textarea>`:`<input class="field" type="${f[2]}" name="${f[1]}" value="${esc(data[f[1]]||"")}" style="width:100%">`}</div>`).join("")}</div><div class="form-actions"><button type="button" class="btn" id="cancelModal">Cancel</button><button class="btn primary">Save Record</button></div>`;
 wrap.classList.add("open");
 form.onsubmit=e=>{e.preventDefault();const fd=new FormData(form);if(type==="add-student"){state.students.unshift({id:fd.get("id")||"ST-"+Math.floor(1000+Math.random()*9000),name:fd.get("name"),class:fd.get("class"),section:fd.get("section"),parent:fd.get("parent"),phone:fd.get("phone"),status:"Active",attendance:"100%",fee:"Pending"});render()}else if(type==="teacher"){state.teachers.unshift({name:fd.get("name"),role:fd.get("role"),subject:fd.get("subject"),status:"Active"});render()}else if(type==="inventory-add"){state.inventory.unshift({item:fd.get("item"),cat:fd.get("cat"),qty:Number(fd.get("qty")||0),status:Number(fd.get("qty")||0)<5?"Low Stock":"In Stock",value:fd.get("value")||"Rs. 0"});render()}else if(type==="announcement"){state.activities.unshift(["✉","Announcement sent",fd.get("title"),"Just now"]);}else if(type==="payment"){state.activities.unshift(["₨","Payment recorded",`${fd.get("student")} · ${fd.get("amount")}`,"Just now"]);}else{state.activities.unshift(["✓","New record created",cfg[0],"Just now"])} closeModal();toast("Saved",`${cfg[0]} was added successfully.`);};document.getElementById("cancelModal").onclick=closeModal;
}
function closeModal(){document.getElementById("modalWrap").classList.remove("open")}
function action(type,id){
 if(type==="add-student")openModal("add-student");
 else if(type==="teacher")openModal("teacher");
 else if(type==="inventory-add")openModal("inventory-add");
 else if(type==="payment")openModal("payment");
 else if(type==="announcement")openModal("announcement");
 else if(type==="attendance"||type==="attendance-mark")openModal("attendance-mark");
 else if(type==="event-add")openModal("event-add");
 else if(type==="book-add")openModal("book-add");
 else if(type==="expense")openModal("expense");
 else if(type==="class-add")openModal("class-add");
 else if(type==="exam-add")openModal("generic");
 else if(type==="document-add")openModal("generic");
 else if(type==="add-generic")openModal("generic");
 else if(type==="save")toast("Settings saved","Your school preferences were updated.");
 else if(type==="export")toast("Report ready","Demo export generated. Connect a backend for real file exports.");
 else if(type==="report-view")toast("Report generated","Your analytics report is ready to review.");
 else if(type==="view-student"){const s=state.students.find(x=>x.id===id);openModal("add-student",s)}
 else if(["inventory-view","library-return","profile","timetable","today","open-docs"].includes(type))toast("Opened", "This workspace is ready for your next action.");
}

document.addEventListener("click",e=>{
 const nav=e.target.closest("[data-page]"); if(nav){state.page=nav.dataset.page;render();document.getElementById("profileDropdown").classList.remove("open");document.getElementById("sidebar").classList.remove("open");return}
 const a=e.target.closest("[data-action]");if(a){action(a.dataset.action,a.dataset.id);return}
});
document.getElementById("globalSearch").addEventListener("input",()=>{if(state.page!=="students"){state.page="students";render()}else render()});
document.getElementById("mobileMenu").onclick=()=>{document.getElementById("sidebar").classList.toggle("open");document.getElementById("overlay").classList.toggle("open")};
document.getElementById("profileBtn").onclick=()=>document.getElementById("profileDropdown").classList.toggle("open");
document.getElementById("notificationBtn").onclick=()=>{document.getElementById("notificationDrawer").classList.add("open");document.getElementById("overlay").classList.add("open")};
document.getElementById("closeNotifications").onclick=closeDrawer;
document.getElementById("overlay").onclick=()=>{closeDrawer();document.getElementById("sidebar").classList.remove("open");document.getElementById("overlay").classList.remove("open")};
document.getElementById("markRead").onclick=()=>{document.querySelectorAll(".notice.unread").forEach(x=>x.classList.remove("unread"));toast("Notifications cleared","All notifications marked as read.");};
document.getElementById("closeModal").onclick=closeModal;
document.getElementById("themeToggle").onclick=()=>{state.theme=state.theme==="dark"?"light":"dark";document.body.classList.toggle("dark",state.theme==="dark");localStorage.setItem("schoolhub-theme",state.theme)};
document.getElementById("logoutBtn").onclick=()=>toast("Demo mode","Logout is simulated in this browser prototype.");
document.getElementById("logoutDrop").onclick=()=>toast("Signed out","Connect authentication for real sessions.");
document.getElementById("quickLock").onclick=()=>toast("Screen locked","Demo lock screen activated.");
document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();document.getElementById("globalSearch").focus()}if(e.key==="Escape"){closeModal();closeDrawer()}});
function closeDrawer(){document.getElementById("notificationDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("open")}
document.body.classList.toggle("dark",state.theme==="dark");
render();
