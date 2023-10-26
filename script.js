// const express = require('express')
// const { pool } = require('pg')
// const app = express();
// const port = 3000;

// const creds = require('./creds.json');
// const pool = new Pool(creds);


var customer = [
    //[first name], [last name], [phone number (pk)]
    ["John", "Doe", "1112223333"],
    ["Josh", "Eddie", "2223334444"],
    ["Rintra", "", "3334445555"],
    ["Bill", "", "4445556666"]
]

var callHistoryData = [
    //[phonenumfrom], [phonenumto], [calllength]
    ["4445556666", "2223334444", "0:30"],
    ["1112223333", "3334445555", "1:30"],
    ["4445556666", "2223334444", "1:30"],
    ["3334445555", "4445556666", "1:45"],
    ["1112223333", "4445556666", "1:30"],
    ["3334445555", "2223334444", "1:30"],
    ["4445556666", "2223334444", "4:30"],
    ["1112223333", "4445556666", "1:30"],
    ["1112223333", "2223334444", "5:00"],
    ["1112223333", "2223334444", "1:30"],
    ["3334445555", "2223334444", "1:30"],
    ["1112223333", "2223334444", "1:30"],
    ["1112223333", "4445556666", "1:30"],
    ["4445556666", "3334445555", "1:30"],
    ["1112223333", "2223334444", "1:30"],
    ["3334445555", "2223334444", "1:30"],
    ["1112223333", "2223334444", "1:30"],
    ["1112223333", "2223334444", "1:30"],
    ["4445556666", "3334445555", "7:00"],
    ["3334445555", "1112223333", "1:30"],
    ["2223334444", "3334445555", "1:30"],
    ["2223334444", "1112223333", "0:05"],
    ["2223334444", "4445556666", "2:35"],
    ["3334445555", "2223334444", "0:15"],
    ["2223334444", "1112223333", "1:30"],
    ["4445556666", "1112223333", "1:30"],
    ["3334445555", "1112223333", "1:30"],
    ["2223334444", "1112223333", "1:30"],
    ["2223334444", "1112223333", "1:30"],
    ["3334445555", "1112223333", "2:25"],
    ["4445556666", "1112223333", "4:45"],
    ["2223334444", "3334445555", "1:30"],
    ["4445556666", "1112223333", "1:30"],
    ["2223334444", "4445556666", "1:30"]
]

function formatPhone(number) {

    if(number.length < 10 || number.length > 10) {
        return number;
    }

    return "(" + number.slice(0,3) + ") " + number.slice(3,6) + "-" + number.slice(6);

}

function populateCustomer() {

    var customerList = document.getElementById("customerList");

    for (var i = 0; i < customer.length; i++) {

        var phone = customer[i][2];

        var tr = document.createElement('tr');
            tr.className = "tableRow";
            tr.id = customer[i][2]
            tr.onclick = function(){userAccount(this.id)};

        var firstName = document.createElement('td');
            firstName.innerHTML = customer[i][0];

        var lastName = document.createElement('td');
        lastName.innerHTML = customer[i][1];

        var phoneNum = document.createElement('td');
        phoneNum.innerHTML = formatPhone(customer[i][2]);

        customerList.appendChild(tr);
        tr.appendChild(firstName);
        tr.appendChild(lastName);
        tr.appendChild(phoneNum);

    }

}

function userAccount(phoneNum) {

    var account = document.getElementById("userAccount")
    var phone = document.getElementById("phoneCall")

    for (var i = 0; i < customer.length; i++) {
        if(customer[i][2] == phoneNum) {
            account.appendChild(document.createElement('h3')).innerHTML = "Welcome " + customer[i][0];
        }
    }

    document.getElementById("accountSelection").style.display = "none"
    account.style.display = "block";
    phone.style.display = "block";
    
    // var callButton = document.createElement('button')
    //     callButton.id = "phoneCallButton"
    //     callButton.innerHTML = "Call"
    //     callButton.onclick = function(){phoneCall(phoneNum)};

    var accountInfoButton = document.createElement('button')
        accountInfoButton.id = "accountInfoButton"
        accountInfoButton.innerHTML = "Account Info"
        accountInfoButton.onclick = function(){accountInfo(phoneNum)};

    var callHistoryButton = document.createElement('button')
        callHistoryButton.id = "callHistoryButton"
        callHistoryButton.innerHTML = "Call History"
        callHistoryButton.onclick = function(){showCallHistory(phoneNum)};

    var signOutButton = document.createElement('button')
        signOutButton.id = "signOut"
        signOutButton.innerHTML = "Sign Out"
        signOutButton.onclick = function(){back("userAccount")};

    account.appendChild(accountInfoButton)
    account.appendChild(callHistoryButton)
    account.appendChild(signOutButton)
    // phone.appendChild(callButton)

}

