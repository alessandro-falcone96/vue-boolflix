var app = new Vue (
  {
    el: "#app",
    data: {
      film: [],
      filteredFilm: [],
      menu: [
        {
          name: "Home",
          isActive: "true"
        },
        {
          name: "Serie TV",
          isActive: "false"
        },
        {
          name: "Film",
          isActive: "false"
        },
        {
          name: "Nuovi e Popolari",
          isActive: "false"
        },
        {
          name: "La mia Lista",
          isActive: "false"
        }
      ],
      lista: [],
      lastIndex: 0,
      indexActive: 0,
      link: "https://image.tmdb.org/t/p/original/",
      queryInput: "",
      titoloPrincipale: "",
      flagLink: "https://www.countryflags.io/",
      flagLink2: "/shiny/32.png",
    },
    mounted: function() {
      this.film = [];
      this.titoloPrincipale = "Titoli nella Home";
        axios.get('https://api.themoviedb.org/3/search/multi', {
          params: {
            api_key: "d1f8d7650c9da069b8dc77f3607078db",
            query: "Harry Potter"
          }
        })
        .then((risposta) => {
          var oggetto = risposta.data.results;
          this.film.push(oggetto);

          // Trasformazione voto da 10 a 5
          let voto = null;
          for (var index = 0; index < oggetto.length; index++) {
            voto = oggetto[index].vote_average;
            let newVoto = voto / 2;
            let decimale = newVoto % 1;
            newVoto = Math.floor(newVoto);
            if (decimale > 0.5) {
              newVoto += 1;
            }
            oggetto[index].vote_average = newVoto;
          }
        })
        this.queryInput = "";

    },
    methods: {
      search: function() {
          if (this.menu[this.indexActive].name == 'Film') {
            this.film = [];
            this.titoloPrincipale = "Titoli filtrati per '" + this.queryInput + "'";
              axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                  api_key: "d1f8d7650c9da069b8dc77f3607078db",
                  query: this.queryInput
                }
              })
              .then((risposta) => {
                var oggetto = risposta.data.results;
                this.film.push(oggetto);

                // Trasformazione voto da 10 a 5
                let voto = null;
                for (var index = 0; index < oggetto.length; index++) {
                  voto = oggetto[index].vote_average;
                  let newVoto = voto / 2;
                  let decimale = newVoto % 1;
                  newVoto = Math.floor(newVoto);
                  if (decimale > 0.5) {
                    newVoto += 1;
                  }
                  oggetto[index].vote_average = newVoto;
                }
              })
              this.queryInput = "";

          } else if (this.menu[this.indexActive].name == 'Serie TV') {
            this.film = [];
            this.titoloPrincipale = "Titoli filtrati per '" + this.queryInput + "'";
              axios.get('https://api.themoviedb.org/3/search/tv', {
                params: {
                  api_key: "d1f8d7650c9da069b8dc77f3607078db",
                  query: this.queryInput
                }
              })
              .then((risposta) => {
                var oggetto = risposta.data.results;
                this.film.push(oggetto);

                // Trasformazione voto da 10 a 5
                let voto = null;
                for (var index = 0; index < oggetto.length; index++) {
                  voto = oggetto[index].vote_average;
                  let newVoto = voto / 2;
                  let decimale = newVoto % 1;
                  newVoto = Math.floor(newVoto);
                  if (decimale > 0.5) {
                    newVoto += 1;
                  }
                  oggetto[index].vote_average = newVoto;
                }
              })
              this.queryInput = "";
          } else {
            this.film = [];
            this.titoloPrincipale = "Titoli filtrati per '" + this.queryInput + "'";
              axios.get('https://api.themoviedb.org/3/search/multi', {
                params: {
                  api_key: "d1f8d7650c9da069b8dc77f3607078db",
                  query: this.queryInput
                }
              })
              .then((risposta) => {
                var oggetto = risposta.data.results;
                this.film.push(oggetto);

                // Trasformazione voto da 10 a 5
                let voto = null;
                for (var index = 0; index < oggetto.length; index++) {
                  voto = oggetto[index].vote_average;
                  let newVoto = voto / 2;
                  let decimale = newVoto % 1;
                  newVoto = Math.floor(newVoto);
                  if (decimale > 0.5) {
                    newVoto += 1;
                  }
                  oggetto[index].vote_average = newVoto;
                }
              })
              this.queryInput = "";
          }
      },
      change: function(index) {
        // Aggiorno gli Index
        this.menu[this.lastIndex].isActive = 'false';
        // console.log(this.menu[this.lastIndex].isActive);
        this.lastIndex = index;
        this.menu[index].isActive = 'true';
        this.indexActive = index;
        // console.log(this.menu[index].isActive);


        // Aggiorno i film a schermo
        if (this.menu[index].name == 'Home') {
          this.film = [];
          this.titoloPrincipale = "Titoli nella Home";

            axios.get('https://api.themoviedb.org/3/search/multi', {
              params: {
                api_key: "d1f8d7650c9da069b8dc77f3607078db",
                query: "Harry Potter"
              }
            })
            .then((risposta) => {

              var oggetto = risposta.data.results;
              this.film.push(oggetto);

              // Trasformazione voto da 10 a 5
              let voto = null;

              for (var index = 0; index < oggetto.length; index++) {
                voto = oggetto[index].vote_average;
                let newVoto = voto / 2;
                let decimale = newVoto % 1;
                newVoto = Math.floor(newVoto);
                if (decimale > 0.5) {
                  newVoto += 1;
                }
                oggetto[index].vote_average = newVoto;
              }
            })
            this.queryInput = "";


        } else if (this.menu[index].name == 'Serie TV') {
          this.film = [];
          this.titoloPrincipale = "Titoli Serie TV";
            axios.get('https://api.themoviedb.org/3/search/tv', {
              params: {
                api_key: "d1f8d7650c9da069b8dc77f3607078db",
                query: "Game of Thrones"
              }
            })
            .then((risposta) => {
              var oggetto = risposta.data.results;
              this.film.push(oggetto);

              // Trasformazione voto da 10 a 5
              let voto = null;
              for (var index = 0; index < oggetto.length; index++) {
                voto = oggetto[index].vote_average;
                let newVoto = voto / 2;
                let decimale = newVoto % 1;
                newVoto = Math.floor(newVoto);
                if (decimale > 0.5) {
                  newVoto += 1;
                }
                oggetto[index].vote_average = newVoto;
              }
            })
            this.queryInput = "";

        } else if (this.menu[index].name == 'Film') {
          this.film = [];
          this.titoloPrincipale = "Titoli Film";
            axios.get('https://api.themoviedb.org/3/search/movie', {
              params: {
                api_key: "d1f8d7650c9da069b8dc77f3607078db",
                query: "Avengers"
              }
            })
            .then((risposta) => {
              var oggetto = risposta.data.results;
              this.film.push(oggetto);

              // Trasformazione voto da 10 a 5
              let voto = null;
              for (var index = 0; index < oggetto.length; index++) {
                voto = oggetto[index].vote_average;
                let newVoto = voto / 2;
                let decimale = newVoto % 1;
                newVoto = Math.floor(newVoto);
                if (decimale > 0.5) {
                  newVoto += 1;
                }
                oggetto[index].vote_average = newVoto;
              }
            })
            this.queryInput = "";

        } else if (this.menu[index].name == 'La mia Lista') {
          this.film = [];
          this.titoloPrincipale = "La mia Lista";
          this.film.push(this.lista);
        }



      },
      toLista: function(film) {
        if (this.lista.includes(film) == false) {
          this.lista.push(film);
        }
      },
      remove: function(film, index) {
        this.lista.splice(index, 1);
      }
    }
  }
);

var app2 = new Vue (
  {
    el: "#app2",
    data: {
      fotoProfilo: [
        "img/profiloPaolo.png",
        "img/profiloPatrizia.png",
        "img/profiloAlessandro.png",
        "img/profiloLello.png",
        "img/profiloClara.png"
      ],
      nomiProfilo: [
        "Paolo",
        "Patrizia",
        "Alessandro",
        "Lello",
        "Clara"
      ]
    },
    methods: {

    }
  }
);
