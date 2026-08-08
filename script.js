const header=document.querySelector('#header'),menu=document.querySelector('.menu'),nav=document.querySelector('nav');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40));
menu.addEventListener('click',()=>{let open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',!open);nav.classList.toggle('open',!open)});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelector('#briefing-form').addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget);const text=`Olá, sou ${d.get('nome')}.%0AQuero falar sobre: ${d.get('projeto')}.%0A${d.get('mensagem')||''}`;window.open(`https://wa.me/5521989820283?text=${text}`,'_blank')});
