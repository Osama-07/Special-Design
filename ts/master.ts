let mainColor: string | null = window.localStorage.getItem("color-option");

if (mainColor !== null) {
  document.documentElement.style.setProperty(`--main-color`, mainColor);

  let activeColor = document.querySelector(
    ".colors-list .active"
  ) as HTMLLIElement;
  if (activeColor) {
    activeColor.classList.remove("active");
  }

  let newActiveItem = document.querySelector(
    `.colors-list [data-color="${mainColor}"]`
  ) as HTMLLIElement;
  if (newActiveItem) {
    newActiveItem.classList.add("active");
  }
}

// Settings Box Toggles.
const gearElement = document.querySelector(
  ".toggle-settings .gear"
) as HTMLElement;
const settingsBox = document.querySelector(".settings-box") as HTMLDivElement;

if (gearElement && settingsBox) {
  gearElement.onclick = function () {
    (this as HTMLElement).classList.toggle("fa-spin");
    settingsBox.classList.toggle("open");
  };
}

// Close All Menus When click out them.
document.addEventListener("click", (e: MouseEvent) => {
  // Close Settings When Click out it.
  if (
    settingsBox.classList.contains("open") &&
    !settingsBox.contains(e.target as HTMLElement) &&
    e.target !== gearElement
  ) {
    settingsBox.classList.remove("open");
    gearElement.classList.remove("fa-spin");
  }
  // Close Links Menu When Click out it.
  const tLinks = document.querySelector(".links") as HTMLDivElement;
  const toggleMenu = document.querySelector(".toggle-menu") as HTMLDivElement;
  if (
    tLinks.classList.contains("open") &&
    toggleMenu.classList.contains("menu-active") &&
    !tLinks.contains(e.target as HTMLDivElement) &&
    !toggleMenu.contains(e.target as HTMLDivElement) &&
    e.target !== tLinks
  ) {
    tLinks.classList.remove("open");
    toggleMenu.classList.remove("menu-active");
  }
});

const colorLi = document.querySelectorAll<HTMLLIElement>(".colors-list li");

colorLi.forEach((li) => {
  li.addEventListener("click", function (e: MouseEvent) {
    HandleActive(e);

    const target = e.target as HTMLLIElement;

    const color = (target.dataset.color || "").trim();

    document.documentElement.style.setProperty(`--main-color`, color);

    if (color) {
      localStorage.setItem("color-option", color);
    }
  });
});

// Random Background Images.
let randomMode = localStorage.getItem("random-backgrounds");
if (randomMode !== null) {
  let optionButtons = document.querySelectorAll(".random-backgrounds span");
  optionButtons.forEach((sp) => {
    sp.classList.remove("active");
  });

  const landingPage = document.querySelector(".landing-page") as HTMLElement;
  if (randomMode === "true") {
    const randomBackgroundsYes = document.querySelector(
      ".random-backgrounds .yes"
    ) as HTMLElement;
    landingPage.classList.add("random-enable");
    randomBackgroundsYes.classList.add("active");
  } else {
    const randomBackgroundsNo = document.querySelector(
      ".random-backgrounds .no"
    ) as HTMLElement;
    landingPage.classList.remove("random-enable");
    randomBackgroundsNo.classList.add("active");
  }
}

let randomBackgrounds = document.querySelectorAll<HTMLSpanElement>(
  ".random-backgrounds span"
);
randomBackgrounds.forEach((span) => {
  span.addEventListener("click", function (e) {
    HandleActive(e);

    if (span.classList.contains("yes")) {
      localStorage.setItem("random-backgrounds", "true");
      (document.querySelector(".landing-page") as HTMLElement).classList.add(
        "random-enable"
      );
    } else {
      localStorage.setItem("random-backgrounds", "false");
      (document.querySelector(".landing-page") as HTMLElement).classList.remove(
        "random-enable"
      );
    }
  });
});

// Bullets Options
const bulletsOptions: NodeListOf<HTMLSpanElement> = document.querySelectorAll(
  ".bullets-options span"
);

bulletsOptions.forEach((op) => {
  op.addEventListener("click", (e) => {
    HandleActive(e);
    const target = e.target as HTMLSpanElement;

    target.classList.add("active");

    if (target.classList.contains("yes")) {
      (document.querySelector(".nav-bullets") as HTMLDivElement).style.display =
        "block";
      localStorage.setItem("show-bullets", "true");
    } else {
      (document.querySelector(".nav-bullets") as HTMLDivElement).style.display =
        "none";
      localStorage.setItem("show-bullets", "false");
    }
  });
});

// Button Reset.
(document.querySelector(".settings-box .reset") as HTMLDivElement).onclick =
  function () {
    localStorage.setItem("color-option", "#E91E63");
    localStorage.setItem("random-backgrounds", "true");
    localStorage.setItem("show-bullets", "true");
    window.location.reload();
  };

// Observer.
function ShowAboutUsSection() {
  const options = {
    threshold: 0.3, // مراقبة ظهور 10% من العنصر
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, options);

  // مراقبة جميع العناصر بعد رسمها
  document.querySelectorAll(".about-us").forEach((product) => {
    observer.observe(product);
  });
}
ShowAboutUsSection();

