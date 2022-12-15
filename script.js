// trims url if it has more then 45 character
let html = ''
const urlTrimmer = (url) => {
    const urlTag = document.querySelector('.url');
    url = 45 > url.length ? url : url.slice(0, 100) + ' . . . .'
    urlTag.textContent = url;
}

// remove message box
setTimeout(() => {
    document.querySelector('.message').style.opacity = '0'
}, 6000)

const url = (new URL(location).searchParams.get('url') || "Welcome, Glad to see you here !");
urlTrimmer(url);


// Data
const Timelines = []
if(url!='Welcome, Glad to see you here !'){

for (let i = 2008; i <= 2022; i++) {
    const api = fetch(`http://archive.org/wayback/available?url=${url}&timestamp=${i}0101`)
    api.then(res => {
        return res.json()
    }).then(
        data => {
            console.log(data)
            if (Object.keys(data.archived_snapshots).length != 0) {
                Timelines.push({ 'date': i, 'url': data.archived_snapshots.closest.url })
            };
        }
    )
}


setTimeout(()=>{
Timelines.forEach((element)=>{
    html+=`
    <div class="browser">
    <h2>${element.date}</h2>
    <div class="tab">
        <div class="red widget"></div>
        <div class="yellow widget"></div>
        <div class="green widget"></div>
    </div>
    <iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms" loading="lazy" src="${element.url}" frameborder="0"></iframe>

</div>
    
    `
});

document.querySelector('.browser-container').innerHTML = html;
    
},1000)
}