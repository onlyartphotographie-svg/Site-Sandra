const menu=document.querySelector(".menu"),nav=document.querySelector(".header nav");
menu?.addEventListener("click",()=>{const o=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(o));document.body.style.overflow=o?"hidden":"";document.body.classList.toggle("menu-open",o)});
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");document.body.style.overflow="";document.body.classList.remove("menu-open")}));
const els=document.querySelectorAll(".reveal");
if("IntersectionObserver"in window){const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");ob.unobserve(e.target)}}),{threshold:.1});els.forEach(e=>ob.observe(e))}else els.forEach(e=>e.classList.add("visible"));
const topBtn=document.querySelector(".top");addEventListener("scroll",()=>topBtn?.classList.toggle("show",scrollY>600));topBtn?.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
// Comparateur Avant / Après de la restauration
document.querySelectorAll("[data-before-after]").forEach(slider=>{
  const range=slider.querySelector(".ba-range");
  const beforeImg=slider.querySelector(".ba-before img");
  const beforePlaceholder=slider.querySelector(".ba-before > span");

  const syncWidth=()=>{
    const w=slider.getBoundingClientRect().width;
    if(beforeImg) beforeImg.style.width=w+"px";
    if(beforePlaceholder) beforePlaceholder.style.width=w+"px";
  };

  const update=()=>{
    slider.style.setProperty("--position", range.value+"%");
  };

  range.addEventListener("input",update);
  window.addEventListener("resize",syncWidth);
  syncWidth();
  update();
});
