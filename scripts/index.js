const profilePopup = document.querySelector(".popup_type_edit");
profilePopup.classList.add("popup_is-animated");
const profileEditClose = profilePopup.querySelector(".popup__close");
const profileFormElement = profilePopup.querySelector(".popup__form");
const cardPopup = document.querySelector(".popup_type_new-card");
cardPopup.classList.add("popup_is-animated");
const imagePopup = document.querySelector(".popup_type_image");
imagePopup.classList.add("popup_is-animated");
const nickname = document.querySelector(".profile__title");
const about = document.querySelector(".profile__description");
const addCard = document.querySelector(".profile__add-button");
const addCardClose = cardPopup.querySelector(".popup__close");
const cardFormElement = cardPopup.querySelector(".popup__form");
addCardClose.addEventListener('click', () => closeModal(cardPopup));

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
};

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}; 

function openProfileEdit() {
    profilePopup.querySelector(".popup__input_type_name").value = nickname.textContent;
    profilePopup.querySelector(".popup__input_type_description").value = about.textContent;

    openModal(profilePopup)
}

function openAddCard() {
    cardFormElement.reset();
    //cardPopup.querySelector(".popup__input_type_card-name").value = "";
    //cardPopup.querySelector(".popup__input popup__input_type_url").value = "";

    openModal(cardPopup)
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const newName = profileFormElement.querySelector(".popup__input_type_name").value;
    const newDescription = profileFormElement.querySelector(".popup__input_type_description").value;

    nickname.textContent = newName;
    about.textContent = newDescription;

    closeModal(profilePopup);
}
profileFormElement.addEventListener('submit', handleProfileFormSubmit); 
function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const newName = cardFormElement.querySelector(".popup__input_type_card-name").value;
    const newLink = cardFormElement.querySelector(".popup__input_type_url").value;

    placesContainer.insertBefore(createCard(newName, newLink), placesContainer.firstChild)

    closeModal(cardPopup);
}
cardFormElement.addEventListener('submit', handleCardFormSubmit);
const profileEdit = document.querySelector(".profile__edit-button");
profileEdit.addEventListener('click', openProfileEdit);
profileEditClose.addEventListener('click', () => closeModal(profilePopup));
addCard.addEventListener('click', openAddCard);
function createCard(name, link) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImg = cardElement.querySelector(".card__image");
    cardImg.src = link;
    cardImg.alt = name;
    const like = cardElement.querySelector(".card__like-button");
    const del = cardElement.querySelector(".card__delete-button");
    like.addEventListener('click', () => like.classList.toggle("card__like-button_is-active"));
    del.addEventListener('click', () => del.closest(".card").remove())
    cardImg.addEventListener('click', () => openImgPopup(link, name))
    cardElement.querySelector(".card__title").textContent = name;
    return cardElement
}
function openImgPopup(link, name) {
    imagePopup.querySelector(".popup__image").src = link;
    imagePopup.querySelector(".popup__image").alt = name;
    imagePopup.querySelector(".popup__caption").textContent = name;
    imagePopup.querySelector(".popup__close").addEventListener('click', () => closeModal(imagePopup));
    openModal(imagePopup);
}
const placesContainer = document.querySelector(".places__list");

initialCards.forEach(element => {
    placesContainer.append(createCard(element.name, element.link))
});
// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
