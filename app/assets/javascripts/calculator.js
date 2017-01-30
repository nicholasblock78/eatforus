function myBMIFunction(height, weight) {
    var userHeight = height;
    var userWeight = weight;
    var userBMI = userWeight * 703 / (userHeight * userHeight);
    var bmiClass;
    if (userBMI >= 40) {
    	bmiClass = "Class III Obese";
    }
    else if (userBMI >= 35) {
    	bmiClass = "Class II Obese";
    }
    else if (userBMI >= 30) {
    	bmiClass = "Class I Obese";
    }
    else if (userBMI >= 25) {
    	bmiClass = "Overweight";
    }
    else if (userBMI >= 18.5) {
    	bmiClass = "Normal Weight";
    }
    else {
    	bmiClass = "Underweight!!";
    }
    document.getElementById("bmi").innerHTML = userBMI.toFixed(2);
    document.getElementById("bmi-class").innerHTML = bmiClass;
}

function myCalExpenditure() {

}

$(document).ready(function() {

  if (localStorage.length === 0) {
    console.log('elseland');
  } else {
    $('#userInformation').css('display', 'none');
    console.log('calculating...')
    document.getElementById("info").innerHTML = "<strong>Welcome Back!</strong>";

    myBMIFunction(localStorage.getItem('height'),localStorage.getItem('weight'));
  }

  //RESET BUTTON
  $('button.reset').on('click', function() {

    console.log('resetting...')
    // localStorage.clear();
    window.localStorage.removeItem('age');
    window.localStorage.removeItem('gender');
    window.localStorage.removeItem('height');
    window.localStorage.removeItem('weight');

    document.getElementById("bmi").innerHTML = "";
    document.getElementById("bmi-class").innerHTML = "";
    document.getElementById("info").innerHTML = "";

    // $('#bmi').empty();
    // $('#bmi-class').empty();
    $('#userInformation').css('display', 'inline');
  });

  $('button.calc').on('click', function() {
    if ($('input[name=age]').val() === '') {
      alert('You must enter an age!');
    }
      else if (!$('input[name=gender]:checked')[0]) {
      alert('You must select a gender!');
    }
      else if ($('input[name=wt]').val() === '') {
      alert('You must enter a weight!');
    }
      else if (($('input[name=ht-feet]').val() || $('input[name=ht-inches]').val()) === '') {
      alert('You must enter a height!');
    }
      else if (!$('input[name=activity]:checked')[0]) {
      alert('You must select an activity!');
    }
      else if (!$('input[name=goal]:checked')[0]) {
      alert('You must select a goal!');
    }
    else {
    //ON CLICK - save these variables to local or session storage so can easily access again
    //give the impression of a database but there really isn't any
    var gender = $("input[name='gender']").val();
    var age = $("input[name='age']").val();
    var height = parseInt($("input[name='ht-feet']").val()) * 12 + parseInt($("input[name='ht-inches']").val());
    var weight = $("input[name='wt']").val();
    console.log(height);
    localStorage.setItem('gender', gender);
    localStorage.setItem('age', age);
    localStorage.setItem('height', height);
    localStorage.setItem('weight', weight);

    myBMIFunction(height, weight);
  }
  });

});
