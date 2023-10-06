// Web components test
class TestEl extends HTMLElement {
    constructor() {
        console.log('Start TestEl Constructor!!!');
        // Always call super first in constructor
        super();
        const templateClone = document.querySelector('.js-test-el-template').content.cloneNode(true);
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(templateClone);
        shadow.querySelector('button').addEventListener('click', () => {
            const btnClickedEvent = new CustomEvent('TestElButtonClicked', {
                composed: true,
                bubbles: true
            });
            this.dispatchEvent(btnClickedEvent);
            console.log(this);
        });
    }
}

customElements.define('test-el', TestEl);
document.addEventListener('TestElButtonClicked', () => console.log('Document has caught TestElButtonClicked event!'));

// Aggiungi feature
const aggBtn = document.querySelector('.js-aggiungi-btn');
const newNoteFieldset = document.querySelector('.js-new-note-fieldset');
const salvaBtn = document.querySelector('.js-salva-btn');
const newNoteTextArea = document.querySelector('.js-new-note-textarea');
const noteEntries = document.querySelector('.js-note-entries');
const noteEntryTemplate = document.querySelector('.js-note-entry-template');
const initialData = getData();

console.log('Initial data', initialData);

if (initialData) {
    render(initialData);
}

aggBtn.addEventListener('click', aggBtnClickHandler);
salvaBtn.addEventListener('click', salvaBtnClickHandler);

function aggBtnClickHandler() {
    newNoteFieldset.classList.remove('display--none');
    aggBtn.setAttribute('disabled', true);
}

function salvaBtnClickHandler() {
    const timestamp = new Date().getTime();
    const content = newNoteTextArea.value;
    const newNoteData = [{ timestamp, content }];
    let data = getData() || [];
    data = data.concat(newNoteData);
    console.log('Saving data', data);
    setData(data);
    render(newNoteData);
    newNoteTextArea.value = '';
    newNoteFieldset.classList.add('display--none');
    aggBtn.removeAttribute('disabled');
}

function getData() {
    return JSON.parse(localStorage.getItem('paolo'));
}

function setData(data) {
    localStorage.setItem('paolo', JSON.stringify(data));
}

function render(data) {
    data.forEach(item => {
        const deepClone = true;
        const tmplClone = noteEntryTemplate.content.cloneNode(deepClone);
        const content = tmplClone.querySelector('.js-note-entry-content');
        const date = tmplClone.querySelector('.js-note-entry-date');
        content.textContent = item.content;
        date.textContent = new Date(item.timestamp).toString().substring(0, 21);
        noteEntries.prepend(tmplClone);
    });
}