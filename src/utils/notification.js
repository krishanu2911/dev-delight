export const notifyEyeCare = (url) => {
    Notification.requestPermission(function (result) {
      if (result === "granted") {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.showNotification("Exercise Time", {
            body: "Look away from the screen",
            icon: "../assets/clock.png",
            data: url,
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: "Exercise Reminder",
            requireInteraction: true,
            actions: [
              {
                action: "exercise-action",
                title: "Do exercise",
              },
            ],
          });
          console.log();
        });
      }
    });
  
    const audio = new Audio(
      "https://soundbible.com/mp3/service-bell_daniel_simion.mp3"
    );
    audio.play();
  };
  export const notifyWaterIntake = (url) => {
    Notification.requestPermission(function (result) {
      if (result === "granted") {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.showNotification("Please Have Some water", {
            body: "Stay hydrated",
            icon: "../assets/clock.png",
            data: url,
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: "Exercise Reminder",
            requireInteraction: true,
            actions: [
              {
                action: "exercise-action",
                title: "Do exercise",
              },
            ],
          });
          console.log();
        });
      }
    });
  
    const audio = new Audio(
      "https://soundbible.com/mp3/service-bell_daniel_simion.mp3"
    );
    audio.play();
  };
  
  export const notifySitStraight = (url) => {
    Notification.requestPermission(function (result) {
      if (result === "granted") {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.showNotification("Sit Straight", {
            body: "Bad posture sit straight",
            icon: "../assets/bubble.png",
            data: url,
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: "Sit straight",
          });
          console.log();
        });
      }
    });
    const audio = new Audio(
      "https://soundbible.com/mp3/service-bell_daniel_simion.mp3"
    );
    audio.play();
  };

  
  