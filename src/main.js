// src/main.js
import { App } from './App.js';
import { newsArticles } from './data/newsData.js'; 

// Дожидаемся полной загрузки DOM, затем инициализируем приложение
document.addEventListener('DOMContentLoaded', () => {
    const appContentElement = document.getElementById('app-content');
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mainNavElement = document.getElementById('mainNav');

    // Создаем экземпляр основного класса приложения
    const app = new App(newsArticles, appContentElement, mobileMenuButton, mainNavElement);
    // Инициализируем приложение
    app.init();

    // Экспонируем метод showPage глобально, чтобы он был доступен из onclick атрибутов в HTML.
    // Это необходимо, так как мы не можем напрямую вызывать методы класса из глобального пространства HTML.
    window.showPage = (pageName) => app.showPage(pageName);
    // Экспонируем showPage также для использования в динамически генерируемом HTML (например, кнопка "Назад к новостям")
    window.globalShowPage = window.showPage;
});
