(function () {
  // Mobile menu
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.textContent = open ? "Menu" : "Close";
    });
  }

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Quote form: opens the visitor's email app with the details filled in.
  var form = document.getElementById("quote-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form);
      var service = d.get("service") || "Cleaning";
      var subject = service + " quote request – " + (d.get("name") || "");
      var lines = [
        "Name: " + d.get("name"),
        "Email: " + d.get("email"),
        "Phone: " + (d.get("phone") || "-"),
        "Service: " + service,
        "Town / city: " + (d.get("town") || "-"),
        "",
        d.get("message")
      ];
      window.location.href =
        "mailto:freshwave.office@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(lines.join("\n"));
      var status = document.getElementById("form-status");
      if (status) {
        status.hidden = false;
        status.textContent =
          "Your email app should open with your message ready to send. If nothing happened, email freshwave.office@gmail.com or call (559) 373-0021.";
      }
    });
  }
})();
