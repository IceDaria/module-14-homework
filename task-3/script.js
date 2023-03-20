// создаём функцию запроса к серверу
function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
// проверяем статус ответа от сервера на наличие ошибок
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };

  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };

  xhr.send();
};

//добавляем переменную кнопки
   const btn = document.querySelector("button")

// добавляем обработчик на кнопку и пишем условия проверки введённых данных
   btn.addEventListener("click", () => {

// добавляем переменную для обработки полученных данных, данные получаем через .value, определяем переменную для вывода текста ошибки
      const value = document.querySelector('input').value;
      let alert = document.querySelector('.alert');
    
// условия проверки данных 
    if (value < 1 || value > 10) {
      alert.innerText = 'Число вне диапазона от 1 до 10';
      resultNode.innerHTML = '';

    } else if (isNaN(value)) {
      alert.innerText = 'Пожалуйста, введите число в диапазоне от 1 до 10';
      resultNode.innerHTML = '';

    }  else {
      alert.innerText = '';
      let image = document.querySelector('.card');
      
      useRequest('https://picsum.photos/v2/list?limit='+value, displayResult);
    }
   }); 

  
   const resultNode = document.querySelector('.cards');

// пишем функцию вывода результата
   function displayResult(apiData) {
    let cards = '';
  
   apiData.forEach(item => {
// создаём дивы для изображений и пихаем их в переменную
    const cardBlock = `<div class="card">
      <img src="${item.download_url}" class="card__image"/>
        <p class="card__auth">${item.author}</p>
      </div>`;

    cards = cards + cardBlock;
  });
  resultNode.innerHTML = cards;
}