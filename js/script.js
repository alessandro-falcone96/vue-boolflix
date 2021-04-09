

var app = new Vue (
  {
    el: "#app",
    data: {
      film: [],
      link: "https://image.tmdb.org/t/p/original/",
      queryInput: ""
    },
    methods: {
      search: function() {
        this.film = [];
        {
          axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
              api_key: "d1f8d7650c9da069b8dc77f3607078db",
              query: this.queryInput,
            }
          })
          .then((risposta) => {

            var oggetto = risposta.data.results;
            this.film.push(oggetto);
            console.log(this.film);

          })
          this.queryInput = "";
        }
      }
    },
    // mounted: function() {
    //
    // }
  }
);
