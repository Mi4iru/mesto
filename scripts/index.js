const profilePopup = document.querySelector(".popup_type_edit");
const profileEditCloseBtn = profilePopup.querySelector(".popup__close");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileFormElement = profilePopup.querySelector(".popup__form");
const profileFormName = profileFormElement.querySelector(".popup__input_type_name");
const profileFormDescription = profileFormElement.querySelector(".popup__input_type_description");

const title = document.querySelector(".profile__title");
const about = document.querySelector(".profile__description");

const cardPopup = document.querySelector(".popup_type_new-card");
const addCardBtn = document.querySelector(".profile__add-button");
const closeCardBtn = cardPopup.querySelector(".popup__close");
const cardFormElement = cardPopup.querySelector(".popup__form");
const cardName = cardFormElement.querySelector(".popup__input_type_card-name");
const cardURL = cardFormElement.querySelector(".popup__input_type_url");

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImg = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupClose = imagePopup.querySelector(".popup__close")

const placesContainer = document.querySelector(".places__list");

//Универсальная функция открытия модального окна
function openModal(popup) {      
    popup.classList.add('popup_is-opened');
};

//Универсальная функция закрытия модального окна
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}; 

//Функция открытия окна редактирования профиля
function openProfileEdit() {
    profileFormName.value = title.textContent;
    profileFormDescription.value = about.textContent;

    openModal(profilePopup)
}

//Открытие окна добавления карточки
function openAddCard() {
    cardFormElement.reset();

    openModal(cardPopup)
}

//Модальное окно открытия карточки
function openImgPopup(link, name) {
    imagePopupImg.src = link;
    imagePopupImg.alt = name;
    imagePopupCaption.textContent = name;
    
    imagePopupClose.addEventListener('click', () => closeModal(imagePopup));
    
    openModal(imagePopup);
}

//Обработчик формы изменения профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const newTitle = profileFormName.value;
    const newDescription = profileFormDescription.value;

    title.textContent = newTitle;
    about.textContent = newDescription;

    closeModal(profilePopup);
}

//Обработчки формы создания карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const newName = cardName.value;
    const newLink = cardURL.value;

    placesContainer.insertBefore(createCard(newName, newLink), placesContainer.firstChild)

    closeModal(cardPopup);
}

//Функция создания HTML объекта карточки
function createCard(name, link) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImg = cardElement.querySelector(".card__image");
    
    cardImg.src = link;
    cardImg.alt = name;
    cardElement.querySelector(".card__title").textContent = name;
    
    const likeBtn = cardElement.querySelector(".card__like-button");
    const delBtn = cardElement.querySelector(".card__delete-button");
   
    likeBtn.addEventListener('click', () => likeBtn.classList.toggle("card__like-button_is-active"));
    delBtn.addEventListener('click', () => delBtn.closest(".card").remove())
    cardImg.addEventListener('click', () => openImgPopup(link, name))
    
    return cardElement
}

//Создание 6 начальных карточек
initialCards.forEach(element => {
    placesContainer.append(createCard(element.name, element.link))
});


profilePopup.classList.add("popup_is-animated");
profileFormElement.addEventListener('submit', handleProfileFormSubmit); 

cardPopup.classList.add("popup_is-animated");
closeCardBtn.addEventListener('click', () => closeModal(cardPopup));

imagePopup.classList.add("popup_is-animated");

cardFormElement.addEventListener('submit', handleCardFormSubmit);

profileEditBtn.addEventListener('click', openProfileEdit);
profileEditCloseBtn.addEventListener('click', () => closeModal(profilePopup));
addCardBtn.addEventListener('click', openAddCard);
