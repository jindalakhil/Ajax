function makePromiseCall(methodType, url, async=true, data=null){
    return new Promise(function(resolve,reject){
    let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            console.log("State Change Called. Ready State: "+ xhr.readyState + " Status : "+ xhr.status);
            if(xhr.readyState === 4){
                if(xhr.status === 200 || xhr.status === 201){
                    resolve(xhr.responseText);
                }else if(xhr.status >= 400){
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                     }); 
                    console.log("Handle 400 client error or 500 server error");
                }
            }
        }
        //before http connection any error onerror will happen
        xhr.onerror = function(){
            reject({
                status: xhr.status,
                   statusText: xhr.statusText
            });
        };
        xhr.open(methodType, url, async);
        if(data){
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }else xhr.send();
        console.log("Request sent to server");
    });
}