StarBar
=======

Simple jQuery plugin for rating (similar to IMDB).


Options
-------
Options available for overrides.

- rating: Number of filled stars
- locked: Locked for voting (true or false)
- numberOfStars: The total amount of stars
- imageSrcFilled: Url to filled star image
- imageSrcEmpty: Url to empty star image
- marginRight: Margin between the stars
- onClick: Callback function when clicking on a star

Example
-------
```javascript
<!DOCTYPE html>
<head>
  <title>Starbar Demo</title>
  
  <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
  <script src="starbar.jquery.js"></script>
 
</head>
<body>

  <div class="starbar"></div>

  <p class="vote"></p>

  <script>

    $(".starbar").starbar({
      rating: 5,
      starSize: "16px",
      onClick: function(vote){
        $(".vote").html(vote);
      }
    });

  </script>

</body>
</html>
