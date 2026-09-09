(function () {
  function replaceMissingImage(image) {
    if (!image || image.dataset.missingImageHandled === "true") {
      return;
    }

    image.dataset.missingImageHandled = "true";

    var placeholder = document.createElement("div");
    placeholder.className = "missing-image";
    placeholder.setAttribute("role", "note");

    var title = document.createElement("strong");
    title.textContent = "Image needed";

    var description = document.createElement("span");
    description.textContent = image.getAttribute("alt") || "This image has not been added yet.";

    var source = document.createElement("code");
    source.textContent = image.getAttribute("src") || "";

    placeholder.appendChild(title);
    placeholder.appendChild(description);
    placeholder.appendChild(source);
    image.replaceWith(placeholder);
  }

  function wireMissingImageFallbacks() {
    document.querySelectorAll(".md-typeset img").forEach(function (image) {
      image.addEventListener("error", function () {
        replaceMissingImage(image);
      });

      if (image.complete && image.naturalWidth === 0) {
        replaceMissingImage(image);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", wireMissingImageFallbacks);

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(wireMissingImageFallbacks);
  }
})();
