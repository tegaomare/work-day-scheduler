$(document).ready(function () {
  // Get the current date and display it in the header
  var currentDate = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDate);

  // Update the time-block classes based on the current hour
  updateHourlyBlocks();
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $(".saveBtn").on("click", function () {
    var timeBlock = $(this).parent();
    var hour = timeBlock.attr("id");
    var text = timeBlock.find(".description").val();

    // Save the text to local storage
    localStorage.setItem(hour, text);
  });
  loadSavedData();
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function updateHourlyBlocks() {
    var currentHour = dayjs().hour();
    $(".time-block").each(function () {
      var hour = parseInt($(this).attr("id").split("-")[1]);

      // Remove any existing classes
      $(this).removeClass("past present future");

      // Add the appropriate class based on the current hour
      if (hour < currentHour) {
        $(this).addClass("past");
      } else if (hour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  function loadSavedData() {
    $(".time-block").each(function () {
      var hour = $(this).attr("id");
      var text = localStorage.getItem(hour);

      // Set the value of the textarea
      $(this).find(".description").val(text);
    });
  }
});
