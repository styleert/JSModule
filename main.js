const cElem = (tagName, className, text) => {
    const elem = document.createElement(tagName);
    elem.className = className || '';
    elem.innerText = text || '';
    return elem;
 }
 
 const gElem = param => {
    const elem = document.querySelector(param);
    elem.clear = function() {
       this.innerHTML = '';
       return this;
    }
    elem.add = function (listOfElems) {
       this.append(...listOfElems);
       return this;
    }
    return elem;
 }
