// src/PageRenderer.js

/**
 * Класс PageRenderer отвечает за отрисовку содержимого различных страниц в DOM.
 * Он принимает данные для новостей, элемент, в который будет рендериться контент,
 * и колбэк для переключения страниц.
 */
export class PageRenderer {
    /**
     * Конструктор класса PageRenderer.
     * @param {Array<Object>} newsArticles - Массив объектов новостей.
     * @param {HTMLElement} appContentElement - Элемент DOM, куда будет загружаться контент страницы.
     * @param {Function} showPageCallback - Колбэк-функция для переключения между страницами (например, App.showPage).
     */
    constructor(newsArticles, appContentElement, showPageCallback) {
        this.newsArticles = newsArticles;
        this.appContentElement = appContentElement;
        this.showPageCallback = showPageCallback;
    }

    /**
     * Отрисовывает домашнюю страницу со списком новостей.
     * Каждая новость представлена карточкой с изображением, заголовком и кратким описанием.
     * При клике на карточку вызывается метод showFullNews.
     */
    renderHomePage() {
        this.appContentElement.innerHTML = `
            <div class="news-list" id="newsListContainer">
                ${this.newsArticles.map(news => `
                    <div class="news-card" onclick="window.showFullNewsArticle('${news.id}')">
                        <img src="${news.image}" alt="${news.title}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/E0E0E0/000000?text=Нет+изображения';">
                        <div class="news-card-content">
                            <h3>${news.title}</h3>
                            <p>${news.shortDescription}</p>
                            <div class="news-date">${news.date}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        // Предоставить глобальную функцию, позволяющую использовать onclick для динамически создаваемых карточек новостей
        // для вызова соответствующего метода в экземпляре PageRenderer.
        window.showFullNewsArticle = (newsId) => this.showFullNews(newsId);
    }

    /**
     * Отрисовывает полную статью новости.
     * @param {string} newsId - ID новости, которую нужно отобразить.
     */
    showFullNews(newsId) {
        const news = this.newsArticles.find(article => article.id === newsId);
        if (news) {
            this.appContentElement.innerHTML = `
                <a href="#" class="back-button" onclick="window.globalShowPage('home'); return false;">&larr; Назад к новостям</a>
                <div class="full-news-article">
                    <h2>${news.title}</h2>
                    <div class="article-meta">Опубликовано: ${news.date}</div>
                    <img src="${news.image}" alt="${news.title}" onerror="this.onerror=null;this.src='https://placehold.co/800x600/E0E0E0/000000?text=Нет+изображения';">
                    <p>${news.fullContent}</p>
                </div>
            `;
        }
    }

