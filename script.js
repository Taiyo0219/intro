const revealTargets = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-scroll a");
const webAppImages = [
  // "app-screen-01.png",
  // "app-screen-02.png",
];

const webAppGallery = document.querySelector("#webappGallery");
const webAppEmpty = document.querySelector("#webappEmpty");

if (webAppGallery) {
  webAppImages.forEach((fileName, index) => {
    const shot = document.createElement("figure");
    shot.className = "webapp-shot";

    const image = document.createElement("img");
    image.src = `./assets/webapp/${fileName}`;
    image.alt = `Webアプリ制作画面 ${index + 1}`;
    image.loading = "lazy";

    shot.append(image);
    webAppGallery.append(shot);
  });

  if (webAppImages.length > 0 && webAppEmpty) {
    webAppEmpty.hidden = true;
  }
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealTargets.forEach((target) => revealObserver.observe(target));

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  {
    rootMargin: "-38% 0px -52% 0px",
    threshold: 0.01,
  }
);

sections.forEach((section) => activeObserver.observe(section));
