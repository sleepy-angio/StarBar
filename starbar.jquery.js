

(function($, window, document, undefined){

    
    var StarBarClass = function() {
        this.elem;
        this.$elem;
        this.options;
        this.frag;
        this.currentHover = 0;
    }
    
    StarBarClass.prototype.init = function( options, elem ){
        this.elem = elem;
        this.$elem = $( elem );                        
            
        this.options = $.extend( {}, $.fn.starbar.options, options);
        this.buildAndDisplay();
    }
    
    StarBarClass.prototype.buildAndDisplay = function(){
        this.frag = this.buildFrag();
        this.display();
        this.style();
        this.bindEvents();
    }
    
    StarBarClass.prototype.buildFrag = function(){        
        var frag = "";
        
        for (var i = 0, length = this.options.numberOfStars; i < length; i++) {                                                        
            var imageURL = ( i < this.options.rating ) ? this.options.imageSrcFilled : this.options.imageSrcEmpty;                
            
            frag += "<img src='" + imageURL + "' data-star-number='" + (i+1) + "' />"; 
        }
        
        return frag;
    }
    
    StarBarClass.prototype.display = function(){
        this.elem.html( this.frag );
    }
    
    StarBarClass.prototype.style = function(){
        var images = this.$elem.find( "img" );
        var self = this;
        
        $.each( images, function() {
           $(this).css("width", self.options.starSize);
           $(this).css("margin-right", self.options.marginRight);
        });
    }
    
    StarBarClass.prototype.updateOptions = function( options ){
        this.options = $.extend( {}, this.options, options);
    }
    
    StarBarClass.prototype.bindEvents = function(){
        var self = this;
        
        if ( !self.options.locked ) {
            
            self.elem.find( "img" ).on( "mouseenter" , function() {
                self.hoverStar( $(this) );
            });

            self.elem.find( "img" ).on( "mouseleave" , function() {
                self.hoverOutStar( $(this) );
            });
            
            self.elem.find( "img" ).on( "click", function() {
                self.clickStar( $(this) );
            });
        }
    }
    
    StarBarClass.prototype.hoverStar = function( hoveredStar ){
        var number = hoveredStar.data( "star-number" );
        var self = this;

        if ( this.currentHover !== number ){

            // Update the current star
            this.currentHover = number;
            //this.updateOptions( { rating: number } );
            hoveredStar.attr("src", this.options.imageSrcFilled);

            var $images = this.elem.find("img");

            $.each($images, function(img) {

                // Update the stars before if they are not filled
                if ($(this).data("star-number") < number && $(this).attr("src") === self.options.imageSrcEmpty){
                    $(this).attr("src", self.options.imageSrcFilled);
                }                    
                // Update the stars after if they are filled
                else if ($(this).data("star-number") > number && $(this).attr("src") === self.options.imageSrcFilled){
                    $(this).attr("src", self.options.imageSrcEmpty);
                }

            })
        }
    }

    StarBarClass.prototype.hoverOutStar = function(){
        var self = this;
        var $images = this.elem.find("img");
        var number = this.options.rating;

        $.each($images, function(img){
            if ($(this).data("star-number") <= number && $(this).attr("src") === self.options.imageSrcEmpty){
                $(this).attr("src", self.options.imageSrcFilled);
            }                    
            // Update the stars after if they are filled
            else if ($(this).data("star-number") > number && $(this).attr("src") === self.options.imageSrcFilled){
                $(this).attr("src", self.options.imageSrcEmpty);
            }
        })
    }
   
    
    StarBarClass.prototype.clickStar = function( clickedImage ){
        var number = clickedImage.data( "star-number" );
        this.options.rating = number;
                                
        if ( typeof this.options.onClick === 'function' ) {
            this.options.onClick( number );
        }
    }
    
    StarBarClass.prototype.printObject = function( obj ){
        for(var i in obj){
            console.log("printObject(): "+i+" : "+obj[i]);
        }
    }
    
    $.fn.starbar = function( options ) {
        //var starbar = Object.create( StarBar );
        //starbar.init( options, this );
        var sb = new StarBarClass();
        sb.init( options, this );
    };
    
    $.fn.starbar.options = {
        rating: 0,
        locked: false,
        numberOfStars: 10,
        imageSrcFilled: "images/star-filled.png",
        imageSrcEmpty: "images/star-empty.png",
        marginRight: "0.2em",
        starSize: "32px",
        onClick: null
    }
    
})( jQuery, window, document);