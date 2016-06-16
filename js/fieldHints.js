//FieldHints.js
//  v.0.0.2b
//  Apply to input fields for easy hints.

//TODO: need to display:none the hints after done with them. MAYBE
//TODO: can add custom styles
//TODO: can add custom positioning

var fh = {
    //Setup variables.
    hintClass : "fieldHint",
    aniFPS : (1000/48), // 24 fps, 1000 milliseconds in a second.
    aniDelta : 5, // increase the spead of the animation.

    //// Helpers
    testDel : function(){
        fh.hints[0].remove();
    },
    showHints : function(){
        console.log(fh.hints);
    },

    ////
    hints : [], //fh.fields holds all the inputs that will have hints.
                 //this makes it a member of fh (fieldHints) which allows us to
                 //iterate over it from the web page.

    hint : {
        name : "", //just for sanity if we need it
        anchor : null, //the original DOM element, the input
        hintRef : null, //the inputs hint popup
        hintText : "", //the text for inside the hint.
        timer : null
    },


    setup : function(){
        //Runs by default. Searches through all the nodes on the page
        // and builds its hint, attaches the event handler

        //Select all the nodes we want. Places them in a NodeList.
        //NodeLists can be iteated like an array, but they are not arrays.
        //ie. no Array.prototype methods.
        var inputNodes = document.querySelectorAll('.hintMe'); // NodeList
        for(var i = 0; i < inputNodes.length; i=i+1){
            var curNode = inputNodes[i];
            var hint = Object.create(fh.hint);
            hint.hintText = curNode.getAttribute("data-hint");
            //create the div in some place. Idk where it is before you place it on the page?
            var hintDiv = document.createElement("div"); //the div for the hint itself
            hintDiv.className = fh.hintClass; //set the class of the shady div to what is predefined
            hintDiv.innerHTML = hint.hintText; //place the hint text inside the hint
            inputNodes[i].parentNode.appendChild(hintDiv); //place the hint box on the page.
            hint.anchor = curNode; //the input/Node/DOM element to reference later.
            hint.hintRef = hintDiv; //the cute little hint box to reference later.
            fh.hints.push(hint); //add hints to the fh.hints container. Just incase.
            //Add click and blur event listeners to the current node (input)
            var obj = {
                handleEvent : function(){
                    fh.fadeIn(curNode, hint);
                }
            }
            curNode.hint = hint; //gives the DOM Node the nice little object
                                // that is the hint.
            curNode.addEventListener('focus', fh.fadeIn);
            curNode.addEventListener('blur', fh.fadeOut);
        }
    },

    fadeIn : function(){
        console.log(this.hint.timer);
        if(this.hint.timer){
            console.log("killing");
            window.clearInterval(this.hint.timer);
            this.hint.hintRef.style.opacity = 0;
            this.hint.timer = null;
            return;
        };
        var step = {
            targ : this.hint,
            fade :  setInterval(function(){
                step.targ.timer = step.fade;
                if(Number(step.targ.hintRef.style.opacity) >= 1.0){
                    window.clearInterval(step.targ.timer);
                    step.targ.timer = null;
                    step.targ.hintRef.style.opacity = 1; //incase it goes over 1;
                    return;
                }else{
                    step.targ.hintRef.style.opacity = Number(step.targ.hintRef.style.opacity) + fh.aniDelta/100;
                };
            }, fh.aniFPS),
        };
    },
    fadeOut : function(){
        if(this.hint.timer){
            window.clearInterval(this.hint.timer);
            this.hint.timer = null;
            this.hint.hintRef.style.opacity = 0;
            return;
        };
        var step = {
            targ : this.hint,
            fade :  setInterval(function(){
                //console.log(step.targ.hintRef);
                step.targ.timer = step.fade;
                if(Number(step.targ.hintRef.style.opacity) <= 0){
                    window.clearInterval(step.targ.timer);
                    step.targ.timer = null;
                    step.targ.hintRef.style.opacity = 0; //incase it goes over 1;
                    return;
                }else{
                    step.targ.hintRef.style.opacity = Number(step.targ.hintRef.style.opacity) - fh.aniDelta/100;
                }

            }, fh.aniFPS),
        };
    },
}
