// Fichier main.ts
import './style.css'
interface Plat{
  id:number;
  nom:string;
  prix:number;
  description:string;
}
const carte:Plat[]=[
  {id:1 ,nom:'Anchois 23cm',prix:7.9,description:"sauce tomate premium,origan,huile d'olive extra vierge,anchois,olive"},
  {id:2 ,nom:'Emmental 23cm',prix:7.9,description:"sauce tomate premium,origan,huile d'olive extra vierge,emmental,basilic,olive"},
  {id:3 ,nom:'Margherita 23cm',prix:7.9,description:"sauce tomate premium,origan,huile d'olive extra vierge,mozzarella"}
]
console.log(carte);
const appDiv=document.querySelector<HTMLDivElement>('#app');
if(appDiv){
  appDiv.innerHTML=`
    ${carte.map(p=>`
      <div class=card>
      <h3>${p.nom}</h3>
      <p>${p.description}<p>
      <p><strong>Prix: ${p.prix}€</strong></p>
      </div>
  `).join('')}
  `;
}
