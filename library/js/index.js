
// start burger menu
(function () {
	const burger = document.querySelector('.burger');
	const menu = document.querySelector('.nav-list');
	const menuLinks = document.querySelectorAll('.nav-link');
	burger.addEventListener('click', () => {
		profileMenu.classList.remove('profile__menu--active');
		burger.classList.toggle('burger_active');
		menu.classList.toggle('nav-list_active');
	});
	for(let i = 0; i < menuLinks.length; i++) {
		menuLinks[i].addEventListener('click', () => {
			menu.classList.remove('nav-list_active');
			burger.classList.remove('burger_active');
		});
	};
	document.getElementById('nav').addEventListener('click', event => {
		event._isClickWithInMenu = true;
	});
	document.getElementById('burger').addEventListener('click', event => {
		event._isClickWithInMenu = true;
	});
	document.body.addEventListener('click', event => {
		if (event._isClickWithInMenu) return;
		document.querySelector('.nav-list').classList.remove('nav-list_active');
		document.querySelector('.burger').classList.remove('burger_active');
	});
}());

// burder menu end

// slider start

// находим блок с фото и кнопки пагинации
const carousel = document.querySelector('.carousel');
const dots = document.querySelectorAll('.circle');

const paginationBtns = document.querySelectorAll('.control')
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const sliderImage = document.querySelectorAll('.slider-image');
const firstImg = carousel.querySelectorAll('.image-item')[0];
const arrows = document.querySelectorAll('.arrow');
const buttonArrow = document.querySelectorAll('.button');

// текущий счетчик
let currentIndex = 0;

// добавляем отслеживание события на кнопку
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// действие при нажатии на кнопку предыдущего слайда
function prevSlide() {
	currentIndex--;
	if (currentIndex < 0) currentIndex = sliderImage.length - 1;
	rollSlider();
	thisSlide(currentIndex);
};

// действие при нажатии на кнопку следующего слайда
function nextSlide() {
	currentIndex++;
	if (currentIndex >= sliderImage.length) currentIndex = 0;
	rollSlider();
	thisSlide(currentIndex);
};

// функция перелистывания слайда
function rollSlider() {
	const firstImgWidth = firstImg.clientWidth + 25;
	carousel.style.transform = `translateX(${-currentIndex * firstImgWidth}px)`;
};

// добавить стиль на активную кнопку
function thisSlide(index) {
	dots.forEach(item => item.classList.remove('active-circle'));
	dots[index].classList.add('active-circle');
};

// убрать/добавить возможность нажатия на кнопку пагинации
function fillPagination(index) {
	dots.forEach(item => item.removeAttribute('disabled'));
	dots[index].setAttribute('disabled', 'disabled');
	paginationBtns.forEach(item => item.classList.remove('disabled-button'));
	paginationBtns[index].classList.add('disabled-button');
}

// функция перелистывания при нажатии на кнопки пагинации
dots.forEach((circle, i) => {
	circle.setAttribute('data-num', i);
	circle.addEventListener('click', changeClientWidth);

	function changeClientWidth(e) {
		let clickedDotNum = e.target.dataset.num;
		if (clickedDotNum == currentIndex) {
			return;
		} else {
			let imageWidth = carousel.firstElementChild.clientWidth;
			let pixels = (-imageWidth * clickedDotNum) - (clickedDotNum * 25);
			carousel.style.transform = 'translateX(' + pixels + 'px)';
			dots[currentIndex].classList.remove('active-circle');
			dots[clickedDotNum].classList.add('active-circle');
			currentIndex = clickedDotNum;
			fillPagination(currentIndex);
		}
	}
});

// slider end

