const btn = document.querySelector('.changeColor');
const colorGrid = document.querySelector('.colorGrid');
const colorValue = document.querySelector('.colorValue');

btn.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: pickColor,
    }, async (res) => {
        const [data] = res;
        if (data.result) {
            const color = data.result.sRGBHex;
            colorGrid.style.backgroundColor = color;
            colorValue.innerText = color;
            try{
                await navigator.clipboard.writeText(color);
            }catch(err){
                console.log(err)
            }
        }

    })
})

async function pickColor() {
    try {
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();

    } catch (err) {
        console.log(err)
    }
}