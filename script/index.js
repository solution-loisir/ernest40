//Clue code
const showClue = (id1, id2) => {
    
    const clue = document.getElementById(id1);
    const clueBtn = document.getElementById(id2);
    clueBtn.addEventListener('click', event => {
        event.preventDefault();
        clue.classList.toggle('clue-visible');
    });
}
showClue('Q1', 'A');
showClue('Q2', 'B');
showClue('Q3', 'C');
showClue('Q4', 'D');
showClue('Q5', 'E');

//Result code
//DOM util function
const getElement = classOrId => document.querySelector(classOrId);
const elem = element => document.createElement(element);

const showResult = event => {
    event.preventDefault();
    window.location = '#your-result';
    const result = getElement('#result');
    if(result.hasChildNodes()) result.innerHTML = '';
    const percent = getElement('#percentage');
    if(percent.hasChildNodes()) percent.innerHTML = '';
    var score = 0;
    const fragment = document.createDocumentFragment();
    
    const form = getElement('.form');
    let answer1 = getElement('[name=Q1]:checked');
    let answer2 = getElement('[name=Q2]:checked');
    let answer3 = getElement('[name=Q3]:checked');
    let answer4 = getElement('[name=Q4]:checked');
    let answer5 = getElement('[name=Q5]:checked');
    const answers = [
        answer1,
        answer2,
        answer3,
        answer4,
        answer5
    ]
    answers.forEach(a => {
        const right = a.dataset.answer === a.value;
        const h3 = elem('h3');
        const verdict = elem('p');
        h3.textContent = `Verifying your answer to ${a.dataset.qtitle}`;
        verdict.textContent = right ? `Congratulation, "${a.value}" is the right answer!` : `Sorry "${a.value}" is not the right answer. Try again.`;
        verdict.style.color = right ? 'green' : 'red';
        if(right) score += 20;
        fragment.appendChild(h3);
        fragment.appendChild(verdict);
        result.appendChild(fragment);
    });
    const scoreNode = document.createTextNode(`${score}%`);
    fragment.appendChild(scoreNode);
    percent.appendChild(fragment);
    form.reset();
}
(function() {
    const resultBtn = document.getElementById('submit-answers');
    resultBtn.addEventListener('click', showResult);
})();
(function() {
    const resetBtn = document.getElementById('reset-btn');
    resetBtn.addEventListener('click', () => {
        window.location.reload();
    });
})();