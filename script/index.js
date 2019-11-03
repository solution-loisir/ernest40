//DOM util functions
const getElement = classOrId => document.querySelector(classOrId);
const elem = element => document.createElement(element);
const render = (where, what) => where.appendChild(what);
const clean = (...where) => {
    where.forEach(element => {
        if(element.hasChildNodes()) element.innerHTML = '';
    });
}

//Global variables
const fragment = document.createDocumentFragment();
const secretBtn = getElement('#secret');
const resultBtn = getElement('#submit-answers');
const resetBtn = getElement('#reset-btn');
const resultTitle = getElement('#your-result');
const result = getElement('#result');
const percent = getElement('#percentage');
const form = getElement('.form');
const secret = getElement('#secret-section');

//Clue code
const showClue = (id1, id2) => {
    const clue = getElement(id1);
    const clueBtn = getElement(id2);
    //Toggling visibility on click.
    clueBtn.addEventListener('click', event => {
        event.preventDefault();
        clue.classList.toggle('clue-visible');
    });
}
showClue('#Q1', '#A');
showClue('#Q2', '#B');
showClue('#Q3', '#C');
showClue('#Q4', '#D');
showClue('#Q5', '#E');

//Result code     
resultBtn.addEventListener('click', event => {
    event.preventDefault();
    
    let score = 0;
    const answer1 = getElement('[name=Q1]:checked');
    const answer2 = getElement('[name=Q2]:checked');
    const answer3 = getElement('[name=Q3]:checked');
    const answer4 = getElement('[name=Q4]:checked');
    const answer5 = getElement('[name=Q5]:checked');
    const answers = [
        answer1,
        answer2,
        answer3,
        answer4,
        answer5
    ]
    //Going to your-result section.
    window.location = '#result-section';

    //Verifying display state of result title and show it if hidden.
    if(resultTitle.classList.contains('hide')) resultTitle.classList.remove('hide');

    //Verifying display state of secret and hidding if showing.
    if(!secret.classList.contains('hide')) secret.classList.add('hide');

    //Cleaning result section if it has already been populated.
    clean(result, percent);

    //Verifying each answer and displaying result.
    answers.forEach(a => {
        const right = a.dataset.answer === a.value;
        const noAnswer = a.value === `You didn't answer the question.`;
        const h3 = elem('h3');
        const verdict = elem('p');
        h3.textContent = `Verifying your answer to ${a.dataset.qtitle}`;
        verdict.textContent = noAnswer ? `${a.value} Please answer all the questions.` : right ? `Congratulation, "${a.value}" is the right answer!` : `Sorry "${a.value}" is not the right answer. Try again.`;
        verdict.style.color = noAnswer ? 'initial' : right ? 'green' : 'red';
        if(right) score += 20;
        render(fragment, h3);
        render(fragment, verdict);
        if(a.dataset.detail) {
            if(right) {
                const detail = elem('p');
                detail.textContent = a.dataset.detail;
                render(fragment, detail);
            }
        }
        render(result, fragment);
    });
    //Displaying score as percentage.
    const scoreNode = document.createTextNode(`${score}%`);
    render(fragment, scoreNode);
    render(percent, fragment);
    //If score variable equals 100 then show secret button else hide it.
    if(score === 100) secretBtn.classList.remove('hide');
    //Reset form inputs.
    form.reset();
});
//Reset button action    
resetBtn.addEventListener('click', () => {
    window.location.reload();
});
//Secret button action
secretBtn.addEventListener('click', event => {
    event.preventDefault();
    //Removing content from result section.
    clean(result, percent);
    secretBtn.classList.add('hide');
    resultTitle.classList.add('hide');
    //Showing secret section
    secret.classList.remove('hide');
    //Going to your-result section.
    window.location = '#result-section';
});