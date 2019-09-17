function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.elems = function () {
    let body = document.querySelector('body'),
        firstLetter = this.selector.slice(0, 1),
        elemHTML;
    if (firstLetter === ".") {
        elemHTML = document.createElement("div");
        elemHTML.className = this.selector;
    } else if (firstLetter === "#") {
        elemHTML = document.createElement("p");
        elemHTML.id = this.selector.slice(1);
    }
    elemHTML.style.cssText = `height: ${this.height};
            width:  ${this.width}; 
            background-color: ${this.bg}; 
            font-size: ${this.fontSize};`;
    body.appendChild(elemHTML);
};

let el1 = new DomElement("#blue", "300px", "200px", "blue", "20px");
el1.elems();