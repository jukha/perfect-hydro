document.addEventListener("DOMContentLoaded", function () {
  var lazyFrame = document.querySelector(".lazy-frame");
  var beforeImg = document.querySelector(".before-img");
  var afterImg = document.querySelector(".after-img");

  beforeImg.addEventListener("click", () => {
    beforeImg.style.opacity = "0";
    beforeImg.style.zIndex = "10";
    afterImg.style.opacity = "1";
    afterImg.style.zIndex = "20";
  });

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

            lazyFrame.innerHTML = ""; // Clear the container
            lazyFrame.appendChild(iframe);

            // You can also hide the poster image if you want
            // lazyFrame.querySelector('.poster').style.display = 'none';

            // Unobserve the target once loaded
            observer.unobserve(lazyFrame);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(lazyFrame);
  }

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
