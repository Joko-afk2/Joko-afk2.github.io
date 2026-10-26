(function () {
  var menuBouton = document.querySelector(".menu-bouton");
  var menu = document.getElementById("menu");
  var correctionBouton = document.querySelector(".correction-lien");
  var panneau = document.getElementById("panneau-mail");
  var tiroirs = document.querySelectorAll(".tiroir-titre");
  var points = document.querySelectorAll(".points");

  function afficher(bouton, panneauEl, ouvert) {
    bouton.setAttribute("aria-expanded", ouvert ? "true" : "false");
    panneauEl.hidden = !ouvert;
  }

  function estOuvert(bouton) {
    return bouton.getAttribute("aria-expanded") === "true";
  }

  function fermerFormats() {
    points.forEach(function (bouton) {
      afficher(bouton, document.getElementById(bouton.getAttribute("aria-controls")), false);
    });
  }

  function ouvrirTiroir(id) {
    var bouton = document.querySelector('[aria-controls="' + id + '"]');
    var tiroir = document.getElementById(id);
    if (!bouton || !tiroir) {
      return;
    }
    afficher(bouton, tiroir, true);
  }

  function montrerVue(nom) {
    menu.querySelectorAll(".menu-vue").forEach(function (vue) {
      vue.hidden = vue.getAttribute("data-vue") !== nom;
    });
  }

  menuBouton.addEventListener("click", function (event) {
    event.stopPropagation();
    var ouvert = estOuvert(menuBouton);
    if (!ouvert) {
      montrerVue("choix");
    }
    afficher(menuBouton, menu, !ouvert);
  });

  menu.querySelectorAll("[data-ouvre]").forEach(function (bouton) {
    bouton.addEventListener("click", function (event) {
      event.stopPropagation();
      montrerVue(bouton.getAttribute("data-ouvre"));
    });
  });

  menu.querySelectorAll("a").forEach(function (lien) {
    lien.addEventListener("click", function () {
      ouvrirTiroir("tiroir-" + lien.getAttribute("href").slice(1));
      afficher(menuBouton, menu, false);
    });
  });

  tiroirs.forEach(function (bouton) {
    var tiroir = document.getElementById(bouton.getAttribute("aria-controls"));
    bouton.addEventListener("click", function (event) {
      event.stopPropagation();
      var ouvert = estOuvert(bouton);
      if (ouvert) {
        fermerFormats();
      }
      afficher(bouton, tiroir, !ouvert);
    });
  });

  points.forEach(function (bouton) {
    var formats = document.getElementById(bouton.getAttribute("aria-controls"));
    bouton.addEventListener("click", function (event) {
      event.stopPropagation();
      var ouvert = estOuvert(bouton);
      fermerFormats();
      afficher(bouton, formats, !ouvert);
    });
  });

  correctionBouton.addEventListener("click", function (event) {
    event.stopPropagation();
    afficher(correctionBouton, panneau, !estOuvert(correctionBouton));
  });

  document.addEventListener("click", function (event) {
    if (estOuvert(menuBouton) && !menu.contains(event.target)) {
      afficher(menuBouton, menu, false);
    }
    points.forEach(function (bouton) {
      var formats = document.getElementById(bouton.getAttribute("aria-controls"));
      if (estOuvert(bouton) && event.target !== bouton && !formats.contains(event.target)) {
        afficher(bouton, formats, false);
      }
    });
    if (
      estOuvert(correctionBouton) &&
      event.target !== correctionBouton &&
      !panneau.contains(event.target)
    ) {
      afficher(correctionBouton, panneau, false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }
    fermerFormats();
    afficher(menuBouton, menu, false);
    afficher(correctionBouton, panneau, false);
  });
})();
