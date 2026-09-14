function createCard(title, cName, views, monthsOld, duration, thumbnail) {
    let viewstr;

    if (views >= 1000000) {
        viewstr = (views / 1000000).toFixed(1) + "M";
    } else if (views >= 1000) {
        viewstr = (views / 1000).toFixed(1) + "K";
    } else {
        viewstr = views;
    }

    let html = `
    <div class="card">

        <div class="box">
            <img src="${thumbnail}" alt="">
            <span class="timestamp">${duration}</span>
        </div>

        <div class="text-content">
            <div class="content">
                ${title}
            </div>

            <div class="title">
                ${cName} · ${viewstr} views · ${monthsOld} months ago
            </div>
        </div>

    </div>
`;


    document.querySelector(".container").innerHTML += html;
}

createCard(
    "The DEMON of Football EL BICHO | CRISTIANO RONALDO CR7 - Edit",
    "RITESH",
    7270000,
    2,
    "00:12",
    "https://i.ytimg.com/vi/QzCb1kz9CBI/oardefault.jpg"
);
