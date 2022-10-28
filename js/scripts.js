window.addEventListener("load", () => {
    /* ----------------- Page Loader ------------------ */
    document.querySelector(".page-loader").classList.add("slide-out-right");
    setTimeout(() => {
        document.querySelector(".page-loader").style.display = "none";
    }, 1000);
});

/* --------------- Rain Background ------------- */
function rain() {
  let amount = 200;
  let body = document.querySelector(".bg-animation-effect");
  let i = 0;
  while (i < amount) {
    let drop = document.createElement("i");

    let size = Math.random() * 5;
    let posX = Math.floor(Math.random() * window.innerWidth);
    let delay = Math.random() * -20;
    let duration = Math.random() * 5;

    drop.style.width = 0.2 + size + "px";
    drop.style.left = posX + "px";
    drop.style.animationDelay = delay+'s';
    drop.style.animationDuration = 1 + duration+'s';
    body.appendChild(drop);
    i++;
  }
}

rain();

/* --------------- Scroll Home ------------- */
let sr = ScrollReveal({
  duration: 2500,
  distance: "60px",
});

sr.reveal(".showcase-info", { delay: 600 });
sr.reveal(".showcase-image", { origin: "top", delay: 700 });

function hasReached(el) {
  let topPosition = el.getBoundingClientRect().top;

  if (window.innerHeight >= topPosition + el.offsetHeight) return true;
  return false;
}

/* --------------- Toggle Navbar ------------- */
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", toggleNavbar);

function toggleNavbar() {
  navToggler.classList.toggle("active");
  document.querySelector(".nav").classList.toggle("open");
  toggleOverlayEffect();
  toggleBodyScrolling();
}

/* ----------------- Hide & Show Section --------------------- */
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("link-item") && e.target.hash !== ""){
        const hash = e.target.hash;
        if(e.target.classList.contains("nav-item")){
            activeSection(hash);
            toggleNavbar();
        } else{
            toggleBodyScrolling();
            toggleOverlayEffect();
            document.querySelector(".nav-toggler").classList.add("toggle-hide");
            setTimeout(() => { 
                activeSection(hash);
                toggleOverlayEffect();
                toggleBodyScrolling();
                document.querySelector(".nav-toggler").classList.remove("toggle-hide");
            }, 950);
        }
    }   
});

function activeSection(sectionId){
    document.querySelector("section.active").classList.remove("active");
    document.querySelector(sectionId).classList.add("active");
    window.scrollTo(0,0);
}

/* --------------- Toggle Overlay Effect ------------- */
function toggleOverlayEffect(){
    document.querySelector(".overlay-effect").classList.toggle("active");
}

/* ------------------ Toggle Body Scrolling --------------------*/
function toggleBodyScrolling() {
  document.body.classList.toggle("hide-scrolling");
}

/* ------------------ Filter Portfolio Items --------------------*/
const filterBtnsContainer = document.querySelector(".portfolio-filter");
let portfolioItems;
filterBtnsContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("portfolio-filter-btn") &&
    !e.target.classList.contains("active")
  ) {
    filterBtnsContainer.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    toggleBodyScrolling();
    document.querySelector(".filter-status").classList.add("active");
    document.querySelector(
      ".filter-status p"
    ).innerHTML = `filtering <span>${e.target.innerHTML}</span> works`;
    setTimeout(() => {
      filterItems(e.target);
    }, 400);
    setTimeout(() => {
      document.querySelector(".filter-status").classList.remove("active");
      toggleBodyScrolling();
    }, 800);
  }
});

function filterItems(filterBtn) {
  const selectedCategory = filterBtn.getAttribute("data-filter");
  document.querySelectorAll(".portfolio-item").forEach((item) => {
    const category = item.getAttribute("data-category").split(",");
    if (
      category.indexOf(selectedCategory) !== -1 ||
      selectedCategory === "all"
    ) {
      item.classList.add("show");
    } else {
      item.classList.remove("show");
    }
  });
  portfolioItems = document.querySelectorAll(".portfolio-item.show");
}

