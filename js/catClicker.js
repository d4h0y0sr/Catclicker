$(function () {
  // Var declarations
  var model = {
    init: function () {
      if (!localStorage.cats) {
        localStorage.cats = JSON.stringify([]);
        ["Fabio", "Chewie", "Peter", "Lizzy", "Sofy"].forEach((cat) => {
          this.add({
            name: cat,
            folder: cat + ".jpg",
            count: 0,
          });
        });
      }
    },

    add: function (obj) {
      var data = JSON.parse(localStorage.cats);
      data.push(obj);
      localStorage.cats = JSON.stringify(data);
    },

    updateCounter: function (cat) {
      var data = JSON.parse(localStorage.cats);
      data[cat].count++;
      localStorage.cats = JSON.stringify(data);
    },

    getAllCats: function () {
      return JSON.parse(localStorage.cats);
    },
  };

  var octopus = {
    selectedCat: 0,

    init: function () {
      model.init();
      selectView.init();
      catView.init();
    },

    updatecounter: function () {
      model.updateCounter(this.selectedCat);
    },

    setcurrentCat: function (num) {
      this.selectedCat = num;
      catView.render();
    },

    getcurrentCat: function () {
      return this.getAllCats()[this.selectedCat];
    },

    getAllCats: function () {
      return model.getAllCats();
    },
  };

  var selectView = {
    init: function () {
      this.render();
    },

    render: function () {
      octopus.getAllCats().forEach(function (cat, index) {
        var catItem = document.createElement("li");
        catItem.id = cat.name;
        catItem.innerHTML = cat.name;
        catItem.addEventListener("click", function () {
          octopus.setcurrentCat(index);
        });

        $("#select").append(catItem);
      });
    },
  };

  var catView = {
    init: function () {      
      document.getElementById("catImg").addEventListener("click", function () {
        octopus.updatecounter();
        catView.render();
      });

      this.render();
    },

    render: function () {
      var cat = octopus.getcurrentCat();
      document.getElementById("catImg").src = "resources/" + cat.folder;
      document.getElementById("catName").innerHTML = cat.name;
      document.getElementById("count").innerHTML = cat.count;
    },
  };

  octopus.init();
});
