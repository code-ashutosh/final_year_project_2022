var baseUrl = credentialsBaseUrl;

const obj = {
    'admiration': '#000080',
    'amusement': '#0000FF',
    'approval': '#008080',
    'caring': '#00FFFF',
    'excitement': '#008000',
    'gratitude': '#00FF00',
    'joy': '#1e90ff',
    'love': '#00ffff',
    'optimism': '#008b8b',
    'surprise': '#7cfc00',
    'relief': '#add8e6',

    'anger': '#800000',
    'annoyance': '#FF0000',
    'confusion': '#dc143c',
    'disappointment': '#006400',
    'disapproval': '#556b2f',
    'disgust': '#2f4f4f',
    'embarrassment': '#4b0082',
    'fear': '#8b4513',
    'grief': '#8b008b',
    'nervousness': '#4a292f',
    'remorse': '#20274a',
    'sadness': '#1a381e',

    'neutral': '#000000',
    'curiosity': '#C0C0C0',
    'desire': '#808080',
    'pride': '#a9a9a9',
    'realization': '#ffd700',
};

const emotionMappings = {
    'admiration': '#000080',
    'amusement': '#0000FF',
    'approval': '#008080',
    'caring': '#00FFFF',
    'excitement': '#008000',
    'gratitude': '#00FF00',
    'joy': '#1e90ff',
    'love': '#00ffff',
    'optimism': '#008b8b',
    'surprise': '#7cfc00',
    'relief': '#add8e6',

    'anger': '#800000',
    'annoyance': '#FF0000',
    'confusion': '#dc143c',
    'disappointment': '#006400',
    'disapproval': '#556b2f',
    'disgust': '#2f4f4f',
    'embarrassment': '#4b0082',
    'fear': '#8b4513',
    'grief': '#8b008b',
    'nervousness': '#4a292f',
    'remorse': '#20274a',
    'sadness': '#1a381e',

    'neutral': '#000000',
    'curiosity': '#C0C0C0',
    'desire': '#808080',
    'pride': '#a9a9a9',
    'realization': '#ffd700',
};

async function createTableHeader(content) {

}

async function APICall(text) {
    try {

        // var text = document.getElementById('input').value;
        // text = "hello there"
        // console.log(text);
        var response = await fetch(baseUrl + 'predict/'
            , {
                method: "POST",
                crossDomain: true,
                body: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }
        ).then(response => response.json());
        // console.log(response.json());
        // console.log(response.status);
        //    console.log(response);
        return response['prediction'];
    }
    catch (err) {
        console.log(err.message);
    }
}

async function getData() {

    var data = document.getElementById('input').value;
    // console.log(data);
    var arr = data.split('. ');
    var prevPara = document.getElementById('p2');
    if (prevPara != null)
        prevPara.remove();
    var superPara = document.getElementById('p');
    var para = document.createElement('p');
    para.setAttribute('id', 'p2');
    var results = {};
    // console.log('joy is: '+results['joy']);
    for (let element in arr) {
        console.log(arr[element]);
        var emotion = await APICall(arr[element]);
        var elem = document.createElement('span');
        elem.style.color = obj[emotion];
        elem.innerHTML = arr[element] + '.';
        para.append(elem);

        //   console.log(typeof(emotion));
        // await console.log(typeof(results[emotion]));
        // await console.log(emotion in results);
        // await console.log(results.emotion);
        // console.log((results[emotion]+1));
        if (emotion in results) { results[emotion] += 1; }
        else
            results[emotion] = 1;
        //    console.log(results[emotion]);
    }
    superPara.appendChild(para);


    return results;
}

document.getElementById('btn').onclick = getEmotionAnalysis;
document.getElementById('btn2').onclick = getBooks;

