var baseUrl = credentialsBaseUrl;


async function APICall(text){
    try{

        // var text = document.getElementById('input').value;
        // text = "hello there"
        // console.log(text);
        var response = await fetch(baseUrl+'predict/'
        , {
        method: "POST",
        crossDomain: true,
        body: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {"Content-type": "application/json; charset=UTF-8"}
        }
        ).then(response=>response.json());
        // console.log(response.json());
        // console.log(response.status);
    //    console.log(response);
       return response['prediction'];
    }
    catch(err){
        console.log(err.message);
    }
}

 async function getData(){
    var data = document.getElementById('input').value;
    // console.log(data);
    var arr = data.split('. ');
    var results={};
    // console.log('joy is: '+results['joy']);
    for(let element in arr){
    console.log(arr[element]);
      var emotion = await APICall(arr[element]);
    //   console.log(typeof(emotion));
    // await console.log(typeof(results[emotion]));
    // await console.log(emotion in results);
    // await console.log(results.emotion);
    // console.log((results[emotion]+1));
      if(emotion in results) 
      {results[emotion]+=1;}
      else
       results[emotion]=1;
    //    console.log(results[emotion]);
    }
    
    

    return results;
}

document.getElementById('btn').onclick = addTable;

async function addTable() {
      
    var myTableDiv = document.getElementById("table");
    // console.log("The table is being created");
    var table = document.createElement('TABLE');
    
    table.setAttribute('class',"table");
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
    tableBody.setAttribute('id','table-body')
    results = await getData();

    let total = 0;
    
    for(let prop in results){
        
        // console.log(prop+' has value '+await results[prop])
        total+= await results[prop];
    }

    if(total==0)
    total=1;

    for(let prop in results){
        results[prop] = (results[prop]*100)/total;
    }
    // console.log(results);
    let count = 1
    for (prop in results){
       var tr = document.createElement('TR');
       tableBody.appendChild(tr);
       var first = document.createElement('th');
        first.setAttribute("scope","row");
        first.width='75';
        first.textContent = count;
        count+=1;
        tr.appendChild(first);
       var td = document.createElement('TD');
        td.width='75';
        td.appendChild(document.createTextNode(prop));
        tr.appendChild(td);
        var td2 = document.createElement('TD');
        td2.width='75';
        td2.appendChild(document.createTextNode(results[prop]+'%'));
        tr.appendChild(td2);
       
    }
    myTableDiv.appendChild(table);
    
}