// tabs start
document.addEventListener('DOMContentLoaded', () => {
	// объявляем основную функцию для вкладок, чтобы вся логика была в одном месте
	const tabs = () => { 
		// ищем элемент с кнопками и записываем в константу
		const head = document.querySelector('.tabs__head'); 
		// ищем элемент с контентом и записываем в константу
		const body = document.querySelector('.tabs__body');

		// объявляем функцию для получения названия активной вкладки
		const getActiveTabName = () => { 
			// возвращаем значение data-tab активной кнопки
			return head.querySelector('.tabs__caption_active').dataset.tab; 
			
		}

		// объявляем функцию для установки активного элемента контента
		const setActiveContent = () => {
			 // если уже есть активный элемент контента
			if (body.querySelector('.tabs__content_active')) {
				// то скрываем его
				body.querySelector('.tabs__content_active').classList.remove('tabs__content_active')
			}
			// затем ищем элемент контента, у которого значение data-tab совпадает со значением data-tab активной кнопки и отображаем его
			body.querySelector(`[data-tab=${getActiveTabName()}]`).classList.add('tabs__content_active');
		}
		 // проверяем при загрузке страницы, есть ли активная вкладка
		if (!head.querySelector('.tabs__caption_active')) { // если активной вкладки нет
			// то делаем активной по-умолчанию первую вкладку
			head.querySelector('.tabs__caption').classList.add('tabs__caption_active'); 
		}

		// устанавливаем активный элемент контента в соответствии с активной кнопкой при загрузке страницы
		setActiveContent(getActiveTabName())

		// при клике на .tabs__head
		head.addEventListener('click', e => {
			// узнаем, был ли клик на кнопке
			const caption = e.target.closest('.tabs__caption')
			// если клик был не на кнопке, то прерываем выполнение функции
			if (!caption) return
			// если клик был на активной кнопке, то тоже прерываем выполнение функции и ничего не делаем
			if (caption.classList.contains('tabs__caption_active')) return;

			// если уже есть активная кнопка
			if (head.querySelector('.tabs__caption_active')) {
				// то удаляем ей активный класс
				head.querySelector('.tabs__caption_active').classList.remove('tabs__caption_active')
			}

			// затем добавляем активный класс кнопке, на которой был клик
			caption.classList.add('tabs__caption_active')

			// устанавливаем активный элемент контента в соответствии с активной кнопкой
			setActiveContent(getActiveTabName())
		})
	}

	// вызываем основную функцию
	tabs();

});

// tabs end

// modal start 

// profile menu start
// получить все кнопки меню пользователя
const profileBtn = document.querySelector('.profile-button');
const profileMenu = document.querySelector('.profile__menu');
const profileLinks = document.querySelectorAll('.profile__menu_link');
const modalMenu = document.querySelector('.header__auth');

// навешиваем событие по клику на иконку пользователя (открывается окно с выбором логина или регистрации)
profileBtn.addEventListener('click', () => {
	menu.classList.remove('nav-list_active');
	burger.classList.remove('burger_active');
	profileMenu.classList.toggle('profile__menu--active');
});

// при клике на любую ссылку в меню, скрываем это меню
for (let i = 0; i < profileLinks.length; i++) {
	profileLinks[i].addEventListener('click', () => {
		profileMenu.classList.remove('profile__menu--active');
	})
};

// клик по области в меню
modalMenu.addEventListener('click', event => {
	event._isClickWithInMenu = true;
});

// клик по области вне меню пользователя закрывает меню
document.body.addEventListener('click', event => {
	if (event._isClickWithInMenu) return;
	profileMenu.classList.remove('profile__menu--active');
});

// profile menu end

// modal start 

// получить все кнопки для открытия модального окна логина или регистрации
const openLogin = document.querySelectorAll('.open-login');
const openRegistry = document.querySelectorAll('.open-registry');
// получить модальные окна логина, регистрации и все модалки.
const login = document.querySelector('.modal__login');
const registry = document.querySelector('.modal__registry');
const modals = document.querySelectorAll('.modal');
// получить ссылки в модалках на логин/регистрацию
const linkLogin = document.getElementById('login__link');
const linkRegistry = document.getElementById('register__link');

// перебрать все кнопки для открытия модального окна логина и добавить к каждой класс
openLogin.forEach(btn => {
	btn.addEventListener('click', () => {
		login.classList.add('modal--active');
	})
});


// Альтернатива
// for (let i = 0; i < openLogin.length; i++) {
// 	openLogin[i].addEventListener('click', () => {
// 		login.classList.add('modal--active');
// 	})
// };