async function getBooks() {
    var data = document.getElementById('input').value;
    var emotion = await APICall(data);
    console.log(emotion);
    var response = await fetch('https://www.googleapis.com/books/v1/volumes?q=subject:' + emotion + '&key=AIzaSyAJAUNU9Tf2nWsVUty-yLpNqrRLLHt8wtA'
        // , {
        // method: "POST",
        // crossDomain: true,
        // body: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),
        // contentType: "application/json; charset=utf-8",
        // dataType: "json",
        // headers: {"Content-type": "application/json; charset=UTF-8"}
        // }
    ).then(response => response.json());
    console.log(response);

    let itemCount = response['totalItems'];
    if (itemCount > 5)
        itemCount = 5;

    //------->  TABLE CREATION CODE  <-------------------

    // var myTableDiv = document.getElementById("table");
    // // console.log("The table is being created");
    // var earlierTable = document.getElementById('newTable');
    // if (earlierTable != null)
    //     earlierTable.remove();
    // var table = document.createElement('TABLE');

    // table.setAttribute('class', "table");
    // table.setAttribute('id', "newTable");

    // var tableHeader = document.createElement('thead');
    // tableHeader.setAttribute('class', 'thead-dark');

    // var tr1 = document.createElement('TR');

    // var th0 = document.createElement('th');
    // th0.appendChild(document.createTextNode('#'));
    // th0.scope = 'col';
    // tr1.appendChild(th0);

    // var th1 = document.createElement('th');
    // th1.appendChild(document.createTextNode('Title'));
    // th1.scope = 'col';
    // tr1.appendChild(th1);

    // var th2 = document.createElement('th');
    // th2.appendChild(document.createTextNode('Author'));
    // th2.scope = 'col';
    // tr1.appendChild(th2);

    // tableHeader.appendChild(tr1);

    // table.appendChild(tableHeader);

    // var tableBody = document.createElement('TBODY');
    // table.appendChild(tableBody);
    // tableBody.setAttribute('id', 'table-body');

    // let count = 1;
    // for (let i = 0; i < itemCount; i++) {
    //     var tr = document.createElement('TR');
    //     tableBody.appendChild(tr);
    //     var index = document.createElement('th');
    //     index.setAttribute("scope", "row");
    //     index.width = '75';
    //     index.textContent = count;
    //     count += 1;
    //     tr.appendChild(index);
    //     var td = document.createElement('TD');
    //     td.width = '75';
    //     td.appendChild(document.createTextNode(response['items'][i]['volumeInfo']['title']));
    //     tr.appendChild(td);
    //     var td2 = document.createElement('TD');
    //     td2.width = '75';
    //     td2.appendChild(document.createTextNode(response['items'][i]['volumeInfo']['authors'][0]));
    //     tr.appendChild(td2);
    // }
    // myTableDiv.appendChild(table);

    //-----------------------------------------------------------------------------

    var myTableDiv = document.getElementById("p");
    // myTableDiv.style.flexWrap = 'wrap';
    // myTableDiv.style.display = 'inline';
    var prevDiv = document.getElementById('p2');
    if (prevDiv != null)
        prevDiv.remove();

    var superDiv = document.createElement('div');
    superDiv.setAttribute('id', 'p2');
    superDiv.setAttribute('class', 'card-group');
    // superDiv.style.flexWrap = 'wrap';
    // superDiv.style.display = 'inline';
    for (let i = 0; i < itemCount; i++) {
        var cardDiv = document.createElement('div');
        cardDiv.style.width = '18rem';
        cardDiv.setAttribute('class', 'card');
        cardDiv.style.flexWrap = 'wrap';
        // cardDiv.style.display = 'inline';

        var cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body');

        var imgComp = document.createElement('img');
        imgComp.setAttribute('class', 'card-img-top');
        imgComp.setAttribute('src', response['items'][i]['volumeInfo']['imageLinks']['smallThumbnail']);
        imgComp.setAttribute('alt', response['items'][i]['volumeInfo']['title']);


        var cardTitle = document.createElement('h5');
        cardTitle.setAttribute('class', 'card-title');
        cardTitle.innerHTML += response['items'][i]['volumeInfo']['title'];

        var cardText = document.createElement('p');
        cardText.setAttribute('class', 'card-text');
        cardText.innerHTML += response['items'][i]['volumeInfo']['authors'][0];

        cardBody.append(cardTitle);
        cardBody.append(cardText);

        cardDiv.append(imgComp);
        cardDiv.append(cardBody);

        superDiv.append(cardDiv);
    }
    myTableDiv.append(superDiv);
}

async function getEmotionAnalysis() {

    var myTableDiv = document.getElementById("table");
    // console.log("The table is being created");
    var earlierTable = document.getElementById('newTable');
    if (earlierTable != null)
        earlierTable.remove();
    var table = document.createElement('TABLE');

    table.setAttribute('class', "table");
    table.setAttribute('id', "newTable");

    var tableHeader = document.createElement('thead');
    tableHeader.setAttribute('class', 'thead-dark');

    var tr1 = document.createElement('TR');

    var th0 = document.createElement('th');
    th0.appendChild(document.createTextNode('#'));
    th0.scope = 'col';
    tr1.appendChild(th0);

    var th1 = document.createElement('th');
    th1.appendChild(document.createTextNode('Emotion'));
    th1.scope = 'col';
    tr1.appendChild(th1);

    var th2 = document.createElement('th');
    th2.appendChild(document.createTextNode('Percentage'));
    th2.scope = 'col';
    tr1.appendChild(th2);

    tableHeader.appendChild(tr1);

    table.appendChild(tableHeader);

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
    tableBody.setAttribute('id', 'table-body')
    results = await getData();

    let total = 0;

    for (let prop in results) {

        // console.log(prop+' has value '+await results[prop])
        total += await results[prop];
    }

    if (total == 0)
        total = 1;

    for (let prop in results) {
        results[prop] = (results[prop] * 100) / total;
    }
    // console.log(results);
    let count = 1
    for (prop in results) {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);
        var index = document.createElement('th');
        index.setAttribute("scope", "row");
        index.width = '75';
        index.textContent = count;
        count += 1;
        tr.appendChild(index);
        var td = document.createElement('TD');
        td.width = '75';
        var elem1 = document.createElement('span');
        elem1.style.color = obj[prop];
        elem1.innerHTML += prop;
        td.appendChild(elem1);
        // td.style.color = obj[color];
        tr.appendChild(td);
        var td2 = document.createElement('TD');
        td2.width = '75';
        var elem2 = document.createElement('span');
        elem2.style.color = obj[prop];
        elem2.innerHTML += results[prop] + '%';
        // td2.style.color = obj[color];
        td2.appendChild(elem2);
        tr.appendChild(td2);

    }
    myTableDiv.appendChild(table);

}
