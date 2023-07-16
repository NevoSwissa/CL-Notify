function Notify(message, type, time) {
  var iconClass;

  if (!type) {
    type = "primary";
  }

  switch (type) {
    case "success":
      iconClass = "fas fa-check-circle";
    break;
    case "error":
      iconClass = "fas fa-exclamation-circle";
    break;
    case "ambulance":
      iconClass = "fas fa-truck-medical";
    break;
    case "police":
      iconClass = "fas fa-building-shield";
    break;
    case "primary":
    default:
      iconClass = "fas fa-info-circle";
    break;
  }

  if (!time) {
    time = 5000;
  }

  if (!message) {
    message = "No message was given";
  }

  var notification = $('<div>').addClass('notification').addClass(type);
  var icon = $('<i>').addClass(iconClass);
  var messageElement = $('<span>').text(message);
  var progressElement = $('<div>').addClass('progress');

  progressElement.css('background-color', getProgressColor(type));

  notification.append(icon, messageElement, progressElement);
  $('#notification-container').append(notification);

  notification.addClass('active');

  var startTime = Date.now();
  var endTime = startTime + time;

  var animationFrame;
  var prevProgress = 100;
  function animate() {
    var currentTime = Date.now();
    var remainingTime = endTime - currentTime;
    var progress = ((remainingTime / time) * 100).toFixed(2);

    if (remainingTime > 0) {
      if (prevProgress !== progress) {
        progressElement.css('width', progress + '%');
        prevProgress = progress;
      }
      animationFrame = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationFrame);
      notification.removeClass('active').addClass('remove');
      setTimeout(function() {
        notification.remove();
      }, 700);
    }
  }

  animate();
}

function getProgressColor(type) {
  switch (type) {
    case "success":
      return "#32DE84";
    case "error":
      return "#FD5C63";
    case "ambulance":
      return "#AA0000";
    case "police":
      return "#00308F";
    case "primary":
    default:
      return "#7CB9E8";
  }
}

window.addEventListener('message', function(event) {
  switch(event.data.action) {
    case "Notify":
      Notify(event.data.messege, event.data.type, event.data.time);
    break;
  }
});