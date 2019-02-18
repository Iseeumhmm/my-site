
  var div = document.getElementById('question-one');
  setTimeout(function() {
      div.focus();
  }, 0);




var send = function() {
    let questionOne = document.getElementById("question-one").innerHTML;
    let questionTwo = document.getElementById("question-two").innerHTML;
    let questionThree = document.getElementById("question-three").innerHTML;
    let questionFour = document.getElementById("question-four").innerHTML;
    let questionFive = document.getElementById("question-five").innerHTML;
    let questionSix = document.getElementById("question-six").innerHTML;
    let questionSeven = document.getElementById("question-seven").innerHTML;
    let questionEight = document.getElementById("question-eight").innerHTML;
    let questionNine = document.getElementById("question-nine").innerHTML;
    let questionTen = document.getElementById("question-ten").innerHTML;
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;

    // Send form data to api
    var request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/005312', true);

    var formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('q1', questionOne);
    formData.append('q2', questionTwo);
    formData.append('q3', questionThree);
    formData.append('q4', questionFour);
    formData.append('q5', questionFive);
    formData.append('q6', questionSix);
    formData.append('q7', questionSeven);
    formData.append('q8', questionEight);
    formData.append('q9', questionNine);
    formData.append('q10', questionTen);

    var checkEmail = document.getElementById('email');
    if(checkEmail.checkValidity()) {
      request.send(formData);
      console.log(request.response);
      document.location.href = ("/");
    } else {
      alert("It seems there's a problem with your email: " + document.getElementById('email').validationMessage);
    }




  };
