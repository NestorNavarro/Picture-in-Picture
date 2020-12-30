const videoElement = document.getElementById('video');
const button = document.getElementById('button');

//Prompt to select media strema, pass to video element, then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadeddata = () => {
            videoElement.play();
        }
    } catch (error) {
        button.textContent = 'Start';
        console.log('Ups, a error ocurred: ', error)
    }
}

async function showPictureInPicture() {
    try {
        //Disable Button
        button.disabled = true;
        //Start Picture in Picture
        await videoElement.requestPictureInPicture();
        //Reset Button
        button.disabled = false;
    } catch (error) {
        button.textContent = 'Start';
        console.log('Ups, a error ocurred: ', error)
    }
}

button.addEventListener('click', async() => {
    if (button.textContent === 'Start') {
        selectMediaStream();
        button.textContent = 'Enter Picture-in-Picture mode';
    } else if (button.textContent === 'Enter Picture-in-Picture mode') {
        showPictureInPicture();
        button.textContent = 'Exit Picture-in-Picture mode';
    } else if (button.textContent === 'Exit Picture-in-Picture mode') {
        document
            .exitPictureInPicture()
            .catch(error => {
                // Error handling
            });
        button.textContent = 'Enter Picture-in-Picture mode';
    }
});

//if the user exits picture in picture from the window, change button text
videoElement.addEventListener('enterpictureinpicture', () => {
    button.textContent = 'Exit Picture-in-Picture mode';
});
videoElement.addEventListener('leavepictureinpicture', () => {
    button.textContent = 'Enter Picture-in-Picture mode';
});
//if the video is canceled for the user, the button reset to start a new screen capture
videoElement.addEventListener('suspend', () => {
    button.textContent = 'Start';
});


