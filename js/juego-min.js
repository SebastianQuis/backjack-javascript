const miModulo=(()=>{"use strict";let e=[];var a=["E","T","C","D",],t=["A","J","Q","K"];let l=[],r=document.querySelector("#btnPedir"),d=document.querySelector("#btnDetener"),n=document.querySelector("#btnNuevo"),s=document.querySelectorAll("small"),i=document.querySelectorAll(".divCartas"),o=(a=2)=>{e=u(),l=[];for(let t=0;t<a;t++)l.push(0),s[t].innerText=0,i[t].innerHTML="";r.disabled=!1,d.disabled=!1},u=()=>{e=[];for(let l=2;l<=10;l++)for(let r of a)e.push(l+r);for(let d of t)for(let n of a)e.push(d+n);return _.shuffle(e)},c=()=>0===e.length?"No hay carta en la baraja":e.pop(),$=e=>{let a=e.slice(0,-1);return isNaN(a)?"A"===a?11:10:1*a},g=(e,a)=>(l[e]+=$(a),s[e].innerText=l[e],l[e]),b=(e,a)=>{let t=document.createElement("img");t.src=`assets/cartas/${e}.png`,t.classList.add("carta"),i[a].append(t)},f=()=>{let[e,a]=l;setTimeout(()=>{a===e?alert("Nadie gana"):e>21?alert("Computadora gana"):a>21?alert("Jugador gana"):alert("Computadora gana")},20)},p=e=>{let a=0;do{let t=c();a=g(l.length-1,t),b(t,l.length-1)}while(a<e&&e<=21);f()};return r.addEventListener("click",()=>{let e=c(),a=g(0,e);b(e,0),a>21?(console.warn("Perdiste jugador!!"),r.disabled=!0,d.disabled=!0,p(a)):21==a&&(console.warn("Llegaste a 21, genial!!"),r.disabled=!0,d.disabled=!0,p(a))}),d.addEventListener("click",()=>{r.disabled=!0,d.disabled=!0,p(l[0])}),n.addEventListener("click",()=>{o()}),{nuevoJuego:o}})();