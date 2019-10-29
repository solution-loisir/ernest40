const showClue = (id1, id2) => {
    
    const clue = document.getElementById(id1);
    const btn = document.getElementById(id2);
    btn.addEventListener('click', event => {
        event.preventDefault();
        clue.classList.toggle('clue-visible');
    });
}
showClue('Q1', 'A');
showClue('Q2', 'B');
showClue('Q3', 'C');
showClue('Q4', 'D');
showClue('Q5', 'E');