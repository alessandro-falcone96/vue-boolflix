var app = new Vue (
  {
    el: "#app",
    data: {
      film: [],
      filteredFilm: [],
      menu: [
        {
          name: "Home",
          isActive: "true",
          categorySearch: "multi",
          queryInitial: "Harry Potter"
        },
        {
          name: "Serie TV",
          isActive: "false",
          categorySearch: "tv",
          queryInitial: "Game of Thrones"
        },
        {
          name: "Film",
          isActive: "false",
          categorySearch: "movie",
          queryInitial: "Avengers"
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
      ],
      fotoActive: 0,
      isIndexVisible: true,
      isMainPageVisible: false,
      isInputSearchVisible: false
    },
    mounted: function() {
      this.searchDatabaseBasic(0);
    },
    methods: {
      searchDatabaseBasic: function(index) {
        this.film = [];
        this.titoloPrincipale = this.menu[index].name;

        axios.get('https://api.themoviedb.org/3/search/' + this.menu[index].categorySearch, {
          params: {
            api_key: "d1f8d7650c9da069b8dc77f3607078db",
            query: this.menu[index].queryInitial
          }
        })
        .then((risposta) => {
          var oggetto = risposta.data.results;
          this.transformVote(oggetto);
          return (oggetto);
        })
        this.queryInput = "";
      },
      searchDatabaseAdvance: function() {
        this.film = [];
        this.titoloPrincipale = "Titoli filtrati per '" + this.queryInput + "'";
          axios.get('https://api.themoviedb.org/3/search/' + this.menu[this.indexActive].categorySearch, {
            params: {
              api_key: "d1f8d7650c9da069b8dc77f3607078db",
              query: this.queryInput
            }
          })
          .then((risposta) => {
            var oggetto = risposta.data.results;
            this.transformVote(oggetto);
            return (oggetto);
          })
          this.queryInput = "";
      },
      change: function(index) {

        // Aggiorno gli Index
        this.menu[this.lastIndex].isActive = 'false';
        this.lastIndex = index;
        this.menu[index].isActive = 'true';
        this.indexActive = index;

        // Aggiorno i film a schermo
        if (this.menu[index].name == 'Home') {
          this.searchDatabaseBasic(index);
        } else if (this.menu[index].name == 'Serie TV') {
          this.searchDatabaseBasic(index);
        } else if (this.menu[index].name == 'Film') {
          this.searchDatabaseBasic(index);
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
      },
      isVisible: function(index) {
        if (this.isIndexVisible == true) {
          this.isIndexVisible = false;
        } else {
          this.isIndexVisible = true;
        }
        if (this.isMainPageVisible == true) {
          this.isMainPageVisible = false;
        } else {
          this.isMainPageVisible = true;
        }
        this.fotoActive = index;
      },
      transformVote: function(oggetto) {
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
        return oggetto;
      },
      iconaRicercaVisible: function() {
        if (this.isInputSearchVisible == true) {
          this.isInputSearchVisible = false;
        } else {
          this.isInputSearchVisible = true;
        }
      }
    }
  }
);
