// Fichier main.ts
import './style.css'
interface Article{
  idArticle:number;
  nomArticle:string;
  PrixArticle:number;
  ingredientsArticle:string;
  quantiteArticle:number;

}
async function recuperationArticle():Promise<Article[]>{
  const article= await fetch('http://localhost/eatsmart-doriann/doriann-api-eatsmart/articles');
  return await article.json();

}
console.log(recuperationArticle());
async function init() { 
console.log("Chargement du menu..."); 
// 1. On attend la fin de la récupération 
const menuData = await recuperationArticle(); 
// 2. On cible la zone d'affichage (#app) 
const appDiv = document.querySelector<HTMLDivElement>('#app'); 
// 3. On injecte le HTML seulement si l'élément existe 
if (appDiv) { 
        appDiv.innerHTML=`
  <header>
      <h1>EatSmart - Carte du Restaurant</h1>
    </header>
    <main class="menu-container">
    ${menuData.map(p=> `
      <div class=card>
      <h3>${p.nomArticle}</h3>
      <p>${p.ingredientsArticle}<p>
      <p><strong>Prix: ${p.PrixArticle}€</strong></p>
      <button class=btn-order>Ajouter</button>
      </div>
      
  `).join('')}
  </main>
  `;
    } 

} 
// On n'oublie pas d'appeler la fonction pour démarrer l'application ! 
init(); 
