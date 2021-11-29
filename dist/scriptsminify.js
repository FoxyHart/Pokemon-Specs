let pokemonRepository=function(){function t(t){let e=$(".modal-title"),n=$(".modal-body"),i=t.types.map(function(t){return t.type.name});e.empty(),n.empty();let o=$('<h1 class="text-capitalize">'+t.name+"</h1>"),l=$('<p class="text-capitalize">Types: '+i+"</p>"),a=$("<p>Height: "+t.height+"m</p>"),r=$("<p>Weight: "+t.weight+"</p>"),s=$("<img>");s.attr("src",t.imageUrl);let c=$("<img>");c.attr("src",t.imageUrlShiny),e.append(o),n.append(l),n.append(a),n.append(r),n.append(s),n.append(c)}let e=[],n="https://pokeapi.co/api/v2/pokemon/?limit=150";function o(t){e.push(t)}function l(t){let e=t.detailsUrl;return fetch(e).then(function(t){return t.json()}).then(function(e){t.imageUrl=e.sprites.front_default,t.imageUrlShiny=e.sprites.front_shiny,t.height=e.height,t.types=e.types,t.weight=e.weight,t.imageUrlOfficial=e.sprites.other["official-artwork"].front_default}).catch(function(t){console.error(t)})}let a=document.querySelector("#searchbar");a.addEventListener("input",()=>{for(input=document.querySelector(".pokemon-list"),filter=a.value.toUpperCase(),li=input.getElementsByTagName("li"),i=0;i<li.length;i++)button=li[i].getElementsByTagName("button")[0],value=button.textContent||button.innerText,value.toUpperCase().indexOf(filter)>-1?li[i].style.display="":li[i].style.display="none"});for(var r=document.getElementsByClassName("button"),s=0;s<r.length;s++)"ok"==r[s].id&&(r[s].style.background="");function c(e){pokemonRepository.loadDetails(e).then(function(){t(e)})}return{add:o,getAll:function(){return e},addListItem:function(t){let e=document.querySelector(".pokemon-list"),n=document.createElement("li"),i=document.createElement("button");i.innerText=t.name,i.classList.add("button-class"),n.classList.add("group-list-item"),n.appendChild(i),i.setAttribute("data-toggle","modal"),i.setAttribute("data-target","#pokemonModal"),e.appendChild(n),l(t).then(function(){let e=document.createElement("div");e.classList.add("buttonImg"),i.appendChild(e);let n=document.createElement("img");n.classList.add("imgOfficialArt"),n.src=t.imageUrlOfficial,e.appendChild(n)}),i.addEventListener("click",function(){c(t)})},loadList:function(){return fetch(n).then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){let e={name:t.name,detailsUrl:t.url};o(e),console.log(e)})}).catch(function(t){console.error(t)})},loadDetails:l,showDetails:c,showModal:t}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});