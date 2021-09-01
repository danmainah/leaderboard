import './style.css';
import add from './add';

const List = document.getElementById('list')
const refreshButton = document.getElementById('refresh-btn');
const submitBtn = document.getElementById('submit-btn');
const userName = document.getElementById('name');
const userScore = document.getElementById('score');


const displayList = async () => {
    let scores = [];
  const request = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/231KSRjwxXecFZWRwz8v/scores/');
  const data = await request.json();
  scores = data.result;

  if (scores.length) {
    scores.forEach((score) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      const text = `
      <div class="d-flex" id="${score.index}">
        <div class="fw-bold flex-grow-1">
          ${score.user} : ${score.score}
        </div>
      </div>`;

      li.innerHTML = text;
      List.appendChild(li);
    });
  }
}

refreshButton.addEventListener('click', () => {
    List.innerHTML = '';
    displayList(List);
  });
 console.log(list)
submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const scoreData = {
      user: userName.value,
      score: userScore.value,
    };
    const scoreAdded = await add(scoreData);
    if (scoreAdded) {
      List.innerHTML = '';
      await displayList(List);
      userName.value = '';
      userScore.value = '';
    }
  });
  
  displayList(List);  