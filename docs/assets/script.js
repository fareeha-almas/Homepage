
async function loadProfile(){
  const res = await fetch("/profile.json");
  const p = await res.json();

  // Header
  document.getElementById("nav-name").textContent = p.name;
  document.getElementById("nav-tagline").textContent = p.tagline;
  document.getElementById("hero-title").textContent = p.name;
  document.getElementById("hero-tagline").textContent = p.tagline;
  document.getElementById("hero-about").textContent = p.about;
  document.getElementById("email-link").href = `mailto:${p.email}`;

  // Links
  const topLinks = document.getElementById("top-links");
  p.links?.forEach(l => {
    const a = document.createElement("a");
    a.href = l.url; a.className = "btn"; a.textContent = l.label;
    topLinks.appendChild(a);
  });

  // Education
  const edu = document.getElementById("edu-cards");
  p.education?.forEach(e => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `<div class="pad">
      <div style="font-weight:600">${e.degree}</div>
      <div class="meta">${e.institution} · ${e.year}</div>
      ${e.details ? `<p>${e.details}</p>` : ""}
    </div>`;
    edu.appendChild(el);
  });

  // Experience
  const exp = document.getElementById("exp-cards");
  p.experience?.forEach(e => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `<div class="pad">
      <div style="font-weight:600">${e.role}</div>
      <div class="meta">${e.org} · ${e.period}</div>
      <ul>${(e.bullets||[]).map(b=>`<li>${b}</li>`).join("")}</ul>
    </div>`;
    exp.appendChild(el);
  });

  // Skills
  const skills = document.getElementById("skills-pills");
  (p.skills||[]).forEach(s => {
    const el = document.createElement("span");
    el.className = "pill"; el.textContent = s;
    skills.appendChild(el);
  });

  // Publications
  const pubs = document.getElementById("pub-list");
  (p.publications||[]).forEach(pb => {
    const el = document.createElement("div");
    el.className = "pub";
    const links = (pb.links||[]).map(l=>`<a href="${l.url}">${l.label}</a>`).join(" · ");
    el.innerHTML = `<div><strong>${pb.title}</strong></div>
      <div class="meta">${pb.authors}${pb.venue ? " · " + pb.venue : ""}</div>
      <div>${links}</div>
      ${pb.notes ? `<div class="small">${pb.notes}</div>`: ""}`;
    pubs.appendChild(el);
  });

  // Projects
  const cards = document.getElementById("project-cards");
  function renderProjects(filter=""){
    cards.innerHTML = "";
    (p.projects||[])
      .filter(pr => pr.title.toLowerCase().includes(filter) || (pr.tags||[]).join(" ").toLowerCase().includes(filter))
      .sort((a,b)=> (b.highlight?1:0)-(a.highlight?1:0))
      .forEach(pr => {
        const el = document.createElement("div");
        el.className = "card";
        const links = (pr.links||[]).map(l=>`<a class="btn" href="${l.url}">${l.label}</a>`).join(" ");
        const tags = (pr.tags||[]).map(t=>`<span class="pill">${t}</span>`).join(" ");
        el.innerHTML = `<img src="${pr.thumb||'assets/placeholder.svg'}" alt="" style="width:100%;display:block;border-bottom:1px solid #1f2937;aspect-ratio:16/9;object-fit:cover"/>
          <div class="pad">
            <div style="font-weight:700;margin-bottom:6px">${pr.title}</div>
            <p>${pr.summary||""}</p>
            <div class="link-row">${links}</div>
            <div class="pills" style="margin-top:10px">${tags}</div>
          </div>`;
        cards.appendChild(el);
      });
  }
  renderProjects();

  const search = document.getElementById("project-search");
  search.addEventListener("input", e => renderProjects(e.target.value.trim().toLowerCase()));

  
  // Awards
  if (Array.isArray(p.awards) && p.awards.length){
    const ul = document.getElementById("awards-list");
    p.awards.forEach(a => { const li = document.createElement("li"); li.textContent = a; ul.appendChild(li); });
  } else { document.getElementById("awards").style.display="none"; }

  // Affiliations
  if (Array.isArray(p.affiliations) && p.affiliations.length){
    const ul = document.getElementById("affiliations-list");
    p.affiliations.forEach(a => { const li = document.createElement("li"); li.textContent = a; ul.appendChild(li); });
  } else { document.getElementById("affiliations").style.display="none"; }

  // Talks
  if (Array.isArray(p.talks) && p.talks.length){
    const ul = document.getElementById("talks-list");
    p.talks.forEach(a => { const li = document.createElement("li"); li.textContent = a; ul.appendChild(li); });
  } else { document.getElementById("talks").style.display="none"; }

  // Footer
  document.getElementById("year").textContent = new Date().getFullYear();
}
loadProfile();
