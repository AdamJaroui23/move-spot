const conteneur = document.getElementById("courses-container");
const creneauxConteneur = document.getElementById("slots-container");

if (conteneur) {
  let coursActuel = cours[0];

  const afficherCreneaux = (coursChoisi) => {
    if (!creneauxConteneur) return;

    creneauxConteneur.innerHTML = coursChoisi.creneaux
      .map(
        (creneau, index) => `
          <button
            type="button"
            class="rounded-xl border px-4 py-2 text-sm font-medium transition ${
              index === 0
                ? "border-teal-600 bg-teal-600 text-white"
                : "border-slate-300 bg-white text-slate-800 hover:border-teal-600"
            }"
            data-id="${creneau.id}"
          >
            ${creneau.jour} <span class="font-normal">${creneau.heure}</span>
          </button>`
      )
      .join("");
  };

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

  const coursSelectionnes = conteneur.querySelectorAll("article[data-id]");
  coursSelectionnes.forEach(function (course) {
    course.addEventListener("click", function () {
      const coursChoisi = cours.find((coursItem) => coursItem.id === course.dataset.id);
      if (!coursChoisi) return;

      coursActuel = coursChoisi;
      coursSelectionnes.forEach(function (c) {
        c.classList.remove("ring-2", "ring-teal-600");
      });
      course.classList.add("ring-2", "ring-teal-600");

      document.getElementById("selected-course-title").textContent = coursChoisi.nom;
      document.getElementById("summary-course").textContent = coursChoisi.nom;
      document.getElementById("summary-total").textContent = `${coursChoisi.prix} €`;
      afficherCreneaux(coursChoisi);
      document.getElementById("summary-slot").textContent =
        `${coursChoisi.creneaux[0].jour} ${coursChoisi.creneaux[0].heure}`;
    });
  });

  afficherCreneaux(cours[0]);

  creneauxConteneur.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-id]");
    if (!button) return;

    const creneau = coursActuel.creneaux.find(
      (item) => item.id === button.dataset.id
    );
    if (!creneau) return;

    creneauxConteneur.querySelectorAll("button[data-id]").forEach(function (b) {
      b.classList.remove("border-teal-600", "bg-teal-600", "text-white");
      b.classList.add("border-slate-300", "bg-white", "text-slate-800");
    });
    button.classList.add("border-teal-600", "bg-teal-600", "text-white");
    button.classList.remove("border-slate-300", "bg-white", "text-slate-800");
    document.getElementById("summary-slot").textContent =
      `${creneau.jour} ${creneau.heure}`;
  });
}
