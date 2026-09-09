(function () {
  var productPrefixes = ["/ossm/", "/lockbox/", "/dtt/", "/radr/"];

  function normalizePath(pathname) {
    if (!pathname.endsWith("/")) {
      return pathname + "/";
    }

    return pathname;
  }

  function getProductPrefix(pathname) {
    var normalizedPath = normalizePath(pathname);

    return productPrefixes.find(function (prefix) {
      return normalizedPath === prefix || normalizedPath.startsWith(prefix);
    });
  }

  function guardProductFooterNavigation() {
    var currentProduct = getProductPrefix(window.location.pathname);

    if (!currentProduct) {
      return;
    }

    document
      .querySelectorAll(".md-footer__link--prev, .md-footer__link--next")
      .forEach(function (link) {
        var target = new URL(link.getAttribute("href"), window.location.href);
        var targetProduct = getProductPrefix(target.pathname);

        if (targetProduct !== currentProduct) {
          link.hidden = true;
          link.style.display = "none";
          link.setAttribute("aria-hidden", "true");
        } else {
          link.hidden = false;
          link.style.display = "";
          link.removeAttribute("aria-hidden");
        }
      });
  }

  document.addEventListener("DOMContentLoaded", guardProductFooterNavigation);

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(guardProductFooterNavigation);
  }
})();
