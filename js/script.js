// Variables

const notificationPopup = document.getElementById('notifications');
const bellIcon = document.querySelector('.bell-icon');

const alertBanner = document.getElementById('alert');

const trafficCanvas = document.getElementById('traffic-chart');
const dailyCanvas = document.getElementById('daily-chart');
const mobileCanvas = document.getElementById('mobile-chart');

const hourlyLi = document.getElementById('hourly');
const dailyLi = document.getElementById('daily');
const weeklyLi = document.getElementById('weekly');
const monthlyLi = document.getElementById('monthly');
let activeLi = document.getElementsByClassName('traffic-nav-link active')[0];

const user = document.getElementById('userField');
const message = document.getElementById('messageField');
const send = document.getElementById('send');

let emailNotifications = document.getElementById('email-notifications');
let publicProfile = document.getElementById('public-profile');
let timezone = document.getElementById('timezone');

const save = document.getElementById('save');
const cancel = document.getElementById('cancel');

// Creating Notifications Popup
notificationPopup.style.display = 'none';
notificationPopup.innerHTML =
`
<h3>Notifications</h3>
<div class="notification-popup">
  <p>You have 6 unread messages.</p>
  <p class="popup-close">x</p>
</div>
<div class="notification-popup">
  <p>You have 3 new followers.</p>
  <p class="popup-close">x</p>
</div>
`;

// Notification Bell Event Listener
bellIcon.addEventListener('click', e => {
  bellIcon.src = 'icons/icon-bell.svg';
  if (notificationPopup.style.display === 'block') {
    notificationPopup.style.display = 'none';
  } else {
    notificationPopup.style.display = 'block';
  }
});

// Notification Closing Event Listener
notificationPopup.addEventListener('click', e => {
  const element = e.target;
  if (element.className === 'popup-close') {
    element.parentNode.style.display = 'none';
  }
});

// Creating Alert Banner
alertBanner.innerHTML =
`
<div class="alert-banner">
  <p><strong>Alert:</strong> This is an example alert.</p>
  <p class="alert-banner-close">x</p>
</div>
`;

// Alert Closing Event Listener
alertBanner.addEventListener('click', e => {
  const element = e.target;
  if (element.className === 'alert-banner-close') {
    alertBanner.style.display = 'none';
  }
});

// Traffic Line Chart

let trafficData = {
  labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
  datasets: [{
    data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 2,
    lineTension: 0,
    pointBackgroundColor: '#fff',
    pointBorderColor: '#7477BF',
    pointBorderWidth: 2,
    pointRadius: 5
  }]
};

let trafficOptions = {
  aspectRatio: 2.5,
  animation: {
    duration: 0
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero:true
      }
    }]
  },
  legend : {
    display: false
  }
};

let trafficChart = new Chart(trafficCanvas, {
  type: 'line',
  data: trafficData,
  options: trafficOptions
});

// Traffic Line Chart View Switch

function updateChart (chart) {
  trafficChart.update({
    duration: 400,
    easing: 'easeInOutQuad'
  });
  activeLi.className = 'traffic-nav-link';
  chart.className = 'traffic-nav-link active';
  activeLi = document.getElementsByClassName('traffic-nav-link active')[0];
}

hourlyLi.addEventListener('click', (e) => {
  trafficChart.data.labels = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
  trafficChart.data.datasets[0].data = [103, 94, 68, 120, 94, 59, 79, 62, 93];
  updateChart(hourlyLi);
});

dailyLi.addEventListener('click', () => {
  trafficChart.data.labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  trafficChart.data.datasets[0].data = [395, 385, 420, 560, 430, 670, 632];
  updateChart(dailyLi);
});

weeklyLi.addEventListener('click', () => {
  trafficChart.data.labels = ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"];
  trafficChart.data.datasets[0].data = [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500];
  updateChart(weeklyLi);
});

monthlyLi.addEventListener('click', () => {
  trafficChart.data.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  trafficChart.data.datasets[0].data = [4382, 7340, 7120, 6200, 5505, 8432, 4900, 4750, 5930, 6340, 6900, 8125];
  updateChart(monthlyLi);
});

// Daily Traffic Bar Chart

const dailyData = {
  labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  datasets: [{
    label: '# of Hits',
    data: [75, 115, 175, 125, 225, 200, 100],
    backgroundColor: '#7477BF',
    borderWidth: 1,
    barPercentage: 0.6
  }]
};

const dailyOptions = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero:true
      }
    }]
  },
  legend : {
    display: false
  }
};

let dailyChart = new Chart(dailyCanvas, {
  type: 'bar',
  data: dailyData,
  options: dailyOptions
});

// Mobile Users Doughnut Chart

const mobileData = {
  labels: ['Desktop', 'Tablet', 'Phones'],
  datasets: [{
    label: '# of Users',
    data: [2000, 550, 500],
    borderWidth: 0,
    backgroundColor: [
      '#7477BF',
      '#78CF82',
      '#51B6C8'
    ]
  }]
};

const mobileOptions = {
  legend: {
    position: 'right',
    labels: {
      boxWidth: 20,
      fontFamily: "'Open Sans', sans-serif",
      fontSize: 14
    }
  }
};

let mobileChart = new Chart(mobileCanvas, {
  type: 'doughnut',
  data: mobileData,
  options: mobileOptions
});

// Message User Autocomplete

const users = [
  'Victoria Chambers',
  'Dale Byrd',
  'Dawn Wood',
  'Dan Oliver'
];

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

autocomplete(document.getElementById("userField"), users);

// Message User Alerts

send.addEventListener('click', () => {
  if (user.value === '' && message.value === '') {
    alert('Please fill out user and message fields before sending');
  } else if (user.value === '' ) {
    alert('Please fill out user field before sending');
  } else if (message.value === '' ) {
    alert('Please fill out message field before sending');
  } else {
    alert(`Message successfully sent to: ${user.value}`);
  }
});



// Load Settings from Local Storage

if (localStorage.getItem('timezone') !== null) {
  timezone.value = localStorage.getItem('timezone');
}

const emailSettings = localStorage.getItem('email-notifications');

if (emailSettings && emailSettings === 'checked') {
  emailNotifications.checked = true;
} else {
  emailNotifications.checked = false;
}

const profileSettings = localStorage.getItem('public-profile');

if (profileSettings && profileSettings === 'checked') {
  publicProfile.checked = true;
} else {
  publicProfile.checked = false;
}

// Save Settings to Local Storage after Click on Save Button

save.addEventListener('click', e => {

  if (emailNotifications.checked) {
    localStorage.setItem('email-notifications', 'checked');
  } else {
    localStorage.setItem('email-notifications', 'not checked');
  }

  if (publicProfile.checked) {
    localStorage.setItem('public-profile', 'checked');
  } else {
    localStorage.setItem('public-profile', 'not checked');
  }

  localStorage.setItem('timezone', timezone.value);

  alert('Your settings have been saved.');

});

// Remove Settings after Click on Cancel Button

cancel.addEventListener('click', e => {
    localStorage.clear();
    location.reload();
    alert('Your settings have been removed.');
  });