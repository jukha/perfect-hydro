document.addEventListener("DOMContentLoaded", function () {
  var lazyFrame = document.querySelector(".lazy-frame");
  var loadingSpinner = document.querySelector("#loading-bar-spinner");

  if (lazyFrame) {
    var observer = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var iframe = document.createElement("iframe");
            iframe.src = lazyFrame.getAttribute("data-src");
            iframe.frameBorder = "0";
            iframe.allow = "autoplay; fullscreen";
            iframe.allowFullscreen = true;

            // Hide the iframe initially
            iframe.style.opacity = "0";

            // Append the iframe to the container
            lazyFrame.appendChild(iframe);

            // Hide the loading spinner when the iframe is fully loaded
            iframe.addEventListener("load", function () {
              loadingSpinner.style.display = "none";
              iframe.style.opacity = "1";
            });

            // Show the loading spinner while the iframe is loading
            iframe.addEventListener("loadedmetadata", function () {
              loadingSpinner.style.display = "block";
            });

            // Unobserve the target once loaded
            observer.unobserve(lazyFrame);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(lazyFrame);
  }

  // Your other code...

  // Select all <p> and <h> tags
  var elementsToAnimate = document.querySelectorAll(
    "p, h1, h2, h3, h4, h5, h6"
  );

  // Callback function when an observed element enters the viewport
  var animateOnIntersection = function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Make the element visible with a delay
        setTimeout(function () {
          entry.target.style.opacity = "1";
        }, 300); // Delay in milliseconds
        observer.unobserve(entry.target); // Unobserve after making it visible
      }
    });
  };

  // Create the Intersection Observer
  var animateObserver = new IntersectionObserver(animateOnIntersection, {
    threshold: 0.1,
  });

  // Observe each element
  elementsToAnimate.forEach(function (element) {
    animateObserver.observe(element);
  });
});
