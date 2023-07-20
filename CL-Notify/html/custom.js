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
  var titleElement = $('<div>').addClass('title').text(getTitleByType(type));
  var progressElement = $('<div>').addClass('progress');

  progressElement.css('background-color', getProgressColor(type));

  notification.append(icon, titleElement, messageElement, progressElement);
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
      return "rgba(168, 221, 158, 0.8)";
    case "error":
      return "rgb(242, 151, 155, 0.8)";
    case "ambulance":
      return "rgba(170, 0, 0, 0.8)";
    case "police":
      return "rgba(0, 48, 143, 0.8)";
    case "primary":
    default:
      return "rgba(182, 229, 244, 0.8)";
  }
}

function getTitleByType(type) {
  switch (type) {
    case "success":
      return "Success";
    case "error":
      return "Error";
    case "ambulance":
      return "Ambulance";
    case "police":
      return "Police";
    case "primary":
    default:
      return "Info";
  }
}

window.addEventListener('message', function(event) {
  switch(event.data.action) {
    case "Notify":
      Notify(event.data.messege, event.data.type, event.data.time);
    break;
  }
});