let $ = document;
let wrappContainer = $.querySelector('.searchBox');
let searchInput = $.querySelector('input');
let autoCompleteBox = $.querySelector('.auto-complete');

searchInput.addEventListener('focus', () => {
    wrappContainer.classList.add('focus');
})
searchInput.addEventListener('blur', () => {
    wrappContainer.classList.remove('focus');
    // wrappContainer.classList.remove('active');
})

searchInput.addEventListener('keyup', (e) => {
    let searchInputValue = searchInput.value;

    if (searchInputValue) {
        wrappContainer.classList.add('active');

        let suggestArray = suggestion.filter((word) => {
            return word.toLowerCase().startsWith(searchInputValue.toLocaleLowerCase());
        })
        suggestGenerator(suggestArray);
        if (e.code === 'Enter') {
            location.href = `https://www.google.com/search?q=${searchInputValue}`;
            searchInput.value = '';
            wrappContainer.classList.remove('active');
        }

    } else {
        wrappContainer.classList.remove('active');
    }
})

function suggestGenerator(suggestArray) {
    let autoListItems = suggestArray.map((word) => {
        return '<li><i class="fas fa-search"></i>' + word + '</li>';
    })
    let customAuto;
    if (autoListItems.length) {
        customAuto = autoListItems.join('');
    } else {
        customAuto = '<li><i class="fas fa-search"></i>' + searchInput.value + '</li>';
    }
    autoCompleteBox.innerHTML = customAuto;
    Select();
}

function Select() {
    let listitems = $.querySelectorAll('li');
    listitems.forEach((item) => {
        item.addEventListener('click', (event) => {
            let inputValue = event.target.textContent;
            suggestion.push(inputValue);
            searchInput.value = inputValue;
            wrappContainer.classList.remove('active');
            location.href = `https://www.google.com/search?q=${searchInput.value}`;
            searchInput.value = '';
        })
    })
}