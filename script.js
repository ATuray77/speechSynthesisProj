const voiceSelect = document.getElementById('voice-select');

const synth = window.speechSynthesis;
let voices;

//function to fill the width of the option element with different voices
function addVoicesToSelect() {
    voices = synth.getVoices(); //getVoices is on the synth object


    for (let i = 0; i < voices.length; i++) { //looping through the voices
        const option = document.createElement('option'); //creates the options element to give us options
        option.textContent = `${voices[i].name} - ${voices[i].lang}`; //text content of the option element

        if (voices[i].default) {
           option.textContent += ' - DEFAULT';     
        }
        option.setAttribute('data-lang', voices[i].lang); //sets attribute to the option
        option.setAttribute('data-name', voices[i].name); //sets attribute to the option
        voiceSelect.appendChild(option);
    }
}

function onSubmit(e) {
    e.preventDefault();

    const textInput = document.getElementById('text-input'); //gets the text input id

    const utterThis = new SpeechSynthesisUtterance(textInput.value); //pass the text input to this object

    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
            utterThis.voice = voices[i]
        }
        
    }

    synth.speak(utterThis) //synth also has a speak object. 
}

addVoicesToSelect();

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = addVoicesToSelect;
    
}

document.getElementById('form').addEventListener('submit', onSubmit) //grabs the form and add an event listener to the submit button