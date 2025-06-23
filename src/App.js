/** src/App.js
 */
import { PageRenderer } from './PageRenderer.js';

/**
 * Класс App является основным классом приложения.
 * Он инициализирует рендерер страниц, управляет состоянием навигации и обрабатывает события UI.
 */
export class App {
    /**
     * Конструктор класса App.
     * @param {Array<Object>} newsArticles - Массив объектов новостей.
     * @param {HTMLElement} appContentElement - Элемент DOM для загрузки контента.
     * @param {HTMLElement} mobileMenuButton - Кнопка для переключения мобильного меню.
     * @param {HTMLElement} mainNavElement - Элемент навигации (меню).
     */
    constructor(newsArticles, appContentElement, mobileMenuButton, mainNavElement) {
        this.newsArticles = newsArticles;
        this.appContentElement = appContentElement;
        this.mobileMenuButton = mobileMenuButton;
        this.mainNavElement = mainNavElement;

        // Создаем экземпляр PageRenderer, передавая ему данные и колбэк для переключения страниц
        this.pageRenderer = new PageRenderer(
            this.newsArticles,
            this.appContentElement,
            this.showPage.bind(this) // Передаем метод showPage как колбэк
        );
    }

    /**
     * Инициализирует приложение: устанавливает слушателей событий и загружает начальную страницу.
     */
    init() {
        // Настройка переключателя мобильного меню
        if (this.mobileMenuButton) {
            this.mobileMenuButton.addEventListener('click', () => {
                this.mainNavElement.classList.toggle('active');
            });
        }

        // Изначальная загрузка домашней страницы
        this.showPage('home');
    }

    /**
     * Метод для переключения между страницами приложения.
     * @param {string} pageName - Название страницы для отображения ('home', 'documents', 'contacts').
     */
    showPage(pageName) {
        switch (pageName) {
            case 'home':
                this.pageRenderer.renderHomePage();
                break;
            case 'documents':
                this.pageRenderer.renderDocumentsPage();
                break;
            case 'contacts':
                this.pageRenderer.renderContactsPage();
                break;
            default:
                this.pageRenderer.renderHomePage(); // По умолчанию отображаем домашнюю страницу
        }
        // Закрываем мобильное меню, если оно открыто
        if (this.mainNavElement.classList.contains('active')) {
            this.mainNavElement.classList.remove('active');
        }
    }
}
