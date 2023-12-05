"use strict";
var myButton = document.querySelector("button");
// Dispatch the custom event when the button is clicked
myButton === null || myButton === void 0 ? void 0 : myButton.addEventListener("click", function () {
    var customEventPayload = { detail: { value: 42 } };
    var customEvent = new CustomEvent("customEvent", customEventPayload);
    myButton === null || myButton === void 0 ? void 0 : myButton.dispatchEvent(customEvent);
});
// Add an event listener to the button for the custom event
myButton === null || myButton === void 0 ? void 0 : myButton.addEventListener("customEvent", function (oEvent) {
    const event = oEvent;
    console.log("Custom event triggered with payload:", event.detail);
});
