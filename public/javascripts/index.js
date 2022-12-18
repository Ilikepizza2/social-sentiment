const submitReview = (e) => {
    e.preventDefault();
    const review = document.getElementById('review').value;
    const options = {
      method: 'POST',
      body: JSON.stringify({ review }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    }
  
    const emojiSection = document.getElementById('emojiSection');
    const title = document.getElementById('title');
    const outline = document.querySelector(':focus');
  
    fetch('/api/nlp/analyze', options)
      .then(res => {return res.json()})
      .then ((res) => {
        console.log(res);
        const data = res.data||0;
        if (data < 0) {
          emojiSection.innerHTML = '😠';
          title.style.color = 'red';
          outline.style.borderColor = 'red';
        };
        if (data === 0) {
          emojiSection.innerHTML = '😐';
          title.style.color = '#00367c';
          outline.style.borderColor = '#00367c';
        }
        if (data > 0) {
          emojiSection.innerHTML = '😄';
          title.style.color = 'green';
          outline.style.borderColor = 'green'
        }
      })
      .catch(err => {
        emojiSection.innerHTML = 'There was an error processing your request!'
      })
  }
  
  document.getElementById('review').addEventListener('keyup', submitReview);
  document.getElementById('reviewForm').addEventListener('submit', submitReview);