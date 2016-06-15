//FieldHints.js
//  v.0.0.1b
//  Apply to input fields for easy hints.


//TODO: need to display:none the hints after done with them.

var fh = {
    setup : function(){
        //Runs by default. Searches through all the nodes on the page
        // and builds its hint, attaches the event handler
        $fields = document.querySelectorAll('.hintMe')
        $curField = null;
        for(var i = 0; i < $fields.length; i++){
            $curField = $fields[i];
            tmpField = document.createElement("div"); //the div for the hint itself
            tmpField.className = "fieldHint"; //styles the hint
            //can add styling here through JS and reading an object.
            tmpField.innerHTML = $curField.getAttribute("data-hint");
            $curField.parentNode.appendChild(tmpField, $curField);
            $curField.hint = tmpField;
            //pass along the hint as a member of the field.
            //so we can access it from the functions.
            $curField.addEventListener('focus', this.fadeIn);
            $curField.addEventListener('blur', this.fadeOut);

        };
    },

    aniFPS : (1000/48), // 24 fps, 1000 milliseconds in a second.
    aniDelta : 5, // increase the spead of the animation.

    fadeIn : function(){
        hintNode = this.hint;
            if(hintNode.fadeOutTimer){
                window.clearInterval(hintNode.fadeOutTimer);
            };
            hintNode.isAnimating = true;
            fade = {
                hint : hintNode,
                count : 0,
                timer : setInterval(function(){
                    fade.hint.fadeInTimer = fade.timer;
                    if(Number(fade.hint.style.opacity) >= 1.0){
                        this.clearInterval(fade.timer);
                        fade.hint.isAnimating = false;
                        fade.hint.style.opacity = 1; //incase it goes over 1;
                        return;
                    };
                    fade.hint.style.opacity = Number(fade.hint.style.opacity) + fh.aniDelta/100;
                }, fh.aniFPS)
            //};
        }
    },
    fadeOut : function(){
        hintNode = this.hint;
    //    if(hintNode.isAnimating != true){
            //window.clearInterval(hintNode.fadeInTimer);
            if(hintNode.fadeInTimer){
                window.clearInterval(hintNode.fadeInTimer);
            };
            hintNode.isAnimating = true;
            fade = {
                hint : hintNode,
                count : 100,
                timer : setInterval(function(){
                    fade.hint.fadeOutTimer = fade.timer;

                    if(fade.hint.style.opacity <= 0.0){
                        this.clearInterval(fade.timer);
                        fade.hint.isAnimating = false;
                        fade.hint.style.opacity = 0; //incase it goes under 0;
                        return;
                    };
                    fade.hint.style.opacity = Number(fade.hint.style.opacity) - fh.aniDelta/100;
                }, fh.aniFPS)
        //    };
        };
    }


}
