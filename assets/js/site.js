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

  // Service picker (home page): accessible tabs
  var picker = document.querySelector("[data-picker]");
  if (picker) {
    var tabs = Array.prototype.slice.call(picker.querySelectorAll("[role=tab]"));
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab); });
      tab.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") n = tabs[0];
        if (e.key === "End") n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
    select(tabs[0]);
    picker.classList.add("is-ready");
  }

  // Quote form: opens the visitor's email app with the details filled in.
  var form = document.getElementById("quote-form");
  if (form) {
    var wanted = new URLSearchParams(window.location.search).get("service");
    var svc = form.querySelector("select[name=service]");
    wanted = (wanted || "").replace(/[^a-z]/g, "");
    if (wanted && svc && svc.querySelector('option[value="' + wanted + '"]')) {
      svc.value = wanted;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form);
      var sel = form.querySelector("select[name=service]");
      var service = sel ? sel.options[sel.selectedIndex].text : "Cleaning";
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
