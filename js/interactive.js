// SC 03 — Rive city skyline. Drives the city_state number (0 on load;
// Seattle 1 / St. Louis 2 / Nashville 3 via the buttons below the canvas).
(function () {
  var canvas = document.getElementById('city-canvas');
  if (!canvas || !window.rive) return;

  var buttons = document.querySelectorAll('.city-buttons button');
  var setCity = null;

  var r = new rive.Rive({
    src: 'assets/city_line.riv',
    canvas: canvas,
    autoplay: true,
    stateMachines: 'State Machine 1',
    layout: new rive.Layout({ fit: rive.Fit.Contain }),
    onLoad: function () {
      r.resizeDrawingSurfaceToCanvas();

      // city_state may be a state machine input or a view model variable —
      // support both so a re-export from Rive keeps working.
      var inputs = r.stateMachineInputs('State Machine 1') || [];
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].name === 'city_state') {
          setCity = (function (input) {
            return function (v) { input.value = v; };
          })(inputs[i]);
        }
      }
      if (!setCity && r.viewModelInstance) {
        var prop = r.viewModelInstance.number('city_state');
        if (prop) setCity = function (v) { prop.value = v; };
      }

      if (setCity) setCity(0);
      else console.warn('city_state not found on State Machine 1');
    }
  });

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!setCity) return;
      setCity(Number(btn.dataset.city));
      buttons.forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
    });
  });

  // Keep the drawing surface crisp when the layout changes size.
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { r.resizeDrawingSurfaceToCanvas(); }, 150);
  });
})();
