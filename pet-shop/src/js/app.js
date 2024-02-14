App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {

  // modern dapp browsers
 if (window.ethereum) {
  App.web3Provider = window.ethereum;
  try {
    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length > 0) {
      App.account = accounts[0];
      console.log("Account connected", App.account);
    } else {
      console.log("No accounts connected");
    }
  } catch (error) {
    console.error("User denied account access", error);
  }
 }
// Legacy dapp browsers
else if (window.web3) {
  App.web3Provider = window.web3.currentProvider;
}
// If no web3 instance is detected, fallback to ganache
else {
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
}

web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {

    $.getJSON('Adoption.json', function(data) {
      // get the necessary contract artifact file and instantiate it with @truffle/contract library
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);

      // set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);

      // Use our contract to adopt and mark adopted pets
      return App.markAdopted();

    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function() {
    var adoptionInstance;
    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;
      
      return adoptionInstance.getAdopters.call();
    })
    .then(function(adopters) {
      for (var i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.error(err.message);
    });
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;
    
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;

        // Execute adopt  a transaction by sending account
        return adoptionInstance.adopt(petId, { from: accounts[0] });
      })
      .then(function(result) {
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
    window.location.reload();
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