// Select Skill Selector
function ShowSkillsSection() {
  const options: IntersectionObserverInit = {
    threshold: 0.5, // مراقبة ظهور 50% من العنصر
  };

  const observe = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const target = entry.target as HTMLElement; // تحويل النوع
      const progress = target.dataset.progress;

      if (entry.isIntersecting) {
        if (progress) {
          target.style.width = progress; // تحديث عرض العنصر
        }
      }
    });
  }, options); // إضافة الخيارات للمراقبة

  document
    .querySelectorAll<HTMLSpanElement>(".skill-progress span")
    .forEach((sk) => {
      observe.observe(sk); // مراقبة كل عنصر
    });
}
ShowSkillsSection();

// Create Popup With Images.
let ourGallery = document.querySelectorAll<HTMLImageElement>(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e: MouseEvent) => {
    // Create Overlay Element.
    let overlay = document.createElement("div") as HTMLDivElement;

    // add Class to overlay
    overlay.className = "popup-overlay";
    overlay.addEventListener("click", (e: MouseEvent) => {
      overlay.remove();
    });

    // append to body.
    document.body.appendChild(overlay);

    // Create The Popup Box.
    let popupBox = document.createElement("div") as HTMLDivElement;

    // add class Popup Box.
    popupBox.className = "popup-box";

    popupBox.addEventListener("click", (e: MouseEvent) => {
      e.stopPropagation();
    });

    if (img.alt !== null) {
      // create heading.
      let imgHeading = document.createElement("h3") as HTMLElement;

      let textImg = document.createTextNode(img.alt);

      imgHeading.appendChild(textImg);

      popupBox.appendChild(imgHeading);
    }

    // create The Image.
    let popupImage = document.createElement("img") as HTMLImageElement;

    // Set image src.
    popupImage.src = img.src;

    popupBox.appendChild(popupImage);

    overlay.appendChild(popupBox);
  });
});

// Select Gallery Selector
function ShowGallerySection() {
  const options: IntersectionObserverInit = {
    threshold: 0.2, // مراقبة ظهور 20% من العنصر
  };

  const observe = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const target = entry.target as HTMLElement; // تحويل النوع
      if (entry.isIntersecting) {
        target.style.cssText =
          "visibility: visible; transform: translateX(0px); opacity: 1;";
      }
    });
  }, options); // إضافة الخيارات للمراقبة

  document
    .querySelectorAll<HTMLSpanElement>(".gallery .imgs-box img")
    .forEach((sk) => {
      observe.observe(sk); // مراقبة كل عنصر
    });
}
ShowGallerySection();

// Function For Scroll To Sections.
function ScrollToSections(elements: NodeListOf<HTMLElement>) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      let target = e.target as HTMLElement;
      let section = target.dataset.section;
      if (section) {
        (document.querySelector(section) as HTMLDivElement).scrollIntoView();
      }
    });
  });
}

// Select All Links.
const allLinks: NodeListOf<HTMLLIElement> =
  document.querySelectorAll(".links li a");

ScrollToSections(allLinks);

// Create Bullets Dynamicly.
function GenerateBullets(links: NodeListOf<HTMLElement>) {
  let navBullets: HTMLDivElement = document.createElement("div");
  navBullets.className = "nav-bullets";
  links.forEach((link) => {
    let bullet: HTMLDivElement = document.createElement("div");
    bullet.className = "bullet";
    bullet.setAttribute(
      "data-section",
      link.getAttribute("data-section") || ""
    );
    navBullets.appendChild(bullet);
    let tooltip: HTMLDivElement = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = link.textContent;
    bullet.appendChild(tooltip);
  });
  document.body.appendChild(navBullets);
}
GenerateBullets(allLinks);

// Select All Bullets.
const allBullets: NodeListOf<HTMLDivElement> = document.querySelectorAll(
  ".nav-bullets .bullet"
);
ScrollToSections(allBullets);

const showBullets = localStorage.getItem("show-bullets");
if (showBullets != null) {
  (
    document.querySelector(".bullets-options span.active") as HTMLSpanElement
  ).classList.remove("active");

  if (showBullets === "true") {
    (
      document.querySelector(".bullets-options .yes") as HTMLSpanElement
    ).classList.add("active");
    (document.querySelector(".nav-bullets") as HTMLDivElement).style.display =
      "block";
  } else {
    (
      document.querySelector(".bullets-options .no") as HTMLSpanElement
    ).classList.add("active");
    (document.querySelector(".nav-bullets") as HTMLDivElement).style.display =
      "none";
  }
}

// Handle 'active' Class.
function HandleActive(e: MouseEvent) {
  const target = e.target as HTMLLIElement;

  if (target.parentElement) {
    const activeItems =
      target.parentElement.querySelectorAll<HTMLLIElement>(".active");
    activeItems.forEach((activeLi) => {
      activeLi.classList.remove("active");
    });
  }

  target.classList.add("active");
}

// Toggle Menu.
const toggleMenu = document.querySelector(".toggle-menu") as HTMLDivElement;
toggleMenu.addEventListener("click", (e) => {
  (document.querySelector(".links") as HTMLDivElement).classList.toggle("open");
  toggleMenu.classList.toggle("menu-active");
});
