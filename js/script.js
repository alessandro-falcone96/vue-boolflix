var app = new Vue (
  {
    el: "#app",
    data: {
      film: [],
      link: "https://image.tmdb.org/t/p/original/",
      queryInput: "",
      titoloPrincipale: "",
      flagLink: "https://www.countryflags.io/",
      flagLink2: "/shiny/32.png",
      // filmPreferiti: ["Iron Man", "L'Incredibile Hulk", "Iron Man 2", "Thor", "Captain America - Il Primo Vendicatore", "The Avengers", "Iron Man 3", " Thor: The Dark World", "Captain America: The Winter Soldier", "Guardiani della galassia", "Avengers: Age of Ultron", "Ant-Man", "Captain America: Civil War", "Doctor Strange", "Guardiani della Galassia Vol 2", "Spider-Man: Homecoming", "Thor: Ragnarok", "Black Panther", "Avengers: Infinity War", "Ant-Man and the Wasp", "Captain Marvel", "Avengers: Endgame", "Spider-Man: Far From Home"]
    },
    methods: {
      search: function() {
        this.film = [];
        this.titoloPrincipale = "Titoli filtrati per '" + this.queryInput + "'";


          axios.get('https://api.themoviedb.org/3/search/multi', {
            params: {
              api_key: "d1f8d7650c9da069b8dc77f3607078db",
              query: this.queryInput,
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
      activeImage: function(index) {
        console.log(index);
      }
    }
  }
);
