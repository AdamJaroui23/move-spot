const conteneur = document.getElementById("courses-container");

if (conteneur) {
  cours.forEach((coursItem) => {
    conteneur.innerHTML += `
    <article class="cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow-md" data-id="${coursItem.id}">
      <img src="${coursItem.image}" alt="Visuel du cours ${coursItem.nom}" class="h-36 w-full object-cover" />
      <div class="space-y-1 p-4">
        <span class="inline-block rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">${coursItem.categorie}</span>
        <h3 class="text-lg font-semibold text-slate-900">${coursItem.nom}</h3>
        <p class="text-sm text-slate-600">${coursItem.duree}, avec ${coursItem.coach}</p>
        <p class="pt-1 text-base font-bold text-slate-900">${coursItem.prix} € <span class="text-sm font-normal text-slate-500">par place</span></p>
      </div>
    </article>`;
  });

  conteneur.addEventListener("click", (event) => {
    const carte = event.target.closest("article");
    if (!carte) return;

    const coursChoisi = cours.find((coursItem) => coursItem.id === carte.dataset.id);
    if (!coursChoisi) return;

    carte.classList.toggle("ring-2");
    carte.classList.toggle("ring-teal-600");

    conteneur.querySelectorAll("article").forEach((item) => {
      if (item !== carte) {
        item.classList.remove("ring-2", "ring-teal-600");
      }
    });

    document.getElementById("selected-course-title").textContent = coursChoisi.nom;
    document.getElementById("summary-course").textContent = coursChoisi.nom;
    document.getElementById("summary-total").textContent = `${coursChoisi.prix} €`;
  });
}
