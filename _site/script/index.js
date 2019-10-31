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

//DOM util function
const getElement = classOrId => document.querySelector(classOrId);

//Result code
const showResult = event => {
    event.preventDefault();
    window.location = '#your-result';

    const result1 = getElement('#result-1');
    const result2 = getElement('#result-2');
    const result3 = getElement('#result-3');
    const result4 = getElement('#result-4');
    const result5 = getElement('#result-5');
    
    const form = getElement('.form');
    const success = (where, Q, value) => where.innerHTML = `
    <h3>Your answer to ${Q}</h3>
    <p>Congratulation "${value}" is the right answer!</p>
    `;
    const wrong = (where, Q, value) => where.innerHTML = `
    <h3>Your answer to ${Q}</h3>
    <p>Sorry "${value}" is the wrong answer.</p>
    `;
    const Q1 = getElement('input[name=Q1]:checked');
    const Q2 = getElement('input[name=Q2]:checked');
    const Q3 = getElement('input[name=Q3]:checked');
    const Q4 = getElement('input[name=Q4]:checked');
    const Q5 = getElement('input[name=Q5]:checked');
          
        switch(Q1.value) {
            case '7':
                success(result1, 'Question 1', Q1.value);
                break;
            default:
                wrong(result1, 'Question 1', Q1.value); 
        }
        switch(Q2.value) {
            case 'Barry Nelson':
                success(result2, 'Question 2', Q2.value);
                break;
            default:
                wrong(result2, 'Question 2', Q2.value); 
        }
        switch(Q3.value) {
            case '7':
                success(result3, 'Question 3', Q3.value);
                break;
            default:
                wrong(result3, 'Question 3', Q3.value); 
        }
        switch(Q4.value) {
            case 'Diamonds Are Forever':
                success(result4, 'Question 4', Q4.value);
                break;
            default:
                wrong(result4, 'Question 4', Q4.value); 
        }
        switch(Q5.value) {
            case 'Paul McCartney':
                success(result5, 'Question 5', Q5.value);
                break;
            default:
                wrong(result5, 'Question 5', Q5.value); 
        }
        form.reset();
}
(function() {
    const resultBtn = document.getElementById('submit-answers');
    resultBtn.addEventListener('click', showResult);
})();