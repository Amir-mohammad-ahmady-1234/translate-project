// variables
let $ = document;
const searchBoxContainer = $.querySelector('.searchBoxContainer');
const inputElem = $.querySelector('.inputElem');
const searchBtn = $.querySelector('.searchBtn');
const aftersearchShowing = $.querySelector('.aftersearchShowing');


// Events
inputElem.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        eventWork()
    }
})
searchBtn.addEventListener('click', (event) => {
    eventWork()
})


// fetchData func
function eventWork () {
    searchBoxContainer.style.height = '70%';
    aftersearchShowing.style.display = 'block'; 
    fetchData();
    // inputElem.value = '';
}
function fetchData () {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputElem.value}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        showDataInDom(data);
    })
    .catch((e) => {
        console.log('you have a error!!!' + e);
        alert('this word is not correct and not find!');
        aftersearchShowing.style.display = 'none'; 
        searchBoxContainer.style.height = '30%';
    })
}
function showDataInDom (dictionaryApiData) {
    const wordName = $.querySelector('.wordName');
    wordName.innerHTML = dictionaryApiData[0].word;

    const wordTypeAndPronunciation = $.querySelector('.wordTypeAndPronunciation');
    wordTypeAndPronunciation.innerHTML = `${dictionaryApiData[0].meanings[0].partOfSpeech}  ${dictionaryApiData[0].phonetic}`; 

    const wordMeaning = $.querySelector('.wordMeaning');
    wordMeaning.innerHTML = dictionaryApiData[0].meanings[0].definitions[0].definition;

    const audioForPronunciation = $.querySelector('.audioForPronunciation');
    audioForPronunciation.src = `${dictionaryApiData[0].phonetics[0].audio}`;
}