function phoneCall(phoneNum) {

    var phone = document.getElementById("phoneCall");
    phone.style.display = "block";
    document.getElementById("userAccount").classList.add("left");

}

function accountInfo(phoneNum) {

}

function showCallHistory(phoneNum) {

    var callHistory = document.getElementById("callHistory");

    var backButton = document.createElement("button");
        backButton.innerHTML = "< Back";
        backButton.onclick = function(){back("callHistory")};

    callHistory.appendChild(backButton);

    var table = document.createElement('table');
        table.className = "tableList";

    var tr = document.createElement('tr');
        tr.className = "tableRow";

    var callFromHeader = document.createElement('th')
        callFromHeader.innerHTML = "Call From"

    var callToHeader = document.createElement('th')
        callToHeader.innerHTML = "Call To"

    var callLengthHeader = document.createElement('th')
        callLengthHeader.innerHTML = "Call Length"

    callHistory.append(table)
    table.append(tr)
    tr.append(callFromHeader)
    tr.append(callToHeader)
    tr.append(callLengthHeader)


    for (var i = 0; i < callHistoryData.length; i++) {

        if (callHistoryData[i][0] == phoneNum) {

            var tr = document.createElement('tr');
            tr.className = "tableRow";

            var from = document.createElement('td');
                from.innerHTML = formatPhone(callHistoryData[i][0]);

            var to = document.createElement('td');
                to.innerHTML = formatPhone(callHistoryData[i][1]);

            var callLength = document.createElement('td');
                callLength.innerHTML = callHistoryData[i][2];

            table.appendChild(tr);
            tr.appendChild(from);
            tr.appendChild(to);
            tr.appendChild(callLength);

        }

    }

    document.getElementById("callHistory").style.display = "block";

}

function back(exit) {

    document.getElementById(exit).innerHTML = ""
    document.getElementById(exit).style.display = "none"

    if(exit == "userAccount") {
        document.getElementById("accountSelection").style.display = "block"
        document.getElementById("phoneCall").style.display = "none"
    }

}

function dial(num) {

    if (num == '') {
        for (var i = 0; i < 10; i++) {
            num += Math.floor(Math.random() * 10);
        }
        document.getElementById("dial").innerHTML = num;
    }

    var currentNum = document.getElementById("dial").innerHTML

    if (currentNum.length == 10 && num) {
        return;
    }

    if(num) {
        document.getElementById("dial").innerHTML += num;
    }
    else {
        document.getElementById("dial").innerHTML = currentNum.slice(0, -1);
    }

}

function call() {

    var currentNum = document.getElementById("dial").innerHTML

    if (currentNum.length < 10 || currentNum.length > 10) {
        alert("Please type a valid phone number (10 digits)")
        return;
    }

    document.getElementById("callBackground").style.display = "block";

    hours = Math.floor(Math.random() * 3);
    minutes = Math.floor(Math.random() * 60);
    seconds = Math.floor(Math.random() * 60);
    document.getElementById("timer").innerHTML = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
    document.getElementById("callWith").innerHTML = formatPhone(currentNum);
    timerInterval = setInterval(timer, 1000);
    document.getElementById("dial").innerHTML = "";

}

function endCall() {

    document.getElementById("callBackground").style.display = "none";

    clearInterval(timerInterval);

}

let timerInterval;
var hours = 0;
var minutes = 0;
var seconds = 0;

function timer() {

    if (seconds >= 59) {
        seconds = 0;
        minutes++;
    }
    else {
        seconds++;
    }

    if (minutes > 59) {
        seconds = 0;
        minutes = 0;
        hours++;
    }

    document.getElementById("timer").innerHTML = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');

}