filterItems(document.querySelector(".portfolio-filter-btn.active"));

/* ------------------ Portfolio Item Details Popup --------------------*/
let portfolioItemIndex;
document.addEventListener("click", (e) => {
  if (e.target.closest(".portfolio-item")) {
    const currentItem = e.target.closest(".portfolio-item");
    portfolioItemIndex = Array.from(portfolioItems).indexOf(currentItem);
    togglePopup();
    portfolioItemDetails();
    updateNextPrevItem();
  }
});

function togglePopup() {
  document.querySelector(".portfolio-popup").classList.toggle("open");
  toggleBodyScrolling();
}
document.querySelector(".pp-close-btn").addEventListener("click", togglePopup);

function portfolioItemDetails() {
  document.querySelector(".pp-thumbnail img").src =
    portfolioItems[portfolioItemIndex].querySelector("img").src;

  document.querySelector(".pp-header h3").innerHTML = portfolioItems[portfolioItemIndex].querySelector(".portfolio-item-title").innerHTML;

  document.querySelector(".pp-body").innerHTML = portfolioItems[
    portfolioItemIndex
  ].querySelector(".portfolio-item-details").innerHTML;

  document.querySelector(".pp-counter").innerHTML = `${
    portfolioItemIndex + 1
  } de ${portfolioItems.length} 
    ( <span title="category"> ${
      document.querySelector(".portfolio-filter-btn.active").innerHTML
    } </span>)`;
}

function updateNextPrevItem() {
  if (portfolioItemIndex !== 0) {
    document.querySelector(".pp-footer-left").classList.remove("hidden");
    document.querySelector(".pp-footer-left h3").innerHTML =
      portfolioItems[portfolioItemIndex - 1].querySelector("h3").innerHTML;

    document.querySelector(".pp-footer-left img").src =
      portfolioItems[portfolioItemIndex - 1].querySelector("img").src;
  } else {
    document.querySelector(".pp-footer-left").classList.add("hidden");
  }
  if (portfolioItemIndex !== portfolioItems.length - 1) {
    document.querySelector(".pp-footer-right").classList.remove("hidden");
    document.querySelector(".pp-footer-right h3").innerHTML =
      portfolioItems[portfolioItemIndex + 1].querySelector("h3").innerHTML;

    document.querySelector(".pp-footer-right img").src =
      portfolioItems[portfolioItemIndex + 1].querySelector("img").src;
  } else {
    document.querySelector(".pp-footer-right").classList.add("hidden");
  }
}

document.querySelector(".pp-prev-btn").addEventListener("click", () => {
  changePortfolioItem("prev");
});
document.querySelector(".pp-next-btn").addEventListener("click", () => {
  changePortfolioItem("next");
});

function changePortfolioItem(direction) {
  if (direction == "prev") {
    portfolioItemIndex--;
  } else {
    portfolioItemIndex++;
  }
  document.querySelector(".pp-overlay").classList.add(direction);
  setTimeout(() => {
    document.querySelector(".pp-inner").scrollTo(0, 0);
    portfolioItemDetails();
    updateNextPrevItem();
  }, 400);
  setTimeout(() => {
    document.querySelector(".pp-overlay").classList.remove(direction);
  }, 1000);
}

/* ------------------ Toggle Contact Form --------------------*/

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle-contact-form-btn")) {
    document.querySelector(".contact-form").classList.toggle("open");
    toggleBodyScrolling();
  }
});

/* -------------- About Tabs -------------- */
const tabsContainer = document.querySelector(".about-tabs"),
aboutSection = document.querySelector(".about-section");

tabsContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("tab-item") && !e.target.classList.contains("active")){
        tabsContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        const target = e.target.getAttribute("data-target");
        aboutSection.querySelector(".tab-content.active").classList.remove("active");
        aboutSection.querySelector(target).classList.add("active");
    }   
});  
