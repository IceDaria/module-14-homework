// определяем кнопку
 const btn = document.querySelector("button")

// добавляем обработчик события на эту конпку
   btn.addEventListener("click", () => {
// определяем переменные ширины и высоты картинки, поле вывода результата и вывода текста ошибки
      const inputWidth = document.querySelector('.width').value;
      const inputHeight = document.querySelector('.height').value;
      const resultNode = document.querySelector('.result');
      let alert = document.querySelector('.alert');

// пишем условия проверки введённых данных
    if(inputWidth <100 || inputWidth >300 || inputHeight <100 || inputHeight >300){
        
      alert.innerText = 'Одно из чисел вне диапазона от 100 до 300';
      resultNode.innerHTML = '';
    
   } else if (isNaN(inputWidth) || isNaN(inputHeight)) {
        alert.innerText = 'Упс, значение не является числом.';
        resultNode.innerHTML = '';

   } else {
      
      const options = {
            method: 'GET',
            mode: 'cors'
        };

// пишем запрос к серверу  
        fetch('https://picsum.photos/'+inputWidth+'/'+inputHeight, options)
        .then((response) => {

// определяем переменню для картинок, создаём див, куда они попадут
      
        const image = `<div class="card">
        <img src="${response.url}" class="card-image"/></div>`;

        resultNode.innerHTML = image;
        alert.innerText = '';

        console.log('Получаем response', response);

        })

        .then((data) => {
        console.log('Получаем data', data);
        
        })

        .catch(() => {console.log('Ошибка получения данных') });
    }
   }); 