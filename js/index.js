new Vue({

    el: '#app',

    data: {

        currencies:{},
        amount: 0,
        from: 'USD',
        to:'EUR',
        result: '',
        loading:false
        
    },

    mounted() {

        this.getCurrencies()
        
    },

    computed:{

        formattedCurrency(){

            return Object.values(this.currencies);
        },
        
         calculateResult(){

        return (Number(this.amount) * this.result).toFixed(3)
      },

      disabled(){

        return this.amount === 0 || !this.amount || this.loading;
      }

    },

    methods: {

        getCurrencies(){

            const currencies = localStorage.getItem('currencies');

            if(currencies){

                this.currencies = JSON.parse(currencies);
                return;
            }

            axios.get('https://free.currencyconverterapi.com/api/v6/currencies')
            .then(response => {

                this.currencies = response.data.results;
                localStorage.setItem('currencies', JSON.stringify(response.data.results));

            });
        },

        convertCurrency() {

            this.loading = true;

          axios.get(`https://free.currencyconverterapi.com/api/v5/convert?q=${this.from}_${this.to}`)
          .then(response => {

                this.loading = false;
              
              this.result = response.data.results[`${this.from}_${this.to}`].val
          })

      },


  },

  watch:{

    from(){
        this.result = 0;
    },
    to(){
        this.result = 0;
    }
  }





})