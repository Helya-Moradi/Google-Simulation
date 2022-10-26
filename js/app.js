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

        let newSuggestion = JSON.parse(localStorage.getItem('suggestion'));
        suggestion = newSuggestion;
        let suggestArray = suggestion.filter((word) => {
            return word.toLowerCase().startsWith(searchInputValue.toLocaleLowerCase());
        })
        suggestGenerator(suggestArray);
        if (e.code === 'Enter') {
            suggestion.push(searchInputValue);
            localStorage.setItem('suggestion', JSON.stringify(suggestion));
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
        return '<li><i class="fas fa-search"></i>' + word + '<span class="del">Delete</span></li>';
    })
    let customAuto;
    if (autoListItems.length) {
        customAuto = autoListItems.join('');
    } else {
        customAuto = '<li><i class="fas fa-search"></i>' + searchInput.value + '<span class="del">Delete</span></li>';
    }
    autoCompleteBox.innerHTML = customAuto;
    Select();
}

function Select() {
    let listitems = $.querySelectorAll('li');
    listitems.forEach((item) => {
        item.addEventListener('click', (event) => {
            wrappContainer.classList.add('active');

            if (event.target.classList.contains('del')) {
                searchInput.focus();
                searchInput.addEventListener('focus', () => {
                    wrappContainer.classList.add('active');
                })
                event.target.parentElement.remove();
                let inputValue = event.target.parentElement.childNodes[1].data;
                let newSuggestion = JSON.parse(localStorage.getItem('suggestion'));
                let newsuggestion = newSuggestion.filter(suggest => {
                    if (suggest != inputValue) {
                        return suggest;
                    }
                })

                suggestion = newsuggestion;
                localStorage.setItem('suggestion', JSON.stringify(suggestion));


            } else {
                let inputValue = event.target.childNodes[1].data;
                suggestion.push(inputValue);
                searchInput.value = inputValue;
                wrappContainer.classList.remove('active');
                location.href = `https://www.google.com/search?q=${searchInput.value}`;
                searchInput.value = '';
            }

        })
    })
}

document.body.addEventListener('click', (e) => {
    if (!e.target.classList.contains('del')) {
        wrappContainer.classList.remove('active');
    }
})