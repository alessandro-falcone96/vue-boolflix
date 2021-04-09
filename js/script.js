

var app = new Vue (
  {
    el: "#app",
    data: {
      film: [],
      link: "https://image.tmdb.org/t/p/original/"
    },
    mounted: function() {
      {
        axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: "d1f8d7650c9da069b8dc77f3607078db",
            query: "Harry Potter",
          }
        })
        .then((risposta) => {

          var oggetto = risposta.data.results;
          this.film.push(oggetto);
          console.log(this.film);

          // for (var variable in this.film) {
          //   this.link += "ciao";
          // }

        })



      }
    }
  }
);
