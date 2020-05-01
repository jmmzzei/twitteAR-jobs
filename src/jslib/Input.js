"use strict";

function Input(id) {
  this.input = document.getElementById(id);
  this.id = id;
}

Input.prototype.getValue = function () {
  return this.input.value;
};

Input.prototype.clean = function () {
  this.input.value = '';
};

Input.prototype.hasSpaces = function () {
  if (/\s/.test(this.input.value)) {
    return true;
  } else {
    return false;
  }
};

Input.prototype.listen = function () {
  this.input.addEventListener('keypress', e => {
    if (this.hasSpaces()) {
      let searchSpan = new SearchSpan(this.input);
      let label = new Label("".concat(this.id, "-label"));
      searchSpan.create();
      searchSpan.renderIn(label);
      this.clean();
    }
  });
};