    /**
     * Отрисовывает страницу с бланками документов.
     */
    renderDocumentsPage() {
        this.appContentElement.innerHTML = `
            <div class="document-section">
                <h2>Бланки документов</h2>
                <p><strong>Ниже представлены наиболее распространенные бланки документов. Скачивайте в удобном формате и пользуйтесь</strong></p>
                <ul class="document-list">
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на прием <a href="src/documents/zayvlenie-na-priem.docx" target="_blank"> (Word) </a><a href="src/documents/zayvlenie-na-priem.pdf" target="_blank">(PDF)</a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на смену ФИО <a href="src/documents/zayvlenie-na-smenu-fio.docx" target="_blank">(Word) </a><a href="src/documents/zayvlenie-na-smenu-fio.pdf" target="_blank">(PDF)</a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на отправку справки почтой <a href="src/documents/zayvlenie-na-otpravku-spravki-pochtoy.docx" target="_blank">(Word) </a><a href="src/documents/zayvlenie-na-otpravku-spravki-pochtoy.pdf" target="_blank">(PDF)</a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на отправку копии трудовой книжки почтой <a href="src/documents/zayvlenie-na-otpravku-kopii-trudovoy-pochtoy.docx" target="_blank">(Word) </a><a href="src/documents/zayvlenie-na-otpravku-kopii-trudovoy-pochtoy.pdf" target="_blank">(PDF)</a></li>
                    
                    <p><strong>Отпуск и отгулы</strong></p>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на ежегодный отпуск <a href="src/documents/vacation/zayvlenie-na-ezegodniy-otpusk.docx" target="_blank">(Word) </a><a href="src/documents/vacation/zayvlenie-na-ezegodniy-otpusk.pdf" target="_blank">(PDF)</a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на отгул за свой счет <a href="src/documents/vacation/zayvlenie-na-otpusk-bez-zp.docx" target="_blank">(Word) </a><a href="src/documents/vacation/zayvlenie-na-otpusk-bez-zp.pdf" target="_blank">(PDF)</a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на перенос отпуска <a href="src/documents/vacation/zayvlenie-na-perenos-otpuska.docx" target="_blank">(Word) </a><a href="src/documents/vacation/zayvlenie-na-perenos-otpuska.pdf" target="_blank">(PDF)</a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на перенос отпуска из-за болезни <a href="src/documents/vacation/zayvlenie-na-perenos-otpuska-izza-bolezni.docx" target="_blank">(Word) </a><a href="src/documents/vacation/zayvlenie-na-perenos-otpuska-izza-bolezni.pdf" target="_blank">(PDF)</a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на учебный отпуск <a href="src/documents/vacation/zayvlenie-na-uchebniy-otpusk.docx" target="_blank">(Word) </a><a href="src/documents/vacation/zayvlenie-na-uchebniy-otpusk.pdf" target="_blank">(PDF)</a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на диспансеризацию <a href="src/documents/vacation/zayvlenie-na-dispanserizaciyu.docx" target="_blank">(Word) </a><a href="src/documents/vacation/zayvlenie-na-dispanserizaciyu.pdf" target="_blank">(PDF)</a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на отгул для посещения военкомата <a href="src/documents/vacation/zayvlenie-na-otgul-v-voenkomat.docx" target="_blank">(Word) </a><a href="src/documents/vacation/zayvlenie-na-otgul-v-voenkomat.pdf" target="_blank">(PDF)</a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на отгул за следующий день после сдачи крови (донор) <a href="src/documents/vacation/zayvlenie-na-otgul-za-donorstvo-posle-sdachi.doc" target="_blank">(Word) </a><a href="src/documents/vacation/zayvlenie-na-otgul-za-donorstvo-posle-sdachi.pdf" target="_blank">(PDF)</a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на отгул за день сдачи крови (донор) <a href="src/documents/vacation/zayvlenie-na-otgul-za-donorstvo-za-den-sdachi.doc" target="_blank">(Word) </a><a href="src/documents/vacation/zayvlenie-na-otgul-za-donorstvo-za-den-sdachi.pdf" target="_blank">(PDF)</a></li>

                    <p><strong>Зарплата и удержания</strong></p>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на перечисление зарплаты на карту <a href="src/documents/salary/zayvlenie-na-perechislenie-zp.docx" target="_blank">(Word) </a><a href="src/documents/salary/zayvlenie-na-perechislenie-zp.pdf" target="_blank">(PDF)</a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на удержание подотчетных сумм <a href="src/documents/salary/zayvlenie-na-uderzanie-podotcheta.docx" target="_blank">(Word) </a><a href="src/documents/salary/zayvlenie-na-uderzanie-podotcheta.pdf" target="_blank">(PDF)</a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на удержание бланка трудовой книжки <a href="src/documents/salary/zayvlenie-na-uderzanie-tk.docx" target="_blank">(Word) </a><a href="src/documents/salary/zayvlenie-na-uderzanie-tk.pdf" target="_blank">(PDF)</a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на удержание бланка вкладыша к трудовой книжке <a href="src/documents/salary/zayvlenie-na-uderzanie-vkladysha-tk.docx" target="_blank">(Word) </a><a href="src/documents/salary/zayvlenie-na-uderzanie-vkladysha-tk.pdf" target="_blank">(PDF)</a></li>

                    <p><strong>Налоговые вычеты</strong></p>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на вычеты общее <a href="src/documents/deductions/zayvlenie-na-vychety.docx" target="_blank">(Word) </a><a href="src/documents/deductions/zayvlenie-na-vychety.pdf" target="_blank">(PDF)</a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на имущественный вычет <a href="src/documents/deductions/zayvlenie-na-imuschestveniy-vychet.docx" target="_blank">(Word) </a><a href="src/documents/deductions/zayvlenie-na-imuschestveniy-vychet.pdf" target="_blank">(PDF)</a></li>

                    <p><strong>Служебные записки</strong></p>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Служебная записка на представительские расходы <a href="src/documents/official/sluzebka-na-predstavitelskie.doc" target="_blank">(Word) </a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Служебная записка на премию <a href="src/documents/official/sluzebka-na-premiyu.docx" target="_blank">(Word) </a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Служебная записка бланк <a href="src/documents/official/sluzebnay-zapiska.doc" target="_blank">(Word) </a></li>
                    
                    <p><strong>Декрет</strong></p>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на отпуск по беременности и родам <a href="src/documents/decree/zayvlenie-po-beremennosti-i-rodam.docx" target="_blank">(Word) </a><a href="src/documents/decree/zayvlenie-po-beremennosti-i-rodam.pdf" target="_blank">(PDF)</a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на отпуск по уходу за ребенком <a href="src/documents/decree/zayvlenie-na-otpusk-po-uhodu.docx" target="_blank">(Word) </a><a href="src/documents/decree/zayvlenie-na-otpusk-po-uhodu.pdf" target="_blank">(PDF)</a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление о замене лет для расчета пособия <a href="src/documents/decree/zayvlenie-o-zamene-let.docx" target="_blank">(Word) </a><a href="src/documents/decree/zayvlenie-o-zamene-let.pdf" target="_blank">(PDF)</a></li>
                    
                    <p><strong>Увольнение</strong></p>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на увольнение <a href="src/documents/layoff/zayvlenie-na-uvolnenie.docx" target="_blank">(Word) </a><a href="src/documents/layoff/zayvlenie-na-uvolnenie.pdf" target="_blank">(PDF)</a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на отпуск с последующим увольнением <a href="src/documents/layoff/zayvlenie-na-otpusk-s-posleduyuschim-uvolneniem.docx" target="_blank">(Word) </a><a href="src/documents/layoff/zayvlenie-na-otpusk-s-posleduyuschim-uvolneniem.pdf" target="_blank">(PDF)</a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на отправку трудовой книжки по почте <a href="src/documents/layoff/zayvlenie-na-otpravku-tk-pochtoy.docx" target="_blank">(Word) </a><a href="src/documents/layoff/zayvlenie-na-otpravku-tk-pochtoy.pdf" target="_blank">(PDF)</a></li>
                    <li><span class="file-icon"><img src="src/images/icon/document-icon.png" alt="Иконка документа" class="document-list-icon"></span>Заявление на отправку электронной трудовой книжки по почте <a href="src/documents/layoff/zayvlenie-na-otpravku-etk-pochtoy.docx" target="_blank">(Word) </a><a href="src/documents/layoff/zayvlenie-na-otpravku-etk-pochtoy.pdf" target="_blank">(PDF)</a></li>
                    </ul>
            </div>
        `;
    }

    /**
     * Отрисовывает страницу контактов.
     */
    renderContactsPage() {
        this.appContentElement.innerHTML = `
            <div class="contact-section">
                <h2>Контакты</h2>
                <p>Если у вас есть вопросы или предложения, пожалуйста, свяжитесь со мной:</p>
                <p><strong>Электронная почта:</strong> <a href="mailto:natasha01013@yandex.ru">natasha01013@yandex.ru</a></p>
                <p><strong>Телеграм:</strong> <a href="https://t.me/natasha01013" target="_blank" rel="noopener noreferrer">@natasha01013</a></p>
                <p>Я всегда рада помочь и благодарна за обратную связь!</p>
                <br>
                <p class="telegram-channel-link">
                    <span class="no-wrap-content">О публикации новых новостей буду писать в <a href="https://t.me/kadryzarplata" target="_blank" rel="noopener noreferrer"><img src="src/images/icon/telegram.png" alt="Telegram channel" class="telegram-icon"></a></span>
                </p>
            </div>
        `;
    }
}