// перебрать все кнопки для открытия модального окна регистрации и добавить к каждой класс
openRegistry.forEach(btn => {
	btn.addEventListener('click', () => {
		registry.classList.add('modal--active');
	})
})

// Альтернатива
// for (let i = 0; i <hr openRegistry.length; i++) {
// 	openRegistry[i].addEventListener('click', () => {
// 		registry.classList.add('modal--active');
// 	})
// };

// обрабатываем клик на кнопку login в модальном окне
linkLogin.addEventListener('click', () => {
	registry.classList.remove('modal--active');
	login.classList.add('modal--active');
})

// обрабатываем клик на кнопку Register в модальном окне
linkRegistry.addEventListener('click', () => {
	login.classList.remove('modal--active');
	registry.classList.add('modal--active');
})

// обрабатываем клик вне формы или на кнопку закрытия формы
const closeModal = event => {
	// ловим куда точно был клик мышкой
	const target = event.target;
	
	// если клик по окну модалки или на кнопку закрытия, а не по самой форме, закрываем 
	if (target === login || target === registry || target.closest('.modal__btn')) {
		login.classList.remove('modal--active');
		registry.classList.remove('modal--active');
	}
};

// ловим события клика и применяем функцию закрытия модалки
login.addEventListener('click', closeModal);
registry.addEventListener('click', closeModal);

// форма регистрации 

// получаем форму регистрации 
const registryForm = document.querySelector('.registry__form');

//получить все инпуты в форме регистрации 
const registryNameInp = document.getElementById('registry__first-name');
const registrySurNameInp = document.getElementById('registry__last-name');
const registryEmailInp = document.getElementById('registry__email');
const registryPassInp = document.getElementById('registry__pass');

// получаем кнопку сабмита для формы регистрации 
const registryFormBtn = document.querySelector('.registry__button-submit');

// Добавляем счетчик количества посещений пользователя в localStorage
const userVisitsNum = (userVisits) => {
	userVisits++;
	localStorage.setItem('Visits', userVisits);
};

// обрабатываем клик на кнопку сабмита в форме регистрации
registryFormBtn.addEventListener('click', () => {

	//Получаем все значения в инпутах и убираем все пробелы в строке
	let registryNameValue = registryNameInp.value.replace(/\s/g, '');
	let registrySurNameValue = registrySurNameInp.value.replace(/\s/g, '');
	// при получении email убираем все пробелы и переводим в нижний регистр
	let registryEmailValue = registryEmailInp.value.toLowerCase().replace(/\s/g, '');
	let registryPassValue = registryPassInp.value.replace(/\s/g, '');

	// форматируем полученное значение имени пользователя и записываем в localStorage
	registryNameValue = `${registryNameValue[0].toUpperCase()}${registryNameValue.slice(1).toLowerCase()}` // первый символ в верхнем регистре, остальные в нижнем регистре
	localStorage.setItem('userName', registryNameValue);

	// форматируем полученное значение фамилии пользователя и записываем в localStorage
	registrySurNameValue = `${registrySurNameValue[0].toUpperCase()}${registrySurNameValue.slice(1).toLowerCase()}` // первый символ в верхнем регистре, остальные в нижнем регистре
	localStorage.setItem('surName', registrySurNameValue);

	// записываем email пользователя 
	localStorage.setItem('userEmail', registryEmailValue);

	// записываем пароль пользователя 
	localStorage.setItem('userPassword', registryPassValue);

	localStorage.removeItem('userVisits');

	//создать счетчик визитов юзера и присвоить в него значение из БД
	let userVisits = Number(localStorage.getItem('userVisits'));

	//увеличить кол-во визитов юзера на 1
	userVisitsNum(userVisits);

	// записываем в localStorage подписан ли пользователь и количество купленных книг
	localStorage.setItem('userSubscription', false);
	localStorage.setItem('userOwnBooks', 0);

	let generateNum = Math.floor(Math.random() * 9e8) + 1e8;
	let convertedNum = generateNum.toString(16).toUpperCase();
	
	while (convertedNum.length < 9) {
		convertedNum = "0" + convertedNum;
	};

	localStorage.setItem('cardNumber', convertedNum);

	localStorage.setItem('userReg', true);
	localStorage.setItem('userAuth', true);

})