document.addEventListener("DOMContentLoaded", function(){
            
    //submit disable
    document.querySelector(".submit").disabled = true;
    document.querySelector(".input").onkeyup = function(){
        if(document.querySelector(".input").value.length > 0){
            document.querySelector(".submit").disabled = false;
        } else {
            document.querySelector(".submit").disabled = true;
        }
    }
    
    //weather details on submit plus london easter egg


    var counter = localStorage.getItem('counter');
    localStorage.setItem('counter', counter);
    document.querySelector('#form1').onsubmit = function(){

        var city = document.querySelector("#city").value.toLowerCase();
        
        
        var counter_times = document.querySelector("#counter"); 
        counter++;
        
        if(counter == 1){
            counter_times.innerHTML = `You have checked the weather ${counter} time`;
        } else {
            counter_times.innerHTML = `You have checked the weather ${counter} times`;
        }
        localStorage.setItem('counter', counter);
        
        if(city ==='london'){
            alert("it's always raining in London!");
        }

        //nyc update for swarn
        if (city === 'nyc'){
            city = 'new york';
            alert("Abhi to chal gya but next time se poora naam dalna");
        }

        document.querySelector(".input").value = '';
        document.querySelector("#weather_info").innerHTML = `Weather in ${city}`;
        document.querySelector(".submit").disabled = true;
    
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=dd94f859a0e52d6e4767fddf735f04a7`)
        .then(response => response.json())
        .then(data => {
    
            console.log(data);
            
            const temp = data.main.temp;
            const humidity = data.main.humidity;
            document.querySelector("#api_data").innerHTML = `Temperature is ${temp}°C . Humidity is ${humidity}%`;
            
        })

        .catch(error => {
            console.log(error);
            document.querySelector('#api_data').innerHTML = 'aisi koi jagah nahi hai vro 🤦‍♂️';
        });
        
        return false;
    }

    //reset button
    document.querySelector("#reset").onclick = function(){
        counter = counter - counter;
        document.querySelector("#counter").innerHTML = `You have checked the weather ${counter} times`;
        document.querySelector("#api_data").innerHTML = '';
        document.querySelector("#weather_info").innerHTML = '';
    }
    
    //change color
    document.querySelector("#select1").onchange = function(){
        document.querySelector("#weather_info").style.color = this.value;
    }

    //task list

    var tasksubmit = document.querySelector("#task_submit");
    var newtask = document.querySelector("#newtask");
    var tasknumber = 0; 

    tasksubmit.disabled = true;
    newtask.onkeyup = function(){
        if(newtask.value.length > 0){
            tasksubmit.disabled = false;
        } else {
            tasksubmit.disabled = true;
        }
    }
    

    document.querySelector("#form2").onsubmit = function(){
        const task = document.querySelector("#newtask").value;
        const li = document.createElement('li');
        li.innerHTML = task;
        document.querySelector("#tasks").append(li);
        document.querySelector("#newtask").value = '';
        document.querySelector("#task_submit").disabled = true;
        tasknumber++;
        if(tasknumber != 1){

            document.querySelector("#task_number").innerHTML = `${tasknumber} tasks are pending`;
        } else {
            document.querySelector("#task_number").innerHTML = `1 task is pending`;
        }
       
        return false;
    }


    document.querySelector("#reset2").onclick = function reset2(){
        document.querySelector("#tasks").innerHTML = '';
    }

    //side note 
    const h4 = document.querySelector("#side_note");
    h4.style.display = 'none'
    document.querySelector("#sidenote_button").onclick = function(){
        
        if(h4.style.display === 'block'){
            h4.style.display = 'none'
            document.querySelector("#sidenote_button").value = 'Read side note again'
        } 
        
        else {
            h4.style.display = 'block'
            document.querySelector("#sidenote_button").value = 'hide this note';
        }
    }
});

