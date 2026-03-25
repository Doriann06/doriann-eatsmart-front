// Fichier main.ts
import './style.css'
interface Article{
  idArticle:number;
  nomArticle:string;
  PrixArticle:number;
  ingredientsArticle:string;
  quantiteArticle:number;
}
interface Message{
  userId: number,
  id: number,
  title: string,
  completed: boolean
}
function bonPlan(prix:number){
  if (prix<10){return"  🔥Bon Plan"; }
  else{return ""}
}
function affichePannier(panier:Article[]){
  let strPannier:string=""
  panier.forEach((value:Article)=>{
    strPannier=strPannier+`<p> ${value.nomArticle}          ${value.PrixArticle}€`
  })
  if (strPannier==""){return "Votre panier est vide"}
  else{return strPannier}
}
function afficheTotal(panier:Article[]){
  let totalPannier:number=0;
  panier.forEach((value:Article)=>{
    totalPannier+=+value.PrixArticle;
  })
  return totalPannier.toFixed(2);
}
async function recuperationArticle():Promise<Article[]>{
  const article= await fetch('http://localhost/eatsmart-doriann/doriann-api-eatsmart/articles');
  return await article.json();

}
async function recuperationMessage():Promise<Message>{
  const message= await fetch('https://jsonplaceholder.typicode.com/todos/1');
  return await message.json();

}
// initialise le pannier
let panier: Article[]=[]
console.log(recuperationArticle());
async function init() { 
console.log("Chargement du menu...");
// 1. On attend la fin de la récupération 
const menuData = await recuperationArticle(); 
const messageData = await recuperationMessage(); 
// 2. On cible la zone d'affichage (#app) 
const appDiv = document.querySelector<HTMLDivElement>('#app'); 
// 3. On injecte le HTML seulement si l'élément existe 
if (appDiv) { 
        appDiv.innerHTML=`
  <header>
    <h1>EatSmart - Carte du Restaurant (${menuData.length} plats)</h1>
  </header>
  Message du jour: ${messageData.title}
  <div class='content-wrapper'>
    <main class="menu-container">
      ${menuData.map(p=> `
        <div class=card>
        <h3>${p.nomArticle}</h3>
        <p>${p.ingredientsArticle}<p>
        <p><strong>Prix: ${p.PrixArticle}€</strong></p>
        <p><strong>${bonPlan(p.PrixArticle)}</strong></p>
        <button class=btn-order>Ajouter</button>
        </div>
        
    `).join('')}
    </main>
    <asside class='cart-container'>
      <h2> Votre Panier</h2>
      <div id="cart-total">
        <p> ${affichePannier(panier)}</p>
      </div>
      <hr>
      <div class="cart-total">
        <strong> Total:<span id="total-prix">${afficheTotal(panier)}</sapn>€</strong>
      </div>
      <button class=btn-valider> Valider la commande</button>
    </asside>
  </div>  
  `;
    } 
// Récupère TOUS les boutons ayant la classe "btn-order"
const tousLesBoutons = document.querySelectorAll<HTMLButtonElement>('.btn-order');
tousLesBoutons.forEach((btn, index) => { 
    btn.addEventListener('click', () => { 
      console.log(`Bouton n°${index} cliqué ! Plat= ${menuData[index].nomArticle}`);
      panier.push(menuData[index]);// ajoute l'article au pannier
      console.log(`Panier=`)
      console.log(panier);
      init(); // reafiche le pannier pour faire apparaitre les rajout d'article

    }); 
});

const boutonValider=document.querySelectorAll<HTMLButtonElement>('.btn-valider');
boutonValider.forEach((btn)=>{
  btn.addEventListener('click',()=>{
    console.log('Bouton valider commande cliqué');
  })
});
} 
// On n'oublie pas d'appeler la fonction pour démarrer l'application ! 
init();
 