// определяем переменные
const btn = document.querySelector('.button');
const result = document.querySelector('.result');
const alert = document.querySelector('.alert')

// проверяем локальное хранилище и выдаём последний успешный результат
if (localStorage.hasOwnProperty("images")) {
    showResult()
}

// добавляем обработчик на кнопку и пишем функцию проверки введённых значений
btn.addEventListener('click', async () => {

// определяем переменые для инпутов, берём из них value после обработки события
    const PageNumber = document.querySelector('.page-number').value;
    const Limit = document.querySelector('.limit').value;
  
// проверяем введённые данные
    if ((PageNumber < 1 || PageNumber > 10 || isNaN(PageNumber)) && (Limit < 1 || Limit > 10 || isNaN(Limit))) {
        alert.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';
        result.innerHTML = ""
    } else if (PageNumber < 1 || PageNumber > 10 || isNaN(PageNumber)) {
        alert.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
        result.innerHTML = ""
    } else if (Limit < 1 || Limit > 10 || isNaN(Limit)) {
        alert.innerHTML = 'Лимит вне диапазона от 1 до 10';
        result.innerHTML = ""
    } else {
        await useRequest(`https://picsum.photos/v2/list?page=${PageNumber}&limit=${Limit}`)
    }
})

// пишем функцию для выполнения запросов на сервер и обработки полученных данных
const useRequest = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) { // проверяем статус ответа
      throw new Error(`Ошибка ${response.status} при выполнении запроса ${url}`);
    }
    const data = await response.json();
    const imagesArray = data.map(item => ({ imageSrc: item.download_url }));
    localStorage.setItem("images", JSON.stringify(imagesArray));
    showResult();
  } catch (error) {
    console.log('Ошибка', error);
    result.innerHTML = `Ошибка: ${error.message}`; // выводим сообщение об ошибке на экран
  }
}

// результат обработки запроса, создание карточек с картинками
function showResult() {
    let cards = ''
    const data = JSON.parse(localStorage.getItem("images"))

    data.forEach(item => {
        const cardBlock = `<div class="cards">
                    <img class="card__imgs" src="${item.imageSrc}"> </div>`
        cards += cardBlock
    })
    alert.innerHTML = "";
    result.innerHTML = cards
}