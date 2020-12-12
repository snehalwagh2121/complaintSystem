// const newsUpdt=document.querySelector('.news-updates');

// newsUpdt.innerHTML="";

// const xhr= new XMLHttpRequest();
// xhr.open('GET','https://newsapi.org/v2/top-headlines?country=us&apiKey=5eed0e894fce49228541967850ebe62e', true);

// xhr.onload=function(){
//     if(this.status === 200){
//         let json=JSON.parse(this.responseText);
//         let articles=json.articles;
//         articles.forEach(element => {
//             console.log(element);
//             let news=`<div class="news-dtls">
//                         <div id="news-heading">${element.title}</div>
//                         <div id="news-content">${element.description}</div>
//                         <div class="readmore"><a href="${element.url}" target="_blank">READ MORE...</a></div>
//                         </div>`;
//             newsUpdt.innerHTML+=news;
//         });
//     }else{
//         console.log('error occured');
//     }
// }

// xhr.send()