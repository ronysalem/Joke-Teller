const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Disable/Enable button
function toggleButton(){
    button.disabled = !button.disabled;
}

// passing Joke to voiceRSS API 
function tellMe(joke){
    VoiceRSS.speech({
        key: 'b90edf3f0ff748978b51bba389389523',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// get jokes from Joke API
async  function getJokes(){
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    let joke= '';
    try{
        const response = await fetch(apiUrl);
        const data =await response.json();
        // incase of two part jokes there is a setup and deliver but in single joke there is a joke only(json obj)!!
        if(data.setup){
           joke= `${data.setup} ... ${data.delivery}`;
        }
        else{
            joke= data.joke;
        }
        // Text-to-speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    }catch(err){
        // catch errors here
        console.log('whoops there is a error'+err);
    }
}



//  event listeners
button.addEventListener('click',getJokes);
audioElement.addEventListener('ended',toggleButton);