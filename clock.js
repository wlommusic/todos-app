const clock = document.querySelector(".clock");
// digital clock
const updateclock = ()=>{
  const now =  new Date();
  const h = now.toLocaleString("en-US", { hour: "numeric", hour12: true }); 
  const m = now.getMinutes();
  const s = now.toLocaleString("en-US", { second: "numeric", hour12: true }); 

  const html = `
  <span>${h}</span> : 
  <span>${m}</span> :
  <span>${s}</span>
  `;
  clock.innerHTML = html;
}

setInterval(updateclock,1000);